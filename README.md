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
    <img src="https://img.shields.io/docker/v/tetrisiq/poddle?logo=docker&style=flat-square"
      alt="Docker Status" />
  <!-- Docker pulls -->
    <img src="https://img.shields.io/docker/pulls/tetrisiq/poddle?logo=docker&style=flat-square"
      alt="Docker pulls" />
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

### From Docker Hub

### Docker Compose

Create a `docker-compose.yml` with the content below

```yaml
version: "3"
services:
  poddle:
    image: "tetrisiq/poddle"
    ports:
      - "8765:8765"
    environment:
      - PUBLIC_ADDRESS=#YOUR_URL#
      - SERVER_NAME=#YOUR_SERVER_NAME#
      - CONNECT_TO_PEERS=#true OR false#
      - OTHER_PEERS=#ARRAY_OF_PEERS#
    volumes:
      - ./data:/work/relay/data/
```

Replace the placeholder to specify the environment variables

- `PUBLIC_ADDRESS` your address from where you access your instance (For Example: `https://YOURDOMAIN.XYZ/gun`)
- `SERVER_NAME` Give your service a name
- `CONNECT_TO_PEERS` true if you want to connect your instance to other peers
- `OTHER_PEERS` if `CONNECT_TO_PEERS` is true, your instance will try to connect to this peers

Start your instance with `docker compose up -d`

### Docker run

Create a .env file and fill out the blanks

```
PUBLIC_ADDRESS=
SERVER_NAME=
OTHER_PEERS=[]
CONNECT_TO_PEERS=false
```

You can start the docker with `docker run -p 8765:8765 --env-file .env --name=poddle tetrisiq/poddle:latest`

### Development Setup

- Clone the git repo
- Install the dependency’s in the `frontend` and `relay` folder with `yarn install`
- Create an env file under `relay/.env` and use this example config

```
PUBLIC_ADDRESS=http://localhost:8765/gun
SERVER_NAME=LocalDevelopment
OTHER_PEERS=[]
CONNECT_TO_PEERS=false
```

- Start the `relay` with `yarn dev`
- Create a config file for the frontend under `frontend/.env.local` with `VITE_RELAY=http://localhost:8765/gun` (Because frontend and backend are not served over the same port, we need to specify the backend separately)
- Start the `frontend` also with `yarn dev`

You don’t need to start the relay itself. You can also use a hosted relay or don’t specify any relay. But if you don’t connect to a relay, then you will not be able to sync content between browsers.

## See Also

- [gun.eco](https://gun.eco/) - decentralised Database
- [Svelte in 100 Seconds](https://www.youtube.com/watch?v=rv3Yq-B8qp4) - video by Fireship
- [svelte Tutorial](https://svelte.dev/tutorial/basics/) - A very good start point for learning svelte
