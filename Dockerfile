FROM node:alpine as builder
COPY ./package.json ./
RUN npm install
RUN npm install react-grid-system
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "start"]
