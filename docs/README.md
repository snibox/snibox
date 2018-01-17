![logo_github_h40](https://user-images.githubusercontent.com/312873/35063615-acf68302-fbd8-11e7-91c5-0b3b6f5966c4.png)
=

## Documentation

Deployment and development instructions for various platforms.

### [Deployment](https://github.com/vavgustov/snibox/blob/master/docs/deployment)
* [Docker](https://github.com/vavgustov/snibox/blob/master/docs/deployment/docker.md)
* [Heroku](https://github.com/vavgustov/snibox/blob/master/docs/deployment/heroku.md)
* [Ubuntu](https://github.com/vavgustov/snibox/blob/master/docs/deployment/ubuntu.md)

### [Development](https://github.com/vavgustov/snibox/blob/master/docs/development)
> Note: Snibox works fast on both development and production environments. If you have 
performance issues in development mode then you should launch webpack-dev-server to serve 
javascript packs instead of default compiling on each page request. Also this server 
will listen to assets changes and automatically reload page. After that Snibox should 
serve pages less than 100ms in development mode. Instructions about webpacker-dev-server 
available on each guide.  
* [Docker](https://github.com/vavgustov/snibox/blob/master/docs/development/docker.md)
* [macOS](https://github.com/vavgustov/snibox/blob/master/docs/development/macos.md)
* [Ubuntu](https://github.com/vavgustov/snibox/blob/master/docs/development/docker.md)
* [Vagrant](https://github.com/vavgustov/snibox/blob/master/docs/development/vagrant.md)