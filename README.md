# self-code-challenge-deno

## Description

This is an API in [Deno Oak](https://deno.land/x/oak@v10.5.1) framework based on
the self code challenge described in this
[link](https://github.com/LCYAD/self-code-challenge)

## Prerequisite

- Things to install
  - [Deno](https://deno.land/manual/getting_started/installation)
  - docker-compose

## Setup Services

```bash
# To boot up the services
docker-compose -f docker-compose-ldev.yml up -d

# To close the services
docker-compose -f docker-compose-ldev.yml down
```

## Debugging (VSCode only)

- First, start the service by running

```bash
deno run --inspect-brk -A main.ts
```

- Afterward, launch the `Deno (Attach)` script in VSCode
