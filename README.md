# self-code-challenge-deno

## Description

This is an API in [Deno Oak](https://deno.land/x/oak@v10.5.1) framework based on
the self code challenge described in this
[link](https://github.com/LCYAD/self-code-challenge)

## Prerequisite

- Things to install
  - [Deno](https://deno.land/manual/getting_started/installation)
  - Docker and docker-compose

## Setup Services

```bash
# To boot up the services
deno task ldev:services:up

# To close the services
deno task ldev:services:down
```

## Run the service on local

```bash
# With watch mode (like nodemon)
deno task start:dev
```

## Debugging (VSCode only)

- First, start the service by running (include bringing up the other services)

```bash
deno task start:inspect
```

- Afterward, launch the `Deno (Attach)` script in VSCode
