# Nutritious Tools

## Requirements

- Docker
- node 20
- yarn 1.22.19
- npm 10.2.0

## Install git hooks in root

- `yarn`

## Server setup

- `cd server`
- `cp config.json.example config.json`
- `yarn` or `npm i`

## Client setup

- `cd client`
- `cp .env.example .env`
- `yarn` or `npm i`

## Docker build and run

- `docker-compose up --build`
- You can use just `docker-compose up` once you have the container services built.

## Seeding data

- `cd server`
- `yarn docker:seed:latest` if your are seeding for the first time or if you want to update the data. `yarn docker:seed` otherwise.

## Prune database

- `cd server`
- `yarn docker:prune-db` Use this command for removing instance data if required. It will remove resources collection allong with healthProfessionals. Command will fail if the database is not populated. 

## Testing the server code

- `cd server`
- `yarn docker:test`

## Testing the client code

- `cd client`
- `yarn test:e2e`

## Prior to create a pull request

- `yarn review` in the root directory
- You can also run review independently for client and server: `cd server && yarn review` or `cd client && yarn review`

## Troubleshoot failing jest tests (server)

- If a unit test fails, you can run a specific test file using the command below (cd to server first)
- `yarn docker:test-file ./src/test/<test_file_name>`

## Troubleshoot failing E2E tests (client)

- If an E2E test fails, it could be flakyness. You can run a specific cypress file using the command below (cd to client first)
- `yarn cypress run --config specPattern=cypress/integration/<path_to_file> silent=false --headed --no-exit`

