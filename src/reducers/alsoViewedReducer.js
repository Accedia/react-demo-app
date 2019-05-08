import { FETCH_ALSO_VIEWED } from '../actions';
import { mapProductDataBeta } from '../helpers';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALSO_VIEWED: {
            return action.payload.map(product => mapProductDataBeta(product));
        }
        default:
            return state;
    }
};
