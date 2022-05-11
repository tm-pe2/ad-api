# ad-api

## Requirements

- [node](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Installation

```sh
npm install
```

Create a file `.env` in the project root:
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_PORT=
JWTSECRET=SomethingYouCanPickYourselfButSecure:)
```

Create a file `.env.test` in the project root:
```
Same as above, but point DB_DATABASE to a separate test database (copy of the real database).
```
## Running

```sh
npm run serve
```

## Testing
```
npm run test

npm run test invoice
```
Please add a test at the end of `src/__tests__/index.test.ts` when adding new routes, there are plenty of examples already in the file to go from.
Make sure describe() and it() are accurate
