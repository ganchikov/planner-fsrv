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

##config node to use root-ca

1.1) download root ca, follow instructions to export as Base64 to project folder
1.2) export NODE_EXTRA_CA_CERTS="<your cert file name>.CER"
1.3) add "env" setting in launch.json config to debug: 
    "env": {
                "NODE_EXTRA_CA_CERTS": "xxx.cer"
            } 

##config npm to use certificate
1) go to the url failing to get by npm (e.g.  https://registry.npmjs.org/)
2) via chrome dev tools: security -> View Certificate -> Export root certificate (DER)
3) run openssl x509 -inform dev -in <exported cert.cer> -out <cert.pem>
4) npm config set cafile <cert.pem>

##Heroku
1.1) install cli
1.2) export NODE_EXTRA_CA_CERTS="<path to your root cert>.cer"
1.3) using Git Bash: winpty heroku login
1.4) add HOME environment variable set to %USERPROFILE% (required to run git config commands)
1.4) git config --system http.sslCAPath <path to your Luxoft cert>.cer


##to renew SSL certificate
1.1)https://zerossl.com/free-ssl/#crt.
1.2) provide email, domain name, set all checkboxes
1.3) add generated file into public/.well-known/acme-challenge
1.4) put generated cers in .sslcert and rename to domain-crt.cert and domain-key.key

##mongo hosting
cloud.mongodb.com

#CI
circleci.com

1. Project settings:
Build Environment -> Ubuntu 14.04

2. Environment Variables: 
    - OPENODE_SITE
    - OPENODE_SITE_CI
    - OPENODE_TOKEN
    - EMAIL
    - GIT_AUTHOR_NAME
    - GIT_COMMITTER_NAME    

3. Add user key to GH/CC using this article (Creating a GitHub User Key):

1) Create an SSH key pair by following the GitHub instructions: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
When prompted to enter a passphrase, do not enter one.

2) Go to https://github.com/you/test-repo/settings/keys, and click “Add deploy key”. Enter a title in the “Title” field, then copy and paste the key you created in step 1. Check “Allow write access”, then click “Add key”.

3) Go to https://circleci.com/gh/you/test-repo/edit#ssh, and add the key you created in step 1. In the “Hostname” field, enter “github.com”, and press the submit button.

4) In your config.yml, add the fingerprint using the add_ssh_keys key:
version: 2
jobs:
  deploy-job:
    steps:
      - add_ssh_keys:
          fingerprints:
            - "SO:ME:FIN:G:ER:PR:IN:T"

##Misc

VS Code plugins:
- ESLint
- Path Intellisense


    
[![AppVersion-version](https://img.shields.io/badge/AppVersion-1.0.0-brightgreen.svg?style=flat)](https://github.com/delvedor/appversion?#version)

[![CircleCI](https://circleci.com/gh/ganchikov/planner-fsrv.svg?style=svg)](https://circleci.com/gh/ganchikov/planner-fsrv)


