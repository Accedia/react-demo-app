import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
    changeCartItemQuantity,
    removeProductFromCart,
    requestRemoveFromCart,
    cancelRemoveFromCart
} from '../../actions';
import { ProductName, FormInput, ClearButton } from '../../styles';
import ProductPrice from '../common/ProductPrice';
import Modal from '../common/Modal';

class CartItemGrid extends React.Component {
    constructor(props) {
        super(props);

        this.modalDeleteButtonAction = () => {};
    }

    onQuantityChange(productSku, quantity) {
        this.props.changeCartItemQuantity(productSku, quantity);
    }

    onRemoveClick(productSku) {
        this.props.requestRemoveFromCart();

        this.modalDeleteButtonAction = () => {
            this.props.removeProductFromCart(productSku);
        };
    }

    renderCartItems() {
        return Object.keys(this.props.cartItems).map(productSku => {
            const product = this.props.cartItems[productSku];
            return (
                <tr key={productSku}>
                    <td className="image-cell">
                        <img src={product.thumbnail} />
                    </td>
                    <td className="product-cell">
                        <ProductName
                            singleline="true"
                            as={Link}
                            to={`/product/${productSku}`}
                        >
                            {product.name}
                        </ProductName>
                    </td>
                    <td className="price-cell">
                        <ProductPrice product={product} singleLine />
                    </td>
                    <td className="quantity-cell">
                        <FormInput
                            value={product.quantity}
                            onChange={e =>
                                this.onQuantityChange(
                                    productSku,
                                    e.target.value
                                )
                            }
                        />
                    </td>
                    <td className="price-cell">
                        <ProductPrice
                            product={product}
                            singleLine
                            quantity={product.quantity}
                        />
                    </td>
                    <td className="remove-cell">
                        <ClearButton
                            onClick={() => this.onRemoveClick(productSku)}
                        >
                            <i className="fas fa-trash" />
                        </ClearButton>
                    </td>
                </tr>
            );
        });
    }

    render() {
        if (Object.keys(this.props.cartItems).length === 0) {
            return <div>There are no items in your cart</div>;
        }

        return (
            <React.Fragment>
                <StyledTable>
                    <thead>
                        <tr>
                            <th colSpan="2">Product</th>
                            <th>Item Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{this.renderCartItems()}</tbody>
                </StyledTable>
                {this.props.isDeleting && (
                    <Modal
                        title="Remove from cart"
                        renderActions={() => {
                            return (
                                <React.Fragment>
                                    <ModalActionButton
                                        delete
                                        onClick={this.modalDeleteButtonAction}
                                    >
                                        Delete
                                    </ModalActionButton>
                                    <ModalActionButton
                                        onClick={() =>
                                            this.props.cancelRemoveFromCart()
                                        }
                                    >
                                        Cancel
                                    </ModalActionButton>
                                </React.Fragment>
                            );
                        }}
                    >
                        Are you sure you want to remove this item from the cart?
                    </Modal>
                )}
            </React.Fragment>
        );
    }
}

CartItemGrid.propTypes = {
    cartItems: PropTypes.object,
    isDeleting: PropTypes.bool,
    changeCartItemQuantity: PropTypes.func,
    removeProductFromCart: PropTypes.func,
    requestRemoveFromCart: PropTypes.func,
    cancelRemoveFromCart: PropTypes.func
};

const mapStateToProps = state => {
    return {
        cartItems: state.cart.items,
        isDeleting: state.cart.isDeleting
    };
};

export default connect(
    mapStateToProps,
    {
        changeCartItemQuantity,
        removeProductFromCart,
        requestRemoveFromCart,
        cancelRemoveFromCart
    }
)(CartItemGrid);

// Styles
const StyledTable = styled.table`
    width: 80%;

    td {
        padding: 10px 0;
        border-bottom: 1px solid #e0e0e0;
    }

    .image-cell {
        img {
            display: inline-block;
            width: 50px;
            height: 50px;
            object-fit: contain;
        }
    }

    .product-cell {
        ${ProductName} {
            margin: 0 0 0 10px;
        }
    }

    .quantity-cell {
        width: 70px;
    }

    .price-cell {
        width: 150px;
        text-align: center;
    }

    .remove-cell i.fas {
        margin: 0;
    }
`;

const ModalActionButton = styled(ClearButton)`
    margin: 0 5px;
    ${props => (props.delete ? 'color: #bb0628' : '')};

    :hover {
        ${props => (props.delete ? 'color: #82041c' : '')};
    }
`;
