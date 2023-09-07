import React from 'react';
import {useState, useEffect} from 'react';
import {Modal} from "react-bootstrap";

import db from '../../firebase';
import {ref, get} from "firebase/database";
import {useAccount} from "wagmi";
import {ToastContainer, toast} from "react-toastify";

const toastOptions = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
}
const ReferralModal = (props) => {
    const {address, isConnected} = useAccount();
    const [referralLink, setReferralLink] = useState("");

    async function getReferralCode() {
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
            <div className="modal-body referral-modal-wrapper" >
                <h4>Refer a friend to ArtRise</h4>
                <p>Integrate your original physical artwork and turn it into a Hybrid NFT. Simply
                    upload a photo of your artwork, fill out the artwork details and properties
                    and we'll take care of the rest.</p>
                <h5>Referral Link</h5>
                <div className='d-flex'>
                    <div
                        className="btn btn-light referral-link-wrapper">
                        <p className='pd-15'>{referralLink}</p>
                        <div className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(referralLink.toString())
                            toast.success("Copied to Clipboard", toastOptions);
                        }}>Copy
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-body referral-modal-wrapper" >
                <h5>Referral a member</h5>
                <p>Integrate your original physical artwork and turn it into a Hybrid NFT. Simply
                    upload a photo of your artwork, fill out the artwork details and properties
                    and we'll take care of the rest.</p>
            </div>
            <div className="modal-body referral-modal-wrapper">
                <h5>Referral an artist</h5>
                <p>Integrate your original physical artwork and turn it into a Hybrid NFT. Simply
                    upload a photo of your artwork, fill out the artwork details and properties
                    and we'll take care of the rest.</p>
            </div>
            <ToastContainer
                position="top-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Modal>

    );
};

export default ReferralModal;
