import local from '../helpers/local';
import { userSignedIn } from '../helpers';
import httpbin from '../apis/httpbin';
import randomuser from '../apis/randomuser';

export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT';
export const USER_SIGN_IN_ERROR = 'USER_SIGN_IN_ERROR';
export const FETCH_USER = 'FETCH_USER';

export const initAuth = () => dispatch => {
    if (local.isLoggedIn()) {
        userSignedIn(dispatch, 'Local');
    }
    if (!window.gapi.auth2) {
        // NOTE: Added Google auth for sign-in
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId:
                        '574998841554-bptmtjleippciim1l6s30ua7fjdh75a2.apps.googleusercontent.com',
                    scope: 'email'
                })
                .then(() => {
                    if (!local.isLoggedIn()) {
                        const auth = window.gapi.auth2.getAuthInstance();
                        if (auth.isSignedIn.get()) {
                            userSignedIn(dispatch, 'Google');
                        }
                        auth.isSignedIn.listen(isSignedIn => {
                            if (isSignedIn) {
                                userSignedIn(dispatch, 'Google');
                            } else {
                                dispatch({
                                    type: USER_SIGNED_OUT
                                });
                            }
                        });
                    }
                });
        });
    }
};

export const signInWithGoogle = () => dispatch => {
    const auth = window.gapi.auth2.getAuthInstance();

    if (auth.isSignedIn.get()) {
        userSignedIn(dispatch, 'Google');
    } else {
        auth.signIn();
    }
};

export const signIn = (username, password, rememberMe) => dispatch => {
    if (local.isLoggedIn()) {
        if (rememberMe) {
            local.userLogin();
        }

        userSignedIn(dispatch, 'Local');
        return;
    }

    httpbin
        .post('/status/200,400', {
            username,
            password
        })
        .then(() => {
            local.userLogout();
            if (rememberMe) {
                local.userLogin();
            }

            userSignedIn(dispatch, 'Local');
        })
        .catch(() => {
            local.userLogout();
            dispatch({
                type: USER_SIGN_IN_ERROR,
                provider: 'Local',
                error: 'Invalid username/password'
            });
        });
};

export const signOut = () => (dispatch, getState) => {
    local.userLogout();
    let authState = getState().auth;
    if (authState.isSignedIn) {
        if (authState.provider === 'Google') {
            window.gapi.auth2.getAuthInstance().signOut();
        } else {
            dispatch({
                type: USER_SIGNED_OUT
            });
        }
    }
};

export const fetchUser = userId => async dispatch => {
    const response = await randomuser.get('/', {
        params: {
            seed: userId
        }
    });

    if (
        response &&
        response.status === 200 &&
        response.data.results &&
        response.data.results.length == 1
    ) {
        dispatch({
            type: FETCH_USER,
            payload: response.data.results[0],
            userId: userId
        });
    }
};
