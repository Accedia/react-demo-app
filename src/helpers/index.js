import React from 'react';
import PropTypes from 'prop-types';
import he from 'he';
import {
    FormError,
    FormInputWrapper,
    FormLabel,
    FormInput,
    FormTextArea
} from '../styles';
import { USER_SIGNED_IN } from '../actions';
import { fetchUser } from '../actions';

import comingSoonImage from '../assets/image-coming-soon.svg';

export const userSignedIn = (dispatch, provider) => {
    let currentUserData = {};

    switch (provider) {
        case 'Local': {
            dispatch(fetchUser());
            break;
        }
        case 'Google': {
            const auth = window.gapi.auth2.getAuthInstance();
            const currentUser = auth.currentUser.get();
            const basicProfile = currentUser.getBasicProfile();
            const email = basicProfile.getEmail();

            currentUserData = {
                id: currentUser.getId(),
                avatar: basicProfile.getImageUrl(),
                name: {
                    first: basicProfile.getGivenName(),
                    last: basicProfile.getFamilyName()
                },
                username: email.substring(0, email.indexOf('@'))
            };
            break;
        }
    }

    dispatch({
        type: USER_SIGNED_IN,
        currentUser: currentUserData,
        provider,
        currentUserData
    });
};

export const formatPrice = value => {
    let decimalPlaces = value % 1 === 0 ? 0 : 2;
    return '$' + value.toFixed(decimalPlaces);
};

export const fixProductData = productData => {
    productData.longDescription = he.decode(
        productData.longDescription ||
            productData.description ||
            productData.shortDescription ||
            ''
    );

    productData.features.forEach(feature => {
        feature.feature = he.decode(feature.feature);
    });

    productData.thumbnail =
        productData.thumbnailImage ||
        productData.mediumImage ||
        productData.largeImage ||
        productData.image ||
        comingSoonImage;

    if (!productData.customerReviewCount) {
        productData.customerReviewCount = 0;
    }
    if (!productData.customerReviewAverage) {
        productData.customerReviewAverage = 0;
    }
    productData.onSale = productData.salePrice < productData.regularPrice;
    return productData;
};

export const mapProductDataBeta = product => {
    return {
        sku: parseInt(product.sku),
        name: product.names.title,
        largeImage: product.images.standard,
        customerReviewAverage: product.customerReviews.averageScore,
        customerReviewCount: product.customerReviews.count,
        salePrice: product.prices.current,
        dollarSavings: product.prices.regular - product.prices.current,
        regularPrice: product.prices.regular,
        onSale: product.prices.regular > product.prices.current
    };
};

export const getRequiredProductFields = () => {
    var productFields = [
        'sku',
        'name',
        'description',
        'longDescription',
        'shortDescription',
        'categoryPath',
        'images',
        'modelNumber',
        'customerReviewAverage',
        'customerReviewCount',
        'includedItemList',
        'features',
        'dollarSavings',
        'regularPrice',
        'salePrice',
        'onSale',
        'onlineAvailabilityText',
        'thumbnailImage',
        'mediumImage',
        'largeImage',
        'image',
        'condition'
    ];

    return productFields.join(',');
};

export const renderFormError = ({ error, touched }) => {
    if (touched && error) {
        return <FormError>{error}</FormError>;
    }
};

export const renderFormInput = ({ input, label, type, meta }) => {
    return (
        <FormInputWrapper
            css={
                type === 'hidden' && !(meta.touched && meta.error)
                    ? 'display: none;'
                    : ''
            }
        >
            {label && <FormLabel>{label}</FormLabel>}
            {type === 'textarea' ? (
                <FormTextArea
                    {...input}
                    className={meta.touched && meta.error ? 'error' : ''}
                />
            ) : (
                <FormInput
                    {...input}
                    className={meta.touched && meta.error ? 'error' : ''}
                    type={type || 'text'}
                />
            )}
            {renderFormError(meta)}
        </FormInputWrapper>
    );
};
renderFormInput.propTypes = {
    input: PropTypes.any.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object
};
