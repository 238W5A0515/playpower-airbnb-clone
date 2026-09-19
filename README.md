# Playpower Labs — Airbnb-Clone App

An original React + TypeScript + Vite implementation based on the assignment brief. It is intentionally written from scratch rather than lifting the reference site's code.

## Included views
- Listing page with desktop property layout, photo mosaic, details, amenities, reviews, map placeholder and sticky reservation card.
- Photo Tour overlay opened from the hero gallery / Show all photos.
- Lightbox with previous/next controls, counter, Escape, and Left/Right keyboard navigation.
- Amenities dialog and basic save/share interactions.
- Accessible labels, dialog semantics, focus return, scroll locking and reduced-motion-friendly CSS.

## Run
```bash
npm install
npm run dev
npm run build
```

## Project structure
`src/main.tsx` contains the application orchestration and reusable UI components. `src/styles.css` contains the design system and desktop layout. `architecture/` contains the production-scale architecture diagram. `.claude/` contains example AI-agent/skill configuration files requested by the brief.

## Important submission note
The supplied assignment says the reference URL is the single source of truth and explicitly warns against direct lift-and-shift. This project is therefore an original implementation. Before final submission, open the supplied reference in a normal browser and perform a final pixel-diff pass, replacing the demo Unsplash images with assets you are licensed to use and tuning measured spacing/typography where necessary.
