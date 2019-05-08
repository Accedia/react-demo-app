import { FETCH_PRODUCT } from '../actions';
import { fixProductData } from '../helpers';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCT:
            return {
                ...state,
                [action.payload.sku]: fixProductData(action.payload)
            };
        default:
            return state;
    }
};
