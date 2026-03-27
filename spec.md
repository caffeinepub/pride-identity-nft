# Prydo Identity NFT

## Current State
NFT cards use a generic trading card format (NFTCard.tsx) with rarity-colored border glow, SVG art panel, trait rows, and score bar. ProfilePanel shows a minted card using NFTCard. AvatarSection shows 4 showcase cards using NFTCard.

## Requested Changes (Diff)

### Add
- New `PrydoBadge.tsx` component with two badge variants:
  1. **Genesis badge** (gold ornate): Decorative gold frame with wing motifs at top corners, crystalline gem centerpiece at top, galaxy/nebula background inside card, character avatar/face in center, name + pronouns text block, gold ribbon banner with "GENESIS" text, bottom stats row showing LGBTQ+ Pioneer icon + Voting Power 150
  2. **Member badge** (silver chrome): Sleek silver/chrome futuristic frame, rainbow pride flag decoration at top center, blue radial ray burst background, character avatar/face, name + pronouns, "Prydo Member" tier label, bottom stats row showing Joined year + Reputation score

### Modify
- `ProfilePanel.tsx`: Use new `PrydoBadge` component instead of `NFTCard` for minted user cards. Genesis ID tier → genesis variant. Regular/avatar identity → member variant.
- `AvatarSection.tsx`: Replace/update the 4 showcase NFT trading cards to use the new `PrydoBadge` design aesthetic — at minimum the two main card types (Genesis gold + Member silver) should be showcased.
- `NFTCard.tsx`: Can keep for backward compatibility but the primary display cards should use the new badge design.

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/PrydoBadge.tsx` with two variants rendered via SVG/CSS — genesis (gold, ornate wings/gems/galaxy) and member (silver, rainbow flag/blue rays)
2. The badge should accept: `variant: 'genesis' | 'member'`, `name: string`, `pronouns: string`, `avatarContent: ReactNode`, `votingPower?: number`, `reputation?: number`, `joinedYear?: number`
3. Genesis badge SVG frame: multi-layer gold gradient border, decorative golden wings top-left/right, crystal gem SVG at top-center (with prismatic rainbow), galaxy nebula background behind avatar
4. Member badge SVG frame: silver/chrome gradient border with tech panel details, rainbow flag SVG strip at top-center, blue radial ray background behind avatar
5. Update ProfilePanel to use PrydoBadge
6. Update AvatarSection showcase to use PrydoBadge
