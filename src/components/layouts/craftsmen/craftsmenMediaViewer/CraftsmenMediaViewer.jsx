import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import placeholderMainImage from '../../../../assets/images/box-item/collection-item-bottom-4.jpg';

function CraftsmenMediaViewer({ mediaUrl }) {
  const [mediaType, setMediaType] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(mediaUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType?.includes('video')) {
          setMediaType('video');
        } else if (contentType?.includes('image')) {
          setMediaType('image');
        }
      } catch (error) {
        console.error('Error fetching media:', error);
        setMediaType(null);
      }
    };

    if (mediaUrl) {
      fetchMedia();
    }
  }, [mediaUrl]);

  const commonStyles = {
    maxWidth: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    verticalAlign: 'middle',
    borderRadius: '10px',
  };

  if (mediaType === 'video') {
    return (
      <video autoPlay muted loop style={commonStyles}>
        <source src={mediaUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (mediaType === 'image') {
    return (
      <img
        src={mediaUrl}
        alt="Artwork"
        style={commonStyles}
      />
    );
  }

  return (
    <img
      src={placeholderMainImage}
      alt="Placeholder"
      style={commonStyles}
    />
  );
}

CraftsmenMediaViewer.propTypes = {
  mediaUrl: PropTypes.string,
};

CraftsmenMediaViewer.defaultProps = {
  mediaUrl: '',
};

export default CraftsmenMediaViewer;
