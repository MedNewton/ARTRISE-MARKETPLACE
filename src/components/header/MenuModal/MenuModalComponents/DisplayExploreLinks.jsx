import React from 'react';
import {Link} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";
import {BsPersonLinesFill} from "react-icons/bs";
import {IoIosPhotos} from "react-icons/io";
import {PiPaintBucketFill} from "react-icons/pi";
import {RiMenuSearchFill} from "react-icons/ri";

const DisplayExploreLinks = ({
                                 setShowExploreOptions,
                                 showExploreOptions,
                                 handleMenuModalClose
                             }) => {
    return (
        <div className="display-menu-links-wrapper">
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
                             onClick={() => handleMenuModalClose()}><IoIosPhotos/> Collections
                        </div>
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
                             onClick={() => handleMenuModalClose()}><RiMenuSearchFill/> Browse
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default DisplayExploreLinks;

