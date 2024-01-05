import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cardItem1 from '../../../assets/images/box-item/card-item-1.jpg';
import MediaViewer from '../mediaViewer/MediaViewer';

function ArtistPageMediaViewer(props) {
  const { artworksArray } = props;
  const [artworksImagesArray, setArtworksImagesArray] = useState([]);

  useEffect(() => {
    if (artworksArray) {
      artworksArray?.forEach((artworkURI) => {
        if (artworkURI.includes('http')) {
          fetch(artworkURI).then((response) => response.json())
            .then((data) => {
              const imageURL = data?.image;
              if (imageURL.includes('http')) {
                setArtworksImagesArray((prevState) => [...prevState, imageURL]);
              }
            });
        }
      });
    }
    return () => {
      setArtworksImagesArray([]);
    };
  }, [artworksArray]);

  if (artworksImagesArray) {
    return (
      <div className="artist-page-images-wrapper">
        <div className="left-media-box">
          <MediaViewer mediaUrl={artworksImagesArray && artworksImagesArray[0]} />
        </div>
        <div className="right-media-box">
          <div className="top-right-media-section">
            <MediaViewer
              mediaUrl={artworksImagesArray[1] ? artworksImagesArray[1] : artworksImagesArray[0]}
            />
            <MediaViewer
              mediaUrl={artworksImagesArray[2] ? artworksImagesArray[2] : artworksImagesArray[0]}
            />
          </div>
          <div className="bottom-right-media-section">
            <MediaViewer
              mediaUrl={artworksImagesArray[3] ? artworksImagesArray[3] : artworksImagesArray[0]}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="artist-page-images-wrapper">
      <div className="left-media-box">
        <img src={cardItem1} alt="Artwork data not available" />
      </div>
      <div className="right-media-box">
        <div className="top-right-media-section">
          <img src={cardItem1} alt="Artwork data not available" />
          <img src={cardItem1} alt="Artwork data not available" />
        </div>
        <div className="bottom-right-media-section">
          <img src={cardItem1} alt="Artwork data not available" />
        </div>
      </div>
    </div>
  );
}

ArtistPageMediaViewer.propTypes = {
  artworksArray: PropTypes.arrayOf(PropTypes.string),
};

ArtistPageMediaViewer.defaultProps = {
  artworksArray: [],
};

export default React.memo(ArtistPageMediaViewer);
