#!/bin/bash

set -e
cmd="$@"

until mysql -u $DB_USERNAME --port $DB_PORT -h $DB_HOST -p$DB_PASSWORD -D $DB_DATABASE -e 'exit' ; do
  echo "$DB_HOST is unavailable - sleeping" >&2
  sleep 10
done

echo "$DB_HOST is up" >&2
exec $cmd

npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate

npx sequelize-cli db:seed:undo:all
# npx sequelize-cli db:seed:all
npx sequelize-cli db:seed --seed 20240701145837-textbook-data.js

npm start