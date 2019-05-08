const USER_LOGGED_IN = 'USER_LOGGED_IN';
const CART_STATE = 'CART_STATE';

export default class local {
    static isLoggedIn() {
        return window.localStorage.getItem(USER_LOGGED_IN);
    }

    static userLogin() {
        return window.localStorage.setItem(USER_LOGGED_IN, true);
    }

    static userLogout() {
        return window.localStorage.removeItem(USER_LOGGED_IN);
    }

    static getCartState() {
        return JSON.parse(window.localStorage.getItem(CART_STATE));
    }

    static setCartState(state) {
        return window.localStorage.setItem(CART_STATE, JSON.stringify(state));
    }
}
