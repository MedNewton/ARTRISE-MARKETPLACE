import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import { useSDK } from '@thirdweb-dev/react';

import Swal from 'sweetalert2';

import db from '../../firebase';
import { ref, onValue, get, update, set, child } from "firebase/database";
import { useAccount } from "wagmi";

const ReferralModal = (props) => {

    const { address, isConnected } = useAccount();
    const [referralLink, setReferralLink] = useState("")
    const share_url = window.location.href;
    const title = "Artrise"

    async function getReferralCode(){
        const ThisUserRef = ref(db, "users/" + address);
        await get(ThisUserRef).then(async (snapshot) => {
            let dt = snapshot.val();
            let referralCode = dt.referralCode;
            setReferralLink("https://marketplace.artrise.io/?ref=" + referralCode)
        })
    }

    useEffect(() => {
      getReferralCode();
    }, [])
    



return (

    <Modal
    show={props.show}
    onHide={props.onHide}
  >
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body space-y-20 pd-40">
        <p className="text-center"><span className="price color-popup">Refer a friend</span>
        </p>
        <p className="text-center ">By sending the link bellow to your friends and connections, you can invite them to join the ARTRISE community, and win great rewards!.</p>
        <Form.Control type="text" placeholder={referralLink} readOnly />
        <Link style={{display: "flex"}}
        onClick={(e)=>{
            e.preventDefault();
            navigator.clipboard.writeText(referralLink.toString())
            
            Swal.fire({
                icon: "success",
                title: "Copied to clipboard",
            });  
        }}
        ><div id='createCollection' className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Copy to clipboard</div></Link>
        
        

    </div>
    </Modal>
    
  );
};

export default ReferralModal;
