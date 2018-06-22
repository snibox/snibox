#!/bin/bash
cp .env.production.sample .env
docker-compose pull
docker-compose run --rm backend ./bin/rake db:create
docker-compose run --rm backend ./bin/rake db:migrate
docker-compose run --rm backend ./bin/rake assets:precompile
