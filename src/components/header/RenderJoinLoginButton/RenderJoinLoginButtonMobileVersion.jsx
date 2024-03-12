import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function RenderJoinLoginButtonMobileVersion(props) {
  const {
    handleMenuModalClose,
    setJoinChoicesModalOpen,
    setLoginModalOpen,
  } = props;
  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button
          className="mobile-version-login-join-button"
          onClick={(e) => {
            e.preventDefault();
            // setShowJoinModal(true);
            // handleMenuModalClose();
            setJoinChoicesModalOpen(true);
            handleMenuModalClose(false);
          }}
        >
          Join
        </Button>
        <Button
          className="mobile-version-login-join-button"
          onClick={(e) => {
            e.preventDefault();
            // setShowLoginModal(true);
            // handleMenuModalClose();
            setLoginModalOpen(true);
            handleMenuModalClose(false);
          }}
        >
          Login
        </Button>

      </div>

    </div>
  );
}

RenderJoinLoginButtonMobileVersion.propTypes = {
  handleMenuModalClose: PropTypes.func,
  setJoinChoicesModalOpen: PropTypes.func,
  setLoginModalOpen: PropTypes.func,
};

RenderJoinLoginButtonMobileVersion.defaultProps = {
  handleMenuModalClose: () => {},
  setJoinChoicesModalOpen: () => {},
  setLoginModalOpen: () => {},
};

export default RenderJoinLoginButtonMobileVersion;
