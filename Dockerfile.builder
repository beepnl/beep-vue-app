FROM node:12 as ui-builder

COPY . /app
WORKDIR /app
RUN npm install && npm run build
