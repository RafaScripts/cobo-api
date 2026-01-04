# Cobo API Library

Cobo API is a TypeScript library for interacting with the Cobo API, allowing users to create wallets, generate addresses, and perform secure API requests with Ed25519 signing.

## Installation

To install the Cobo API library, use npm:

```bash
npm install cobo-api
```

## Usage

First, import the `CoboAPI` class from the library:

```typescript
import CoboAPI from 'cobo-api';
```

### Initialize the API Client

Create an instance of the `CoboAPI` class:

```typescript
const coboApi = new CoboAPI();
```

### Create a Wallet

To create a new wallet, use the `createWallet` method:

```typescript
const wallet = await coboApi.createWallet('My Wallet');
console.log(wallet);
```

### Create an Address

To create a new address for a specific wallet, use the `createAddress` method:

```typescript
const address = await coboApi.createAddress(wallet.id, 'BTC');
console.log(address);
```

## API Methods

### `createWallet(name: string): Promise<any>`

Creates a new wallet with the specified name.

### `createAddress(walletId: string, chain: string): Promise<any>`

Creates a new address for the specified wallet and blockchain.

## Environment Variables

The library requires the following environment variables to be set:

- `api_key`: Your API key for authentication.
- `api_secret`: Your API secret for signing requests.
- `base_url`: The base URL for the Cobo API.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.