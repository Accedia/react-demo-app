import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchDailyDeals, fetchMostPopular } from '../../actions/index';
import { SectionHeader } from '../../styles';
import ProductsGridItems from './ProductsGridItems';

class ProductsGrid extends React.Component {
    componentDidMount() {
        if (this.props.gridType === 'dailyDeals') {
            this.props.fetchDailyDeals();
        } else {
            this.props.fetchMostPopular();
        }
    }

    render() {
        return (
            <ProductsGridWrapper>
                <SectionHeader>{this.props.headerText}</SectionHeader>
                <ProductsGridItems products={this.props.products} />
            </ProductsGridWrapper>
        );
    }
}

ProductsGrid.propTypes = {
    gridType: PropTypes.oneOf(['dailyDeals', 'mostPopular']).isRequired,
    fetchDailyDeals: PropTypes.func.isRequired,
    fetchMostPopular: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    headerText: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        products:
            ownProps.gridType === 'dailyDeals'
                ? state.dailyDeals
                : state.mostPopular,
        selectedCategory: state.selectedCategory
    };
};

export default connect(
    mapStateToProps,
    { fetchDailyDeals, fetchMostPopular }
)(ProductsGrid);

// Styles
const ProductsGridWrapper = styled.div`
    margin-bottom: 20px;
`;
