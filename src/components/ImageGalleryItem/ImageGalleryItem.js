import PropTypes from 'prop-types';
import './ImageGalleryItem.scss';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
}

export default ImageGalleryItem;
