import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
    FaAngleRight,
    FaBell,
    FaHome,
    FaSearch,
    FaShoppingCart, FaSnowman,
    FaWarehouse,
} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";
import {MdOutlineLabelImportant, MdExplore} from "react-icons/md"
import {Link} from "react-router-dom";

const MobileVersionMenuModal = ({showMenuModal, handleMenuModalClose, handleShowMenuModal}) => {
    const [currentMode, setCurrentMode] = useState(localStorage.getItem('theme') || 'light'); //State for the light dark mode switch

    useEffect(() => {  //function for the light dark mode switch
        // Update the body class when the component mounts or when the currentMode changes.
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
            <Modal show={showMenuModal} onHide={() => handleMenuModalClose()}>
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


                    <div className="accordion-border-color-transparent">
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
                        <div className="accordion-card-background-border-color">
                            <div className="accordion-card-display-flex-font-large"><BsFillPersonFill/> Profile</div>
                            <div style={{fontSize: "large"}}><FaAngleRight/></div>
                        </div>
                    </div>

                    <Button className='accordion-card-display-flex-font-large' onClick={modeSwitchHandler}>Switch
                        Mode</Button>

                </div>
            </Modal>
        </>
    )
}
export default MobileVersionMenuModal;