import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaAngleRight, FaBell, FaHome, FaShoppingCart,
} from 'react-icons/fa';
import { MdExplore, MdOutlineLabelImportant } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import RenderJoinLoginButtonMobileVersion from '../../RenderJoinLoginButton/RenderJoinLoginButtonMobileVersion';
import RenderWalletAddressMobileVersion from '../../RenderWalletAddressSection/RenderWalletAddressMobileVersion';
import RenderConnectWalletAddressMobileVersion
  from '../../RenderWalletAddressSection/RenderConnectWalletAddressMobileVersion';
import {
  ExpandableMenuElementButton,
  ExpandableMenuIconWrapper,
  MenuElementButton,
} from '../../HeaderStyles/DisplayMenuLinks.styles';
import { SwitchModeButton } from '../MenuModalComponents.styles';
import imgmoon from '../../../../assets/images/icon/moon.png';
import { setAppTheme } from '../../../../redux/actions/themeActions';
import imgsun from '../../../../assets/images/icon/sun.png';

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
  const dispatch = useDispatch();
  const themeState = useSelector((state) => state.themeReducer.theme);
  const lightTheme = 'light';
  const darkTheme = 'is_dark';
  const { body } = document;

  const modeSwitchHandler = () => {
    if (themeState === lightTheme) {
      document.getElementById('themeIcon').src = imgmoon;
      body.classList.replace(lightTheme, darkTheme);
      localStorage.setItem('theme', darkTheme);
      const theme = darkTheme;
      dispatch(setAppTheme({ theme }));
    } else {
      document.getElementById('themeIcon').src = imgsun;
      body.classList.replace(darkTheme, lightTheme);
      localStorage.setItem('theme', lightTheme);
      const theme = lightTheme;
      dispatch(setAppTheme({ theme }));
    }
  };

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

      <SwitchModeButton
        theme={themeState}
        onClick={modeSwitchHandler}
      >
        <span>Switch Mode</span>
      </SwitchModeButton>
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
