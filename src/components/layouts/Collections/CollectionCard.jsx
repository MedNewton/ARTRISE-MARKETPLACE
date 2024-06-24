import React from 'react';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ArtistInfo, ArtistName, ArtistType,
  CardContainer,
  InfoFollowButtonWrapper,
  InfoSectionWrapper, ProfileImage, ProfileImageWrapper,
} from '../craftsmen/craftsmenStyles/ArtistCard.style';
import { ImageGrid } from '../craftsmen/ImageGrid';

function CollectionCard({ collection, isDeviceMobile, isDeviceTablet }) {
  const theme = useSelector((state) => state.themeReducer.theme);

  return (
    <CardContainer
      isDeviceMobile={isDeviceMobile}
      isDeviceTablet={isDeviceTablet}
      theme={theme}
      to={`/collection?id=${collection?.id}`}
    >
      <InfoFollowButtonWrapper>
        <InfoSectionWrapper>
          <ProfileImageWrapper>
            <ProfileImage src={collection?.owner_image} alt="" />
            <RiVerifiedBadgeFill fontSize="2.5em" style={{ marginLeft: '-10px' }} />
          </ProfileImageWrapper>
          <ArtistInfo>
            <ArtistName theme={theme}>{collection?.name}</ArtistName>
            <ArtistType theme={theme}>
              By:
              {' '}
              {collection?.owner_name}
              {' '}
            </ArtistType>
          </ArtistInfo>
        </InfoSectionWrapper>
      </InfoFollowButtonWrapper>
      <ImageGrid artworkThumbNails={collection.thumbnails} />
    </CardContainer>

  );
}

CollectionCard.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.string,
    owner_image: PropTypes.string,
    name: PropTypes.string,
    owner_name: PropTypes.string,
    thumbnails: PropTypes.arrayOf(PropTypes.string),
  }),
  isDeviceMobile: PropTypes.bool,
  isDeviceTablet: PropTypes.bool,

};

CollectionCard.defaultProps = {
  collection: PropTypes.shape({
    id: '',
    owner_image: '',
    name: '',
    owner_name: '',
    thumbnails: [],
  }),
  isDeviceMobile: false,
  isDeviceTablet: false,
};
export default CollectionCard;
