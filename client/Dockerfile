FROM node:20

WORKDIR /home/node/app
RUN npm install -g npm@10.2.0

ADD package*.json /home/node/app/
RUN npm install
RUN apt-get update
RUN apt-get install -y rsync git curl x11-apps x11-utils libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
ENV PATH=/home/node/app/node_modules/.bin:$PATH

ADD . .

RUN mkdir node_modules/.cache

RUN chown node:node node_modules/.cache

RUN chown node:node src

USER node


RUN cypress install
ENTRYPOINT npm run start