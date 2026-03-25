# Pride Identity NFT

## Current State
- MintSection has two identity type selectors (Real Face / Avatar) as buttons with no additional UI after selection
- AvatarSection shows 4 avatar cards with basic trait display and rarity badges, but no rarity graphics/charts
- No face image upload functionality exists anywhere

## Requested Changes (Diff)

### Add
- Real Face Identity: after selecting "Real Face Identity" in MintSection, show an expanded face upload panel below the selector with: drag-and-drop / click-to-upload image area, preview of uploaded face, privacy notice ("Your face is encrypted and stored privately on-chain. Only zk-proof is submitted."), upload status/confirmation state
- Avatar Section: Add a rarity distribution chart/graphic per avatar showing trait rarity percentages visually (animated bar chart or rarity meter). Add overall rarity score for each avatar card. Add a full rarity breakdown panel that shows each trait tier distribution (Common, Uncommon, Rare, Epic, Legendary, Mythic) with color-coded bars and percentage fill.

### Modify
- MintSection: Real Face card selector - when selected, expand to show face upload UI inline below the two cards
- AvatarSection: Each avatar card gets a rarity score meter graphic; add a full rarity stats panel section at the bottom of the avatar section

### Remove
- Nothing removed

## Implementation Plan
1. In MintSection: add `faceImageFile` and `facePreview` state. When `identityType === 'real-face'` is selected, render an animated expand panel below the identity cards with a file input (accept image/*), drag-and-drop support, face preview with remove button, and a privacy badge.
2. In AvatarSection: add rarity score (number 0-100) and rarity distribution data per avatar. Render an animated horizontal bar (rarity meter) inside each avatar card. Add a bottom section with a full rarity tier distribution chart showing supply breakdown by tier.
