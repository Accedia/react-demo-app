import { FETCH_DAILY_DEALS } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_DAILY_DEALS: {
            action.payload.forEach(product => {
                product.customerReviewAverage =
                    product.customerReviewAverage || 0;
                product.customerReviewCount = product.customerReviewCount || 0;
            });
            return action.payload;
        }
        default:
            return state;
    }
};
