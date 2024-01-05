/*eslint-disable */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import PropTypes from 'prop-types';
import SocialJoinModal from './socialJoinModal';

function JoinModal(props) {
  const { onHide: propsOnHide, show: propsShow } = props;
  // { show, onHide }
  const {
    open,
  } = useWeb3Modal();
  const [showSocialJoinModal, setShowSocialJoinModal] = useState(false);

  return (
    <Modal show={propsShow} onHide={propsOnHide}>
      <Modal.Header closeButton />
      <div className="modal-body space-y-20 pd-40">
        <h3>Join</h3>
        <p className="text-center">
          <span className="price color-popup" style={{ fontWeight: '600' }}>
            Become part of the world&apos;s first community of hybrid NFTs
          </span>
        </p>

        <p className="text-center" style={{ marginTop: '10%', marginBottom: '0px !important' }}>
          <span className="price color-popup" style={{ fontWeight: '500', fontSize: '1.1em' }}>
            Join using your wallet:
          </span>
        </p>
        <button
          type="button"
          id="createCollection"
          onClick={async () => {
            propsOnHide();
            localStorage.setItem('connectWithWalletOperation', 'join');
            await open();
          }}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
          style={{ cursor: 'pointer' }}
        >
          Connect wallet
        </button>

        <p className="text-center" style={{ marginTop: '10%', marginBottom: '0px !important' }}>
          <span className="price color-popup" style={{ fontWeight: '500', fontSize: '1.1em' }}>
            Join using your social networks:
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
          onClick={() => {
            setShowSocialJoinModal(true);
          }}
          style={{ cursor: 'pointer', marginBottom: '8%' }}
        >
          Social login
        </button>
      </div>
      <SocialJoinModal
        show={showSocialJoinModal}
        onHide={() => {
          setShowSocialJoinModal(false);
        }}
        hideParent={() => {
          propsOnHide();
        }}
      />
    </Modal>
  );
}

JoinModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

JoinModal.defaultProps = {
  onHide: () => {},
  show: false,
};

export default JoinModal;
