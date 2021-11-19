# BEEP Vue app + Legacy API

# Installation
## Installation without Docker

- Install NodeJs and NPM
- npm ci
- npm run build
- serve /dist folder


## Installation with Docker

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

# Development

This repository is for the web app of BEEP. In order to create a consistent
development experience we use
[Docker](https://github.com/beepnl/beep-ui/wiki/Docker).

As a development IDE we recommend Visual Studio Code. Settings for this project are defined in the .vscode folder.
If you need to install dependencies, **do not run npm install from your local machine**.
Instead run npm calls inside the container:

- docker-compose exec ui bash
- npm install

OR before running the container:

- docker run -it --rm -v \$PWD:/var/app -w /var/app node:lts npm install

## Running the app locally

To compile and run the server, run the dev task:

- Open Vue Project Manager on localhost:8000 -> import your directory, go to tasks -> dev -> run task

OR:

- go into the docker container from your repo directory:
- docker-compose exec ui bash
- npm run dev

- Open the app on localhost:8080

## Hot reload

To fix hot reload when running in a Docker container:
[Hot reload in docker](https://daten-und-bass.io/blog/enabling-hot-reloading-with-vuejs-and-vue-cli-in-docker/)

# Deployment

Upon committing to master, this UI is automatically queued for deployment.

# Self hosting

- Generate your own google maps Api key via the google cloud platform
- Either: update the .env.production file using .env.production.example as a template. Add your google maps key to the .env.production file as VUE_APP_GOOGLE_MAPS_KEY (N.B. do not expose this env file / the api key in a public repo)
- OR: add an .env file to your server and list all the non-fallback env vars from .env.production.example (including your VUE_APP_GOOGLE_MAPS_KEY) there.
- npm run build (N.B. if you use a server .env file (see above), this command must be run on the server)
- deploy dist directory on your server
