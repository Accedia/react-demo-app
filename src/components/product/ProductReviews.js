import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchReviewsAndUsers } from '../../actions';
import { SectionSubHeader } from '../../styles';
import RatingStars from '../common/RatingStars';
import ReviewUser from './ReviewUser';
import NewProductReview from './NewProductReview';

class ProductReviews extends React.Component {
    componentDidMount() {
        this.props.fetchReviewsAndUsers(this.props.productSku);
    }

    renderReviews() {
        return this.props.reviews.map(review => {
            return (
                <Review key={review.id}>
                    <ReviewUser user={review.user} />
                    <ReviewContent>
                        <ReviewTitle>{review.title}</ReviewTitle>
                        <RatingStars
                            customerReviewAverage={review.rating}
                            big
                        />
                        <p>{review.body}</p>
                    </ReviewContent>
                </Review>
            );
        });
    }

    render() {
        return (
            <StyledProductReviews>
                <SectionSubHeader>Reviews</SectionSubHeader>
                <ReviewsWrapper>{this.renderReviews()}</ReviewsWrapper>
                <NewProductReview productSku={this.props.productSku} />
            </StyledProductReviews>
        );
    }
}

ProductReviews.propTypes = {
    productSku: PropTypes.number.isRequired,
    fetchReviewsAndUsers: PropTypes.func,
    reviews: PropTypes.array
};

const mapStateToProps = state => {
    return {
        reviews: state.productReviews
    };
};

export default connect(
    mapStateToProps,
    { fetchReviewsAndUsers }
)(ProductReviews);

// Styles
const StyledProductReviews = styled.section`
    margin-bottom: 20px;
`;

const ReviewsWrapper = styled.div``;

const Review = styled.div`
    display: flex;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
`;

const ReviewContent = styled.div`
    flex: 2;
`;

const ReviewTitle = styled.h4`
    margin-top: 0;
`;
