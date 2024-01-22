import React, { useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

function PhysicalImagesViewer(props) {
  const { physicalImages } = props;
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

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
    <div>
      <h5>
        Pictures of the physical artwork:
      </h5>
      <div className="row" style={{ marginBottom: '3%', maxHeight: '250px', maxWidth: '250px' }}>
        {physicalImages?.map((image, index) => (
          <div key={generateUniqueId()}>
            <button type="button" onClick={() => openImageViewer(index)} aria-label={`Open image ${index + 1}`}>
              <img
                src={image.image_url}
                key={generateUniqueId()}
                style={{ margin: '2px' }}
                alt={`Physical Artwork ${index + 1}`}
              />
            </button>
          </div>
        ))}
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={physicalImages?.map((image) => image.image_url) || []}
          currentIndex={currentImage}
          disableScroll
          closeOnClickOutside
          onClose={closeImageViewer}
        />
      )}
    </div>
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
