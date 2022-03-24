# ad-api

## Requirements

- [node](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Installation

```sh
npm install
```

Create `.env` file in root with content:

get the MAILSERVICE credentials at [ethereal](https://ethereal.email) (this is used to test sending mails)

```md
MAILSERVICE_USER=""
MAILSERVICE_PASS=""
```

## Running

```sh
npm run serve
```

## Testing
Please add a test at the end of `src/__tests__/index.test.ts` when adding new routes, there are plenty of examples already in the file to go from.
Make sure describe() and it() are accurate
