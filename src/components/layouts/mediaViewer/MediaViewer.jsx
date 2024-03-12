import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import placeHolderMainImage from '../../../assets/images/box-item/collection-item-bottom-4.jpg';

function MediaViewer({ mediaUrl }) {
  const [mediaType, setMediaType] = useState(''); // Possible values: 'image', 'video', 'unknown'

  useEffect(() => {
    const fetchMediaType = async () => {
      if (!mediaUrl) {
        setMediaType('unknown');
        return;
      }

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
        } else {
          setMediaType('unknown');
        }
      } catch (error) {
        console.error('Error fetching media:', error);
        setMediaType('unknown');
      }
    };

    fetchMediaType();
  }, [mediaUrl]);

  switch (mediaType) {
    case 'video':
      return (
        <video autoPlay muted loop>
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    case 'image':
      return (
        <img
          src={mediaUrl}
          alt="Artwork"
        />
      );
    case 'unknown':
    default:
      return (
        <img
          src={placeHolderMainImage}
          alt="Placeholder"
        />
      );
  }
}

MediaViewer.propTypes = {
  mediaUrl: PropTypes.string.isRequired,
};

export default MediaViewer;
