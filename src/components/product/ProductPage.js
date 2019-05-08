import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { StyledPage, MainContent, BoldText } from '../../styles';
import { fetchProduct } from '../../actions';
import CategoryPath from './CategoryPath';
import ProductPrice from '../common/ProductPrice';
import AddToCartButton from '../common/AddToCartButton';
import RatingStars from '../common/RatingStars';
import ImageGallery from './ImageGallery';
import ProductMetaInfo from './ProductMetaInfo';
import ProductOverview from './ProductOverview';
import AlsoViewed from './AlsoViewed';
import ProductReviews from './ProductReviews';

class ProductPage extends React.Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.sku);
    }

    render() {
        if (!this.props.product) {
            return <React.Fragment>Loading...</React.Fragment>;
        }

        let product = this.props.product;
        return (
            <React.Fragment>
                <StyledPage display="block">
                    <MainContent>
                        <CategoryPath categoryPath={product.categoryPath} />
                        <ProductContent>
                            <ProductName>{product.name}</ProductName>
                            <ProductMetaInfo product={product} />
                            <RatingStars product={product} />
                            <ImageGallery images={product.images} />
                            <p>{product.longDescription}</p>
                            <ProductOverview product={product} />
                            <ProductReviews productSku={product.sku} />
                            <AlsoViewed productSku={product.sku} />
                        </ProductContent>
                        <ProductRightSidebar>
                            <ProductPrice product={product} />
                            {product.onlineAvailabilityText && (
                                <p>{product.onlineAvailabilityText}</p>
                            )}
                            <AddToCartButton productSku={product.sku} />
                        </ProductRightSidebar>
                    </MainContent>
                </StyledPage>
            </React.Fragment>
        );
    }
}

ProductPage.propTypes = {
    fetchProduct: PropTypes.func,
    match: PropTypes.shape({
        params: PropTypes.shape({
            sku: PropTypes.string
        })
    }),
    product: PropTypes.shape({
        name: PropTypes.string,
        longDescription: PropTypes.string,
        categoryPath: PropTypes.array,
        images: PropTypes.array
    })
};

const mapStateToProps = (state, ownProps) => {
    return {
        product: state.products[ownProps.match.params.sku]
    };
};

export default connect(
    mapStateToProps,
    { fetchProduct }
)(ProductPage);

// Styles
const ProductContent = styled.section`
    float: left;
    width: 60%;
    min-width: 700px;
    margin-right: 40px;
    padding-bottom: 20px;
`;

const ProductRightSidebar = styled.section`
    float: left;
    min-width: 200px;
    max-width: 30%;
`;

const ProductName = styled.h3`
    ${BoldText}
    margin: 5px 0;
`;
