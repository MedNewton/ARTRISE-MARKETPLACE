import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
// eslint-disable-next-line import/no-unresolved
import { useWeb3Modal } from '@web3modal/wagmi/react';
import PropTypes from 'prop-types';
import SocialLoginModal from './socialLoginModal';

function LoginModal(props) {
  const { onHide: propsOnHide, show: propsShow } = props;
  const { open } = useWeb3Modal();
  const [showSocialLoginModal, setShowSocialLoginModal] = useState(false);

  return (
    <Modal
      show={propsShow}
      onHide={propsOnHide}
    >
      <Modal.Header closeButton />
      <div className="modal-body space-y-20 pd-40">
        <h3>Login</h3>
        <p className="text-center">
          <span className="price color-popup" style={{ fontWeight: '600' }}>
            Access your account to mint, browse and collect the world&apos;s best hybrid NFTs
          </span>
        </p>
        <p className="text-center" style={{ marginTop: '10%', marginBottom: '0px !important' }}>
          <span className="price color-popup" style={{ fontWeight: '500', fontSize: '1.1em' }}>
            Login using your wallet:
          </span>
        </p>
        <button
          type="button"
          id="createCollection"
          onClick={async () => {
            await open();
            propsOnHide();
            localStorage.setItem('connectWithWalletOperation', 'login');
          }}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
        >
          Connect wallet
        </button>
        <p className="text-center" style={{ marginTop: '10%', marginBottom: '0px !important' }}>
          <span className="price color-popup" style={{ fontWeight: '500', fontSize: '1.1em' }}>
            Login using your social networks:
          </span>
        </p>
        <button
          type="button"
          id="createCollection"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => { setShowSocialLoginModal(true); }}
        >
          Social login
        </button>
      </div>
      <SocialLoginModal
        show={showSocialLoginModal}
        onHide={() => { setShowSocialLoginModal(false); }}
        hideParent={() => { propsOnHide(); }}
      />
    </Modal>
  );
}

LoginModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

LoginModal.defaultProps = {
  onHide: () => {},
  show: false,
};

export default LoginModal;
