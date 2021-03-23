import { Component } from 'react';
import apiService from './utils/apiService';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from 'react-loader-spinner';
import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import './App.scss';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    imgData: [],
    currentImg: {},
    showModal: false,
    showSpinner: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;

    if (newQuery !== prevQuery) {
      this.setState({ imgData: [], showSpinner: true });
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
          return error({
            text: 'No matching images found, please enter new search terms...',
            hide: true,
            delay: 2000,
          });
        }
        this.setState((prevState) => ({
          imgData: [...prevState.imgData, ...data],
        }));
        success({
          text: 'Here you go :)',
          hide: true,
          delay: 1000,
        });
      })
      .catch(({ message }) => console.log(message))
      .finally(() => {
        this.setState({ showSpinner: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        this.setState((prevState) => ({ page: (prevState.page += 1) }));
      });
  };

  handleLoadMore = () => {
    const { searchQuery } = this.state;
    this.setState({ showSpinner: true });
    this.handleFetchData(searchQuery);
  };

  handleImgClick = (event) => {
    const img = event.target;
    const url = img.dataset.source;
    const alt = img.alt;

    if (img.nodeName === 'IMG') {
      this.setState({ currentImg: { url, alt } });
    }
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { imgData, showModal, currentImg, showSpinner } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <div className="gallery">
          <ImageGallery onImgClick={this.handleImgClick} imgData={imgData} />
          <Loader
            className="spinner"
            type="Oval"
            color="#00BFFF"
            height={80}
            width={80}
            visible={showSpinner}
          />
          {imgData.length !== 0 && <Button onClick={this.handleLoadMore} />}
        </div>
        {showModal && (
          <Modal url={currentImg.url} alt={currentImg.alt} onClose={this.toggleModal}></Modal>
        )}
      </>
    );
  }
}
