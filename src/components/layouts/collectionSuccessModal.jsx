import React from 'react';
import { Modal } from "react-bootstrap";
const CollectionSuccessModal = (props) => {
  return (
    <Modal
    show={props.show}
    onHide={props.onHide}
    >
    <Modal.Header></Modal.Header>
    <div className="modal-body space-y-20 pd-40">
        <h3 className="text-center">Your collection is being created ... Hold on</h3>
        <button className="btn btn-primary"> Watch the listings</button>
    </div>
    </Modal>
  );
};

export default CollectionSuccessModal;
