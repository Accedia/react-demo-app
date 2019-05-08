import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect, Link } from 'react-router-dom';

import { signIn } from '../../actions';
import {
    FormInputWrapper,
    FormError,
    Button,
    FormLabel,
    StyledLink
} from '../../styles';
import GoogleAuth from './GoogleAuth';
import { renderFormInput } from '../../helpers';
import landingPage from '../hoc/landingPage';

const LoginPage = props => {
    const onSubmit = formValues => {
        props.signIn(
            formValues.username,
            formValues.password,
            formValues.rememberMe
        );
    };

    const { from } = props.location.state || {
        from: { pathname: '/' }
    };

    if (props.auth.isSignedIn) {
        return <Redirect to={from} />;
    }

    return (
        <React.Fragment>
            {props.auth.error && <FormError>{props.auth.error}</FormError>}
            <form onSubmit={props.handleSubmit(onSubmit)}>
                <Field
                    name="username"
                    label="Username"
                    component={renderFormInput}
                />
                <Field
                    name="password"
                    label="Password"
                    type="password"
                    component={renderFormInput}
                />
                <Field
                    name="rememberMe"
                    label="Remember Me"
                    type="checkbox"
                    component={renderFormInput}
                />
                <FormInputWrapper>
                    <Button>Login</Button>
                </FormInputWrapper>
            </form>
            <GoogleAuth />
            <FormLabel
                css={`
                    margin-top: 10px;
                `}
            >
                <span>No account?</span>
                <StyledLink
                    as={Link}
                    to="/register"
                    css={`
                        margin-left: 5px;
                    `}
                >
                    Register here
                </StyledLink>
            </FormLabel>
        </React.Fragment>
    );
};

LoginPage.propTypes = {
    auth: PropTypes.shape({
        isSignedIn: PropTypes.bool,
        error: PropTypes.string
    }),
    location: PropTypes.shape({
        state: PropTypes.shape({
            from: PropTypes.object
        })
    }),
    handleSubmit: PropTypes.func,
    signIn: PropTypes.func
};

const validate = formValues => {
    const errors = {};

    if (!formValues.username) {
        errors.username = 'Username is required';
    }

    if (!formValues.password) {
        errors.password = 'Password is required';
    }

    return errors;
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const landingWrapped = landingPage(LoginPage);

const formWrapped = reduxForm({
    form: 'login',
    validate
})(landingWrapped);

export default connect(
    mapStateToProps,
    { signIn }
)(formWrapped);
