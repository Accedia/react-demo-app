import { FETCH_MOST_POPULAR } from '../actions';
import { mapProductDataBeta } from '../helpers';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_MOST_POPULAR: {
            return action.payload.map(product => mapProductDataBeta(product));
        }
        default:
            return state;
    }
};
