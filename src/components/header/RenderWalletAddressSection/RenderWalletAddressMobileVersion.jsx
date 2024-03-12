import React, { useRef } from 'react';
import { FaWallet } from 'react-icons/fa';
import PropTypes from 'prop-types';

function RenderWalletAddressMobileVersion(props) {
  const { address, open, handleMenuModalClose } = props;
  const menuLeft = useRef(null);
  const btnToggle = useRef(null);

  const menuToggle = () => {
    if (menuLeft.current && btnToggle.current) {
      menuLeft.current.classList.toggle('active');
      btnToggle.current.classList.toggle('active');
    }
  };

  return (
    <div className="accordion-mobile-wallet-address-wrapper">
      <div className="accordion-border-color-transparent">
        <button
          type="button"
          className="accordion-card-background-border-color"
          onClick={(e) => {
            e.preventDefault();
            menuToggle();
            open();
            handleMenuModalClose();
          }}
        >
          <div className="accordion-card-display-flex-font-large">
            <FaWallet />
            {address.toString().slice(0, 6)}
            ...
            {address.toString().substring(address.toString().length - 3)}
          </div>
        </button>
      </div>
    </div>
  );
}
RenderWalletAddressMobileVersion.propTypes = {
  address: PropTypes.string,
  open: PropTypes.func,
  handleMenuModalClose: PropTypes.func,
};

RenderWalletAddressMobileVersion.defaultProps = {
  address: '',
  open: () => {},
  handleMenuModalClose: () => {},
};

export default RenderWalletAddressMobileVersion;
