import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TreeView from 'react-treeview';

import {
    fetchCategories,
    toggleCategory,
    selectCategory,
    fetchMostPopular
} from '../../actions';

class CategoriesList extends React.Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    handleCategoryArrowClick(category) {
        if (!category.loadedChildren) {
            this.props.fetchCategories(category.id, category.level);
        }
        this.props.toggleCategory(category);
    }

    handleCategoryClick(category) {
        this.props.selectCategory(category);
        this.props.fetchMostPopular(category.id);
    }

    isCategorySelected(category) {
        if (this.props.selectedCategory) {
            return (
                category.id === this.props.selectedCategory.id &&
                category.level === this.props.selectedCategory.level
            );
        }
        return false;
    }

    renderCategoriesTreeView(categories = []) {
        if (categories.length === 0) {
            return '';
        } else {
            return categories.map((category, i) => {
                const label = (
                    <TreeItemLabel
                        onClick={this.handleCategoryClick.bind(this, category)}
                    >
                        {category.name}
                    </TreeItemLabel>
                );
                return (
                    <TreeView
                        key={i}
                        nodeLabel={label}
                        collapsed={category.collapsed}
                        className={
                            category.loadedChildren &&
                            category.subCategories.length === 0
                                ? 'empty'
                                : ''
                        }
                        itemClassName={
                            (category.invalid ? 'invalid' : '') +
                            ' ' +
                            (this.isCategorySelected(category)
                                ? 'selected'
                                : '')
                        }
                        onClick={this.handleCategoryArrowClick.bind(
                            this,
                            category
                        )}
                    >
                        {this.renderCategoriesTreeView(category.subCategories)}
                    </TreeView>
                );
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderCategoriesTreeView(this.props.categories)}
            </React.Fragment>
        );
    }
}

CategoriesList.propTypes = {
    fetchCategories: PropTypes.func,
    toggleCategory: PropTypes.func,
    selectCategory: PropTypes.func,
    fetchMostPopular: PropTypes.func,
    categories: PropTypes.array,
    selectedCategory: PropTypes.shape({
        id: PropTypes.string,
        level: PropTypes.number
    })
};

const mapStateToProps = state => {
    return {
        categories: state.categories,
        selectedCategory: state.selectedCategory
    };
};

export default connect(
    mapStateToProps,
    { fetchCategories, toggleCategory, selectCategory, fetchMostPopular }
)(CategoriesList);

// Styles
const TreeItemLabel = styled.div`
    margin-left: 22px;
    user-select: none;
`;
