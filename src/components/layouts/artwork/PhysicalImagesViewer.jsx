import React, { useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import {
  ArtworkCollectionName, PhyscialImage, PhysicalImagesPageWrapper, PhysicalImagesWrapper,
} from './artwork.styles';

function PhysicalImagesViewer(props) {
  const { physicalImages } = props;
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const theme = useSelector((state) => state.themeReducer.theme);

  const openImageViewer = (index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  function generateUniqueId() {
    return uuidv4();
  }

  return (
    <PhysicalImagesPageWrapper>
      <ArtworkCollectionName theme={theme}>
        Pictures of the physical artwork:
      </ArtworkCollectionName>
      <PhysicalImagesWrapper>
        {physicalImages?.map((image, index) => (
          <PhyscialImage key={generateUniqueId()}>
            <button type="button" onClick={() => openImageViewer(index)} aria-label={`Open image ${index + 1}`}>
              <img
                src={image.image_url}
                key={generateUniqueId()}
                style={{ margin: '2px' }}
                alt={`Physical Artwork ${index + 1}`}
              />
            </button>
          </PhyscialImage>
        ))}
      </PhysicalImagesWrapper>

      {isViewerOpen && (
        <ImageViewer
          src={physicalImages?.map((image) => image.image_url) || []}
          currentIndex={currentImage}
          disableScroll
          closeOnClickOutside
          onClose={closeImageViewer}
        />
      )}
    </PhysicalImagesPageWrapper>
  );
}

PhysicalImagesViewer.propTypes = {
  physicalImages: PropTypes.arrayOf(
    PropTypes.shape({
      image_title: PropTypes.string,
      image_url: PropTypes.string,
    }),
  ),
};

PhysicalImagesViewer.defaultProps = {
  physicalImages: [],
};

export default PhysicalImagesViewer;
