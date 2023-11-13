import React from 'react';
import {Link} from "react-router-dom";
import {FaAngleLeft, FaBook, FaFileAlt, FaHandsHelping, FaLink, FaPlus, FaSignOutAlt, FaSlidersH} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";
import {BiCoinStack} from "react-icons/bi";

const DisplayProfileLinks = ({
                                 setShowProfileOptions,
                                 showProfileOptions,
                                 handleMenuModalClose,
                                 logoutHandler
                             }) => {
    return (
        <div className="display-menu-links-wrapper">
            <div className="accordion-border-color-transparent">
                <div className="accordion-card-back-option-background-border-color">
                    <Link to="/">
                        <div className="accordion-card-display-flex-font-large"
                             onClick={() => setShowProfileOptions(!showProfileOptions)}><FaAngleLeft/> Profile
                        </div>
                    </Link>
                </div>
            </div>

            {localStorage.getItem("accountTypeChoice") === "artist" &&
                <div className="accordion-border-color-transparent">
                    <div className="accordion-card-background-border-color">
                        <Link to={"/displayProfile?artist=" + localStorage.getItem("UserKey")}>
                            <div className="accordion-card-display-flex-font-large"
                                 onClick={() => handleMenuModalClose()}><BsFillPersonFill/> My Profile
                            </div>
                        </Link>
                    </div>
                </div>
            }
            {localStorage.getItem("accountTypeChoice") === "user" &&
                <div className="accordion-border-color-transparent">
                    <div className="accordion-card-background-border-color">
                        <Link to={"/displayProfile?member=" + localStorage.getItem("UserKey")}>
                            <div className="accordion-card-display-flex-font-large"
                                 onClick={() => handleMenuModalClose()}><BsFillPersonFill/> My Profile
                            </div>
                        </Link>
                    </div>
                </div>
            }

            {localStorage.getItem("accountTypeChoice") === "user"
            && localStorage.getItem("walletAddress") !== "undefined"
            && localStorage.getItem("walletAddress") !== undefined
                ?
                (
                    <div className="accordion-border-color-transparent">
                        <div className="accordion-card-background-border-color">
                            <Link to="/tokenize">
                                <div className="accordion-card-display-flex-font-large"
                                     onClick={() => handleMenuModalClose()}><BiCoinStack/> Tokenize
                                </div>
                            </Link>
                        </div>
                    </div>
                )
                :
                ("")
            }

            {localStorage.getItem("accountTypeChoice") === "artist"
            && localStorage.getItem("walletAddress") !== "undefined"
            && localStorage.getItem("walletAddress") !== undefined
                ? (
                    <div className="accordion-border-color-transparent">
                        <div className="accordion-card-background-border-color">
                            <Link to="/creator-choice">
                                <div className="accordion-card-display-flex-font-large"
                                     onClick={() => handleMenuModalClose()}><FaPlus/> Create
                                </div>
                            </Link>
                        </div>
                    </div>
                )
                :
                ("")
            }

            <div className="accordion-border-color-transparent">
                <div className="accordion-card-background-border-color">
                    <Link to="/referral-program">
                        <div className="accordion-card-display-flex-font-large"
                             onClick={() => handleMenuModalClose()}><FaLink/> Referral
                        </div>
                    </Link>
                </div>
            </div>

            <div className="accordion-border-color-transparent">
                <div className="accordion-card-background-border-color">
                    <Link to="/learn">
                        <div className="accordion-card-display-flex-font-large"
                             onClick={() => handleMenuModalClose()}><FaBook/> Learn
                        </div>
                    </Link>
                </div>
            </div>

            <div className="accordion-border-color-transparent">
                <div className="accordion-card-background-border-color">
                    <Link to="/ressources">
                        <div className="accordion-card-display-flex-font-large"
                             onClick={() => handleMenuModalClose()}><FaFileAlt/> Resources
                        </div>
                    </Link>
                </div>
            </div>

            <div className="accordion-border-color-transparent">
                <div className="accordion-card-background-border-color">
                    <Link to="/help-center">
                        <div className="accordion-card-display-flex-font-large"
                             onClick={() => handleMenuModalClose()}><FaHandsHelping/> Help
                        </div>
                    </Link>
                </div>
            </div>

            <div className="accordion-border-color-transparent">
                <div className="accordion-card-background-border-color">
                    <Link to="/settings">
                        <div className="accordion-card-display-flex-font-large"
                             onClick={() => handleMenuModalClose()}><FaSlidersH/> Settings
                        </div>
                    </Link>
                </div>
            </div>

            <div className="accordion-border-color-transparent">
                <div className="accordion-card-background-border-color">
                    <Link to="/home-08">
                        <div className="accordion-card-display-flex-font-large"
                             onClick={(e) => {
                                 e.preventDefault()
                                 logoutHandler();
                                 handleMenuModalClose()
                             }
                             }><FaSignOutAlt/> Logout
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default DisplayProfileLinks;

