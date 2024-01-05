import PropTypes from 'prop-types';

export const collectionStoreShape = {
  image: PropTypes.string,
  cover: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  owner: PropTypes.string,
  createdAt: PropTypes.string,
  owner_name: PropTypes.string,
  owner_image: PropTypes.string,
  owner_profile_type: PropTypes.string,
  id: PropTypes.string,
  artworks: PropTypes.arrayOf(PropTypes.string),
};
