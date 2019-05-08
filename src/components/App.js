import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

import { initAuth } from '../actions';
import history from '../history';
import PrivateRoute from './PrivateRoute';
import LoginPage from './landing/LoginPage';
import RegisterPage from './landing/RegisterPage';
import HomePage from './home/HomePage';
import ProductPage from './product/ProductPage';
import SearchPage from './search/SearchPage';
import CartPage from './cart/CartPage';

class App extends React.Component {
    componentDidMount() {
        this.props.initAuth();
    }

    render() {
        return (
            <React.Fragment>
                <Router history={history}>
                    <div>
                        <Route path="/login" exact component={LoginPage} />
                        <Route
                            path="/register"
                            exact
                            component={RegisterPage}
                        />
                        <PrivateRoute
                            path="/product/:sku"
                            exact
                            component={ProductPage}
                        />
                        <PrivateRoute
                            path="/search"
                            exact
                            component={SearchPage}
                        />
                        <PrivateRoute path="/cart" exact component={CartPage} />
                        <PrivateRoute path="/" exact component={HomePage} />
                    </div>
                </Router>
                {/* NOTE: Toast notifications are shown in the bottom right corner */}
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
            </React.Fragment>
        );
    }
}

App.propTypes = {
    initAuth: PropTypes.func
};

export default connect(
    null,
    { initAuth }
)(App);
