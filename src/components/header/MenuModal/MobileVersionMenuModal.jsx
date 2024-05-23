import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useDisconnect } from 'wagmi';
import PropTypes from 'prop-types';
import { Logout } from '../../../services/AuthServices/Logout';
import DisplayMenuLinks from './MenuModalComponents/DisplayMenuLinks';
import DisplayExploreLinks from './MenuModalComponents/DisplayExploreLinks';
import DisplayProfileLinks from './MenuModalComponents/DisplayProfileLinks';
import RenderNavBarOverMenu from '../NavBarOverTheMenu/RenderNavBarOverMenu';

function MobileVersionMenuModal(props) {
  const {
    showMenuModal,
    joinChoicesModalOpen,
    loginModalOpen,
    showSearchField,
    handleMenuModalClose,
    setJoinChoicesModalOpen,
    setLoginModalOpen,
    setShowSearchField,
  } = props;
  const nav = useNavigate();
  const { disconnect } = useDisconnect();

  const [showExploreOptions, setShowExploreOptions] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  useEffect(() => () => {
    setShowExploreOptions(false);
    setShowProfileOptions(false);
    setShowLoginModal(false);
    setShowJoinModal(false);
  }, []);

  const logoutHandler = async () => {
    try {
      await Logout(disconnect, nav);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      show={showMenuModal}
      onHide={() => handleMenuModalClose()}
      dialogClassName="full-screen-modal"
    >
      <RenderNavBarOverMenu
        setShowSearchField={setShowSearchField}
        showSearchField={showSearchField}
        handleMenuModalClose={handleMenuModalClose}
      />
      {!showExploreOptions
        && !showProfileOptions
        && !showLoginModal
        && !showJoinModal
        && (
          <DisplayMenuLinks
            showExploreOptions={showExploreOptions}
            showProfileOptions={showProfileOptions}
            joinChoicesModalOpen={joinChoicesModalOpen}
            loginModalOpen={loginModalOpen}
            handleMenuModalClose={handleMenuModalClose}
            setShowExploreOptions={setShowExploreOptions}
            setShowProfileOptions={setShowProfileOptions}
            setShowLoginModal={setShowLoginModal}
            setShowJoinModal={setShowJoinModal}
            setJoinChoicesModalOpen={setJoinChoicesModalOpen}
            setLoginModalOpen={setLoginModalOpen}
          />
        )}
      {showExploreOptions
        && (
          <DisplayExploreLinks
            showExploreOptions={showExploreOptions}
            setShowExploreOptions={setShowExploreOptions}
            handleMenuModalClose={handleMenuModalClose}
          />
        )}
      {showProfileOptions
        && (
          <DisplayProfileLinks
            setShowProfileOptions={setShowProfileOptions}
            showProfileOptions={showProfileOptions}
            handleMenuModalClose={handleMenuModalClose}
            logoutHandler={logoutHandler}
          />
        )}
    </Modal>
  );
}

MobileVersionMenuModal.propTypes = {
  showMenuModal: PropTypes.bool,
  joinChoicesModalOpen: PropTypes.bool,
  loginModalOpen: PropTypes.bool,
  showSearchField: PropTypes.bool,
  handleMenuModalClose: PropTypes.func,
  setJoinChoicesModalOpen: PropTypes.func,
  setLoginModalOpen: PropTypes.func,
  setShowSearchField: PropTypes.func,
};

MobileVersionMenuModal.defaultProps = {
  showMenuModal: false,
  joinChoicesModalOpen: false,
  loginModalOpen: false,
  showSearchField: false,
  handleMenuModalClose: () => {
  },
  setJoinChoicesModalOpen: () => {
  },
  setLoginModalOpen: () => {
  },
  setShowSearchField: () => {
  },
};

export default MobileVersionMenuModal;
