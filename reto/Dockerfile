FROM node:alpine

COPY .env .env

WORKDIR /usr/app

COPY package.json .
RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

CMD ["npm", "start"]