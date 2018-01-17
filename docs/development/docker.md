# Setup dev environment using Docker

Build development image:
```
docker-compose -f docker-compose.yml -f docker-compose.development.yml build
```

Create database:
```
docker-compose -f docker-compose.yml -f docker-compose.development.yml run backend db:create
```

Run migrations:
```
docker-compose -f docker-compose.yml -f docker-compose.development.yml run backend db:migrate
```

Launch application at [http://localhost:3000](http://localhost:3000):
```
docker-compose -f docker-compose.yml -f docker-compose.development.yml up 
```

To launch webpack-dev-server:
```
docker-compose -f docker-compose.yml -f docker-compose.development.yml exec backend ./bin/webpack-dev-server 
``` 

To build production image:
```
docker build --build-arg rails_env=production -t <your-repository:tag> .
```
