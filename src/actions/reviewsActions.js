import { reset } from 'redux-form';
import jsonplaceholder from '../apis/jsonplaceholder';
import randomuser from '../apis/randomuser';
import httpbin from '../apis/httpbin';

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const FETCH_USERS_FOR_REVIEWS = 'FETCH_USERS_FOR_REVIEWS';
export const SELECT_NEW_REVIEW_RATING = 'SELECT_NEW_REVIEW_RATING';
export const POST_PRODUCT_REVIEW = 'POST_PRODUCT_REVIEW';

export const fetchReviews = productSku => async dispatch => {
    const response = await jsonplaceholder.get('/posts', {
        params: {
            userId: productSku % 10 || 10
        }
    });

    if (response && response.status === 200) {
        dispatch({
            type: FETCH_REVIEWS,
            payload: response.data
        });
    }
};

export const fetchUsersForReviews = seed => async dispatch => {
    const response = await randomuser.get('/', {
        params: {
            seed: seed,
            results: 10
        }
    });

    if (
        response &&
        response.status === 200 &&
        response.data.results &&
        response.data.results.length > 0
    ) {
        dispatch({
            type: FETCH_USERS_FOR_REVIEWS,
            payload: response.data.results
        });
    }
};

// NOTE: Fetch both reviews and the users for those reviews
export const fetchReviewsAndUsers = productSku => async dispatch => {
    dispatch(fetchReviews(productSku));
    dispatch(fetchUsersForReviews(productSku));
};

export const selectNewReviewRating = rating => {
    return {
        type: SELECT_NEW_REVIEW_RATING,
        rating
    };
};

export const postProductReview = (title, body, rating) => async (
    dispatch,
    getState
) => {
    const response = await httpbin.post('/anything', {
        id: new Date().getTime(),
        title,
        body,
        rating,
        user: getState().auth.currentUser
    });

    if (response && response.status === 200) {
        dispatch({
            type: POST_PRODUCT_REVIEW,
            payload: response.data.json
        });
        dispatch(reset('newProductReview'));
    }
};
