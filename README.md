# Beep UI

## Installation

### Prerequisites

* Install docker
* Install npm

```
npm install
docker-compose up
```

## Development

This repository is for the web app of Beep. In order to create a consistent development experience we use [Docker](https://github.com/beepnl/beep-ui/wiki/Docker).

As a development IDE we recommend WebStorm. Before jumping in, make sure to [configure your IDE](https://github.com/beepnl/beep-ui/wiki/Webstorm-Settings).

## Deployment

The production build of this UI is deployed to an AWS CloudFront CDN. Upon committing to master, this UI is automatically queued for deployment.
