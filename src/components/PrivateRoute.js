import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from './common/Header';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            rest.auth.isSignedIn ? (
                <React.Fragment>
                    <Header {...props} />
                    <Component {...props} />
                </React.Fragment>
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

PrivateRoute.propTypes = {
    component: PropTypes.any,
    location: PropTypes.any
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(PrivateRoute);
