FROM node:20-alpine

# Creating a temporary folder so we can build our node_modules

WORKDIR /home/node/app
RUN npm install -g npm@10.2.0

ADD package*.json /home/node/app/
RUN npm i
RUN apk update
RUN apk add --no-cache openssh-client

ENV PATH=/home/node/app/node_modules/.bin:$PATH

ADD . .
ENTRYPOINT npm run watch