import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RenderConnectWalletAddress(props) {
  const { open } = props;
  return (
    <div className="sc-btn-top mg-r-12" id="site-header">
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
        className="sc-button header-slider style style-1 wallet fl-button pri-1"
      >
        <span>Connect Wallet</span>
      </Link>
    </div>
  );
}

RenderConnectWalletAddress.propTypes = {
  open: PropTypes.func,
};

RenderConnectWalletAddress.defaultProps = {
  open: () => {},
};

export default RenderConnectWalletAddress;
