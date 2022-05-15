FROM node:alpine as builder
COPY ./package.json ./
RUN npm install
RUN npm install react-grid-system
COPY ./ ./
RUN npm i
CMD ["npm", "start"]
