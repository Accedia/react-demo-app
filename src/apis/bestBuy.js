import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.bestbuy.com/v1',
    params: {
        apiKey: 'U6193s76u8HnKmClJLZU4hRv',
        format: 'json'
    }
});

export const bestBuyBeta = axios.create({
    baseURL: 'https://api.bestbuy.com/beta',
    params: {
        apiKey: 'U6193s76u8HnKmClJLZU4hRv',
        format: 'json'
    }
});
