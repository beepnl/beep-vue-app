#!/bin/sh
set -e

if [ "$1" = 'vue' ]; then
  yarn
fi

exec "$@"
