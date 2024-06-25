import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import CollectionsFilter from '../Collections/CollectionsFilter';
import { ArtistsContainer } from '../craftsmen/craftsmenStyles/CraftsMen.styles';
import CollectionCard from '../Collections/CollectionCard';

function DisplayCollections(props) {
  const { data } = props;
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  return (
    <div className="artist-profile-wrapper display-collections-wrapper">

      <CollectionsFilter />

      <ArtistsContainer isDeviceMobile={isDeviceMobile} isDeviceTablet={isDeviceTablet}>
        {data?.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            isDeviceMobile={isDeviceMobile}
            isDeviceTablet={isDeviceTablet}
          />
        ))}
      </ArtistsContainer>
    </div>
  );
}

DisplayCollections.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      cover: PropTypes.string,
      owner_name: PropTypes.string,
      owner: PropTypes.string,
      owner_profile_type: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string,
      owner_image: PropTypes.string,
    }),
  ),
};
DisplayCollections.defaultProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: '',
      cover: '',
      owner_name: '',
      owner: '',
      owner_profile_type: '',
      name: '',
      id: '',
      owner_image: '',
    }),
  ),
};

export default DisplayCollections;
