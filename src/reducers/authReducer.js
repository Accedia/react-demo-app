import {
    USER_SIGNED_IN,
    USER_SIGNED_OUT,
    USER_SIGN_IN_ERROR,
    FETCH_USER
} from '../actions';

const INITIAL_STATE = {
    isSignedIn: null,
    provider: null,
    error: null,
    currentUser: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_SIGNED_IN:
            return {
                ...state,
                isSignedIn: true,
                provider: action.provider,
                error: null,
                currentUser: action.currentUserData
            };

        case USER_SIGNED_OUT:
            return {
                ...state,
                isSignedIn: false,
                provider: null,
                error: null,
                currentUser: null
            };

        case USER_SIGN_IN_ERROR:
            return {
                ...state,
                isSignedIn: false,
                provider: null,
                error: action.error,
                currentUser: null
            };

        case FETCH_USER:
            return {
                ...state,
                currentUser: {
                    avatar: action.payload.picture.medium,
                    name: action.payload.name,
                    username: action.payload.login.username
                }
            };

        default:
            return state;
    }
};
