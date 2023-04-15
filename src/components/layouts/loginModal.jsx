import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import { Web3Button} from "@web3modal/react";
import { useWeb3Modal } from "@web3modal/react";
import SocialLoginModal from './socialLoginModal';


const LoginModal = (props) => {

  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const [showSocialLoginModal, setShowSocialLoginModal] = useState(false);

  return (

    <Modal
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>Login</h3>
        <p className="text-center"><span className="price color-popup">Using a crypto wallet</span>
        </p>
        <div id='createCollection' onClick={async () => {props.onHide();await open();}} className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Connect wallet</div>

        <hr className='buyOptionsSeparator' />
        <p className="text-center"><span className="price color-popup">Using social networks</span>
        </p>
        <div id='createCollection' className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close" onClick={()=>{setShowSocialLoginModal(true)}}>Social login</div>
        <hr className='buyOptionsSeparator' />
        <p className="text-center"><span className="price color-popup">Using an email address</span>
        </p>
        <div id='createCollection' className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Login with Email</div>


      </div>
      <SocialLoginModal 
        show={showSocialLoginModal}
        onHide = {()=>{setShowSocialLoginModal(false)}}
        hideParent = {()=>{props.onHide()}}
      />
    </Modal>

  );
};

export default LoginModal;
