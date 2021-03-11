import http from 'http';
import url from 'url';
import querystring from 'querystring';
import Shopify, { DataType } from '@shopify/shopify-api';
import { readFileSync } from 'fs';
require('dotenv').config();

const { SHOP, ACCESS_TOKEN } = process.env

const client = new Shopify.Clients.Rest(SHOP, ACCESS_TOKEN);

const redirects = JSON.parse(readFileSync('./redirects.json', 'utf8'));

redirects.forEach((redirect: any) => {
	const body = {
		"redirect": redirect
	};

	client.post({
		path: 'redirects',
		data: body,
		type: DataType.JSON,
	}).then(res => console.log(`new redirect: ${ JSON.stringify(res.body) }`));
});
