import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { selectNewReviewRating } from '../../actions';
import { BoldText } from '../../styles';

import starsFilledImage from '../../assets/stars-filled.png';
import starsUnfilledImage from '../../assets/stars-unfilled.png';
import starsFilledBigImage from '../../assets/stars-filled-big.png';
import starsUnfilledBigImage from '../../assets/stars-unfilled-big.png';

const RatingStars = props => {
    const [reviewRating, setReviewRating] = useState(0);

    const onStarsMouseMove = e => {
        let elementRect = e.currentTarget.getBoundingClientRect();
        let selectedPercent = (e.clientX - elementRect.x) / elementRect.width;
        let selectedStars = Math.floor(5 * selectedPercent + 1);

        setReviewRating(selectedStars);
    };

    const onStarsMouseLeave = () => {
        setReviewRating(0);
    };

    const onStarsClick = () => {
        props.selectNewReviewRating(reviewRating);
    };

    const renderAverageLabel = customerReviewAverage => {
        if (props.editable) {
            switch (reviewRating || props.selectedReviewRating) {
                case 1:
                    return 'Poor';
                case 2:
                    return 'Fair';
                case 3:
                    return 'Average';
                case 4:
                    return 'Good';
                case 5:
                    return 'Excelent';
                default:
                    return '';
            }
        } else {
            return customerReviewAverage;
        }
    };

    let { customerReviewAverage, customerReviewCount } = props;
    if (props.product) {
        customerReviewAverage = props.product.customerReviewAverage;
        customerReviewCount = props.product.customerReviewCount;
    }

    return (
        <Rating big={props.big}>
            <RatingStarsWrapper
                big={props.big}
                onMouseMove={props.editable ? onStarsMouseMove : () => {}}
                onMouseLeave={props.editable ? onStarsMouseLeave : () => {}}
                onClick={props.editable ? onStarsClick : () => {}}
            >
                <RatingStarsImage big={props.big} />
                <RatingStarsImage
                    filled
                    big={props.big}
                    style={{
                        width:
                            (100 *
                                (reviewRating ||
                                    props.selectedReviewRating ||
                                    customerReviewAverage ||
                                    0)) /
                                5.0 +
                            '%'
                    }}
                />
            </RatingStarsWrapper>
            <ReviewAverage big={props.big} editable={props.editable}>
                {renderAverageLabel(customerReviewAverage)}
            </ReviewAverage>
            {!isNaN(customerReviewCount) && (
                <TotalReviews big={props.big}>
                    ({customerReviewCount + (props.big ? ' reviews' : '')})
                </TotalReviews>
            )}
        </Rating>
    );
};

RatingStars.propTypes = {
    big: PropTypes.bool,
    editable: PropTypes.bool,
    product: PropTypes.shape({
        customerReviewAverage: PropTypes.number.isRequired,
        customerReviewCount: PropTypes.number.isRequired
    }),
    customerReviewAverage: PropTypes.number,
    customerReviewCount: PropTypes.number,
    selectNewReviewRating: PropTypes.func,
    selectedReviewRating: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
    return {
        selectedReviewRating: ownProps.editable
            ? state.selectedNewReviewRating
            : 0
    };
};

export default connect(
    mapStateToProps,
    { selectNewReviewRating }
)(RatingStars);

// Styles
const Rating = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 5px;
`;

const RatingStarsWrapper = styled.span`
    display: inline-block;
    position: relative;
    width: ${props => (props.big ? '150px;' : '89px;')};
    height: ${props => (props.big ? '28px;' : '16px;')};
    margin-right: ${props => (props.big ? '10px;' : '5px;')};
`;

const RatingStarsImage = styled.span`
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: ${props => (props.big ? '150px 28px;' : '89px 16px;')};
    background-repeat: no-repeat;
    background-image: ${props => {
        let urlStr = null;
        if (props.big) {
            if (props.filled) {
                urlStr = starsFilledBigImage;
            } else {
                urlStr = starsUnfilledBigImage;
            }
        } else {
            if (props.filled) {
                urlStr = starsFilledImage;
            } else {
                urlStr = starsUnfilledImage;
            }
        }
        return `url('${urlStr}')`;
    }};
`;

const ReviewAverage = styled.span`
    ${BoldText}
    margin-right: ${props => (props.big ? '0px' : '5px;')};
    font-size: ${props => (props.big && !props.editable ? '30px;' : '13px;')};
    ${props => (props.big ? 'line-height: 1em;' : '')};
    ${props => (props.editable ? 'line-height: 28px;' : '')};
`;

const TotalReviews = styled.span`
    ${props => (props.big ? '' : 'font-size: 13px;')};
    ${props => (props.big ? 'width: 100%;' : '')};
    ${props => (props.big ? 'margin-top: 10px;' : '')};
`;
