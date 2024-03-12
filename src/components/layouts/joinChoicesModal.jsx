import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import JoinModal from './joinModal';

function JoinChoicesModal(props) {
  // { show, onHide }
  const { onHide: propsOnHide, show: propsShow } = props;
  const [showJoinModal, setShowJoinModal] = useState(false);

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
            Join as a member:
          </span>
        </p>
        <button
          type="button"
          id="createCollection"
          onClick={() => {
            setShowJoinModal(true);
          }}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
          style={{ cursor: 'pointer' }}
        >
          Join memebers community
        </button>

        <p className="text-center" style={{ marginTop: '10%', marginBottom: '0px !important' }}>
          <span className="price color-popup" style={{ fontWeight: '500', fontSize: '1.1em' }}>
            Join as an artist:
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
            setShowJoinModal(true);
          }}
          style={{ cursor: 'pointer', marginBottom: '8%' }}
        >
          Join artists community
        </button>
      </div>
      <JoinModal
        show={showJoinModal}
        onHide={() => {
          setShowJoinModal(false);
          propsOnHide();
        }}
        hideParent={() => {
          propsOnHide();
        }}
      />
    </Modal>
  );
}

JoinChoicesModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

JoinChoicesModal.defaultProps = {
  onHide: () => {},
  show: false,
};

export default JoinChoicesModal;
