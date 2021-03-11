This script helps to import a huge amount of redirects into a Shopify shop.

# Prerequisites

* Put redirects into redirects.json.
* Create .env file based on .env.example

# Launch locally
* Install dependencies ```yarn install```
* Launch the script ```yarn start ```

# Launch locally in docker
* ```sudo docker build -t shopify-redirects-importer .```
* ```sudo docker run shopify-redirects-importer:latest```
