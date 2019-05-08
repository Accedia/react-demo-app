import React, { useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import styled from 'styled-components';
import history from '../../history';
import { connect } from 'react-redux';
import { searchProducts } from '../../actions';

const SearchField = props => {
    const params = queryString.parse(location.search);
    const [query, setQuery] = useState(params.q || '');

    const onSearchClick = () => {
        history.push(`/search?q=${query}`);
        props.searchProducts(query);
    };

    const onInputKeyPress = e => {
        if (e.key === 'Enter') {
            onSearchClick();
        }
    };

    return (
        <StyledSearchField>
            <input
                type="text"
                placeholder="Search products"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={onInputKeyPress}
            />
            <button onClick={onSearchClick}>
                <i className="fas fa-search" />
            </button>
        </StyledSearchField>
    );
};

SearchField.propTypes = {
    query: PropTypes.string,
    searchProducts: PropTypes.func
};

export default connect(
    null,
    { searchProducts }
)(SearchField);

// Styles
const StyledSearchField = styled.div`
    position: absolute;
    display: inline-block;
    margin-top: 18px;
    left: 380px;

    input {
        height: 25px;
        width: 500px;
        padding: 3px 5px;
        border: 1px solid #e0e0e0;
        border-radius: 4px 0 0 4px;
        outline: none;
        background-color: #fff;
        vertical-align: top;
        font: inherit;
    }

    button {
        float: right;
        padding: 3px 5px;
        border: 1px solid #e0e0e0;
        border-radius: 0 4px 4px 0;
        background-color: #fff;
        color: #424242;
        cursor: pointer;

        i {
            display: block;
            font-size: 18px;
            height: 25px;
            padding: 3px;
            box-sizing: border-box;
            color: #757575;
        }
    }
`;
