import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Modal extends React.Component {
    componentDidMount() {
        // Disable scroll on the body, while modal is on screen
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        // Enable back scroll on the body when modal is being closed
        document.body.style.overflow = '';
    }

    render() {
        return ReactDOM.createPortal(
            <ModalDimmer>
                <StyledModal>
                    <ModalTitle>{this.props.title}</ModalTitle>
                    <ModalContent>{this.props.children}</ModalContent>
                    <ModalActions>{this.props.renderActions()}</ModalActions>
                </StyledModal>
            </ModalDimmer>,
            document.getElementById('modal-root')
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    renderActions: PropTypes.func
};

export default Modal;

// Styles
const ModalDimmer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.8);
`;

const StyledModal = styled.div`
    position: absolute;
    width: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
`;

const ModalTitle = styled.div`
    padding: 10px;
    font-size: 1.1em;
    font-weight: bold;
    border-bottom: 1px solid #e0e0e0;
`;

const ModalContent = styled.div`
    padding: 10px;
`;

const ModalActions = styled.div`
    padding: 10px;
    text-align: right;
    border-top: 1px solid #e0e0e0;
`;
