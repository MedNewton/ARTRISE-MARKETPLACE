import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

function CreateCollectionModal(props) {
  const { onHide: propsOnHide, show: propsShow } = props;
  return (

    <Modal
      show={propsShow}
      onHide={propsOnHide}
    >
      <Modal.Header closeButton />

      <div className="modal-body space-y-20 pd-40">
        <p className="text-center">
          <span className="price color-popup">Deploy your smart contract</span>
        </p>
        <p className="text-center ">
          Artists on ARTRISE can create their own colelctions that are
          seperate smart contracts, on which they can mint their artworks.
        </p>
        <Link to="/create-collection" style={{ display: 'flex' }}>
          <div
            id="createCollection"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#popup_bid_success"
            data-dismiss="modal"
            aria-label="Close"
          >
            Deploy a smart contract
          </div>
        </Link>
        <hr className="buyOptionsSeparator" />
        <p className="text-center">
          <span className="price color-popup">Use Artrise smart contract</span>
        </p>
        <p className="text-center ">
          Artists on ARTRISE also have the option to create single artworks,
          that are minted on the shared ARTRISE collection.
        </p>
        <Link to="/create-public-collection" style={{ display: 'flex' }}>
          <div
            id="createSingleArtwork"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#popup_bid_success"
            data-dismiss="modal"
            aria-label="Close"
          >
            Use Artrise smart contract
          </div>
        </Link>
      </div>
    </Modal>

  );
}

CreateCollectionModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

CreateCollectionModal.defaultProps = {
  onHide: () => {},
  show: false,
};

export default CreateCollectionModal;
