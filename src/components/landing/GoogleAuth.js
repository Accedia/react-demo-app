import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { signInWithGoogle } from '../../actions';
import { Button, FormLabel } from '../../styles';

const GoogleAuth = props => {
    return (
        <React.Fragment>
            <FormLabel>Login with Google</FormLabel>
            <div>
                <SignInButton onClick={props.signInWithGoogle}>
                    <i className="fab fa-google" />
                    Google
                </SignInButton>
            </div>
        </React.Fragment>
    );
};

GoogleAuth.propTypes = {
    signInWithGoogle: PropTypes.func
};

export default connect(
    null,
    { signInWithGoogle }
)(GoogleAuth);

// Styles
export const SignInButton = styled(Button)`
    background-color: #df4b37;

    :hover {
        background-color: #a72b1a;
    }
`;
