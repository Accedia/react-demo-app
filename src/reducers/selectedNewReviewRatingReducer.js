import { SELECT_NEW_REVIEW_RATING, POST_PRODUCT_REVIEW } from '../actions';

export default (state = 0, action) => {
    switch (action.type) {
        case SELECT_NEW_REVIEW_RATING:
            return action.rating;
        case POST_PRODUCT_REVIEW:
            return 0;
        default:
            return state;
    }
};
