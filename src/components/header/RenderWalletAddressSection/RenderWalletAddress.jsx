import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const RenderWalletAddress = ({ address, open }) => {
    const menuLeft = useRef(null);
    const btnToggle = useRef(null);

    const menuToggle = () => {
        if (menuLeft.current && btnToggle.current) {
            menuLeft.current.classList.toggle("active");
            btnToggle.current.classList.toggle("active");
        }
    };

    return (
        <div className="sc-btn-top mg-r-12" id="site-header">
            <Link
                to="/"
                onClick={(e) => {
                    e.preventDefault();
                    menuToggle();
                    open();
                }}
                className="sc-button header-slider style style-1 wallet fl-button pri-1"
            >
        <span>
          {address?.toString()?.slice(0, 6)}...
            {address?.toString()?.substring(address?.toString()?.length - 3)}
        </span>
            </Link>
        </div>
    );
};

export default RenderWalletAddress;
