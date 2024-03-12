import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DarkMode from '../DarkMode';

function RenderJoinLoginButton(props) {
  const {
    setJoinChoicesModalOpen,
    setLoginModalOpen,
  } = props;
  return (
    <div className="nonConnectedBtnBox">
      <div className="nonConnectedBtns">
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            setJoinChoicesModalOpen(true);
          }}
          className="nonConnectedJoinBtn"
        >
          <span>Join</span>
        </Link>
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            setLoginModalOpen(true);
          }}
          className="nonConnectedLoginBtn"
        >
          <span>Login</span>
        </Link>
        <DarkMode />
      </div>

    </div>
  );
}

RenderJoinLoginButton.propTypes = {
  setJoinChoicesModalOpen: PropTypes.func,
  setLoginModalOpen: PropTypes.func,
};

RenderJoinLoginButton.defaultProps = {
  setJoinChoicesModalOpen: () => {
  },
  setLoginModalOpen: () => {
  },
};

export default RenderJoinLoginButton;
