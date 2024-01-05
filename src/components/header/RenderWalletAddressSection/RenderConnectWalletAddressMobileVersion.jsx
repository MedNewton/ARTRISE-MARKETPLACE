import React from 'react';
import { FaWallet } from 'react-icons/fa';
import PropTypes from 'prop-types';

function RenderConnectWalletAddressMobileVersion(props) {
  const { open, handleMenuModalClose } = props;
  return (
    <div className="accordion-mobile-wallet-address-wrapper">
      <div className="accordion-border-color-transparent">
        <button
          type="button"
          className="accordion-card-background-border-color"
          onClick={(e) => {
            e.preventDefault();
            open();
            handleMenuModalClose();
          }}
        >
          <div className="accordion-card-display-flex-font-large">
            <FaWallet />
            Connect Wallet
          </div>
        </button>
      </div>
    </div>
  );
}

RenderConnectWalletAddressMobileVersion.propTypes = {
  open: PropTypes.func,
  handleMenuModalClose: PropTypes.func,
};

RenderConnectWalletAddressMobileVersion.defaultProps = {
  open: () => {},
  handleMenuModalClose: () => {},
};

export default RenderConnectWalletAddressMobileVersion;
