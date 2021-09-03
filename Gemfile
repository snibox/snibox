source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '>= 2.5.0', '< 2.7.0'

gem 'rails', '~> 5.2', '>= 5.2.3'
gem 'pg', '~> 1.1', '>= 1.1.4'
gem 'puma', '~> 3.12'

gem 'active_model_serializers', '~> 0.10.8'
gem 'bootsnap', '~> 1.3', require: false
gem 'counter_culture', '~> 1.12'
gem 'devise', '~> 4.5'
gem 'dotenv-rails', '~> 2.6'
gem 'uglifier', '~> 4.1'
gem 'webpacker', '~> 4.0'

group :development do
  gem 'awesome_print', '~> 1.8'
  gem 'better_errors', '~> 2.4'
  gem 'binding_of_caller', '~> 0.8.0'
  gem 'debug-extras'
  gem 'listen', '~> 3.1'
  gem 'pry-rails'

  gem 'web-console', '~> 3.7'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0'
end

group :development, :test do
  gem 'factory_bot_rails', '~> 4.11'
  gem 'faker', '~> 1.9'
  gem 'rspec-rails', '~> 3.8'
end

group :test do
  gem 'database_cleaner', '~> 1.7'
  gem 'capybara', '~> 3.15'
  gem 'selenium-webdriver', '~> 3.13'
  gem 'rails-controller-testing', '~> 1.0'
  gem 'shoulda-matchers', '~> 3.1'
  gem 'simplecov', '~> 0.14.1', require: false
  gem 'webdrivers', '~> 4.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
