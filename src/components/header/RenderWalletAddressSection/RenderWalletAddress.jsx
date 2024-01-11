import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoWalletSharp } from 'react-icons/io5';

function RenderWalletAddress(props) {
  const { address, open } = props;
  const menuLeft = useRef(null);
  const btnToggle = useRef(null);

  const menuToggle = () => {
    if (menuLeft.current && btnToggle.current) {
      menuLeft.current.classList.toggle('active');
      btnToggle.current.classList.toggle('active');
    }
  };

  return (
    <div className="sc-btn-top mg-r-12" id="site-header">
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          menuToggle();
          open();
        }}
        className="sc-button style-1 fl-button pri-1"
      >
        <div className="wallet-icon-navbar">
          {' '}
          <IoWalletSharp />
          {' '}
        </div>
        <span>
          {address?.toString()?.slice(0, 6)}
          ...
          {address?.toString()?.slice(-3)}
        </span>
      </Link>
    </div>
  );
}

RenderWalletAddress.propTypes = {
  address: PropTypes.func,
  open: PropTypes.func,
};

RenderWalletAddress.defaultProps = {
  address: () => {},
  open: () => {},
};

export default RenderWalletAddress;
