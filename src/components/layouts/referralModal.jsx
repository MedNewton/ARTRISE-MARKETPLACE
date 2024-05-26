import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { ref, get } from 'firebase/database';
import { useAccount } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import db from '../../firebase';

const toastOptions = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};
function ReferralModal(props) {
  const { onHide: propsOnHide, show: propsShow } = props;
  const { address } = useAccount();
  const [referralLink, setReferralLink] = useState('');

  const getReferralCode = useCallback(async () => {
    const ThisUserRef = ref(db, `users/${address}`);
    await get(ThisUserRef).then(async (snapshot) => {
      const dt = snapshot.val();
      const { referralCode } = dt;
      setReferralLink(`https://marketplace.artrise.io/?ref=${referralCode}`);
    });
  }, [address]);

  useEffect(() => {
    getReferralCode();
  }, [getReferralCode, address]);

  return (
    <Modal
      show={propsShow}
      onHide={propsOnHide}
    >
      <Modal.Header closeButton />
      <div className="modal-body referral-modal-wrapper">
        <h4>Refer a friend to ArtRise</h4>
        <p>
          Integrate your original physical artwork and turn it into a Hybrid NFT. Simply
          upload a photo of your artwork, fill out the artwork details and properties
          and we&apos;ll take care of the rest.
        </p>
        <h5>Referral Link</h5>
        <div className="d-flex">
          <div
            className="btn btn-light referral-link-wrapper"
          >
            <p className="pd-15 referal-Link">{referralLink}</p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '25%' }}
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(referralLink.toString());
                toast.success('Copied to Clipboard', toastOptions);
              }}
              onKeyDown={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(referralLink.toString());
                toast.success('Copied to Clipboard', toastOptions);
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <div className="modal-body referral-modal-wrapper">
        <h5>Referral a member</h5>
        <p>
          Integrate your original physical artwork and turn it into a Hybrid NFT. Simply
          upload a photo of your artwork, fill out the artwork details and properties
          and we&apos;ll take care of the rest.
        </p>
      </div>
      <div className="modal-body referral-modal-wrapper">
        <h5>Referral an artist</h5>
        <p>
          Integrate your original physical artwork and turn it into a Hybrid NFT. Simply
          upload a photo of your artwork, fill out the artwork details and properties
          and we&apos;ll take care of the rest.
        </p>
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
}

ReferralModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

ReferralModal.defaultProps = {
  onHide: () => {},
  show: false,
};

export default ReferralModal;
