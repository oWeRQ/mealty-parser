import fs from 'fs';
import needle from 'needle';

export const URL = 'https://www.mealty.ru';
export const CACHE_FILE = 'cache/index.html';

export function fetchBody() {
    return new Promise((resolve) => {
        needle.get(URL, (err, res) => {
            resolve(res.body);
        });
    });
}

export function writeCache(body) {
    return fs.writeFileSync(CACHE_FILE, body);
}

export function readCache() {
    return fs.readFileSync(CACHE_FILE, 'utf8');
}