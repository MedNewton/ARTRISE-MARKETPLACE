import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import { useMetamask } from '@thirdweb-dev/react';
import PropTypes from 'prop-types';

function CardModal(props) {
  const { onHide: propsOnHide, show: propsShow } = props;
  const connect = useMetamask();

  useEffect(() => {
    connect();
  }, [connect]);
  const doNotNavigateHandlerFunction = (e) => {
    e.preventDefault();
  };

  return (

    <Modal
      show={propsShow}
      onHide={propsOnHide}
    >
      <Modal.Header closeButton />
      <div className="modal-body space-y-20 pd-40">
        <h3>
          Discover our
          <br />
          {' '}
          Buying options
        </h3>
        <p className="text-center">
          <span className="price color-popup">Buy using a crypto wallet</span>
        </p>
        <p
          className="text-center "
        >
          Once the operation is confirmed on the blockchain,
          the artwork is instantly transferred to your wallet.
        </p>
        <button
          type="button"
          id="useWallet"
          onClick={doNotNavigateHandlerFunction}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
        >
          Use a wallet
        </button>

        <hr className="buyOptionsSeparator" />

        <p className="text-center">
          <span
            className="price color-popup"
          >
            Buy using a credit card
          </span>
        </p>
        <p
          className="text-center "
        >
          Your wallet is not ready yet? No worries!
          <br />
          You can pay using your credit card, and the artwork will be shipped to your address, and safely stored
          in your hardware wallet!
        </p>

        <button
          type="button"
          onClick={doNotNavigateHandlerFunction}
          id="useCreditCard"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
        >
          Use a credit card
        </button>
      </div>
    </Modal>
  );
}

CardModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

CardModal.defaultProps = {
  onHide: () => {},
  show: false,
};

export default CardModal;
