import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import CryptoJS from "crypto-js";
import nacl from "tweetnacl";
import { 
    CoboEnvironment, 
    CoboAPIConfig, 
    WalletCreateResponse, 
    AddressCreateResponse,
    CreateWalletRequest
} from "./types";

/**
 * Get base URL for the specified environment
 */
function getBaseUrl(environment: CoboEnvironment): string {
    switch (environment) {
        case CoboEnvironment.DEV:
            return "https://api.dev.cobo.com/v2";
        case CoboEnvironment.SANDBOX:
            return "https://api.sandbox.cobo.com/v2";
        case CoboEnvironment.PROD:
            return "https://api.cobo.com/v2";
        default:
            throw new Error(`Invalid environment: ${environment}`);
    }
}

class CoboAPI {
    private apiKey: string;
    private privateKey: string;
    private baseUrl: string;
    private apiClient: AxiosInstance;

    constructor(config: CoboAPIConfig) {
        this.apiKey = config.apiKey;
        this.privateKey = config.apiSecret;
        this.baseUrl = getBaseUrl(config.environment);
        
        this.apiClient = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        
        this.apiClient.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => this.signRequest(config), 
            (error: any) => Promise.reject(error)
        );
    }

    private constructSignContent(method: string, path: string, nonce: string, queryString: string, body: string): string {
        const normalizedPath = path.startsWith("/v2") ? path : "/v2" + path;
        let encodedQueryString = "";
        if (queryString) {
            const params = queryString.split('&').map(param => {
                const [key, value] = param.split('=');
                return `${key}=${encodeURIComponent(decodeURIComponent(value || ''))}`;
            });
            encodedQueryString = params.join('&').replace(/%20/g, "+");
        }
        const strToSign = [method.toUpperCase(), normalizedPath, nonce, encodedQueryString, body].join('|');
        const hash = CryptoJS.SHA256(CryptoJS.SHA256(strToSign)).toString();
        return hash;
    }

    private signRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        const nonce = String(Date.now());
        let path = config.url || '';
        let queryString = '';
        
        if (config.params) {
            const searchParams = new URLSearchParams();
            for (const [key, value] of Object.entries(config.params)) {
                searchParams.append(key, String(value));
            }
            queryString = searchParams.toString();
        }
        
        if (path.includes('?')) {
            const parts = path.split('?');
            path = parts[0] || '';
            const qs = parts[1] || '';
            queryString = queryString ? `${qs}&${queryString}` : qs;
        }
        
        let body = '';
        if (config.data) {
            body = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
            config.data = body;
        }
        
        const hash = this.constructSignContent(config.method || 'GET', path, nonce, queryString, body);
        const privateKeyBytes = this.hexToBytes(this.privateKey);
        const keyPair = nacl.sign.keyPair.fromSeed(privateKeyBytes);
        const hashBytes = this.hexToBytes(hash);
        const signature = nacl.sign.detached(hashBytes, keyPair.secretKey);
        const signatureHex = this.bytesToHex(signature);
        
        config.headers.set('Biz-Api-Key', this.apiKey);
        config.headers.set('Biz-Api-Nonce', nonce);
        config.headers.set('Biz-Api-Signature', signatureHex);
        
        return config;
    }

    private hexToBytes(hex: string): Uint8Array {
        if (hex.length % 2 !== 0) {
            throw new Error('Invalid hex string');
        }
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes;
    }

    private bytesToHex(bytes: Uint8Array): string {
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    async createWallet(params: CreateWalletRequest): Promise<WalletCreateResponse> {
        const response = await this.apiClient.post('/wallets', params);
        return response.data;
    }

    async createAddress(walletId: string, chainId: string, count: number = 1): Promise<AddressCreateResponse[]> {
        const body = { chain_id: chainId, count };
        const response = await this.apiClient.post(`/wallets/${walletId}/addresses`, body);
        return response.data;
    }
}

export default CoboAPI;