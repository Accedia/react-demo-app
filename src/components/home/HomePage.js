import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CategoriesList from './CategoriesList';
import ProductsGrid from '../common/ProductsGrid';
import { clearSelectedCategory, fetchMostPopular } from '../../actions';
import {
    SectionHeader,
    ClearButton,
    StyledPage,
    MainContent
} from '../../styles';

const HomePage = props => {
    const handleClearCategoryClick = () => {
        props.clearSelectedCategory();
        props.fetchMostPopular();
    };

    return (
        <React.Fragment>
            <StyledPage>
                <CategoriesSidebar>
                    {props.selectedCategory && (
                        <ClearCategoryButton onClick={handleClearCategoryClick}>
                            Clear
                        </ClearCategoryButton>
                    )}
                    <SectionHeader>Categories</SectionHeader>
                    <CategoriesList />
                </CategoriesSidebar>
                <MainContent>
                    <ProductsGrid
                        headerText={
                            <React.Fragment>
                                Most Popular
                                {props.selectedCategory && (
                                    <HeaderSublabel>
                                        {`in ${props.selectedCategory.name}`}
                                    </HeaderSublabel>
                                )}
                            </React.Fragment>
                        }
                        gridType="mostPopular"
                    />
                    <ProductsGrid
                        headerText="Daily Deals"
                        gridType="dailyDeals"
                    />
                </MainContent>
            </StyledPage>
        </React.Fragment>
    );
};

HomePage.propTypes = {
    selectedCategory: PropTypes.object,
    fetchMostPopular: PropTypes.func,
    clearSelectedCategory: PropTypes.func
};

const mapStateToProps = state => {
    return {
        selectedCategory: state.selectedCategory
    };
};

export default connect(
    mapStateToProps,
    { clearSelectedCategory, fetchMostPopular }
)(HomePage);

// Styles
const CategoriesSidebar = styled.div`
    position: fixed;
    width: 300px;
    height: calc(100% - 90px);
    padding: 10px 10px 10px 50px;
    border-right: 1px solid #e0e0e0;
    background-color: #fff;
    overflow-y: auto;
`;

const HeaderSublabel = styled.span`
    margin-left: 5px;
    font-size: 0.8em;
    color: #757575;
`;

const ClearCategoryButton = styled(ClearButton)`
    float: right;
    height: 28px;
    padding: 0;
`;
