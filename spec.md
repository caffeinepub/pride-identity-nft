# Prydo Identity NFT

## Current State
- AvatarSection uses PrydoBadge + AvatarBuilder (SVG-based) for 4 showcase cards
- No admin panel exists
- MintConfirmModal has no Polygon payment address display
- Backend has getAllMintedIds(), getIdCount(), mintId() on ICP

## Requested Changes (Diff)

### Add
- AdminPanel component at /admin route
  - Password gate: prydo-admin-2024
  - Live ICP data: total minted count, supply remaining (100 - minted), today's mints
  - Table: all minted IDs with wallet, tier, avatar type, mint date
  - "Copy All Wallets" button + "Refresh" button
- Polygon payment address in MintConfirmModal
  - Address: 0x89c694ca25D71dEdd4389bdF0D8846595C00A8C1
  - One-click copy button

### Modify
- AvatarSection: Replace 4 PrydoBadge+AvatarBuilder showcase items with premium PNG images
  - Gay (lgbtq-gay-male.png), Lesbian (lgbtq-lesbian.png), Trans Woman (lgbtq-transwoman.png), Pansexual (lgbtq-pansexual.png)
  - Each card gets wallet-unique deterministic CSS filter (hue-rotate, brightness, saturation) based on a fixed seed
  - Layout stays 4-column grid
- App.tsx: Add /admin route check (URL path-based routing)

### Remove
- Nothing removed

## Implementation Plan
1. Update AvatarSection.tsx — replace PrydoBadge gallery with 4 premium PNG avatar cards (Gay, Lesbian, Trans Woman, Pansexual) with LGBTQ+ category labels, pride flag colors, and wallet-unique CSS filters using deterministic seeds
2. Create AdminPanel.tsx — password gate → dashboard with live ICP data via useActor hook, minted IDs table, copy wallets button, refresh
3. Update MintSection.tsx MintConfirmModal — add Polygon payment address row with copy button
4. Update App.tsx — detect /admin pathname and render AdminPanel instead of main app
