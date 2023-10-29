import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {FaAngleRight, FaBell, FaHome, FaShoppingCart, FaWallet} from "react-icons/fa";
import {MdExplore, MdOutlineLabelImportant} from "react-icons/md";
import {BsFillPersonFill} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import RenderJoinLoginButtonMobileVersion from "../../RenderJoinLoginButton/RenderJoinLoginButtonMobileVersion";
import {useAccount} from "wagmi";
import {CheckUserExists} from "../../../../services/AuthServices/CheckUserExists";
import {useWeb3Modal} from "@web3modal/react";
import RenderWalletAddressMobileVersion from "../../RenderWalletAddressSection/RenderWalletAddressMobileVersion";
import RenderConnectWalletAddressMobileVersion
    from "../../RenderWalletAddressSection/RenderConnectWalletAddressMobileVersion";

const DisplayMenuLinks = ({
                              handleMenuModalClose,
                              setShowExploreOptions,
                              showExploreOptions,
                              setShowProfileOptions,
                              showProfileOptions,
                              showLoginModal,
                              setShowLoginModal,
                              showJoinModal,
                              setShowJoinModal,
                              joinChoicesModalOpen,
                              setJoinChoicesModalOpen,
                              loginModalOpen,
                              setLoginModalOpen,
                          }) => {
    const {address, isConnected} = useAccount();
    const {open} = useWeb3Modal();
    const [referee, setReferee] = useState("");
    const [isTwitterConected, setIsTwitterConected] = useState(false);

    const [currentMode, setCurrentMode] = useState(localStorage.getItem('theme') || 'light'); //State for the light dark mode switch

    useEffect(() => {  //function for the light dark mode switch
        document.body.classList.remove('light', 'is_dark');
        document.body.classList.add(currentMode);
        localStorage.setItem("theme", currentMode);
    }, [currentMode]);

    const modeSwitchHandler = () => { //function for the light dark mode switch
        const newMode = currentMode === 'light' ? 'is_dark' : 'light';
        setCurrentMode(newMode);
        localStorage.setItem("theme", newMode);
    }

    function checkForReferralCode() {
        let url = window.location.href;
        if (url.toString().includes("?")) {
            setReferee(url.toString().split("?ref=")[1]);
        } else {
            setReferee("none");
        }
    }

    useEffect(() => {
        checkForReferralCode();
        let twitterState = localStorage.getItem("twitter");
        if (twitterState) setIsTwitterConected(true);
        else setIsTwitterConected(false);
    }, []);

    return (
            <div className="display-menu-links-wrapper">

                <div className="accordion-border-color-transparent">
                    <div className="accordion-card-background-border-color">
                        <Link to="/">
                            <div className="accordion-card-display-flex-font-large"
                                 onClick={() => handleMenuModalClose()}><FaHome/> Home
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="accordion-border-color-transparent"
                     onClick={() => setShowExploreOptions(!showExploreOptions)}>
                    <div className="accordion-card-background-border-color">
                        <div className="accordion-card-display-flex-font-large"><MdExplore/> Explore</div>
                        <div style={{fontSize: "large"}}><FaAngleRight/></div>
                    </div>
                </div>

                <div className="accordion-border-color-transparent">
                    <div className="accordion-card-background-border-color">
                        <Link to="/Drops">
                            <div className="accordion-card-display-flex-font-large"><MdOutlineLabelImportant/> Drops
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="accordion-border-color-transparent">
                    <div className="accordion-card-background-border-color">
                        <div className="accordion-card-display-flex-font-large"><FaBell/> Notifications</div>
                        <div style={{fontSize: "large"}}><FaAngleRight/></div>
                    </div>
                </div>

                <div className="accordion-border-color-transparent">
                    <div className="accordion-card-background-border-color">
                        <div className="accordion-card-display-flex-font-large"><FaShoppingCart/> Cart</div>
                        <div style={{fontSize: "large"}}><FaAngleRight/></div>
                    </div>
                </div>

                {
                    (isConnected &&
                        !localStorage.getItem("twitter") &&
                        !localStorage.getItem("google") &&
                        !localStorage.getItem("facebook"))
                        ?
                        (<>
                                {
                                        // CheckUserExists(address, referee)
                                }
                                <div className="accordion-border-color-transparent"
                                     onClick={() => setShowProfileOptions(!showProfileOptions)}>
                                    <div className="accordion-card-background-border-color">
                                        <div className="accordion-card-display-flex-font-large">
                                            <BsFillPersonFill/> Profile
                                        </div>
                                        <div style={{fontSize: "large"}}><FaAngleRight/></div>
                                    </div>
                                </div>
                                {
                                    address ? <RenderWalletAddressMobileVersion
                                            address={address}
                                            open={open}
                                            handleMenuModalClose={handleMenuModalClose}
                                        /> :
                                        <RenderConnectWalletAddressMobileVersion
                                            open={open}
                                            handleMenuModalClose={handleMenuModalClose}
                                        />
                                }
                            </>
                        ) :
                        localStorage.getItem("twitter") ||
                        localStorage.getItem("google") ||
                        localStorage.getItem("facebook")
                            ?
                            (<>
                                <div className="accordion-border-color-transparent"
                                     onClick={() => setShowProfileOptions(!showProfileOptions)}>
                                    <div className="accordion-card-background-border-color">
                                        <div className="accordion-card-display-flex-font-large">
                                            <BsFillPersonFill/> Profile
                                        </div>
                                        <div style={{fontSize: "large"}}><FaAngleRight/></div>
                                    </div>
                                </div>
                                <RenderConnectWalletAddressMobileVersion
                                    open={open}
                                    handleMenuModalClose={handleMenuModalClose}
                                />
                            </>)
                            :
                            (
                                <RenderJoinLoginButtonMobileVersion
                                    handleMenuModalClose={handleMenuModalClose}
                                    setShowLoginModal={setShowLoginModal}
                                    setShowJoinModal={setShowJoinModal}
                                    joinChoicesModalOpen={joinChoicesModalOpen}
                                    setJoinChoicesModalOpen={setJoinChoicesModalOpen}
                                    loginModalOpen={loginModalOpen}
                                    setLoginModalOpen={setLoginModalOpen}
                                />
                            )
                }

                <Button
                    className='mobile-version-switch-mode-button'
                    onClick={modeSwitchHandler}>
                    Switch
                    Mode
                </Button>
            </div>
    )
}
export default DisplayMenuLinks;

