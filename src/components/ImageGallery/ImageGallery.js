import './ImageGallery.scss';

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

const ImageGallery = ({ handleImgClick, imgData }) => {
    return (
        <ul className="ImageGallery" onClick={handleImgClick}>
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
};

export default ImageGallery;