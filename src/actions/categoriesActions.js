import bestBuy from '../apis/bestBuy';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const CLEAR_SELECTED_CATEGORY = 'CLEAR_SELECTED_CATEGORY';

export const fetchCategories = (
    categoryId = 'cat00000',
    categoryLevel = 0
) => async dispatch => {
    const response = await bestBuy.get(`/categories(id=${categoryId})`);

    if (
        response &&
        response.status === 200 &&
        response.data.categories.length === 1
    ) {
        dispatch({
            type: FETCH_CATEGORIES,
            payload: response.data.categories[0],
            categoryLevel
        });
    } else {
        dispatch({
            type: REMOVE_CATEGORY,
            categoryId,
            categoryLevel
        });
    }
};

export const toggleCategory = category => {
    return {
        type: TOGGLE_CATEGORY,
        categoryId: category.id,
        categoryLevel: category.level
    };
};

export const selectCategory = category => {
    return {
        type: SELECT_CATEGORY,
        category
    };
};

export const clearSelectedCategory = () => {
    return {
        type: CLEAR_SELECTED_CATEGORY
    };
};
