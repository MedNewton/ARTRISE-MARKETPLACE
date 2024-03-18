import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaAngleLeft, FaBook, FaFileAlt, FaLink, FaPlus, FaSignOutAlt, FaSlidersH,
} from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiCoinStack } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { MenuElementButton } from '../../HeaderStyles/DisplayMenuLinks.styles';

function DisplayProfileLinks(props) {
  const {
    setShowProfileOptions,
    showProfileOptions,
    handleMenuModalClose,
    logoutHandler,
  } = props;
  return (
    <div className="display-menu-links-wrapper">
      <div className="accordion-border-color-transparent">
        <div className="accordion-card-back-option-background-border-color">
          <Link to="/">
            <MenuElementButton
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => setShowProfileOptions(!showProfileOptions)}
            >
              <FaAngleLeft />
              {' '}
              Profile
            </MenuElementButton>
          </Link>
        </div>
      </div>

      {localStorage.getItem('accountTypeChoice') === 'artist' && (
        <div className="accordion-border-color-transparent">
          <div className="accordion-card-background-border-color">
            <Link to={`/displayProfile?artist=${localStorage.getItem('userId')}`}>
              <MenuElementButton
                type="button"
                className="accordion-card-display-flex-font-large"
                onClick={() => handleMenuModalClose()}
              >
                <BsFillPersonFill />
                {' '}
                My Profile
              </MenuElementButton>
            </Link>
          </div>
        </div>
      )}
      {localStorage.getItem('accountTypeChoice') === 'user' && (
        <div className="accordion-border-color-transparent">
          <div className="accordion-card-background-border-color">
            <Link to={`/displayProfile?member=${localStorage.getItem('userId')}`}>
              <MenuElementButton
                type="button"
                className="accordion-card-display-flex-font-large"
                onClick={() => handleMenuModalClose()}
              >
                <BsFillPersonFill />
                {' '}
                My Profile
              </MenuElementButton>
            </Link>
          </div>
        </div>
      )}

      {localStorage.getItem('accountTypeChoice') === 'user'
        && localStorage.getItem('walletAddress') !== 'undefined'
        && localStorage.getItem('walletAddress') !== undefined
        ? (
          <div className="accordion-border-color-transparent">
            <div className="accordion-card-background-border-color">
              <Link to="/tokenize">
                <MenuElementButton
                  type="button"
                  className="accordion-card-display-flex-font-large"
                  onClick={() => handleMenuModalClose()}
                >
                  <BiCoinStack />
                  {' '}
                  Tokenize
                </MenuElementButton>
              </Link>
            </div>
          </div>
        )
        : ('')}

      {localStorage.getItem('accountTypeChoice') === 'artist'
        && localStorage.getItem('walletAddress') !== 'undefined'
        && localStorage.getItem('walletAddress') !== undefined
        ? (
          <div className="accordion-border-color-transparent">
            <div className="accordion-card-background-border-color">
              <Link to="/creator-choice">
                <MenuElementButton
                  type="button"
                  className="accordion-card-display-flex-font-large"
                  onClick={() => handleMenuModalClose()}
                >
                  <FaPlus />
                  {' '}
                  Create
                </MenuElementButton>
              </Link>
            </div>
          </div>
        )
        : ('')}

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/referral-program">
            <MenuElementButton
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => handleMenuModalClose()}
            >
              <FaLink />
              {' '}
              Referral
            </MenuElementButton>
          </Link>
        </div>
      </div>

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/learn">
            <MenuElementButton
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => handleMenuModalClose()}
            >
              <FaBook />
              {' '}
              Learn
            </MenuElementButton>
          </Link>
        </div>
      </div>

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/help-center">
            <MenuElementButton
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => handleMenuModalClose()}
            >
              <FaFileAlt />
              {' '}
              How to use
            </MenuElementButton>
          </Link>
        </div>
      </div>

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/settings">
            <MenuElementButton
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => handleMenuModalClose()}
            >
              <FaSlidersH />
              {' '}
              Settings
            </MenuElementButton>
          </Link>
        </div>
      </div>

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/explore">
            <MenuElementButton
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={(e) => {
                e.preventDefault();
                logoutHandler();
                handleMenuModalClose();
              }}
            >
              <FaSignOutAlt />
              {' '}
              Logout
            </MenuElementButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

DisplayProfileLinks.propTypes = {
  setShowProfileOptions: PropTypes.func,
  showProfileOptions: PropTypes.bool,
  handleMenuModalClose: PropTypes.func,
  logoutHandler: PropTypes.func,
};

DisplayProfileLinks.defaultProps = {
  setShowProfileOptions: () => {
  },
  showProfileOptions: false,
  handleMenuModalClose: () => {
  },
  logoutHandler: () => {
  },
};

export default DisplayProfileLinks;
