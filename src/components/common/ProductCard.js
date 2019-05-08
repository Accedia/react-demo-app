import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ProductName } from '../../styles';
import bestBuy from '../../apis/bestBuy';
import RatingStars from './RatingStars';
import ProductPrice from './ProductPrice';
import AddToCartButton from './AddToCartButton';

import comingSoonImage from '../../assets/image-coming-soon.svg';

const ProductCard = ({ product, singleLine }) => {
    const [largeImage, setLargeImage] = useState(product.largeImage);

    useEffect(() => {
        // Some products don't have assigned large image. Try to get another one.
        if (!largeImage) {
            bestBuy.get(`/products/${product.sku}.json`).then(response => {
                if (
                    response &&
                    response.status === 200 &&
                    response.data.images.length > 0
                ) {
                    setLargeImage(response.data.images[0].href);
                }
            });
        }
    }, [largeImage]);

    return (
        <ProductCardWrapper singleLine={singleLine}>
            <ProductImage
                src={largeImage || comingSoonImage}
                alt={product.name}
            />
            <ProductName as={Link} to={`/product/${product.sku}`}>
                {product.name}
            </ProductName>
            <RatingStars product={product} />
            <ProductPrice product={product} />
            <AddToCartButton productSku={product.sku} fullWidth />
        </ProductCardWrapper>
    );
};

ProductCard.propTypes = {
    singleLine: PropTypes.bool,
    product: PropTypes.shape({
        largeImage: PropTypes.string,
        name: PropTypes.string.isRequired,
        sku: PropTypes.number.isRequired
    }).isRequired
};

export default ProductCard;

// Styles
const ProductCardWrapper = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 10px;
    background-color: #fff;

    ${props => {
        if (props.singleLine) {
            return `
                display: inline-block;
                width: 180px;
                margin-right: 5px;
            `;
        }
    }}
`;

const ProductImage = styled.img`
    display: block;
    height: 200px;
    max-width: 100%;
    margin: 0 auto;
    object-fit: contain;
`;
