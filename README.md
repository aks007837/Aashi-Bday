# Aashi Birthday Website

## Run locally
1. Install Node.js (LTS).
2. Extract this folder and run `npm install`.
3. Run `npm run dev` and open the local URL shown.

## Add photos
Put four images in `public/photos/` named `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, and `photo4.jpg`. You can use `.jpg` images; update the `photos` array in `src/main.jsx` if using other filenames.

## Midnight reveal
The countdown/reveal is set for **October 3, 2026 at 12:00 AM India Standard Time**. It uses a fixed IST target. After that moment, the birthday page stays revealed.

## Music
The page includes a quiet, original synthesized melody. Browsers require a user tap before sound can play, so the visitor can tap “Play soft melody.” Volume is intentionally low.

## Deploy to Netlify
Push the project to GitHub and import it in Netlify. Build command: `npm run build`. Publish directory: `dist`.
