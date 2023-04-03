# sveltekit-gunjs

A SvelteKit with GUN.js example

## Features

- Tailwind CSS
- Dockerized
- GitHub Action to publish to GHCR
- Vite's development server (incl. Gun Relay)
- Production server (incl. Gun Relay)

## Developing

Once you have checked out this project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```
npm run dev
```

The dev server binds to `http://127.0.0.1:8765`. To configure the dev server, take a look at `server/dev/index.js`

## Building

To create a production version of your app:

```
npm run build
```

Run the production build with `npm run start` or `node server`. To configure the production server, take a look at `server/index.js`
