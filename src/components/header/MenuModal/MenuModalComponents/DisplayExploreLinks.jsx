import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import { BsPersonLinesFill } from 'react-icons/bs';
import { IoIosPhotos } from 'react-icons/io';
import { PiPaintBucketFill } from 'react-icons/pi';
import { RiMenuSearchFill } from 'react-icons/ri';
import PropTypes from 'prop-types';

function DisplayExploreLinks(props) {
  const {
    showExploreOptions,
    setShowExploreOptions,
    handleMenuModalClose,
  } = props;
  return (
    <div className="display-menu-links-wrapper">
      <div className="accordion-border-color-transparent">
        <div className="accordion-card-back-option-background-border-color">
          <Link to="/">
            <button
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => setShowExploreOptions(!showExploreOptions)}
            >
              <FaAngleLeft />
              {' '}
              Explore
            </button>
          </Link>
        </div>
      </div>

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/craftsmen">
            <button
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => handleMenuModalClose()}
            >
              <BsPersonLinesFill />
              {' '}
              Artists
            </button>
          </Link>
        </div>
      </div>

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/collections">
            <button
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => handleMenuModalClose()}
            >
              <IoIosPhotos />
              {' '}
              Collections
            </button>
          </Link>
        </div>
      </div>

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/masterpieces">
            <button
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => handleMenuModalClose()}
            >
              <PiPaintBucketFill />
              {' '}
              Artworks
            </button>
          </Link>
        </div>
      </div>

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/explore">
            <button
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => handleMenuModalClose()}
            >
              <RiMenuSearchFill />
              {' '}
              Browse
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

DisplayExploreLinks.propTypes = {
  showExploreOptions: PropTypes.bool,
  setShowExploreOptions: PropTypes.func,
  handleMenuModalClose: PropTypes.func,
};

DisplayExploreLinks.defaultProps = {
  showExploreOptions: false,
  setShowExploreOptions: () => {},
  handleMenuModalClose: () => {},
};

export default DisplayExploreLinks;
