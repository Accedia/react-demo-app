import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const ProductsGridItems = ({ products, singleLine }) => {
    const renderProducts = products => {
        if (!products || products.length === 0) {
            return <div>No items available</div>;
        } else {
            return products.map(product => (
                <ProductCard
                    key={product.sku}
                    product={product}
                    singleLine={singleLine}
                />
            ));
        }
    };

    return (
        <ProductItemsWrapper singleLine={singleLine}>
            {renderProducts(products)}
        </ProductItemsWrapper>
    );
};

ProductsGridItems.propTypes = {
    products: PropTypes.array.isRequired,
    singleLine: PropTypes.bool
};

export default ProductsGridItems;

const ProductItemsWrapper = styled.div`
    display: ${props => (props.singleLine ? 'block' : 'grid')};
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 5px;
    white-space: nowrap;
    overflow-x: auto;
`;
