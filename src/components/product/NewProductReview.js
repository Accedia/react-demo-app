import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { postProductReview } from '../../actions';
import { renderFormInput } from '../../helpers';
import { FormInputWrapper, Button } from '../../styles';
import RatingStars from '../common/RatingStars';

const NewProductReview = props => {
    const onSubmit = formValues => {
        const errors = validate(formValues);
        if (Object.keys(errors).length === 0)
            props.postProductReview(
                formValues.title,
                formValues.body,
                formValues.rating
            );
    };

    return (
        <NewReviewWrapper>
            <form onSubmit={props.handleSubmit(onSubmit)}>
                <Field name="title" label="Title" component={renderFormInput} />
                <Field
                    name="body"
                    label="Body"
                    type="textarea"
                    component={renderFormInput}
                />
                <StyledFormInputWrapper>
                    <Button>Post review</Button>
                    <RatingStars big editable />
                    <Field
                        name="rating"
                        type="hidden"
                        component={renderFormInput}
                    />
                </StyledFormInputWrapper>
            </form>
        </NewReviewWrapper>
    );
};

NewProductReview.propTypes = {
    productSku: PropTypes.number,
    dispatch: PropTypes.func,
    postProductReview: PropTypes.func,
    handleSubmit: PropTypes.func
};

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'Title is required';
    }

    if (!formValues.body) {
        errors.body = 'Body is required';
    }

    if (!formValues.rating) {
        errors.rating = 'Rating is required';
    }

    return errors;
};

const formWrapped = reduxForm({
    form: 'newProductReview',
    validate
})(NewProductReview);

const mapStateToProps = state => {
    return {
        initialValues: {
            rating: state.selectedNewReviewRating
        },
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    };
};

export default connect(
    mapStateToProps,
    { postProductReview }
)(formWrapped);

// Styles
const NewReviewWrapper = styled.div``;

const StyledFormInputWrapper = styled(FormInputWrapper)`
    :after {
        content: '';
        display: block;
        clear: both;
    }

    ${Button} {
        float: right;
    }
`;
