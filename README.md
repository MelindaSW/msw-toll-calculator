# Toll fee calculator REST api

A calculator for vehicle toll fees.

### Technologies and frameworks used

- Node.js
- Express.js
- Typescript
- Jest
- Swagger

### Run this project locally:

#### Prerequisites: [Node](https://nodejs.org/en)

Install: `npm install`

Run project: `npm run dev`

Run tests: `npm test`

#### API documentation:

Swagger UI http://localhost:8080/api-docs/#/

### Notes and TODO's:

I used the npm package date-holidays for the holidays validation (with added check for month of July).

One of the time ranges overlapped with one rush hour time range in the original code. I made the assumption that the afternoon rush hour started at 15:30 instead of 15:00. Would need to verify that the time ranges are correct.

Performed some manual tests via Swagger UI on the api. Given a bit more time, I'd add end to end tests to validate the endpoint.
