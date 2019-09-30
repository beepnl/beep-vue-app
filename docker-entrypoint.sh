#!/bin/sh
set -e

if [ "$1" = 'vue' ]; then
  # Always try to install dependencies
  npm install
fi

exec "$@"
