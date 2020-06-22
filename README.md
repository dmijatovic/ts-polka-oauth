# Minimal Node auth server

This is projects attempt to create an lean auth server using NodeJS. This is a proof of concept. The idea is that lightweight auth server is an fast server.
General approach is as follows:

- use polka node server as very small and fast web server
- use @zeit/ncc to compile typescript files into one file bindle
- use Docker alpine container with node installation to run NodeJS auth service (~50MB)
- use Docker alpine container to run PostgreSQL database (~160MB)

## Dependencies

If you cloned this project you can simple do npm install. But if you want to replicate use description below

```bash
# install dependencies
npm i -s polka body-parser jsonwebtoken bcrypt pg

# install dev dependencies
npm i -D typescript ts-node nodemon @zeit/ncc

# install types (also dev dependencies)
npm i -D @types/node @types/polka @types/jsonwebtoken @types/bcrypt @types/pg

```
