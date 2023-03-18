import { load } from 'cheerio';

export function parseBody(body) {
    const $ = load(body);

    const categories = $('.category-wrapper').map((i, el) => {
        const $el = $(el);
        const category = {
            id: $el.attr('data-category'),
            name: $el.attr('data-category-name'),
            title: $el.find('.menu-category-title').text(),
        }; 
        
        const products = $el.find('.catalog-item').map((i, el) => {
            const $el = $(el);
            return {
                category,
                id: $el.attr('data-product_id'),
                sellerId: $el.attr('data-seller-product_id'),
                priority: $el.attr('data-priority'),
                heatable: $el.hasClass('product_heatable'),
                newProduct: $el.find('.newpl').length !== 0,
                image: $el.find('.meal-card__image img[data-fancybox-href]').attr('src'),
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