import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import history from '../../history';

import landingPage from '../hoc/landingPage';
import { renderFormInput } from '../../helpers';
import { FormInputWrapper, Button } from '../../styles';

const required = value =>
    value || typeof value === 'number' ? undefined : 'Required';
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;
const maxLength = max => value =>
    value && value.length > max
        ? `Must be ${max} characters or less`
        : undefined;
const minLength = min => value =>
    value && value.length < min
        ? `Must be ${min} characters or more`
        : undefined;

const maxLength25 = maxLength(25);
const maxLength32 = maxLength(32);
const minLength5 = minLength(5);
const minLength8 = minLength(8);

const RegisterPage = props => {
    const onSubmit = () => {
        history.push('/');
    };

    return (
        <form onSubmit={props.handleSubmit(onSubmit)}>
            <Field
                name="username"
                label="Username"
                component={renderFormInput}
                validate={[required, maxLength25, minLength5]}
            />
            <Field
                name="email"
                label="Email"
                type="email"
                component={renderFormInput}
                validate={[required, email]}
            />
            <Field
                name="password"
                label="Password"
                type="password"
                component={renderFormInput}
                validate={[required, maxLength32, minLength8]}
            />
            <Field
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                component={renderFormInput}
                validate={[required]}
            />
            <Field
                name="acceptTC"
                label="Accept Terms & Conditions"
                type="checkbox"
                component={renderFormInput}
                validate={[required]}
            />
            <FormInputWrapper>
                <Button>Register</Button>
            </FormInputWrapper>
        </form>
    );
};

RegisterPage.propTypes = {
    handleSubmit: PropTypes.func
};

const validate = formValues => {
    const errors = {};

    if (
        formValues.password &&
        formValues.repeatPassword &&
        formValues.password != formValues.repeatPassword
    ) {
        errors.repeatPassword = 'Passwords do not match';
    }

    return errors;
};

const landingWrapped = landingPage(RegisterPage);

export default reduxForm({
    form: 'register',
    validate
})(landingWrapped);
