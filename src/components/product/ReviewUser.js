import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar } from '../../styles';

const ReviewUser = ({ user }) => {
    if (!user) {
        return <User />;
    }

    return (
        <User>
            <Avatar src={user.avatar} />
            <Name>
                {(user.name.title || '') +
                    ' ' +
                    user.name.first +
                    ' ' +
                    user.name.last}
            </Name>
            <UserName>
                <i className="fas fa-at" />
                {user.username}
            </UserName>
        </User>
    );
};

ReviewUser.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.shape({
            title: PropTypes.string,
            first: PropTypes.string.isRequired,
            last: PropTypes.string.isRequired
        }).isRequired,
        username: PropTypes.string.isRequired
    })
};

export default ReviewUser;

// Styles
const User = styled.div`
    flex: 1;
    font-size: 0.9em;
    margin-right: 20px;
`;

const Name = styled.div`
    margin-top: 5px;
    font-weight: bold;
    text-transform: capitalize;
`;

const UserName = styled.div`
    margin-top: 5px;

    i {
        margin-right: 3px;
        color: #0046be;
    }
`;
