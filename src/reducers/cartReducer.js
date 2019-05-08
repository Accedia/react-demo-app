import {
    INIT_CART,
    ADD_PRODUCT_TO_CART,
    CHANGE_CART_ITEM_QUANTITY,
    REMOVE_PRODUCT_FROM_CART,
    REQUEST_REMOVE_FROM_CART,
    CANCEL_REMOVE_FROM_CART
} from '../actions';
import { fixProductData } from '../helpers';

const INITIAL_STATE = { items: {}, isDeleting: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_CART: {
            const newState = { ...state, items: { ...state.items } };
            if (action.payload) {
                action.payload.forEach(pr => {
                    pr.quantity = action.currentCartState[pr.sku].quantity;
                    newState.items[pr.sku] = fixProductData(pr);
                });
            }
            return newState;
        }

        case ADD_PRODUCT_TO_CART: {
            const newState = {
                items: {
                    ...state.items,
                    [action.productSku]: fixProductData(action.payload)
                }
            };
            newState.items[action.productSku].quantity = action.quantity;
            return newState;
        }

        case REMOVE_PRODUCT_FROM_CART: {
            const newState = {
                ...state,
                items: { ...state.items },
                isDeleting: false
            };
            delete newState.items[action.productSku];
            return newState;
        }

        case CHANGE_CART_ITEM_QUANTITY: {
            const newState = { ...state, items: { ...state.items } };
            if (newState.items[action.productSku]) {
                newState.items[action.productSku].quantity = action.quantity;
            }
            return newState;
        }

        case REQUEST_REMOVE_FROM_CART: {
            return { ...state, isDeleting: true };
        }

        case CANCEL_REMOVE_FROM_CART: {
            return { ...state, isDeleting: false };
        }

        default:
            return state;
    }
};
