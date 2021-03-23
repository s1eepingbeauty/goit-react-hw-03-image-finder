import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  state = {
    showSpinner: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose();
      this.setState({ showSpinner: true });
    }
  };

  handleOverlayClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
      this.setState({ showSpinner: true });
    }
  };

  handleImgLoad = () => {
    this.setState({ showSpinner: false });
  };

  render() {
    const { url, alt } = this.props;
    const { showSpinner } = this.state;

    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <Loader
            className="spinner"
            type="Oval"
            color="#00BFFF"
            height={80}
            width={80}
            visible={showSpinner}
          />
          <img className="modalImg" src={url} alt={alt} onLoad={this.handleImgLoad} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
