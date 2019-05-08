import { FETCH_CATEGORIES, TOGGLE_CATEGORY, REMOVE_CATEGORY } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_CATEGORIES: {
            let categories = action.payload.subCategories;
            categories.forEach(cat => {
                cat.collapsed = true;
                cat.loadedChildren = false;
                if (action.categoryLevel === 0) {
                    cat.level = 1;
                }
            });

            if (action.categoryLevel === 0) {
                return categories;
            } else {
                let newState = [...state];
                let foundCategory = findCategoryById(
                    newState,
                    action.payload.id,
                    action.categoryLevel
                );
                categories.forEach(cat => {
                    cat.level = foundCategory.level + 1;
                });
                foundCategory.subCategories = categories;
                foundCategory.loadedChildren = true;
                return newState;
            }
        }
        case TOGGLE_CATEGORY: {
            let newState = [...state];
            let foundCategory = findCategoryById(
                newState,
                action.categoryId,
                action.categoryLevel
            );
            foundCategory.collapsed = !foundCategory.collapsed;
            return newState;
        }
        case REMOVE_CATEGORY: {
            let newState = [...state];
            let foundCategory = findCategoryById(
                newState,
                action.categoryId,
                action.categoryLevel
            );
            foundCategory.invalid = true;
            return newState;
        }
        default:
            return state;
    }
};

const findCategoryById = (categories, categoryId, level) => {
    let foundIndex = categories.findIndex(cat => cat.id === categoryId);
    if (foundIndex >= 0 && categories[foundIndex].level === level) {
        return categories[foundIndex];
    } else {
        for (const category of categories) {
            if (category.loadedChildren) {
                let foundCategory = findCategoryById(
                    category.subCategories,
                    categoryId,
                    level
                );
                if (foundCategory && foundCategory.level === level) {
                    return foundCategory;
                }
            }
        }
    }
    return null;
};
