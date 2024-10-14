
FROM node:16-alpine3.16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY . /usr/src/app
RUN npm i
ENV PORT 3000
EXPOSE 3000

CMD [ "npm", "start" ]