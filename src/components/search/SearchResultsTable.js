import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RatingStars from '../common/RatingStars';
import ProductPrice from '../common/ProductPrice';
import { ProductName } from '../../styles';
import PaginationFooter from './PaginationFooter';

const SearchResultsTable = ({
    results,
    currentPage,
    totalPages,
    onPageSelect
}) => {
    const renderSearchResults = () => {
        return results.map(res => {
            return (
                <tr key={res.sku}>
                    <td className="image-cell">
                        <img src={res.thumbnail} />
                    </td>
                    <td className="product-cell">
                        <ProductName
                            singleline="true"
                            as={Link}
                            to={`/product/${res.sku}`}
                        >
                            {res.name}
                        </ProductName>
                    </td>
                    <td className="condition-cell">{res.condition}</td>
                    <td className="availability-cell">
                        {res.onlineAvailabilityText}
                    </td>
                    <td className="rating-cell">
                        <RatingStars product={res} />
                    </td>
                    <td className="price-cell">
                        <ProductPrice product={res} singleLine />
                    </td>
                </tr>
            );
        });
    };

    if (!results) {
        return <div>Loading...</div>;
    }

    if (results.length === 0) {
        return <div>No items found</div>;
    }

    return (
        <React.Fragment>
            <StyledTable>
                <thead>
                    <tr>
                        <th colSpan="2">Product</th>
                        <th>Condition</th>
                        <th>Availability</th>
                        <th>Rating</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{renderSearchResults()}</tbody>
            </StyledTable>
            <PaginationFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageSelect={onPageSelect}
            />
        </React.Fragment>
    );
};

SearchResultsTable.propTypes = {
    results: PropTypes.array,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    onPageSelect: PropTypes.func
};

const mapStateToProps = state => {
    return {
        results: state.searchResults.results,
        currentPage: state.searchResults.currentPage,
        totalPages: state.searchResults.totalPages
    };
};

export default connect(mapStateToProps)(SearchResultsTable);

// Styles
const StyledTable = styled.table`
    width: 80%;

    td {
        padding: 10px 0;
        border-bottom: 1px solid #e0e0e0;
    }

    .image-cell {
        img {
            display: inline-block;
            width: 50px;
            height: 50px;
            object-fit: contain;
        }
    }

    .product-cell {
        ${ProductName} {
            margin: 0 0 0 10px;
        }
    }

    .condition-cell {
        width: 100px;
        text-align: center;
    }

    .availability-cell {
        max-width: 300px;
        text-align: center;
    }

    .rating-cell {
        width: 165px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .price-cell {
        width: 150px;
        text-align: center;
    }
`;
