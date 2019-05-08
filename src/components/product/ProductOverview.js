import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SectionHeader, SectionSubHeader } from '../../styles';
import RatingStars from '../common/RatingStars';

const ProductOverview = ({ product }) => {
    return (
        <StyledProductOverview>
            <SectionHeader>Overview</SectionHeader>
            <div className="columnLeft">
                <SectionSubHeader>{'What\'s Included'}</SectionSubHeader>
                <ul>
                    {product.includedItemList.map((item, index) => {
                        return <li key={index}>{item.includedItem}</li>;
                    })}
                </ul>
                <SectionSubHeader>Ratings</SectionSubHeader>
                <RatingStars product={product} big />
            </div>
            <div className="columnRight">
                <SectionSubHeader>Features</SectionSubHeader>
                <ul>
                    {product.features.map((feature, index) => {
                        return <li key={index}>{feature.feature}</li>;
                    })}
                </ul>
            </div>
        </StyledProductOverview>
    );
};

ProductOverview.propTypes = {
    product: PropTypes.shape({
        includedItemList: PropTypes.array,
        features: PropTypes.array
    })
};

export default ProductOverview;

// Styles
const StyledProductOverview = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;

    ul {
        padding-left: 20px;
    }

    ${SectionHeader} {
        width: 100%;
    }

    .columnLeft {
        flex: 1;
        margin-right: 20px;
    }

    .columnRight {
        flex: 2;
    }
`;
