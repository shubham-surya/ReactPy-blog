FROM node:14.18-slim

WORKDIR /user/src/app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install 

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]