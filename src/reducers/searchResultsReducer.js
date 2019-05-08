import { SEARCH_PRODUCTS } from '../actions';
import { fixProductData } from '../helpers';

export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS: {
            action.payload.products.forEach(product => {
                fixProductData(product);
            });
            return {
                ...state,
                results: action.payload.products,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            };
        }
        default:
            return state;
    }
};
