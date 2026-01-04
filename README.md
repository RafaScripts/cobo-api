# Cobo API Library

Biblioteca TypeScript para interagir com a API da Cobo, permitindo criar wallets, gerar endereços e realizar requisições seguras com assinatura Ed25519.

## Instalação

```bash
npm install cobo-api
```

> **Nota:** O `api_secret` deve ser uma chave privada Ed25519 de 32 bytes (64 caracteres hexadecimais). Acesse a documentação da Cobo para maiores informações.

## Uso

```typescript
import CoboAPI from 'cobo-api';
import { CoboEnvironment, CoboWalletType, CoboWalletSubtype } from 'cobo-api/types';

const coboApi = new CoboAPI({
    apiKey: 'sua_api_key',
    apiSecret: 'sua_chave_privada_ed25519',
    environment: CoboEnvironment.DEV // ou SANDBOX, PROD
});
```

### Criar uma Wallet

```typescript
const wallet = await coboApi.createWallet({
    name: 'Minha Wallet',
    wallet_type: CoboWalletType.MPC,
    wallet_subtype: CoboWalletSubtype.ORG_CONTROLLED,
    vault_id: 'seu_vault_id'
});
console.log(wallet);
```

### Criar um Endereço

```typescript
const addresses = await coboApi.createAddress(wallet.wallet_id, 'ETH', 1);
console.log(addresses);
```

## Ambientes Disponíveis

| Ambiente | URL Base |
|----------|----------|
| `CoboEnvironment.DEV` | `https://api.dev.cobo.com/v2` |
| `CoboEnvironment.SANDBOX` | `https://api.sandbox.cobo.com/v2` |
| `CoboEnvironment.PROD` | `https://api.cobo.com/v2` |

## Tipos de Wallet

### CoboWalletType

| Tipo | Valor | Descrição |
|------|-------|-----------|
| `CUSTODIAL` | `"Custodial"` | [Custodial Wallets](https://manuals.cobo.com/en/portal/custodial-wallets/introduction) |
| `MPC` | `"MPC"` | [MPC Wallets](https://manuals.cobo.com/en/portal/mpc-wallets/introduction) |
| `SMART_CONTRACT` | `"SmartContract"` | [Smart Contract Wallets](https://manuals.cobo.com/en/portal/smart-contract-wallets/introduction) |
| `EXCHANGE` | `"Exchange"` | [Exchange Wallets](https://manuals.cobo.com/en/portal/exchange-wallets/introduction) |

### CoboWalletSubtype

| Subtipo | Valor | Descrição |
|---------|-------|-----------|
| `ASSET` | `"Asset"` | Custodial Wallets (Asset Wallets) |
| `WEB3` | `"Web3"` | Custodial Wallets (Web3 Wallets) |
| `ORG_CONTROLLED` | `"Org-Controlled"` | MPC Wallets (Organization-Controlled) |
| `USER_CONTROLLED` | `"User-Controlled"` | MPC Wallets (User-Controlled) |
| `SAFE_WALLET` | `"Safe{Wallet}"` | Smart Contract Wallets (Safe) |
| `MAIN` | `"Main"` | Exchange Wallets (Main Account) |
| `SUB` | `"Sub"` | Exchange Wallets (Sub Account) |

## Métodos da API

| Método | Descrição |
|--------|-----------|
| `createWallet(params: CreateWalletRequest)` | Cria uma nova wallet com os parâmetros especificados |
| `createAddress(walletId: string, chainId: string, count?: number)` | Cria endereços para a wallet especificada |

## Configuração

```typescript
interface CoboAPIConfig {
    apiKey: string;      // Chave de API para autenticação
    apiSecret: string;   // Chave privada Ed25519 (seed de 32 bytes em hex)
    environment: CoboEnvironment; // Ambiente da API
}
```

## Autenticação

Todas as requisições são automaticamente assinadas usando Ed25519. A biblioteca:

1. Constrói a string de assinatura no formato: `method|path|nonce|queryString|body`
2. Aplica duplo SHA256 hash
3. Assina com a chave privada Ed25519
4. Adiciona os headers `Biz-Api-Key`, `Biz-Api-Nonce` e `Biz-Api-Signature`

## Licença

MIT License

## Contribuições

Contribuições são bem-vindas! Abra uma issue ou envie um pull request.