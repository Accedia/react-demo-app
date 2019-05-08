import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import categoriesReducer from './categoriesReducer';
import selectedCategoryReducer from './selectedCategoryReducer';
import dailyDealsReducer from './dailyDealsReducer';
import mostPopularReducer from './mostPopularReducer';
import productsReducer from './productsReducer';
import alsoViewedReducer from './alsoViewedReducer';
import productReviewsReducer from './productReviewsReducer';
import selectedNewReviewRatingReducer from './selectedNewReviewRatingReducer';
import searchResultsReducer from './searchResultsReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
    dailyDeals: dailyDealsReducer,
    mostPopular: mostPopularReducer,
    alsoViewed: alsoViewedReducer,
    products: productsReducer,
    productReviews: productReviewsReducer,
    selectedNewReviewRating: selectedNewReviewRatingReducer,
    searchResults: searchResultsReducer,
    cart: cartReducer
});
