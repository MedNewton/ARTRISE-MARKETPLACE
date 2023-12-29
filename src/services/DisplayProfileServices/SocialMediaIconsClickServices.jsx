import {toast, ToastContainer} from "react-toastify";
import React from "react";

export const handleTwitterIconClick = (Twitter) => {
    if (Twitter && Twitter !== "No account shared yet ...") {
        window.open(Twitter, "_blank");
    } else {
        toast.error("No twitter account shared yet...", {
            position: toast.POSITION.TOP_CENTER,
        });
    }
    return(
        <ToastContainer/>
    )
};

export const handleInstagramIconClick = (Instagram) => {
    if (Instagram && Instagram !== "No account shared yet") {
        window.open(Instagram, "_blank");
    } else {
        toast.error("No instagram account shared yet...", {
            position: toast.POSITION.TOP_CENTER,
        });
    }
    return(
        <ToastContainer/>
    )
};

export const handleFacebookIconClick = (Facebook) => {
    if (Facebook && Facebook !== "No account shared yet ...") {
        window.open(Facebook, "_blank");
    } else {
        toast.error("No facebook account shared yet...", {
            position: toast.POSITION.TOP_CENTER,
        });
    }
    return(
        <ToastContainer/>
    )
};