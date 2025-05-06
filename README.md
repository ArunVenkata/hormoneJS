# HormoneJS

A Django-like framework built on top of Express JS.

The aim is to provide a similar development experience to Django, to make it easy for developers to transition from Django to JS.


> [!IMPORTANT]\
> This project is NOT FOR PRODUCTION USE (yet) and is ENTIRELY EXPERIMENTAL.
>

## Overview

hormoneJS is built to bring structure and scalability to Express.js projects by taking inspiration from Django’s powerful patterns and the Django REST Framework. It automates command discovery, dynamic route registration, middleware management, and ORM (Sequelize) integration—allowing developers to focus on building robust APIs with clarity and speed.

## Features

- **Dynamic Configuration Management**
  Uses a centralized configuration system to manage settings and environment variables. Default settings are easily configured via `example/settings.js`.

- **CLI Command Discovery and Execution**  
  Commands are automatically discovered from designated `_commands` directories (in both [src/management/_commands/](src/management/_commands/) and [example/_commands/](example/_commands/)). New commands can be created using provided templates ([`src/conf/newcmd.js-tpl`](src/conf/newcmd.js-tpl)) and are executed with a consistent interface via [yargs](https://yargs.js.org/).

- **Dynamic Route Registration**  
  The project leverages a URL abstraction ([`src/url_base.js`](src/url_base.js)) for route registration. Routes can be defined either as standalone in the main project or as part of larger apps registered through [apps-helper.js](src/apps-helper.js).

- **Middleware Management**  
  Middlewares are dynamically imported and registered ([`src/middleware_reader.js`](src/middleware_reader.js)), ensuring easy integration and modification without changing core server code.

- **App Structure Inspired by Django**  
  Projects can have modular apps (defining views and URLs) similar to Django’s app organization. For example, [example/testapp/urls.js](example/testapp/urls.js) and [example/testapp/views.js](example/testapp/views.js) illustrate how API views and URL configurations are set up.

- **Sequelize ORM Integration**  
  Out-of-the-box support for Sequelize ([`src/sequelize_loader.js`](src/sequelize_loader.js)) allows smooth ORM integration and database management.

- **API Wrapper and Permission Checking**  
  API requests are wrapped with common logic using the [`APIWrapper`](src/pre_register.js) function, which handles method dispatch and permission validation, streamlining authentication and error handling.


Notes: 


For Sequelize ORM, The Developer will have to run `npx sequelize-cli init` in their project


## Instructions

- Clone the project via `git clone <url> && cd hormoneJS`
- run `npx hormone runserver`
