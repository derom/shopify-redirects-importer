import Shopify, { DataType, ApiVersion } from '@shopify/shopify-api';
import { readFileSync } from 'fs';
require('dotenv').config();

const { SHOP, ACCESS_TOKEN, UPDATE_EXISTING_REDIRECTS } = process.env

Shopify.Context.initialize({
	API_KEY: "dummy",
	API_SECRET_KEY: "dummy",
	SCOPES: ["dummy"],
	HOST_NAME: "dummy",
	IS_EMBEDDED_APP: false,
	API_VERSION: ApiVersion.January21
});

const client = new Shopify.Clients.Rest(SHOP, ACCESS_TOKEN);
const redirects = JSON.parse(readFileSync('./redirects.json', 'utf8'));
const updateRedirects = (UPDATE_EXISTING_REDIRECTS === "true");

redirects.forEach(async (redirect: any) => {
	const existingRedirect: any = await client.get({
		path: 'redirects',
		query: {
			"path": redirect.path
		},
	});

	if (existingRedirect.body.redirects.length === 0) {
		const newRedirect = await client.post({
			path: 'redirects',
			data: {
				"redirect": redirect
			},
			type: DataType.JSON,
		});
		console.log(`new redirect: ${ JSON.stringify(newRedirect.body) }`);
	}

	if (updateRedirects && existingRedirect.body.redirects.length === 1) {
		const redirectId = existingRedirect.body.redirects[0].id;
		const updatedRedirect = await client.put({
			path: `redirects/${redirectId}`,
			data: {
				"redirect": { ...redirect, "id": redirectId }
			},
			type: DataType.JSON,
		});
		console.log(`updated redirect: ${ JSON.stringify(updatedRedirect.body) }`);
	}
});
