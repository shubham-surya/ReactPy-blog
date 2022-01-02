FROM node:14.18-slim

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install --force

WORKDIR /user/src/app

COPY . .

EXPOSE 3000

CMD ["npm", "start"]