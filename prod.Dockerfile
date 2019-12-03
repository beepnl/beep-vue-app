FROM node:12 as ui-builder

ARG VUE_APP_USER_POOL_ID
ARG VUE_APP_CLIENT_ID
ARG VUE_APP_REGION

COPY . /app
WORKDIR /app
RUN npm install && npm run build
