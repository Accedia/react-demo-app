import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAlsoViewed } from '../../actions';
import { SectionSubHeader } from '../../styles';
import ProductsGridItems from '../common/ProductsGridItems';

class AlsoViewed extends React.Component {
    componentDidMount() {
        this.props.fetchAlsoViewed(this.props.productSku);
    }

    render() {
        return (
            <section>
                <SectionSubHeader>People Also Viewed</SectionSubHeader>
                <ProductsGridItems
                    products={this.props.alsoViewed}
                    singleLine
                />
            </section>
        );
    }
}

AlsoViewed.propTypes = {
    productSku: PropTypes.number,
    alsoViewed: PropTypes.array,
    fetchAlsoViewed: PropTypes.func
};

const mapStateToProps = state => {
    return {
        alsoViewed: state.alsoViewed
    };
};

export default connect(
    mapStateToProps,
    { fetchAlsoViewed }
)(AlsoViewed);
