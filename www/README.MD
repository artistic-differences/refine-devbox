# Overview

## Tech stack

- Refine.js
- NextAuth.js
- Next.js
- db.json JsonServer to bootstrap and protype quickly
- Hasura

## Getting Started

```docker-compose up -d``` to launch hasura and postgres db

```json-server --watch db.json --port 3001``` to launch development db

## Project Details

JWT integration and authentication is done from within
- www/pages/api/auth/[...nextauth].ts

Hasura specific claims are added after authentication (3rd party or local). 
Local credentials mock up has been added here. JWT token is signed by a secret this should
be in a .env file and the same secret should be used in the hasura docker-compose .env setup
so that hasura can validate the token.

Encoded token is also added to the session object so that it can be added to the hasura client headers
this is done in 
- www/src/utils/hasuraClients



