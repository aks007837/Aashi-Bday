# Aashi Birthday Surprise ❤️

A React + Vite birthday surprise with a midnight IST countdown, a temporary test button, animated scenes, a letter, portrait gallery, wishes, and soft generated melody.

## Run locally

```bash
npm install
npm run dev
```

## Photos

Place the seven portrait photos in `public/photos/` and name them `1.jpeg` through `7.jpeg`. The original photos are not bundled in this archive; copy them from your existing project folder.

## Countdown and testing

The reveal target is October 3, 2026, 12:00 AM India Standard Time. The **Test the surprise** button temporarily bypasses the countdown for testing. Before public deployment, remove the `testReveal` state, remove the test button, and change `ready` to `left === 0` in `src/main.jsx`.

## Build

```bash
npm run build
```

For Netlify, use build command `npm run build` and publish directory `dist`.
