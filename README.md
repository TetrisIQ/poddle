<h1 align="center">Poddle</h1>

<div align="center">
  <strong>Meetings made simple! </strong>
</div>
<div align="center">
  A <code>decentralized</code> and <code>encrypted</code> doodle alternative
</div>

<br />
<!-- badges -->
<div align="center">
  <!-- Build Status -->
    <!-- <img src="https://img.shields.io/docker/v/tetrisiq/poddle?logo=docker&style=flat-square"
      alt="Docker Status" /> -->
  <!-- Docker pulls -->
    <!-- <img src="https://img.shields.io/docker/pulls/tetrisiq/poddle?logo=docker&style=flat-square"
      alt="Docker pulls" /> -->
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Available options](#available-options)
- [What means decentralized](#what-means-decentralized)
- [FAQ](#faq)
- [Installation](#installation)
  - [From Docker Hub](#from-docker-hub)
  - [Docker Compose](#docker-compose)
  - [Docker run](#docker-run)
  - [Development Setup](#development-setup)
- [See Also](#see-also)

## Available options

- **Yes, No, If needed be** You can choose between three options. Yes this option is okay for me. No this is not acceptable. And if needed be.
- **Set deadlines** After the deadline is reached. Your Poll cannot be edited. Comments are still possible. But the answers are locked.
- **Add Comments** You can add Anonymous comments to the Poll and discuss the answers and topics.
- **Vote limits** Limit the number of votes a participant has.

> For planned features, take a look at the GitHub issues

## What means decentralized

Poddle uses a p2p (or peer to peer) database called gun.js. This allows Poddle to share data between browsers without having to go through a central service. This means everyone can access your data and read them. Here comes cryptography in game. Poddle uses e2e (end to end) encryption to ensure that only those who are allowed to read the data, can decrypt them.

So in the end, Poddle is a decentralized p2p and E2EE tool.

## FAQ

> If you have any issues, create an issue on GitHub

## Installation

### Docker

You can use a Docker compose file (you can find an example in this repo) or use docker directly to spin up an instance.

```
docker run ghcr.io/tetrisiq/poddle:latest
```

### Manual

Once you have checked out this project and installed dependencies with npm install (or pnpm install or yarn), start a development server:

```
npm run dev
```

The dev server binds to http://127.0.0.1:8765. To configure the dev server, take a look at server/dev/index.js

#### Building

To create a production version of your app:

```
npm run build
```

Run the production build with `npm run start` or `node server` To configure the production server, take a look at `server/index.js`

## See Also

- [gun.eco](https://gun.eco/) - decentralised Database
- [Svelte in 100 Seconds](https://www.youtube.com/watch?v=rv3Yq-B8qp4) - video by Fireship
- [svelte Tutorial](https://svelte.dev/tutorial/basics/) - A very good start point for learning svelte
