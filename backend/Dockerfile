FROM node:18.9.0
WORKDIR /usr/src/app
ENV NODE_ENV=develop

COPY package.json .
RUN npm install

COPY main.js .
COPY .env .
COPY controllers/ ./controllers
COPY models/ ./models
COPY routes/ ./routes

ENTRYPOINT ["node", "main.js"]