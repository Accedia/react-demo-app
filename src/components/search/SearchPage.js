import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import history from '../../history';
import { searchProducts } from '../../actions';
import { StyledPage, MainContent, SectionHeader } from '../../styles';
import SearchResultsTable from './SearchResultsTable';

class SearchPage extends React.Component {
    componentDidMount() {
        const params = queryString.parse(location.search);
        this.props.searchProducts(params.q);
    }

    onPageSelect = page => {
        const params = queryString.parse(location.search);
        history.push(`/search?q=${params.q}&page=${page}`);
        this.props.searchProducts(params.q, page);
    };

    render() {
        return (
            <React.Fragment>
                <StyledPage>
                    <MainContent>
                        <SectionHeader>Search results</SectionHeader>
                        <SearchResultsTable onPageSelect={this.onPageSelect} />
                    </MainContent>
                </StyledPage>
            </React.Fragment>
        );
    }
}

SearchPage.propTypes = {
    searchProducts: PropTypes.func,
    match: PropTypes.any
};

export default connect(
    null,
    { searchProducts }
)(SearchPage);
