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
    showModal: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery){
      this.setState({ imgList: []});
    }
  }

  handleSubmit = (searchQuery) => {
    this.setState({ searchQuery });
    apiService(searchQuery, this.state.page)
      .then(data => {
        if (data.length === 0) {
          return alert('No images found');
        }
        this.setState(prevState => ({
          imgData: [...prevState.imgData, ...data],
        }));
      })
  };

  handleImgClick = () => {
    
  };

  handleLoadMore = () => {
    console.log('before ' + this.state.page);
    this.setState((prevState) => ({ page: (prevState.page += 1) }));
    console.log('after+1 ' + this.state.page);
    const { searchQuery, page } = this.state;
    apiService(searchQuery, page).then(data => {
      this.setState(prevState => ({
        imgData: [...prevState.imgData, ...data],
      }));
      window.scrollBy({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
      });
    });
    console.log('after fetch' + this.state.page);
  };
  
  toggleModal = () => {
    this.setState(({ showModal }) => (
      { showModal: !showModal }
    ));
  };

  render() {
    const { imgData, showModal } = this.state;
  
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery handleImgClick={this.handleImgClick} imgData={imgData} />
        <Loader
          visible="false"
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
        <Button onClick={this.handleLoadMore} />
        {showModal && (
          <Modal>
            <button type="button" onClick={this.toggleModal}>X</button>
          </Modal>
        )}
      </>
    );
  }
}
