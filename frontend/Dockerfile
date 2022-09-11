FROM node:18.9.0
WORKDIR /usr/src/app
ENV NODE_ENV=develop

COPY package.json .

RUN npm install

COPY .env .
COPY src ./src
COPY public ./public

ENTRYPOINT [ "npm", "run", "start" ]