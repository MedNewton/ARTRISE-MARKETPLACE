import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaAngleRight, FaBell, FaHome, FaShoppingCart,
} from 'react-icons/fa';
import { MdExplore, MdOutlineLabelImportant } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import PropTypes from 'prop-types';
import RenderJoinLoginButtonMobileVersion from '../../RenderJoinLoginButton/RenderJoinLoginButtonMobileVersion';
import RenderWalletAddressMobileVersion from '../../RenderWalletAddressSection/RenderWalletAddressMobileVersion';
import RenderConnectWalletAddressMobileVersion
  from '../../RenderWalletAddressSection/RenderConnectWalletAddressMobileVersion';
import {
  ExpandableMenuElementButton,
  ExpandableMenuIconWrapper,
  MenuElementButton,
} from '../../HeaderStyles/DisplayMenuLinks.styles';

function DisplayMenuLinks(props) {
  const {
    showExploreOptions,
    showProfileOptions,
    joinChoicesModalOpen,
    loginModalOpen,
    handleMenuModalClose,
    setShowExploreOptions,
    setShowProfileOptions,
    setShowLoginModal,
    setShowJoinModal,
    setJoinChoicesModalOpen,
    setLoginModalOpen,
  } = props;
  const {
    address,
    isConnected,
  } = useAccount();
  const { open } = useWeb3Modal();

  // State for the light dark mode switch
  const [currentMode, setCurrentMode] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => { // function for the light dark mode switch
    document.body.classList.remove('light', 'is_dark');
    document.body.classList.add(currentMode);
    localStorage.setItem('theme', currentMode);
  }, [currentMode]);

  const modeSwitchHandler = () => { // function for the light dark mode switch
    const newMode = currentMode === 'light' ? 'is_dark' : 'light';
    setCurrentMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  // Conditional rendering functions

  const renderProfileButton = () => (

    <ExpandableMenuElementButton
      onClick={() => setShowProfileOptions(!showProfileOptions)}
    >
      <ExpandableMenuIconWrapper>
        <BsFillPersonFill />
        {' '}
        Profile
      </ExpandableMenuIconWrapper>
      <div style={{ fontSize: 'large' }}><FaAngleRight /></div>
    </ExpandableMenuElementButton>
  );

  const renderProfileSection = () => (
    <>
      {renderProfileButton()}
      {address ? (
        <RenderWalletAddressMobileVersion
          address={address}
          open={open}
          handleMenuModalClose={handleMenuModalClose}
        />
      ) : (
        <RenderConnectWalletAddressMobileVersion
          open={open}
          handleMenuModalClose={handleMenuModalClose}
        />
      )}
    </>
  );

  const renderDynamicSection = () => {
    if (
      isConnected
      && !localStorage.getItem('twitter')
      && !localStorage.getItem('google')
      && !localStorage.getItem('facebook')) {
      return renderProfileSection();
    } if (
      localStorage.getItem('twitter')
      || localStorage.getItem('google')
      || localStorage.getItem('facebook')) {
      return renderProfileSection();
    }
    return (
      <RenderJoinLoginButtonMobileVersion
        handleMenuModalClose={handleMenuModalClose}
        setShowLoginModal={setShowLoginModal}
        setShowJoinModal={setShowJoinModal}
        joinChoicesModalOpen={joinChoicesModalOpen}
        setJoinChoicesModalOpen={setJoinChoicesModalOpen}
        loginModalOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
      />
    );
  };

  return (
    <div className="display-menu-links-wrapper">

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/">
            <MenuElementButton
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => handleMenuModalClose()}
            >
              <FaHome />
              {' '}
              Home
            </MenuElementButton>
          </Link>
        </div>
      </div>

      <ExpandableMenuElementButton
        onClick={() => setShowExploreOptions(!showExploreOptions)}
      >
        <ExpandableMenuIconWrapper>
          <MdExplore />
          {' '}
          Explore
        </ExpandableMenuIconWrapper>
        <div style={{ fontSize: 'large' }}><FaAngleRight /></div>
      </ExpandableMenuElementButton>

      <div className="accordion-border-color-transparent">
        <div className="accordion-card-background-border-color">
          <Link to="/drops">
            <MenuElementButton
              type="button"
              className="accordion-card-display-flex-font-large"
              onClick={() => handleMenuModalClose()}
            >
              <MdOutlineLabelImportant />
              {' '}
              Drops
            </MenuElementButton>
          </Link>
        </div>
      </div>

      <ExpandableMenuElementButton>
        <ExpandableMenuIconWrapper>
          <FaBell />
          {' '}
          Notifications
        </ExpandableMenuIconWrapper>
        <div style={{ fontSize: 'large' }}><FaAngleRight /></div>
      </ExpandableMenuElementButton>

      <ExpandableMenuElementButton>
        <ExpandableMenuIconWrapper>
          <FaShoppingCart />
          {' '}
          Cart
        </ExpandableMenuIconWrapper>
        <div style={{ fontSize: 'large' }}><FaAngleRight /></div>
      </ExpandableMenuElementButton>

      {renderDynamicSection()}

      <Button
        className="mobile-version-switch-mode-button"
        onClick={modeSwitchHandler}
      >
        Switch
        Mode
      </Button>
    </div>
  );
}

DisplayMenuLinks.propTypes = {
  showExploreOptions: PropTypes.bool,
  showProfileOptions: PropTypes.bool,
  joinChoicesModalOpen: PropTypes.bool,
  loginModalOpen: PropTypes.bool,
  handleMenuModalClose: PropTypes.func,
  setShowExploreOptions: PropTypes.func,
  setShowProfileOptions: PropTypes.func,
  setShowLoginModal: PropTypes.func,
  setShowJoinModal: PropTypes.func,
  setJoinChoicesModalOpen: PropTypes.func,
  setLoginModalOpen: PropTypes.func,
};

DisplayMenuLinks.defaultProps = {
  showExploreOptions: false,
  showProfileOptions: false,
  joinChoicesModalOpen: false,
  loginModalOpen: false,
  handleMenuModalClose: () => {
  },
  setShowExploreOptions: () => {
  },
  setShowProfileOptions: () => {
  },
  setShowLoginModal: () => {
  },
  setShowJoinModal: () => {
  },
  setJoinChoicesModalOpen: () => {
  },
  setLoginModalOpen: () => {
  },
};

export default DisplayMenuLinks;
