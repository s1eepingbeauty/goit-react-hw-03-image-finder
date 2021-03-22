import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import './ImageGallery.scss';

export default class ImageGallery extends Component{
  render() {
    const { onImgClick, imgData } = this.props;

    return (
      <ul className="ImageGallery" onClick={onImgClick}>
        {/* <!-- Набор <li> с изображениями --> */}
        {imgData.map(({ webformatURL, tags, largeImageURL }, index) => (
          <ImageGalleryItem
            key={index}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
    );
  }
};

ImageGallery.propType = {
  onClick: PropTypes.func.isRequired,
  imgData: PropTypes.array.isRequired,
}
