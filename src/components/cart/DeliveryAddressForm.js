import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';

import { renderFormInput } from '../../helpers';

const DeliveryAddressForm = () => {
    return (
        <StyledForm>
            <Field
                name="addressLine1"
                label="Address"
                component={renderFormInput}
            />
            <Field name="addressLine2" component={renderFormInput} />
            <Field name="country" label="Country" component={renderFormInput} />
            <Field name="city" label="City" component={renderFormInput} />
            <Field
                name="postalCode"
                label="Postal Code"
                component={renderFormInput}
            />
        </StyledForm>
    );
};

export default reduxForm({
    form: 'deliveryAddress'
})(DeliveryAddressForm);

// Styles
const StyledForm = styled.form`
    width: 400px;
`;
