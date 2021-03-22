import { Component } from 'react';
import { createPortal } from 'react-dom';
import Loader from 'react-loader-spinner'; 
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose();
      this.setState({ loading: true });
    }
  };

  handleOverlayClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
      this.setState({ loading: true });
    }
  };

  hangleImgLoad = () => {
    this.setState({ loading: false });
  }

  render() {
    const { url, alt } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          {/* {this.props.children} */}
          {this.state.loading && (
            <Loader
              visible="false"
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              //timeout={3000} //3 secs
            />
          )}
          <img className="modalImg" src={url} alt={alt} onLoad={this.hangleImgLoad} />
        </div>
      </div>,
      modalRoot,
    );
  }
}
