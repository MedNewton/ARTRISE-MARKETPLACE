import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {FaAngleRight,FaAngleLeft,FaBell,FaHome,FaShoppingCart} from "react-icons/fa";
import {FaBook, FaFileAlt, FaHandsHelping, FaLink, FaPlus, FaRegUser, FaSignOutAlt, FaSlidersH} from "react-icons/fa";

import {PiPaintBucketFill} from "react-icons/pi"
import {BsFillPersonFill,BsPersonLinesFill} from "react-icons/bs";
import {MdOutlineLabelImportant, MdExplore} from "react-icons/md";
import {IoIosPhotos} from "react-icons/io";
import {RiMenuSearchFill} from "react-icons/ri";
import {BiCoinStack} from "react-icons/bi";
import {Link, useNavigate} from "react-router-dom";
import {Logout} from "../../../services/AuthServices/Logout";
import {useDisconnect} from "wagmi";


const MobileVersionMenuModal = ({showMenuModal, handleMenuModalClose, handleShowMenuModal}) => {

    const nav = useNavigate();
    const {disconnect} = useDisconnect();

    const [currentMode, setCurrentMode] = useState(localStorage.getItem('theme') || 'light'); //State for the light dark mode switch
    const [showExploreOptions, setShowExploreOptions] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);

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

    const logoutHandler = async () => {
        try {
            await Logout(disconnect, nav);
        } catch (error) {
        }
    }

    return (
        <>
            <Modal show={showMenuModal} onHide={() => handleMenuModalClose()}>
                {!showExploreOptions && !showProfileOptions &&
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

                    <div className="accordion-border-color-transparent" onClick={()=>setShowExploreOptions(!showExploreOptions)}>
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

                    <div className="accordion-border-color-transparent" onClick={()=>setShowProfileOptions(!showProfileOptions)}>
                        <div className="accordion-card-background-border-color">
                            <div className="accordion-card-display-flex-font-large"><BsFillPersonFill/> Profile</div>
                            <div style={{fontSize: "large"}}><FaAngleRight/></div>
                        </div>
                    </div>

                    <Button className='accordion-card-display-flex-font-large' onClick={modeSwitchHandler}>Switch
                        Mode</Button>

                </div>
                }

                {showExploreOptions &&

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5vh",
                        alignItems: "center",
                        fontSize: "large",
                        padding: "5% 10%"
                    }}>

                        <div className="accordion-border-color-transparent">
                            <div className="accordion-card-back-option-background-border-color">
                                <Link to="/">
                                    <div className="accordion-card-display-flex-font-large"
                                         onClick={() => setShowExploreOptions(!showExploreOptions)}><FaAngleLeft/> Explore
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="accordion-border-color-transparent">
                            <div className="accordion-card-background-border-color">
                                <Link to="/authors-01">
                                    <div className="accordion-card-display-flex-font-large"
                                         onClick={() => handleMenuModalClose()}><BsPersonLinesFill/> Artists
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="accordion-border-color-transparent">
                            <div className="accordion-card-background-border-color">
                                <Link to="/collections">
                                <div className="accordion-card-display-flex-font-large"
                                     onClick={() => handleMenuModalClose()}><IoIosPhotos/> Collections</div>
                                </Link>
                            </div>
                        </div>

                        <div className="accordion-border-color-transparent">
                            <div className="accordion-card-background-border-color">
                                <Link to="/explore-01">
                                    <div className="accordion-card-display-flex-font-large"
                                         onClick={() => handleMenuModalClose()}><PiPaintBucketFill/> Artworks
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="accordion-border-color-transparent">
                            <div className="accordion-card-background-border-color">
                                <Link to="/home-08">
                                <div className="accordion-card-display-flex-font-large"
                                     onClick={() => handleMenuModalClose()}><RiMenuSearchFill/> Browse</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                }

                {showProfileOptions &&

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3vh",
                        alignItems: "center",
                        fontSize: "large",
                        padding: "5% 10%"
                    }}>

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
                        && localStorage.getItem("walletAddress") !=="undefined"
                        && localStorage.getItem("walletAddress") !==undefined
                            ?
                            (
                                <div className="accordion-border-color-transparent">
                                    <div className="accordion-card-background-border-color">
                                        <Link to="/tokenize">
                                            <div className="accordion-card-display-flex-font-large"
                                                 onClick={() => handleMenuModalClose()}><BiCoinStack/> Tokenize</div>
                                        </Link>
                                    </div>
                                </div>
                        )
                            :
                            ("")
                        }

                        {localStorage.getItem("accountTypeChoice") === "artist"
                        && localStorage.getItem("walletAddress") !=="undefined"
                        && localStorage.getItem("walletAddress") !==undefined
                            ? (
                                <div className="accordion-border-color-transparent">
                                    <div className="accordion-card-background-border-color">
                                        <Link to="/creator-choice">
                                            <div className="accordion-card-display-flex-font-large"
                                                 onClick={() => handleMenuModalClose()}><FaPlus/> Create</div>
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
                                         onClick={() => handleMenuModalClose()}><FaBook/> Learn</div>
                                </Link>
                            </div>
                        </div>

                        <div className="accordion-border-color-transparent">
                            <div className="accordion-card-background-border-color">
                                <Link to="/ressources">
                                    <div className="accordion-card-display-flex-font-large"
                                         onClick={() => handleMenuModalClose()}><FaFileAlt/> Resources</div>
                                </Link>
                            </div>
                        </div>

                        <div className="accordion-border-color-transparent">
                            <div className="accordion-card-background-border-color">
                                <Link to="/help-center">
                                    <div className="accordion-card-display-flex-font-large"
                                         onClick={() => handleMenuModalClose()}><FaHandsHelping/> Help</div>
                                </Link>
                            </div>
                        </div>

                        <div className="accordion-border-color-transparent">
                            <div className="accordion-card-background-border-color">
                                <Link to="/settings">
                                    <div className="accordion-card-display-flex-font-large"
                                         onClick={() => handleMenuModalClose()}><FaSlidersH/> Settings</div>
                                </Link>
                            </div>
                        </div>

                        <div className="accordion-border-color-transparent">
                            <div className="accordion-card-background-border-color">
                                <Link to="/home-08">
                                    <div className="accordion-card-display-flex-font-large"
                                         onClick={(e) => {
                                             console.log("heeeeee :1")
                                             e.preventDefault()
                                             logoutHandler();
                                             handleMenuModalClose()
                                         }
                                    }><FaSignOutAlt/> Logout</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                }


            </Modal>
        </>
    )
}
export default MobileVersionMenuModal;