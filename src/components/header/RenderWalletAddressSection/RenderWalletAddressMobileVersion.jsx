import React, {useRef} from "react";
import {FaWallet} from "react-icons/fa";

const RenderWalletAddress = ({address, open, handleMenuModalClose}) => {
    const menuLeft = useRef(null);
    const btnToggle = useRef(null);

    const menuToggle = () => {
        if (menuLeft.current && btnToggle.current) {
            menuLeft.current.classList.toggle("active");
            btnToggle.current.classList.toggle("active");
        }
    };

    return (
        <div className="accordion-mobile-wallet-address-wrapper">
            <div className="accordion-border-color-transparent">
                <div className="accordion-card-background-border-color"
                     onClick={(e) => {
                         e.preventDefault();
                         menuToggle();
                         open();
                         handleMenuModalClose();
                     }}
                >
                    <div className="accordion-card-display-flex-font-large"><FaWallet/>
                        {address.toString().slice(0, 6)}...
                        {address.toString().substring(address.toString().length - 3)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenderWalletAddress;
