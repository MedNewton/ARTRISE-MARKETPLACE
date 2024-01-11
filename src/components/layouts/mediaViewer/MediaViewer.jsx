import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import placeHolderMainImage from '../../../assets/images/box-item/collection-item-bottom-4.jpg';

function MediaViewer(props) {
  const { mediaUrl } = props;
  const [isVideo, setIsVideo] = useState(false);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    fetch(mediaUrl)
      .then((response) => {
        const contentType = response.headers.get('Content-Type');
        if (contentType?.includes('video')) {
          setIsVideo(true);
          setIsImage(false);
        } else if (contentType?.includes('image')) {
          setIsVideo(false);
          setIsImage(true);
        }
      });
  }, [mediaUrl]);

  if (isVideo) {
    return (
      <video autoPlay muted loop>
        <source src={mediaUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (isImage) {
    return (
      <img
        src={mediaUrl}
        alt="Artwork data not available"
      />
    );
  }

  return (
    <img
      src={placeHolderMainImage}
      alt="Artwork data not available"
    />
  );
}

MediaViewer.propTypes = {
  mediaUrl: PropTypes.string,
};

MediaViewer.defaultProps = {
  mediaUrl: '', // Provide a default value (e.g., an empty string) or null based on your use case.
};

export default MediaViewer;
