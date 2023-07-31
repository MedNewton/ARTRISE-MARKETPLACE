import React from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookMessengerShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    FacebookMessengerIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    EmailIcon,
  } from "react-share";
const ShippingModal = (props) => {
    
    const share_url = window.location.href;
    const title = "Artrise"
return (

    <Modal
    show={props.show}
    onHide={props.onHide}
  >
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body space-y-20 pd-40">
        <h3>Estimated shipping cost:</h3>
        
        <p className="text-center ">Collectors have the option to not receive the physical artwork, in this case, the artwork is kept in the artist’s hand for the primary sales market or on specialized art storages for the secondary sales market, the artworks still owned by the collectors and can ask for shipping whenever he wants</p>
        
        
        

    </div>
    </Modal>
    
  );
};

export default ShippingModal;
