import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CategoryPath = props => {
    return (
        <div
            css={`
                width: 100%;
            `}
        >
            <BreadcrumbList>
                {props.categoryPath.map((x, index) => {
                    return (
                        <BreadcrumbListItem key={x.id}>
                            {x.name}
                            {index < props.categoryPath.length - 1 && (
                                <BreadcrumbDivider />
                            )}
                        </BreadcrumbListItem>
                    );
                })}
            </BreadcrumbList>
        </div>
    );
};

CategoryPath.propTypes = {
    categoryPath: PropTypes.array
};

export default CategoryPath;

// Styles
const BreadcrumbList = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0.8em;

    :after {
        content: '';
        display: table;
        clear: both;
    }
`;

const BreadcrumbListItem = styled.li`
    float: left;
    margin: 0;
    padding-right: 7px;
`;

const BreadcrumbDivider = styled.span`
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 7px;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid #9a9b9b;
`;
