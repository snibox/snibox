# Setup dev environment on macOS

Install brew package manager [https://brew.sh/](https://brew.sh/).
Install needed packages: 
```
brew install rbenv ruby-build postgresql yarn
```
Install ruby 2.5.0:
```
rbenv install 2.5.0
```
Install bundler:
```
gem install bundler
```
Go to project root directory:
```
cd <path_to_project>
```
Set ruby local version to 2.5.0 if you have other global version:
```
rbenv local 2.5.0
```
or if you want 2.5.0 to be global:
```
rbenv global 2.5.0
```
Install dependencies:
```
bundle install
```
Install node packages:
```
yarn install --pure-lockfile
```
Compile frontend packs:
```
./bin/webpack
```
Create database: 
``` 
./bin/rake db:create
```
Run database migrations:
``` 
./bin/rake db:migrate
```
Launch development server
```
./bin/rails s
```

Visit http://localhost:3000/ to see the project.

To launch webpack-dev-sever:
```
./bin/webpack-dev-server
```

To setup development emails for 'reset password' feature: [setup development emails](https://github.com/vavgustov/snibox/blob/master/docs/development/dev_emails.md).
