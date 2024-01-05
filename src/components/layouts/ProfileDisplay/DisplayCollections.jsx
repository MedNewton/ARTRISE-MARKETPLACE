import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function DisplayCollections(props) {
  const { data } = props;

  function generateUniqueId() {
    return uuidv4();
  }

  return (
    <div className="artist-profile-wrapper display-collections-wrapper">
      <div className="Collections-filter-wrapper">
        <div
          className="tag"
        >
          Painting
        </div>
        <div
          className="tag"
        >
          Photography
        </div>
        <div
          className="tag"
        >
          Sculpture
        </div>
        <div
          className="tag"
        >
          Ceramic Artworks
        </div>
        <div
          className="tag"
        >
          Others...
        </div>
      </div>

      <div className="d-flex flex-wrap flex-row" style={{ gap: '20px' }}>
        {data?.map((collection) => (
          <div key={generateUniqueId()} style={{ maxWidth: '400px' }}>
            <div className="sc-card-collection style-2">
              <div className="card-bottom">
                <div className="author">
                  <div className="sc-author-box style-2">
                    <div className="author-avatar">
                      <img
                        src={collection?.owner_image}
                        alt=""
                        className="avatar"
                      />
                      <div className="badge" />
                    </div>
                  </div>
                  <div className="content">
                    <h4>
                      <Link to={`/collection?id=${collection?.id}`}>
                        {collection?.name}
                      </Link>
                    </h4>
                    <p>
                      By
                      {' '}
                      <Link to={`/displayProfile?${collection?.owner_profile_type}=${collection?.owner}`}>
                        <span className="authorName">{collection?.owner_name}</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/author-02">
                <div className="media-images-collection">
                  <div className="box-left">
                    <img
                      src={collection.cover}
                      alt=""
                    />
                  </div>
                  <div className="box-right">
                    <div className="top-img">
                      <img
                        src={collection.image}
                        alt=""
                      />
                      <img
                        src={collection.cover}
                        alt=""
                      />
                    </div>
                    <div className="bottom-img">
                      <img
                        src={collection.image}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
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
