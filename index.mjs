import express from 'express';
import { parseBody } from './parse.mjs';
import { fetchBody } from './fetch.mjs';

let cachedData = null;

async function getCachedData() {
    if (!cachedData) {
        const body = await fetchBody();
        cachedData = parseBody(body);
    }

    return cachedData;    
}

const app = express();

app.get('/api/v1/categories', async (_, res) => {
    const data = await getCachedData();
    res.json(data.categories);
});

app.get('/api/v1/products', async (_, res) => {
    const data = await getCachedData();
    res.json(data.products);
});

app.listen(3000);
