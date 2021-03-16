# Purpose
This script helps to import a huge amount of redirects into a Shopify shop. It gives more control over the process than the default import from Shopify's UI.

## Prerequisites

* Put redirects into redirects.json
* Create .env file based on .env.example

## Configuration (.env)

* SHOP - domain of target shop
* ACCESS_TOKEN - can be obtained using [this guide](https://shopify.dev/tutorials/authenticate-a-private-app-with-shopify-admin#generate-credentials-from-the-shopify-admin)
* UPDATE_EXISTING_REDIRECTS - update existing redirect if its path matches a path from the redirects.json

## Launch locally
* Install dependencies ```yarn install```
* Launch the script ```yarn start```

## Launch locally in docker
* ```sudo docker build -t shopify-redirects-importer .```
* ```sudo docker run shopify-redirects-importer:latest```
