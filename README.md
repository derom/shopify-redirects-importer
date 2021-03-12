This script helps to import a huge amount of redirects into a Shopify shop.

# Prerequisites

* Put redirects into redirects.json
* Create .env file based on .env.example

# Configuration

* SHOP - host of target shop
* ACCESS_TOKEN - can be obtained using this guide https://shopify.dev/tutorials/authenticate-a-private-app-with-shopify-admin#generate-credentials-from-the-shopify-admin
* OVERRIDE_EXISTING_REDIRECTS - override existing redirect if its path matches a path from the redirects.json

# Launch locally
* Install dependencies ```yarn install```
* Launch the script ```yarn start ```

# Launch locally in docker
* ```sudo docker build -t shopify-redirects-importer .```
* ```sudo docker run shopify-redirects-importer:latest```
