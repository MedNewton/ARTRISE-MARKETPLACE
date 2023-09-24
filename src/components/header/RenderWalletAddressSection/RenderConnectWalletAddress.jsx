import React, { useRef } from "react";
import { Link } from "react-router-dom";

const RenderConnectWalletAddress = ({ open }) => {

    return (
        <div className="sc-btn-top mg-r-12" id="site-header">
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
        className="sc-button header-slider style style-1 wallet fl-button pri-1"
      >
        <span>Connect Wallet</span>
      </Link>
    </div>
    );
};

export default RenderConnectWalletAddress;
