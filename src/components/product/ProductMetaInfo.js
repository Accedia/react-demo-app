import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BoldText } from '../../styles';

const ProductMetaInfo = ({ product }) => {
    return (
        <StyledMetaInfo>
            <span className="label">Model:</span>
            <span>{product.modelNumber}</span>
            <span className="label">SKU:</span>
            <span>{product.sku}</span>
        </StyledMetaInfo>
    );
};

ProductMetaInfo.propTypes = {
    product: PropTypes.shape({
        modelNumber: PropTypes.string,
        sku: PropTypes.number
    })
};
export default ProductMetaInfo;

// Styles
const StyledMetaInfo = styled.div`
    margin-bottom: 5px;
    font-size: 0.9em;

    span {
        margin-right: 21px;
    }

    .label {
        ${BoldText}
        margin-right: 7px;
    }
`;
