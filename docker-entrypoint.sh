#!/bin/sh
set -e

if [ "$1" = 'vue' ]; then
  npm install
fi

exec "$@"
