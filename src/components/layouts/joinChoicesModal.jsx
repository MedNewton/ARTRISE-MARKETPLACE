import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import JoinModal from "./joinModal";

const JoinChoicesModal = ({show, onHide}) => {
  const [showJoinModal, setShowJoinModal] = useState(false);


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>Join</h3>
        <p className="text-center">
          <span className="price color-popup" style={{ fontWeight: "600" }}>
            Become part of the world's first community of hybrid NFTs
          </span>
        </p>

        <p className="text-center" style={{ marginTop: "10%", marginBottom: "0px !important" }}>
          <span className="price color-popup" style={{ fontWeight: "500", fontSize: "1.1em" }}>
            Join as a member:
          </span>
        </p>
        <div
          id="createCollection"
          onClick={() => {
              setShowJoinModal(true);
          }}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
          style={{cursor: "pointer"}}
        >
          Join memebers community
        </div>

        
        <p className="text-center" style={{ marginTop: "10%", marginBottom: "0px !important" }}>
          <span className="price color-popup" style={{ fontWeight: "500", fontSize: "1.1em" }}>
            Join as an artist:
          </span>
        </p>
        <div
          id="createCollection"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => {
            setShowJoinModal(true);
          }}
          style={{cursor: "pointer", marginBottom: "8%"}}
        >
          Join artists community
        </div>
      </div>
      <JoinModal
        show={showJoinModal}
        onHide={() => {
          setShowJoinModal(false);
          onHide();
        }}
        hideParent={() => {
          onHide();
        }}
      />
    </Modal>
  );
};

export default JoinChoicesModal;
