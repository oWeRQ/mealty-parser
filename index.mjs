import express from 'express';
import cors from 'cors';
import { parseBody } from './parse.mjs';
import { fetchBody } from './fetch.mjs';

const CACHE_TIME = 12 * 3600 * 1000;
const URL = 'https://www.mealty.ru';

let cachedData = null;
let cacheAt = new Date();

async function getCachedData() {
    if (!cachedData || new Date() - cacheAt > CACHE_TIME) {
        const body = await fetchBody(URL);
        cachedData = parseBody(body, URL);
        cacheAt = new Date();
    }

    return cachedData;    
}

const app = express();

app.use(cors());

app.get('/api/v1/categories', async (_, res) => {
    const data = await getCachedData();
    res.json(data.categories);
});

app.get('/api/v1/products', async (_, res) => {
    const data = await getCachedData();
    res.json(data.products);
});

app.listen(3000);
