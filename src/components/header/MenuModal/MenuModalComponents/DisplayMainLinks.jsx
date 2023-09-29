import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {FaAngleRight, FaBell, FaHome, FaShoppingCart, FaWallet} from "react-icons/fa";
import {MdExplore, MdOutlineLabelImportant} from "react-icons/md";
import {BsFillPersonFill} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import RenderJoinLoginButton from "../../RenderJoinLoginButton/RenderJoinLoginButton";
import JoinChoicesModal from "../../../layouts/joinChoicesModal";
import LoginModal from "../../../layouts/loginModal";
import RenderJoinLoginButtonMobileVersion from "../../RenderJoinLoginButton/RenderJoinLoginButtonMobileVersion";

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
                              // setShowWalletMobileVersion,
                              // showWalletMobileVersion
                          }) => {

    // const [loginModalOpen, setLoginModalOpen] = useState();
    // const [joinChoicesModalOpen, setJoinChoicesModalOpen] = useState();

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

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "5vh",
                alignItems: "center",
                fontSize: "large",
                padding: "5% 10%"
            }}>

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

                <div className="accordion-border-color-transparent">
                    <div className="accordion-card-background-border-color"
                        // onClick={() => setShowWalletMobileVersion(!showWalletMobileVersion)}
                    >
                        <div className="accordion-card-display-flex-font-large"><FaWallet/> My Wallet</div>
                        <div style={{fontSize: "large"}}><FaAngleRight/></div>
                    </div>
                </div>

                <div className="accordion-border-color-transparent"
                     onClick={() => setShowProfileOptions(!showProfileOptions)}>
                    <div className="accordion-card-background-border-color">
                        <div className="accordion-card-display-flex-font-large"><BsFillPersonFill/> Profile</div>
                        <div style={{fontSize: "large"}}><FaAngleRight/></div>
                    </div>
                </div>


                <RenderJoinLoginButtonMobileVersion
                    handleMenuModalClose={handleMenuModalClose}
                    setShowLoginModal={setShowLoginModal}
                    setShowJoinModal={setShowJoinModal}
                    joinChoicesModalOpen={joinChoicesModalOpen}
                    setJoinChoicesModalOpen={setJoinChoicesModalOpen}
                    loginModalOpen={loginModalOpen}
                    setLoginModalOpen={setLoginModalOpen}
                />

                <Button className='mobile-version-switch-mode-button' onClick={modeSwitchHandler}>Switch
                    Mode</Button>
            </div>
        </>
    )
}
export default DisplayMenuLinks;

