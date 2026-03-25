# Prydo Identity NFT

## Current State
- Backend is empty (`actor {}`)
- Frontend displays ICP and IPFS as tech stack badges only — no real backend integration
- Minting is simulated (no on-chain data stored)
- Face photo uploads are stored only in React state (lost on refresh)

## Requested Changes (Diff)

### Add
- Motoko backend actor with:
  - `storePrydoID`: stores minted Prydo ID metadata (wallet address, tier, avatar type, timestamp) on ICP canister storage
  - `getPrydoID`: retrieve a Prydo ID by wallet address
  - `getAllPrydoIDs`: list all minted IDs (for community explorer)
  - `storeIPFSHash`: store an IPFS CID associated with a wallet's Prydo ID (avatar/face metadata)
  - `getIPFSHash`: retrieve IPFS CID for a wallet
  - `getStats`: return total minted count and storage info
- Frontend `ICPStorageService` — calls backend actor to persist mint data after Polygon tx
- Frontend `IPFSUploadService` — uploads avatar/face metadata JSON to IPFS via web3.storage HTTP API (using http-outcalls from backend)
- `DecentralizedStoragePanel` component — shows live ICP canister stats and IPFS CID for user's minted ID
- Update `TechStackSection` to show live "On-Chain" badges once data is stored
- Update `MintSection` to call ICP storage after successful mint
- Update `ProfilePanel` to show IPFS CID and ICP storage status

### Modify
- `MintSection.tsx`: after `eth_sendTransaction`, also call `storePrydoID` on ICP backend and store IPFS hash
- `ProfilePanel.tsx`: display ICP storage confirmation and IPFS CID for the minted ID
- `TechStackSection.tsx`: add live status indicator (green dot + "Live" badge) for ICP and IPFS cards

### Remove
- Nothing removed

## Implementation Plan
1. Select `blob-storage` and `http-outcalls` components
2. Generate Motoko backend with PrydoID storage map, IPFS hash map, stats query
3. Update frontend to call backend actor methods after minting
4. Add `DecentralizedStoragePanel` showing ICP canister ID, stored count, and user's IPFS CID
5. Update ProfilePanel to show ICP + IPFS status
6. Validate and deploy
