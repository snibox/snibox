# Deploy

1. Copy .env.production.sample to .env
```
cp .env.production.sample .env
```

2. Generate secret key:
``` 
docker-compose -f docker-compose.yml -f docker-compose.production.yml run backend rake secret
```
Note: docker may need some time to download images at first launch. 

3. Add generated key to .env file as SECRET_KEY_BASE value. Should be something like this:
```
SECRET_KEY_BASE=cf10c88a4a69e6b043fc61e854cce834d92ccf6f78556b93b0a7962db6ab36dc9d13dc46fc741a3449c5ea28e0884d3b29b7b21fddca51dd6999e33846c44243
```

4. Create database:
``` 
docker-compose -f docker-compose.yml -f docker-compose.production.yml run backend rake db:create
```

5. Run migrations:
``` 
docker-compose -f docker-compose.yml -f docker-compose.production.yml run backend rake db:migrate
```

6. Launch project at http://localhost:
```
docker-compose -f docker-compose.yml -f docker-compose.production.yml up
```

 