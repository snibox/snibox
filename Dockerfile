FROM ruby:2.5-alpine

RUN apk -U upgrade \
  && apk add -t build-dependencies \
    build-base \
    postgresql-dev \
  && apk add \
    tzdata \
    nodejs \
    yarn \
  && rm -rf /tmp/* \
  && rm -rf /var/cache/apk/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./

ENV RAILS_ENV production
ENV RACK_ENV production

RUN gem install bundler && bundle install --without development test

COPY . ./

RUN ./bin/yarn --pure-lockfile && ./bin/yarn cache clean
