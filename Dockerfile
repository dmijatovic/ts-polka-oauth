FROM node:12-alpine3.12 as build

WORKDIR /home/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM alpine:3.12

WORKDIR /home/auth

RUN apk add --no-cache nodejs

COPY --from=build /home/app/auth .

EXPOSE 5433
EXPOSE 5432

CMD ["node","index.js"]



