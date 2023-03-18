import { load } from 'cheerio';

export function parseBody(body, baseUrl = '') {
    const $ = load(body);

    const categories = $('.category-wrapper').map((_, el) => {
        const $el = $(el);
        const category = {
            id: $el.attr('data-category'),
            name: $el.attr('data-category-name'),
            title: $el.find('.menu-category-title').text(),
        }; 
        
        const products = $el.find('.catalog-item').map((_, el) => {
            const $el = $(el);

            const meta = Object.fromEntries($el.find('.hidden > *').map((_, el) => {
                const $el = $(el);
                const key = $el.attr('class').replace(/^.*?__/, '');
                const value = $el.text() || baseUrl + $el.find('img[data-fancybox-src]').attr('data-fancybox-src');

                return [[key, value]];
            }).get());

            return {
                category,
                meta,
                id: $el.attr('data-product_id'),
                sellerId: $el.attr('data-seller-product_id'),
                priority: $el.attr('data-priority'),
                heatable: $el.hasClass('product_heatable'),
                newProduct: $el.find('.newpl').length !== 0,
                imageUrl: baseUrl + $el.find('.meal-card__image img[data-fancybox-href]').attr('data-src'),
                name: $el.find('.meal-card__name').text(),
                note: $el.find('.meal-card__name-note').text(),
                price: $el.find('.basket__footer-total-count').text(),
            };
        }).get();

        return {
            ...category,
            products,
        };
    }).get();

    const products = categories.filter(cat => cat.id != 0).flatMap(cat => cat.products);

    return {
        categories,
        products,
    };
};