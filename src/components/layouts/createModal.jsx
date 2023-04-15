import React from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";

import { useSDK } from '@thirdweb-dev/react';

const CreateModal = (props) => {

    
    const share_url = window.location.href;
    const title = "Artrise"
return (

    <Modal
    show={props.show}
    onHide={props.onHide}
  >
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body space-y-20 pd-40">
        <h3>Start creating on ARTRISE</h3>
        <p className="text-center"><span className="price color-popup">Create a collection</span>
        </p>
        <p className="text-center ">Artists on ARTRISE can create their own colelctions that are seperate smart contracts, on which they can mint their artworks.</p>
        <Link to={'/create-collection'}><div id='createCollection' className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Create a collection</div></Link>
        <hr className='buyOptionsSeparator'/>
        <p className="text-center"><span className="price color-popup">Create a single artwork</span>
        </p>
        <p className="text-center ">Artists on ARTRISE also have the option to create single artworks, that are minted on the shared ARTRISE collection.</p>
        <Link to={'/create-item'}><div id='createSingleArtwork' className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Create a single artwork</div></Link>
        
        

    </div>
    </Modal>
    
  );
};

export default CreateModal;
