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
- `Custodial`: [Custodial Wallets](https://manuals.cobo.com/en/portal/custodial-wallets/introduction\)

- `MPC`: [MPC Wallets](https://manuals.cobo.com/en/portal/mpc-wallets/introduction\)

- `SmartContract`: [Smart Contract Wallets](https://manuals.cobo.com/en/portal/smart-contract-wallets/introduction\)

- `Exchange`: [Exchange Wallets](https://manuals.cobo.com/en/portal/exchange-wallets/introduction\)
 */
export enum CoboWalletType {
    CUSTODIAL = "Custodial",
    MPC = "MPC",
    SMART_CONTRACT = "SmartContract",
    EXCHANGE = "Exchange"
}

/**
- `Asset`: Custodial Wallets (Asset Wallets).

- `Web3`: Custodial Wallets (Web3 Wallets).

- `Org-Controlled`: MPC Wallets (Organization-Controlled Wallets).

- `User-Controlled`: MPC Wallets (User-Controlled Wallets).

- `Safe{Wallet}`: Smart Contract Wallets (Safe).

- `Main`: Exchange Wallets (Main Account).

- `Sub`: Exchange Wallets (Sub Account)
 */

export enum CoboWalletSubtype {
    ASSET = "Asset",
    WEB3 = "Web3",
    ORG_CONTROLLED = "Org-Controlled",
    USER_CONTROLLED = "User-Controlled",
    SAFE_WALLET = "Safe{Wallet}",
    MAIN = "Main",
    SUB = "Sub"
}

/**
 * Create wallet request body
 */
export interface CreateWalletRequest {
    name: string;
    wallet_type: CoboWalletType;
    wallet_subtype: CoboWalletSubtype;
    vault_id: string;
}

/**
 * Create address request body
 */
export interface CreateAddressRequest {
    chain_id: string;
    count: number;
}