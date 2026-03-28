# Prydo Identity NFT

## Current State
- Real Face upload section: shows uploaded photo as circular preview only. No avatar is generated from the photo.
- Avatar Identity: LGBTQAvatarPicker with 8 categories. `handleAutoGenerate` picks 1 of 2-3 PNG variants + applies CSS filter. Visually only 2-3 faces per category, not genuine 10,000+ unique avatars.
- avatarGenerator.ts generates rich deterministic traits (1.5B+ mathematically) but these traits are not used to render unique visuals.

## Requested Changes (Diff)

### Add
- **Real Face → Stylized Avatar**: When user uploads photo in Real Face section, use Canvas API to generate a stylized Pixar/pride-themed avatar from it:
  - Load image onto canvas
  - Apply artistic posterize/cartoon effect (pixel-level manipulation: reduce color palette, boost contrast, add edge softening)
  - Overlay pride flag colors as a glowing border ring
  - Add a subtle gradient vignette overlay in category colors
  - Add a small pride badge/crown icon overlay
  - Show the canvas-generated stylized avatar below/alongside the photo preview
  - Store this canvas data URL as the avatar for minting
- **Canvas SVG Avatar Renderer** (`src/frontend/src/utils/canvasAvatarRenderer.ts`):
  - A function `renderAvatarToCanvas(canvas, traits, categoryColors)` that draws a genuinely unique Pixar-style face using Canvas 2D API
  - Elements to draw: background gradient (12 themes), face oval (6 shapes), skin tone fill (10 tones), hair shape+color (15 styles × 12 colors), eyes (8 shapes × 8 colors), eyebrows (6 styles), nose (6 styles), lips (8 styles/colors), outfit collar area (15 styles), accessory (12 options: crown, glasses, earrings, etc.), special mark (8: scar, freckles, glow, etc.)
  - Total: 12×6×10×15×12×8×8×6×6×8×15×12×8 = well over 10,000+ (actually billions)
  - Category colors used for background glow, hair highlight, outfit accent

### Modify
- **LGBTQAvatarPicker.tsx**: In `handleAutoGenerate`, call `renderAvatarToCanvas` with derived traits to produce a genuinely unique canvas-rendered avatar data URL (not just CSS filter on same PNG). Display this canvas-generated image as the premium avatar.
- **MintSection.tsx**: After real face photo is uploaded, render stylized canvas avatar using the photo + category colors and store it as `lgbtqAvatarSrc` for minting. Show it alongside the photo preview with label "Your Stylized Identity Avatar".
- **LGBTQAvatarPicker.tsx combo counter**: Update the displayed combination count to show actual computed count based on trait array sizes.

### Remove
- Nothing

## Implementation Plan
1. Create `src/frontend/src/utils/canvasAvatarRenderer.ts` — full Canvas 2D renderer with all trait arrays and `renderAvatarToCanvas(canvas, traits, categoryColors)` function
2. Create `src/frontend/src/utils/realFaceAvatarRenderer.ts` — function `stylizePhotoToAvatar(imageFile, categoryColors): Promise<string>` using Canvas to apply artistic effects and pride overlays on an uploaded photo
3. Update `LGBTQAvatarPicker.tsx` `handleAutoGenerate` to use canvas renderer instead of PNG+filter
4. Update `MintSection.tsx` `handleFaceFileChange` to call `stylizePhotoToAvatar` after upload, show stylized result as avatar preview
5. Validate build
