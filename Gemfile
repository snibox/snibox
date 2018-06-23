source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.2.0'
gem 'pg', '~> 1.0'
gem 'puma', '~> 3.11'

gem 'active_model_serializers', '~> 0.10.7'
gem 'bootsnap', '~> 1.3', require: false
gem 'counter_culture', '~> 1.12'
gem 'devise', '~> 4.3'
gem 'uglifier', '~> 3.2'
gem 'webpacker', git: 'https://github.com/rails/webpacker.git'

group :development do
  gem 'awesome_print', '~> 1.8'
  gem 'better_errors', '~> 2.4'
  gem 'binding_of_caller', '~> 0.8.0'
  gem 'debug-extras'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'pry-rails'
  gem 'web-console', '>= 3.3.0'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :development, :test do
  gem 'dotenv-rails', '~> 2.2', '>= 2.2.1'
  gem 'factory_bot_rails', '~> 4.8'
  gem 'faker', '~> 1.7', '>= 1.7.3'
  gem 'rspec-rails', '~> 3.7'
end

group :test do
  gem 'database_cleaner', '~> 1.7'
  gem 'capybara', '~> 3.1'
  gem 'selenium-webdriver', '~> 3.12'
  gem 'chromedriver-helper', '~> 1.2'
  gem 'rails-controller-testing', '~> 1.0', '>= 1.0.1'
  gem 'shoulda-matchers', '~> 3.1', '>= 3.1.1'
  gem 'simplecov', '~> 0.14.1', require: false
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
