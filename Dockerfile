FROM node:14.17.5 as ui-dev

WORKDIR /app

RUN npm install -g @vue/cli
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 8000
EXPOSE 8080

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["vue", "ui", "--host",  "0.0.0.0", "--headless"]

FROM node:14.17.5 as ui-builder

COPY . /app
WORKDIR /app
RUN npm install -g npm@6.14.14 && npm run build
