FROM node:latest as ui-dev

WORKDIR /app

RUN npm install -g @vue/cli
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 8000
EXPOSE 8080

CMD ["vue", "ui", "--host",  "0.0.0.0", "--headless"]
