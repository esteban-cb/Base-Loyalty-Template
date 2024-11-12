# Base Loyalty System

This is a [Next.js](https://nextjs.org) project for a blockchain-based loyalty system, bootstrapped with [`create-onchain`](). It leverages the Base network and CDP tools to provide a comprehensive loyalty program.

## Features

- **User Registration**: Connect through Coinbase Wallet for multi-network support.
- **Identity Verification**: Uses OnchainKit's Identity Components for human-readable Basenames.
- **Data Management**: Powered by CDP's Data API for real-time balance tracking and historical data analysis.
- **Points Accumulation**: Implemented as ERC20 tokens, with real-time updates via CDP Webhooks.
- **Tier System**: Deploys ERC721 NFTs for Bronze, Silver, and Gold status.
- **Reward Redemption**: Handled by Base smart contracts, issuing ERC20 tokens as rewards.
- **Notifications**: Real-time updates powered by CDP Webhooks.
- **Analytics**: Uses CDP Events Indexer for personalized reward experiences.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Learn More

To learn more about OnchainKit, see our [documentation](https://docs.onchainkit.com).

To learn more about Next.js, see the [Next.js documentation](https://nextjs.org/docs).
