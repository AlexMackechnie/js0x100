#!/bin/bash

if [[ $# -ne 1 ]]; then
    echo "Usage: ./setup.sh <postgres-pass>"
    exit
fi

CONTAINER_NAME=product_shop

# Kill any running containers with this name
docker ps -a --filter name=${CONTAINER_NAME} --format "{{.ID}}" | xargs -r docker stop | xargs -r docker rm

# Run postgres in docker
docker run --name ${CONTAINER_NAME} -e POSTGRES_PASSWORD=${1} -p 5432:5432 -d postgres


