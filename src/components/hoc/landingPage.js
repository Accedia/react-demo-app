import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logoBig from '../../assets/logo-big.png';
import splashImage from '../../assets/splash.jpg';

const landingPage = WrappedComponent => {
    const ReturnedComponent = class Returned extends React.Component {
        render() {
            return (
                <React.Fragment>
                    <SplashImage src={splashImage} alt="Splash" />
                    <Page>
                        <Link to="/">
                            <Logo src={logoBig} alt="Logo" />
                        </Link>
                        <FormWrapper>
                            <WrappedComponent {...this.props} />
                        </FormWrapper>
                    </Page>
                </React.Fragment>
            );
        }
    };

    return ReturnedComponent;
};

export default landingPage;

// Styles
const SplashImage = styled.img`
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    object-fit: cover;
    filter: blur(2px);
    z-index: -1;
`;

const Page = styled(({ className, children }) => (
    <div className={className}>
        <div className="inner">{children}</div>
    </div>
))`
    position: absolute;
    width: 100%;
    height: 100%;

    .inner {
        position: absolute;
        width: 400px;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -200px);
    }
`;

const Logo = styled.img`
    display: block;
    width: 250px;
    margin: 0 auto 20px;
`;

const FormWrapper = styled.div`
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: #fff;
`;
