import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyledPage, MainContent, SectionHeader } from '../../styles';
import CartItemGrid from './CartItemsGrid';
import DeliveryAddressForm from './DeliveryAddressForm';

const CartPage = ({ hasCartItems }) => {
    return (
        <React.Fragment>
            <StyledPage>
                <MainContent>
                    <SectionHeader>Your cart</SectionHeader>
                    <CartItemGrid />
                    {hasCartItems && (
                        <React.Fragment>
                            <SectionHeader
                                css={`
                                    margin-top: 20px;
                                `}
                            >
                                Delivery address
                            </SectionHeader>
                            <DeliveryAddressForm />
                        </React.Fragment>
                    )}
                </MainContent>
            </StyledPage>
        </React.Fragment>
    );
};

CartPage.propTypes = {
    hasCartItems: PropTypes.bool
};

const mapStateToProps = state => {
    return {
        hasCartItems: Object.keys(state.cart.items).length > 0
    };
};

export default connect(mapStateToProps)(CartPage);
