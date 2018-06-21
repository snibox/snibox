#!/bin/bash
docker-compose run --rm --no-deps backend ./bin/rake secret
