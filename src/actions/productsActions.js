import bestBuy, { bestBuyBeta } from '../apis/bestBuy';
import { getRequiredProductFields } from '../helpers';

export const FETCH_DAILY_DEALS = 'FETCH_DAILY_DEALS';
export const FETCH_MOST_POPULAR = 'FETCH_MOST_POPULAR';
export const FETCH_ALSO_VIEWED = 'FETCH_ALSO_VIEWED';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';

export const fetchDailyDeals = () => async dispatch => {
    const response = await bestBuy.get(
        '/products(offers.type=deal_of_the_day)',
        {
            params: {
                sort: 'dollarSavings.desc'
            }
        }
    );

    if (
        response &&
        response.status === 200 &&
        response.data.products.length > 0
    ) {
        dispatch({
            type: FETCH_DAILY_DEALS,
            payload: response.data.products
        });
    }
};

export const fetchMostPopular = categoryId => async dispatch => {
    const response = await bestBuyBeta.get(
        '/products/mostViewed' +
            (categoryId ? `(categoryId=${categoryId})` : '')
    );

    if (response && response.status === 200) {
        dispatch({
            type: FETCH_MOST_POPULAR,
            payload: response.data.results
        });
    }
};

export const fetchAlsoViewed = productSku => async dispatch => {
    const response = await bestBuyBeta.get(
        `/products/${productSku}/alsoViewed`
    );

    if (response && response.status === 200) {
        dispatch({
            type: FETCH_ALSO_VIEWED,
            payload: response.data.results
        });
    }
};

export const fetchProduct = productSku => async dispatch => {
    const response = await bestBuy.get(`/products/${productSku}.json`, {
        params: {
            show: getRequiredProductFields()
        }
    });

    if (response && response.status === 200) {
        dispatch({
            type: FETCH_PRODUCT,
            payload: response.data
        });
    }
};

export const searchProducts = (query, page = 1) => async dispatch => {
    const searchTerms = query.split(' ');
    const response = await bestBuy.get(
        `/products(search=${searchTerms.join('&search=')}&active=true)`,
        {
            params: {
                show: getRequiredProductFields(),
                page
            }
        }
    );

    if (response && response.status === 200) {
        dispatch({
            type: SEARCH_PRODUCTS,
            payload: response.data
        });
    }
};
