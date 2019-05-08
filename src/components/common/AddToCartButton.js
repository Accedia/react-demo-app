import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { addProductToCart } from '../../actions';
import { Button } from '../../styles';
import 'react-toastify/dist/ReactToastify.min.css';

const AddToCartButton = props => {
    const onAddToCartClick = () => {
        props.addProductToCart(props.productSku);
        toast('Added product to cart.');
    };

    return (
        <StyledAddToCartButton {...props} onClick={onAddToCartClick}>
            <i className="fas fa-cart-plus" />
            Add to Cart
        </StyledAddToCartButton>
    );
};

AddToCartButton.propTypes = {
    productSku: PropTypes.number.isRequired,
    addProductToCart: PropTypes.func
};

export default connect(
    null,
    { addProductToCart }
)(AddToCartButton);

// Styles
const StyledAddToCartButton = styled(Button)`
    ${props => (props.fullWidth ? 'width: 100%;' : '')}
    color: #040c13 !important;
    background-color: #ffe000;

    :hover {
        background-color: #fff200;
    }
`;
