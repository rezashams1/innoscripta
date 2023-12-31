# copy to tmp folder and install composer packages
FROM composer as composerbuilder
WORKDIR /usr/src/app
COPY . .
RUN composer install

# php
FROM php:8.2-fpm

# set main params
ENV APP_HOME /var/www/html
ENV USERNAME=www-data

# install all the dependencies and enable PHP modules
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
      procps \
      nano \
      git \
      unzip \
      libicu-dev \
      zlib1g-dev \
      libxml2 \
      libxml2-dev \
      libreadline-dev \
      supervisor \
      cron \
      sudo \
      libzip-dev \
    && docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
    && docker-php-ext-configure intl \
    && docker-php-ext-install \
      pdo_mysql \
      sockets \
      intl \
      opcache \
      zip \
    && rm -rf /tmp/* \
    && rm -rf /var/list/apt/* \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# create document root, fix permissions for www-data user and change owner to www-data
RUN mkdir -p $APP_HOME/public && \
    mkdir -p /home/$USERNAME && chown $USERNAME:$USERNAME /home/$USERNAME \
    && usermod -o -u 1000 $USERNAME -d /home/$USERNAME \
    && groupmod -o -g 1000 $USERNAME \
    && chown -R ${USERNAME}:${USERNAME} $APP_HOME

# put php config for Laravel
COPY ./docker/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY ./docker/php.ini /usr/local/etc/php/php.ini

# install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN chmod +x /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER 1

# add supervisor
RUN mkdir -p /var/log/supervisor
COPY --chown=root:root ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY --chown=root:crontab ./docker/cron /var/spool/cron/crontabs/root
RUN chmod 0600 /var/spool/cron/crontabs/root

# set working directory
WORKDIR $APP_HOME

USER ${USERNAME}

# copy source files and config file
COPY --chown=${USERNAME}:${USERNAME} . $APP_HOME/
COPY --chown=${USERNAME}:${USERNAME} .env.example $APP_HOME/.env
COPY --from=composerbuilder /usr/src/app/vendor $APP_HOME/vendor

USER root
