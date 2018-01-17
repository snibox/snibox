1. Build development image:
```
docker-compose -f docker-compose.yml -f docker-compose.development.yml build
```

2. Create database:

3. Run migrations:

4. Launch application at http://localhost:3000:
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
