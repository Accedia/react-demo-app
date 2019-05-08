import styled, { css } from 'styled-components';

export const BoldText = css`
    font-weight: bold;
    display: ${props => (props.block ? 'block' : 'inline-block')};
`;

export const MultilineEllipsis = css`
    overflow: hidden;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: ${props => props.numberOfLines || 3};
    -webkit-box-orient: vertical;
`;

export const StyledLink = styled.a`
    color: #0046be;
    text-decoration: none;

    :hover {
        color: #001e73;
        text-decoration: underline;
    }
`;

export const Button = styled.button`
    display: inline-block;
    height: 35px;
    padding: 0 28px;
    background-color: #0046be;
    border: 0;
    border-radius: 4px;
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    transition: all 0.3s ease-out 0s;
    color: #fff;

    i.fab,
    i.fas {
        font-size: 16px;
        margin-right: 9px;
        vertical-align: baseline;
    }

    :hover {
        background-color: #003085;
    }
`;

export const Avatar = styled.img`
    display: block;
    width: 55px;
    height: 55px;
    border-radius: 50px;
`;

export const FormInputWrapper = styled.div`
    margin-bottom: 10px;
`;

export const FormLabel = styled.label`
    display: inline-block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #616161;
`;

export const FormInput = styled.input`
    display: block;
    width: 100%;
    padding: 7px 10px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    outline: none;
    font: inherit;

    &[type='checkbox'] {
        display: inline;
        width: initial;
        margin: 0 10px;
        vertical-align: middle;
    }

    &.error {
        border-color: red;
    }
`;

export const FormTextArea = styled.textarea`
    display: block;
    width: 100%;
    height: 65px;
    padding: 7px 10px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    outline: none;
    font: inherit;
    resize: none;

    &.error {
        border-color: red;
    }
`;

export const FormError = styled.div`
    color: red;
`;

export const SectionHeader = styled.h3`
    margin: 0;
    margin-bottom: 10px;
`;

export const SectionSubHeader = styled.h4`
    margin: 0;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
`;

export const StyledPage = styled.section`
    display: ${props => props.display || 'flex'};
    padding-top: 70px;
`;

export const MainContent = styled.section`
    flex-grow: 1;
    padding: 10px 50px 10px 10px;
    margin-left: 370px;

    :after {
        content: '';
        display: block;
        clear: both;
    }
`;

export const ClearButton = styled(Button)`
    padding: 3px 7px;
    border: none;
    background: none;
    color: #0046be;

    :hover {
        background: none;
        color: #001e73;
    }
`;

export const ProductName = styled(StyledLink)`
    ${BoldText}
    ${props => (!props.singleline ? MultilineEllipsis : '')};
    margin: 5px 0;
    font-size: 1.1em;
    line-height: 1.4em;
    ${props => (!props.singleline ? 'height: 4.2em;' : '')}
`;
