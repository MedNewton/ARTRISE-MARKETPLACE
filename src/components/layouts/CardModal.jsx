import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";

import {useMetamask} from "@thirdweb-dev/react";

const CardModal = (props) => {

    
const connect = useMetamask();

useEffect(() => {
  connect();
}, [])


return (

    <Modal
    show={props.show}
    onHide={props.onHide}
  >
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body space-y-20 pd-40">
        <h3>Discover our<br /> Buying options</h3>
        <p className="text-center"><span className="price color-popup">Buy using a crypto wallet</span>
        </p>
        <p className="text-center ">Once the operation is confirmed on the blockchain, the artwork is instantly transferred to your wallet.</p>
        <div id='useWallet' onClick={props.parentFunction} className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Use a wallet</div>
        
        
        <hr className='buyOptionsSeparator'/>
        
        <p className="text-center"><span className="price color-popup">Buy using a credit card</span>
        </p>
        <p className="text-center ">Your wallet is not ready yet? No worries!<br />You can pay using your credit card, and the artwork will be shipped to your address, and safely stored in your hardware wallet!</p>
        
        <Link to="" id='useCreditCard' className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Use a credit card</Link>
    </div>
    </Modal>
    
  );
};

export default CardModal;
