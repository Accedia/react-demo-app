import local from '../helpers/local';
import { getRequiredProductFields } from '../helpers';
import bestBuy from '../apis/bestBuy';

export const INIT_CART = 'INIT_CART';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const CHANGE_CART_ITEM_QUANTITY = 'CHANGE_CART_ITEM_QUANTITY';
export const REQUEST_REMOVE_FROM_CART = 'REQUEST_REMOVE_FROM_CART';
export const CANCEL_REMOVE_FROM_CART = 'CANCEL_REMOVE_FROM_CART';

export const initCart = () => async dispatch => {
    const currentCartState = local.getCartState() || {};
    const productSkus = Object.keys(currentCartState);
    if (productSkus.length) {
        const response = await bestBuy.get(
            `/products(sku in(${productSkus.join(',')}))`,
            {
                params: {
                    show: getRequiredProductFields()
                }
            }
        );

        if (
            response &&
            response.status === 200 &&
            response.data.products.length > 0
        ) {
            dispatch({
                type: INIT_CART,
                payload: response.data.products,
                currentCartState
            });
            return;
        }
    }

    dispatch({
        type: INIT_CART
    });
};

export const addProductToCart = productSku => async dispatch => {
    const currentCartState = local.getCartState() || {};

    const response = await bestBuy.get(`/products/${productSku}.json`, {
        params: {
            show: getRequiredProductFields()
        }
    });

    if (response && response.status === 200) {
        if (currentCartState[productSku]) {
            currentCartState[productSku].quantity++;
        } else {
            currentCartState[productSku] = {};
            currentCartState[productSku].quantity = 1;
        }

        local.setCartState(currentCartState);

        dispatch({
            type: ADD_PRODUCT_TO_CART,
            productSku,
            payload: response.data,
            quantity: currentCartState[productSku].quantity
        });
    }
};

export const removeProductFromCart = productSku => {
    const currentCartState = local.getCartState() || {};
    delete currentCartState[productSku];
    local.setCartState(currentCartState);

    return {
        type: REMOVE_PRODUCT_FROM_CART,
        productSku
    };
};

export const changeCartItemQuantity = (productSku, quantity) => {
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity < 0) {
        quantity = 0;
    }
    const currentCartState = local.getCartState() || {};
    currentCartState[productSku].quantity = quantity;
    local.setCartState(currentCartState);

    return {
        type: CHANGE_CART_ITEM_QUANTITY,
        productSku,
        quantity
    };
};

export const requestRemoveFromCart = () => {
    return {
        type: REQUEST_REMOVE_FROM_CART
    };
};

export const cancelRemoveFromCart = () => {
    return {
        type: CANCEL_REMOVE_FROM_CART
    };
};
