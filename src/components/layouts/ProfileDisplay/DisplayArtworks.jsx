import React, {
  useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import CardModal from '../CardModal';
import ArtworkCard from './ArtworkCard';

function DisplayArtworks(props) {
  const { data } = props;
  const [visible, setVisible] = useState(5);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 5);
  };
  const [modalShow, setModalShow] = useState(false);
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  // handling filter states
  const [showFilter, setShowFilter] = useState(false);
  const [filterState, setFilterState] = useState({
    categories: {},
    fileTypes: {},
    currencies: {},
  });

  const filterOptions = useMemo(() => ({
    categories: [
      { id: 'paintings', label: 'Paintings' },
      { id: 'photography', label: 'Photography' },
      { id: 'sculptures', label: 'Sculptures' },
      { id: 'mosaic', label: 'Mosaic' },
    ],
    fileTypes: [
      { id: 'image', label: 'Image' },
      { id: 'video', label: 'Video' },
    ],
    currencies: [
      { id: 'eth', label: 'ETH' },
    ],
  }), []);

  // handling filter buttons
  const handleOptionChange = (section, optionId) => {
    setFilterState((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [optionId]: !prevState[section][optionId],
      },
    }));
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="artist-profile-wrapper">
      <button
        type="button"
        className="filtersBtn"
        onClick={toggleFilter}
        aria-labelledby="toggle-filter-icon"
      >
        <svg
          id="toggle-filter-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7H21"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6 12H18"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M10 17H14"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className={isDeviceMobile ? 'd-flex flex-column' : 'd-flex flex-row'}>
        {showFilter && (
        <div className="filter-content">
          {Object.keys(filterOptions).map((section) => (
            <div className="filter-section" key={section}>
              <h3>{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
              <div className="divider" />
              {filterOptions[section].map((option) => (
                <label
                  className="filter-option"
                  key={option.id}
                  htmlFor={`filter-${section}-${option.id}`}
                >
                  <input
                    id={`filter-${section}-${option.id}`}
                    className="filter-checkbox-input"
                    type="checkbox"
                    style={{ color: 'black' }}
                    checked={filterState[section][option.id] || false}
                    onChange={() => handleOptionChange(section, option.id)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          ))}
        </div>
        )}

        <div
          className={showFilter ? 'artist-artworks-wrapper-collapsed' : 'artist-artworks-wrapper'}
        >

          {data.slice(0, visible).map((artwork) => (
            <ArtworkCard artwork={artwork} />
          ))}

        </div>
      </div>
      {visible < data.length && (
        <div
          className="col-md-12 wrap-inner load-more text-center mb-20"
        >
          <button
            type="button"
            id="load-more"
            className="sc-button loadmore fl-button pri-3"
            onClick={showMoreItems}
          >
            <span>Load More</span>
          </button>
        </div>
      )}
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>

  );
}

DisplayArtworks.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ownerName: PropTypes.string,
      ownerImage: PropTypes.string,
      artworkId: PropTypes.string,
      DisplayArtworks: PropTypes.string,
      data: PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
      }),
    }),
  ),
};

DisplayArtworks.defaultProps = {
  data: [{
    price: '' || 0,
    ownerName: '',
    ownerImage: '',
    artworkId: '',
    DisplayArtworks: '',
    data: PropTypes.shape({
      name: '',
      image: '',
    }),
  }],
};

export default DisplayArtworks;
