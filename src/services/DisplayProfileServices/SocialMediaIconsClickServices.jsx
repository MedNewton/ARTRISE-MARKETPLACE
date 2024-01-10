import { toast, ToastContainer } from 'react-toastify';
import React from 'react';

export const handleTwitterIconClick = (Twitter) => {
  if (Twitter && Twitter !== 'No Twitter added yet ...') {
    window.open(Twitter, '_blank');
  } else {
    toast.error('No twitter account shared yet...', {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  return (
    <ToastContainer />
  );
};

export const handleInstagramIconClick = (Instagram) => {
  if (Instagram && Instagram !== 'No Instagram added yet ...') {
    window.open(Instagram, '_blank');
  } else {
    toast.error('No instagram account shared yet...', {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  return (
    <ToastContainer />
  );
};

export const handleFacebookIconClick = (Facebook) => {
  if (Facebook && Facebook !== 'No Facebook added yet ...') {
    window.open(Facebook, '_blank');
  } else {
    toast.error('No facebook account shared yet...', {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  return (
    <ToastContainer />
  );
};
