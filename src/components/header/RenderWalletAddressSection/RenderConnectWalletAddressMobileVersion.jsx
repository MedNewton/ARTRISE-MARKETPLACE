import React, {useRef} from "react";
import {FaWallet} from "react-icons/fa";

const RenderConnectWalletAddressMobileVersion = ({open, handleMenuModalClose}) => {

    return (
        <div className="accordion-mobile-wallet-address-wrapper">
            <div className="accordion-border-color-transparent">
                <div className="accordion-card-background-border-color"
                     onClick={(e) => {
                         e.preventDefault();
                         open();
                         handleMenuModalClose();
                     }}
                >
                    <div className="accordion-card-display-flex-font-large"><FaWallet/>
                        Connect Wallet
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenderConnectWalletAddressMobileVersion;
