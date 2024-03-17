import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGridContainer, ImageWrapper } from './craftsmenStyles/ImageGrid.style';
import CraftsmenMediaViewer from './craftsmenMediaViewer/CraftsmenMediaViewer';
import cardItem1 from '../../../assets/images/box-item/card-item-1.jpg';

export function ImageGrid({ artworkThumbNails }) {
  const [artworksImagesArray, setArtworksImagesArray] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesArray = [];
      const fetchPromises = artworkThumbNails
        .filter((uri) => uri.includes('http'))
        .map(async (artworkURI) => {
          try {
            const response = await fetch(artworkURI);
            const data = await response.json();
            const imageURL = data?.image;
            if (imageURL && imageURL.includes('http')) {
              imagesArray.push(imageURL);
            }
          } catch (error) {
            console.error('Error fetching or parsing:', artworkURI, error);
          }
        });
      await Promise.all(fetchPromises);
      setArtworksImagesArray(imagesArray);
    };
    if (artworkThumbNails && artworkThumbNails.length > 0) {
      fetchImages();
    }
    return () => {
      setArtworksImagesArray([]);
    };
  }, [artworkThumbNails]);

  if (artworksImagesArray) {
    return (
      <ImageGridContainer>
        <ImageWrapper>
          <CraftsmenMediaViewer mediaUrl={artworksImagesArray && artworksImagesArray[0]} />
        </ImageWrapper>

        <ImageWrapper>
          <CraftsmenMediaViewer
            mediaUrl={artworksImagesArray[1] ? artworksImagesArray[1] : artworksImagesArray[0]}
          />
        </ImageWrapper>

        <ImageWrapper>
          <CraftsmenMediaViewer
            mediaUrl={artworksImagesArray[2] ? artworksImagesArray[2] : artworksImagesArray[0]}
          />
        </ImageWrapper>

        <ImageWrapper>
          <CraftsmenMediaViewer
            mediaUrl={artworksImagesArray[3] ? artworksImagesArray[3] : artworksImagesArray[0]}
          />
        </ImageWrapper>

      </ImageGridContainer>
    );
  }

  return (
    <ImageGridContainer>

      <ImageWrapper>
        <img src={cardItem1} alt="Artwork data not available" />
      </ImageWrapper>

      <ImageWrapper>
        <img src={cardItem1} alt="Artwork data not available" />
      </ImageWrapper>

      <ImageWrapper>
        <img src={cardItem1} alt="Artwork data not available" />
      </ImageWrapper>

      <ImageWrapper>
        <img src={cardItem1} alt="Artwork data not available" />
      </ImageWrapper>

    </ImageGridContainer>
  );
}
ImageGrid.propTypes = {
  artworkThumbNails: PropTypes.arrayOf(PropTypes.string),
};

ImageGrid.defaultProps = {
  artworkThumbNails: [],
};
