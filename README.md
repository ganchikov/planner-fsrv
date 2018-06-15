# planner-srv

> 

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/planner-srv; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).

##config node to use luxoft-root-ca

1.1) goto http://cert.luxoft.com, follow instructions to export luxoft-root-ca as Base64 to project folder
1.2) export NODE_EXTRA_CA_CERTS="<your cert file name>.CER"

##deploy to prod via openode
1.1) npm install -g openode
1.2) Edit ENV Variables, set NODE_ENV = production
1.3) openode deploy
1.4) openode sync

##to renew SSL certificate
1.1)https://zerossl.com/free-ssl/#crt.
1.2) provide email, domain name, set all checkboxes
1.3) add generated file into public/.well-known/acme-challenge
1.4) put generated cers in .sslcert and rename to domain-crt.cert and domain-key.key

##mongo hosting
cloud.mongodb.com

#CI
circleci.com
Project settings:
Build Environment -> Ubuntu 14.04
Environment Variables: 
    - OPENODE_SITE
    - OPENODE_SITE_CI
    - OPENODE_TOKEN
    - EMAIL
    - GIT_AUTHOR_NAME
    - GIT_COMMITTER_NAME    
    
    
[![AppVersion-version](https://img.shields.io/badge/AppVersion-0.1.0-brightgreen.svg?style=flat)](https://github.com/delvedor/appversion?#version)

[![CircleCI](https://circleci.com/gh/ganchikov/planner-fsrv.svg?style=svg)](https://circleci.com/gh/ganchikov/planner-fsrv)

