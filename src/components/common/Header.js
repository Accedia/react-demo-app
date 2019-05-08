import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { signOut, initCart } from '../../actions';
import { ClearButton, Avatar } from '../../styles';
import SearchField from './SearchField';

import logoImage from '../../assets/logo.png';

class Header extends React.Component {
    componentDidMount() {
        this.props.initCart();
    }

    render() {
        return (
            <HeaderWrapper>
                <Link to="/">
                    <Logo src={logoImage} />
                </Link>
                <SearchField query={this.props.match.params.query || ''} />
                <LogOutButton onClick={this.props.signOut}>
                    Log out
                </LogOutButton>
                {this.props.currentUser && (
                    <UserAvatar src={this.props.currentUser.avatar} />
                )}
                <CartIcon as={Link} to="/cart">
                    <i className="fas fa-shopping-cart" />
                    {this.props.cartBadge > 0 && (
                        <span className="badge">{this.props.cartBadge}</span>
                    )}
                </CartIcon>
            </HeaderWrapper>
        );
    }
}

Header.propTypes = {
    signOut: PropTypes.func,
    initCart: PropTypes.func,
    cartBadge: PropTypes.number,
    currentUser: PropTypes.shape({
        avatar: PropTypes.string
    }),
    match: PropTypes.any
};

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        cartBadge: Object.keys(state.cart.items).length
    };
};

export default connect(
    mapStateToProps,
    { signOut, initCart }
)(Header);

// Styles
const HeaderWrapper = styled.header`
    position: fixed;
    height: 70px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 50px;
    background-color: #0046be;
    z-index: 1;
`;

const Logo = styled.img`
    height: 50px;
    margin-top: 10px;
`;

const LogOutButton = styled(ClearButton)`
    float: right;
    margin-top: 18px;
    color: #fff;

    :hover {
        color: #bdbdbd;
    }
`;

const UserAvatar = styled(Avatar)`
    float: right;
    margin: 8px 10px 0 0;
`;

const CartIcon = styled.span`
    float: right;
    position: relative;
    margin: 17px 20px 0 0;
    color: #fff;
    font-size: 25px;
    user-select: none;

    :hover {
        color: #bdbdbd;
    }

    .badge {
        position: absolute;
        padding: 0px 5px;
        top: -3px;
        right: -10px;
        border-radius: 20px;
        color: #424242;
        font-size: 12px;
        background-color: #ffe000;
    }
`;
