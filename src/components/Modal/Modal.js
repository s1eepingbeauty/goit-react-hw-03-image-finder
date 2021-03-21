
import { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount() {
        console.log('Modal didMount');
    }

    componentWillUnmount() {
        console.log('Modal willUnmount');
    }
    
    render() {
        return createPortal(
            <div className="Overlay">
                <div className="Modal">
                    {this.props.children}
                    {/* <img src="" alt="" /> */}
                </div>
            </div>,
            modalRoot,
        );
    }
};