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
sleep 1

PGPASSWORD=${1} psql -U postgres -h localhost -p 5432 postgres << EOF
    create table products(
        product_name varchar(30),
        category_name varchar(30),
        price decimal(10, 2),
        in_stock boolean default false
    );

    insert into products (product_name, category_name, price, in_stock)
    values 
        ('Tomato', 'Vegetable', 0.80, true),
        ('Pepper', 'Vegetable', 0.60, false),
        ('Mushroom', 'Vegetable', 0.90, true),
        ('Rice', 'Grain', 1.20, true),
        ('Pasta', 'Grain', 1.40, false),
        ('Apple', 'Fruit', 0.50, false),
        ('Banana', 'Fruit', 0.70, true),
        ('Pear', 'Fruit', 0.60, true)
        ;
EOF
