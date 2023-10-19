import React from 'react';
import { useState} from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import { Web3Button} from "@web3modal/react";
import { useWeb3Modal } from "@web3modal/react";
import SocialLoginModal from './socialLoginModal';


const LoginModal = ({show,onHide}) => {

  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const [showSocialLoginModal, setShowSocialLoginModal] = useState(false);



  return (

    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>Login</h3>
        <p className="text-center">
          <span className="price color-popup" style={{ fontWeight: "600" }}>
            Access your account to mint, browse and collect the world's best hybrid NFTs
          </span>
        </p>
        <p className="text-center" style={{ marginTop: "10%", marginBottom: "0px !important" }}>
          <span className="price color-popup" style={{ fontWeight: "500", fontSize: "1.1em" }}>
            Login using your wallet:
          </span>
        </p>
        <div id='createCollection' onClick={async () => {onHide();await open();}} className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Connect wallet</div>

        <p className="text-center" style={{ marginTop: "10%", marginBottom: "0px !important" }}>
          <span className="price color-popup" style={{ fontWeight: "500", fontSize: "1.1em" }}>
            Login using your social networks:
          </span>
        </p>
        <div id='createCollection' className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close" onClick={()=>{setShowSocialLoginModal(true)}}>Social login</div>
        

      </div>
      <SocialLoginModal 
        show={showSocialLoginModal}
        onHide = {()=>{setShowSocialLoginModal(false)}}
        hideParent = {()=>{onHide()}}
      />
    </Modal>

  );
};

export default LoginModal;
