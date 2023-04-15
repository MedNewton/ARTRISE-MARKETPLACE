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
const CardModal2 = (props) => {
    
    const share_url = window.location.href;
    const title = "Artrise"
return (

    <Modal
    show={props.show}
    onHide={props.onHide}
  >
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body space-y-20 pd-40">
        <h3>Share</h3>
        <p className="text-center">Share this artwork to<br />your favorite social networks</p>
        <div className='socialShare'>
            <FacebookShareButton url={share_url} quote={title} className="socialShareBtn">
                <FacebookIcon size={60} round />
            </FacebookShareButton>
            
            <FacebookMessengerShareButton url={share_url} quote={title} className="socialShareBtn">
                <FacebookMessengerIcon size={60} round />
            </FacebookMessengerShareButton>

            <TwitterShareButton url={share_url} quote={title} className="socialShareBtn">
                <TwitterIcon size={60} round/>
            </TwitterShareButton>

            <EmailShareButton url={share_url} quote={title} className="socialShareBtn">
                <EmailIcon size={60} round />
            </EmailShareButton>

            <WhatsappShareButton url={share_url} quote={title} className="socialShareBtn">
                <WhatsappIcon size={60} round />
            </WhatsappShareButton>

            <TelegramShareButton url={share_url} quote={title} className="socialShareBtn">
                <TelegramIcon size={60} round />
            </TelegramShareButton>

            <RedditShareButton url={share_url} quote={title} className="socialShareBtn">
                <RedditIcon size={60} round />
            </RedditShareButton>
        </div>

        
    </div>
    </Modal>
    
  );
};

export default CardModal2;
