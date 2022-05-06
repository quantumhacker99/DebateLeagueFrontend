FROM node:alpine as builder
COPY ./package.json ./
RUN npm install
COPY ./build ./
WORKDIR ./
CMD ["npm", "install", "-g", "serve"]
CMD ["serve", "-s","build"]
