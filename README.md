# Beep UI

## Installation

### Prerequisites

- Install and configure the [AWS
- CLI](<https://docs.aws.amazon.com/cli/latest/userguide/install-bundle.html#install-bundle-other)>
- Install [Docker](https://www.docker.com/products/docker-desktop)
- Install the AWS ECR [credential helper](https://github.com/awslabs/amazon-ecr-credential-helper)

You **should not** run npm install. The container will do this for you upon
first run.

### Running the container

```sh
docker-compose up
```

## Development

This repository is for the web app of Beep. In order to create a consistent
development experience we use
[Docker](https://github.com/beepnl/beep-ui/wiki/Docker).

As a development IDE we recommend Visual Studio Code. Settings for this project are defined in the .vscode folder.
If you need to install dependencies, **do not run npm install from your local machine**.
Instead run it inside the container:

```sh
docker-compose exec npm install
```

As a rule, any call you would normally make to npm, you should prepend with `docker-compose exec ui`. This way the command is run inside the container.

### Running the app locally

To compile and run the server, run

```sh
docker-compose exec npm run dev
```

### Hot reload

To fix hot reload when running in a Docker container:
[Hot reload in docker](https://daten-und-bass.io/blog/enabling-hot-reloading-with-vuejs-and-vue-cli-in-docker/)

## Deployment

The production build of this UI is deployed to an AWS CloudFront CDN. Upon
committing to master, this UI is automatically queued for deployment.
