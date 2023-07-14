FROM node:19.8.1-alpine3.16

WORKDIR /app
COPY package.json .
RUN npm install
COPY app.js .
CMD ["npm", "start"]