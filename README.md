# CherrySwap

## Installation

```shell
yarn
```

## Running

```shell
yarn run dev
```

## Continuous Integration

Workflow:

1. Create new branch from `develop` branch
2. Make changes
3. Push branch with changes to github & merge pull request into develop
4. After github action is complete, test changes on https://dev.cherryblossomswap.com/
5. Merge `develop` branch to `master`
6. After github action is complete, verify that everything is ok at https://cherryblossomswap.com/

### Staging

This repository is set up with continuous integration using GitHub Actions. When code is pushed to the `develop` branch or merged into `develop` via a pull request, a GitHub Action is triggered to deploy the code to the staging environment at https://dev.cherryblossomswap.com/.

### Production

When code is pushed to the `master` branch or merged into `master` via a pull request, a GitHub Action is triggered to deploy the code to the production environment at https://cherryblossomswap.com/.

### Github secrets required

These secrets already has the correct values, so you don't need to set them up. However, if you will need to change them, here the description of each:

1. CHANGE_NOW_API_KEY: This secret is used to authenticate the application with the ChangeNow API. It is passed as a build argument when building the Docker image.
2. CHANGE_NOW_API_URL: This secret is used to specify the URL of the ChangeNow API. It is passed as a build argument when building the Docker image.
3. CHANGE_NOW_EXCHANGE_STATUS_API: This secret is used to specify the URL of the ChangeNow exchange status API. It is passed as a build argument when building the Docker image.
4. NEXT_PUBLIC_CONTENT_API_URL: This secret is used to specify the URL of the Next Public Content API. It is passed as a build argument when building the Docker image.
5. SERVER_HOST: This secret is used to specify the hostname or IP address of the server where the application will be deployed.
6. SERVER_USERNAME: This secret is used to specify the username of the account on the server that will be used to connect via SSH.
7. SSH_PRIVATE_KEY: This secret is used to authenticate the connection to the server via SSH. It is the private key that corresponds to the public key that has been added to the authorized keys file on the server.
