import {
    FETCH_REVIEWS,
    FETCH_USERS_FOR_REVIEWS,
    POST_PRODUCT_REVIEW
} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_REVIEWS:
            action.payload.forEach(review => {
                review.rating = Math.floor(Math.random() * 5) + 1;
            });
            return action.payload;
        case FETCH_USERS_FOR_REVIEWS: {
            const newState = [...state];
            newState.forEach((review, index) => {
                review.user = {
                    avatar: action.payload[index].picture.medium,
                    name: action.payload[index].name,
                    username: action.payload[index].login.username
                };
            });
            return newState;
        }
        case POST_PRODUCT_REVIEW:
            return [...state, action.payload];
        default:
            return state;
    }
};
