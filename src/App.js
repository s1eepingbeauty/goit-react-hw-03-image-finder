import { Component } from 'react';
import apiService from './utils/apiService';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from 'react-loader-spinner';
import './App.scss';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    imgData: [],
    showModal: false,
    currentImg: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;
    const gallery = document.querySelector('.ImageGallery');

    if (newQuery !== prevQuery) {
      this.setState({ imgList: [] });
      gallery.innerHTML = '';
      this.handleFetchData(newQuery);
    }
  }

  handleSubmit = (searchQuery) => {
    this.setState({ searchQuery, page: 1 });
  };

  handleFetchData = (newQuery) => {
    const { page } = this.state;

    apiService(newQuery, page)
      .then((data) => {
        if (data.length === 0) {
          return alert('No images found');
        }
        this.setState((prevState) => ({
          imgData: [...prevState.imgData, ...data],
        }));
      })
      .catch(({ message }) =>
        console.log(message)
      )
      .finally(() => {
        window.scrollBy({
          top: window.innerHeight,
          left: 0,
          behavior: 'smooth',
        });
        this.setState(prevState => ({ page: (prevState.page += 1) }));
      });
  };

  handleLoadMore = () => {
    const { searchQuery } = this.state;
    this.handleFetchData(searchQuery);  
  };

  handleImgClick = (event) => {
    const img = event.target;
    const url = img.dataset.source;
    const alt = img.tags;

    if (event.target.nodeName === 'IMG') {
      this.setState({ currentImg: { url, alt } });
    }
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { imgData, showModal, currentImg } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery onImgClick={this.handleImgClick} imgData={imgData} />
        <Loader
          visible="false"
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
        {imgData.length > 0 && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal
            url={currentImg.url}
            alt={currentImg.alt}
            onClose={this.toggleModal}>
          </Modal>
        )}
      </>
    );
  }
}
