source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.5.0'

gem 'rails', '~> 5.1.5'
gem 'pg', '~> 1.0'
gem 'puma', '~> 3.11'

# api
gem 'active_model_serializers', '~> 0.10.7'

# assets: tools
gem 'uglifier', '~> 3.2'
gem 'webpacker', '~> 3.3'

# authentification
gem 'devise', '~> 4.3'

# tags
gem 'acts-as-taggable-on', '~> 5.0'

# performance
gem 'bootsnap', require: false

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

  # data
  gem 'factory_bot_rails', '~> 4.8'
  gem 'faker', '~> 1.7', '>= 1.7.3'

  # testing
  gem 'capybara', '~> 2.16', '>= 2.16.1'
  gem 'capybara-selenium', '~> 0.0.6'
  gem 'rspec-rails', '~> 3.5'

  # speed up tests
  gem 'spring-commands-rspec'
end

group :test do
  gem 'rails-controller-testing', '~> 1.0', '>= 1.0.1'
  gem 'shoulda-matchers', '~> 3.1', '>= 3.1.1'
  # stats
  gem 'simplecov', '~> 0.14.1', require: false
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
