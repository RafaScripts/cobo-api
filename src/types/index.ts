/**
 * Environment enum for Cobo API
 */
export enum CoboEnvironment {
    DEV = "dev",
    SANDBOX = "sandbox",
    PROD = "prod"
}

/**
 * Configuration options for CoboAPI
 */
export interface CoboAPIConfig {
    apiKey: string;
    apiSecret: string;
    environment: CoboEnvironment;
}

/**
 * Wallet response from API
 */
export interface WalletCreateResponse {
    wallet_id: string;
    wallet_type: string;
    wallet_subtype: string;
    name: string;
    org_id: string;
    enable_auto_sweep: boolean;
    project_id: string;
    project_name: string;
    vault_id: string;
    vault_name: string;
}

/**
 * Address response from API
 */
export interface AddressCreateResponse {
    address: string;
    chain_id: string;
    memo: string;
    path: string;
    encoding: string;
    pubkey: string;
    x_only_pubkey: string;
    root_pubkey: string;
    taproot_script_tree_hash: string;
    taproot_internal_address: string;
    stellar_trusted_token_ids: string[] | null;
}

/**
 * Create wallet request body
 */
export interface CreateWalletRequest {
    name: string;
    wallet_type: string;
    wallet_subtype: string;
    vault_id: string;
}

/**
 * Create address request body
 */
export interface CreateAddressRequest {
    chain_id: string;
    count: number;
}