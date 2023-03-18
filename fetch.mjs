import fs from 'fs';
import needle from 'needle';

export const CACHE_FILE = 'cache/index.html';

export function fetchBody(url) {
    return new Promise((resolve) => {
        needle.get(url, (_, res) => {
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