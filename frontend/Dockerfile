FROM node:14.18-slim

COPY ./package.json ./

COPY ./package-lock.json ./

WORKDIR /user/src/app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]