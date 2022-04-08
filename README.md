# ad-api

## Requirements

- [node](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Installation

```sh
npm install
```

Create `.env` file in root with content:

you have to be connected to the vpn

```md
# .env

## this is your vpn user login + mail password
MAILSERVER_U=""
MAILSERVER_P=""
```

## Running

```sh
npm run serve
```

## Testing
Please add a test at the end of `src/__tests__/index.test.ts` when adding new routes, there are plenty of examples already in the file to go from.
Make sure describe() and it() are accurate
