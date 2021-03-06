# Minimal Node auth server

This is projects attempt to create lean auth server with NodeJS. This is a proof of concept. The idea is that lightweight auth server is an fast server.
General approach is as follows:

- use polka node server as very small and fast web server
- use @zeit/ncc to compile typescript files into one file bundle and avoid use of node_modules (which generally grows big very fast)
- use Docker alpine container with node installation to run compiled NodeJS auth service (~50MB)
- use Docker alpine container to run PostgreSQL database (~160MB)
- use nginx as reverse proxy server, currently on port 8080 (~20MB). We will explore possiblity for enabling SSL in nginx.

## Usage

If you want to use this auth api server you can easily run it with docker-compose in the root of the project

```bash
# start auth service on localhost:8080
docker-compose up -d

# stop service
docker-compose stop

```

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

## Docker

Build the auth api container. The images used for postgres and nginx are alpine images. The configuration for these images is mounted through volumes. Postgres user data is saved in docker volume. See docker-compose.yml for exact name and location.

```bash
# build docker image manually
# this is also handles in docker-compose
docker build . -t dv4all/auth:v0.1

docker run -p 5433:5433 dv4all/auth:v0.1

```

### Environment variables

The environment variables are approached by using default `.env` file. This is default file and is loaded by docker-compose automatically. This file needs to use default environment variables like TAG. [See this page](https://docs.docker.com/compose/environment-variables/#/the-envfile-configuration-option).

In Postgres image I use custom environment file to load environment variables into a container. See docker-compose env_file for more details.

NOTE! The default .env file loads environment variables into docker-compose file while env_file in the docker-compose.yml file loads these into a container.

### Dockerfile NodeJS app

To achieve minimal size of the node app image we use two stage build. First we use v12-alpine image to build node app. Then we use alpine image where we install node only and copy compiled app.

When using alpine image, we need to install node. To keep it minimal I install only node and not npm. Using this approach we need to implement termination listeners.

```javascript
// listen to container/process stop
// and stop polka server
process.on("SIGINT",()=>{
  // console.info("Closing node server on SIGINT")
  logInfo("Closing polka server on SIGINT")
  process.exit(0)
})

process.on("SIGTERM",()=>{
  // console.info("Closing node server on SIGTERM")
  logInfo("Closing polka server on SIGTERM")
  process.exit(0)
})
```

## NGINX proxy

The app use nginx as reverse proxy and for later we will try to implement SSL.
`I was not able to implement working SSL. Further investigation is needed.`

### Reverse proxy

See nginx_proxy default.conf file for example implementation. Generally, we use `proxy_pass` command to send data to `auth` container. Initial port used is 5433 but check nginx configuration file, src/auth.config.json and Dockerfile for communication port. It is important that used portnumber (initialy 5433) is same in all these files. The current setup can be improved by creating env variable to be used in all these files.

### NodeJS logging

It seems adviced to log warnings info and messages from node app using stdout and stderr when in Docker container. I created logInfo and logError utilities methods.

For more info about logging I used [this article](https://medium.com/better-programming/docker-for-node-js-in-production-b9dc0e9e48e0).

```javascript
import process from 'process'

export function logInfo(message:string){
  process.stdout.write(message)
}

export function logError(message:string){
  process.stderr.write(message)
}

```

## Testing

To test I used [Jest](https://jestjs.io/docs/en/getting-started) and [Supertest](https://www.npmjs.com/package/supertest).

```bash
## install dependencies
npm i -D jest @types/jest ts-jest supertest @types/supertest
```

For testing typescript file with Jest there is [additional plugin ts-jest](https://kulshekhar.github.io/ts-jest/user/install).

```bash
# create jest config file for ts-jest
npx ts-jest config:init
```

I have created tests for most important functions in the util folder using Jest and ts-jest. This approach seem to work quite well. The tests are automatically runned when new Docker container is created.

When using supertest with Polka there is a slight difference in approach compared to express. Initially I had error when trying to test. Then I found instructions on the Polka github how to [instantiate supertest with polka server properly](https://github.com/lukeed/polka).

Here is the gist of it but all code is api.test.ts

```javascript
// For Polka pass the handler instead of polka instance
req = supertest(api.handler)

```
