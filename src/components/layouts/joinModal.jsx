import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Web3Button } from "@web3modal/react";
import { useWeb3Modal } from "@web3modal/react";
import SocialJoinModal from "./socialJoinModal";

const JoinModal = (props) => {
  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const [showSocialJoinModal, setShowSocialJoinModal] = useState(false);

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>Join Us</h3>
        <p className="text-center">
          <span className="price color-popup" style={{ fontWeight: "600" }}>
            Become part of the world's first community of hybrid NFTs
          </span>
        </p>

        <p className="text-center" style={{ marginTop: "10%", marginBottom: "0px !important" }}>
          <span className="price color-popup" style={{ fontWeight: "500", fontSize: "1.1em" }}>
            Join using your wallet:
          </span>
        </p>
        <div
          id="createCollection"
          onClick={async () => {
            props.onHide();
            await open();
          }}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
          style={{cursor: "pointer"}}
        >
          Connect wallet
        </div>

        
        <p className="text-center" style={{ marginTop: "10%", marginBottom: "0px !important" }}>
          <span className="price color-popup" style={{ fontWeight: "500", fontSize: "1.1em" }}>
            Join using your social networks:
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
            setShowSocialJoinModal(true);
          }}
          style={{cursor: "pointer", marginBottom: "8%"}}
        >
          Social login
        </div>
      </div>
      <SocialJoinModal
        show={showSocialJoinModal}
        onHide={() => {
          setShowSocialJoinModal(false);
        }}
        hideParent={() => {
          props.onHide();
        }}
      />
    </Modal>
  );
};

export default JoinModal;
