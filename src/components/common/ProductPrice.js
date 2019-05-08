import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BoldText } from '../../styles';
import { formatPrice } from '../../helpers';

const ProductPrice = props => {
    let savings = (
        <div className="savings">
            <div
                css={`
                    ${BoldText}
                `}
                block
            >
                On Sale
            </div>
            <DollarSavings>
                Save{' '}
                {formatPrice(
                    props.product.dollarSavings *
                        (typeof props.quantity === 'number'
                            ? props.quantity
                            : 1)
                )}
            </DollarSavings>
            <RegularPrice singleLine={props.singleLine}>
                Was {formatPrice(props.product.regularPrice)}
            </RegularPrice>
        </div>
    );

    return (
        <PricingWrapper singleLine={props.singleLine}>
            <ProductPriceWrapper>
                {formatPrice(
                    props.product.salePrice *
                        (typeof props.quantity === 'number'
                            ? props.quantity
                            : 1)
                )}
            </ProductPriceWrapper>
            {props.product.onSale ? savings : ''}
        </PricingWrapper>
    );
};

ProductPrice.propTypes = {
    singleLine: PropTypes.bool,
    quantity: PropTypes.number,
    product: PropTypes.shape({
        salePrice: PropTypes.number.isRequired,
        dollarSavings: PropTypes.number.isRequired,
        regularPrice: PropTypes.number.isRequired,
        onSale: PropTypes.bool
    }).isRequired
};

export default ProductPrice;

// Style
const PricingWrapper = styled.div`
    ${props => (!props.singleLine ? 'height: 85px;' : '')}
`;

const ProductPriceWrapper = styled.span`
    ${BoldText}
    font-size: 1.5em;
    font-weight: bold;
`;

const DollarSavings = styled.span`
    display: inline-block;
    padding: 3px 7px;
    margin-right: 5px;
    font-size: 13px;
    line-height: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #bb0628;
`;

const RegularPrice = styled.span`
    font-size: 13px;

    ${props => (props.singleLine ? 'display: none;' : '')};
`;
