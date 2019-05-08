import { SELECT_CATEGORY, CLEAR_SELECTED_CATEGORY } from '../actions';

export default (state = null, action) => {
    switch (action.type) {
        case SELECT_CATEGORY: {
            return action.category;
        }
        case CLEAR_SELECTED_CATEGORY: {
            return null;
        }
        default:
            return state;
    }
};
