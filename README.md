# Beep Vue app + Legacy API

## Installation

### Prerequisites

- Install [Docker](https://www.docker.com/products/docker-desktop)

You **should not** run npm install. The container will do this for you upon
first run.

### First install

- cd dir (to directory where this repo is cloned/pulled)
- docker run -it --rm -v \$PWD:/var/app -w /var/app node:lts npm install
- docker-compose build --no-cache

### Running the container (after first install)

- docker-compose up

## Development

This repository is for the web app of Beep. In order to create a consistent
development experience we use
[Docker](https://github.com/beepnl/beep-ui/wiki/Docker).

As a development IDE we recommend Visual Studio Code. Settings for this project are defined in the .vscode folder.
If you need to install dependencies, **do not run npm install from your local machine**.
Instead run npm calls inside the container:

- docker-compose exec ui bash
- npm install

OR before running the container:

- docker run -it --rm -v \$PWD:/var/app -w /var/app node:lts npm install

### Running the app locally

To compile and run the server, run the dev task:

- Open Vue Project Manager on localhost:8000 -> import your directory, go to tasks -> dev -> run task

OR:

- go into the docker container from your repo directory:
- docker-compose exec ui bash
- npm run dev

- Open the app on localhost:8080

### Hot reload

To fix hot reload when running in a Docker container:
[Hot reload in docker](https://daten-und-bass.io/blog/enabling-hot-reloading-with-vuejs-and-vue-cli-in-docker/)

## Deployment

The production build of this UI is deployed to an AWS CloudFront CDN. Upon
committing to master, this UI is automatically queued for deployment.
