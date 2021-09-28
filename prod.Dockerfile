FROM node:12 as ui-builder

COPY . /app
WORKDIR /app
RUN yarn && yarn build
