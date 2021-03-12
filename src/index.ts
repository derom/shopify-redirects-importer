import http from 'http';
import url from 'url';
import querystring from 'querystring';
import Shopify, { DataType } from '@shopify/shopify-api';
import { readFileSync } from 'fs';
require('dotenv').config();

const { SHOP, ACCESS_TOKEN, OVERRIDE_EXISTING_REDIRECTS } = process.env

const client = new Shopify.Clients.Rest(SHOP, ACCESS_TOKEN);
const redirects = JSON.parse(readFileSync('./redirects.json', 'utf8'));
const overrideRedirect = (OVERRIDE_EXISTING_REDIRECTS === "true");

redirects.forEach(async (redirect: any) => {
	const body = {
		"redirect": redirect
	};

	const existingRedirect: any = await client.get({
		path: 'redirects',
		query: {
			"path": redirect.path,
			"limit": 50
		},
	});

	if (existingRedirect.body.redirects.length === 0) {
		const newRedirect = await client.post({
			path: 'redirects',
			data: body,
			type: DataType.JSON,
		});
		console.log(`new redirect: ${ JSON.stringify(newRedirect.body) }`);
	}

	if (overrideRedirect &&existingRedirect.body.redirects.length === 1) {
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
