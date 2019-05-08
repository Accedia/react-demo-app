import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationFooter = ({ currentPage, totalPages, onPageSelect }) => {
    const onPageButtonClick = val => {
        if (val !== '...' && onPageSelect) {
            onPageSelect(val);
        }
    };

    const getPageButtonsCollection = () => {
        const buttons = [];

        for (let i = currentPage - 3; i <= currentPage + 3; i++) {
            if (i >= 1 && i <= totalPages) {
                buttons.push(i);
            }
        }

        if (buttons[0] > 1) {
            if (buttons[0] > 2) {
                buttons.splice(0, 0, '...');
            }

            buttons.splice(0, 0, 1);
        }

        if (buttons[buttons.length - 1] < totalPages) {
            if (buttons[buttons.length - 1] < totalPages - 1) {
                buttons.push('...');
            }

            buttons.push(totalPages);
        }

        return buttons;
    };

    const renderPageButtons = () => {
        return getPageButtonsCollection().map((el, index) => {
            return (
                <PageButton
                    key={index}
                    current={el === currentPage}
                    collapsed={el === '...'}
                    onClick={() => onPageButtonClick(el)}
                >
                    {el}
                </PageButton>
            );
        });
    };

    return <StyledFooter>{renderPageButtons()}</StyledFooter>;
};

PaginationFooter.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageSelect: PropTypes.func
};

export default PaginationFooter;

// Styles
const StyledFooter = styled.footer`
    width: 80%;
    padding: 20px 0;

    text-align: center;
`;

const PageButton = styled.span`
    padding: 3px 10px;
    margin: 0 3px;
    border-radius: 50px;
    background-color: #e0e0e0;
    cursor: pointer;
    user-select: none;

    ${props => {
        if (props.current) {
            return `background-color: #0046be;
                    color: #fff;`;
        } else if (props.collapsed) {
            return `background-color: initial;
                    margin: 0;
                    cursor: default;`;
        }
    }}
`;
