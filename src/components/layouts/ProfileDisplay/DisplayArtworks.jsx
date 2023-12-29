import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import CardModal from "../CardModal";
import {useMediaQuery} from "react-responsive";

const filterOptions = {
    categories: [
        {id: 'paintings', label: 'Paintings'},
        {id: 'photography', label: 'Photography'},
        {id: 'sculptures', label: 'Sculptures'},
        {id: 'mosaic', label: 'Mosaic'},
    ],
    fileTypes: [
        {id: 'image', label: 'Image'},
        {id: 'video', label: 'Video'},
    ],
    currencies: [
        {id: 'eth', label: 'ETH'},
    ],
};

const DisplayArtworks = (props) => {
    const data = props?.data;
    const [visible, setVisible] = useState(6);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 4);
    };
    const [modalShow, setModalShow] = useState(false);
    const [usdPriceInEth, setUsdPriceInEth] = useState();

    const isDeviceMobile = useMediaQuery({query: '(max-width: 1224px)'})


    //handling filter states
    const [showFilter, setShowFilter] = useState(false);
    const [filterState, setFilterState] = useState({
        categories: {},
        fileTypes: {},
        currencies: {},
    });

    //handling filter buttons
    const handleOptionChange = (section, optionId) => {
        setFilterState((prevState) => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [optionId]: !prevState[section][optionId],
            },
        }));
    };
    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    return (
        <div className='artist-profile-wrapper'>
            <div className="filtersBtn" onClick={toggleFilter}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 7H21"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    ></path>
                    <path
                        d="M6 12H18"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    ></path>
                    <path
                        d="M10 17H14"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    ></path>
                </svg>
            </div>
            <div className={isDeviceMobile ? 'd-flex flex-column' : 'd-flex flex-row'}>
                {showFilter && (
                    <div className="filter-content">
                        {Object.keys(filterOptions).map((section) => (
                            <div className="filter-section" key={section}>
                                <h3>{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
                                <div className="divider"/>
                                {filterOptions[section].map((option) => (
                                    <label className="filter-option" key={option.id}>
                                        <input
                                            className='filter-checkbox-input'
                                            type="checkbox"
                                            style={{color:'black'}}
                                            checked={filterState[section][option.id] || false}
                                            onChange={() => handleOptionChange(section, option.id)}
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                <div
                    className={showFilter ? 'artist-artworks-wrapper-collapsed' : 'artist-artworks-wrapper'}>

                    {data.slice(0,visible).map((listing, index) => {
                        return (
                            <div key={index} style={isDeviceMobile ? {maxWidth: "45vw"}:{maxWidth: "22vw"}}>
                                <div className={`sc-card-product`}>
                                    <div className="card-media">
                                        <Link
                                            to={"/artwork-dettails?id=" + listing.artworkId}
                                        >
                                            <img src={listing.data.image} alt=""/>
                                        </Link>

                                        <Link
                                            to="/login"
                                            className="wishlist-button heart"
                                            hidden
                                        >
                                            <span className="number-like">10</span>
                                        </Link>
                                        <div className="coming-soon" hidden>
                                            10
                                        </div>
                                    </div>

                                    <div className="card-title">
                                        <h5 className="style2">
                                            <Link
                                                to={"/artwork-dettails?id=" + listing.artworkId}
                                            >
                                                {listing.data.name}
                                            </Link>
                                        </h5>
                                    </div>
                                    <div className="meta-info">
                                        <div className="author">
                                            <div className="avatar">
                                                <img src={listing.ownerImage} alt=""/>
                                            </div>
                                            <div className="info">
                                                <span>Owned By</span>
                                                <h6>
                                                    {" "}
                                                    <Link to="/Artists/Yann_Faisant">
                                                        {listing.ownerName}
                                                    </Link>{" "}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="price">
                                            <span>Price</span>
                                            <h6>
                                                <small
                                                    style={{
                                                        fontWeight: "600",
                                                        color: "black",
                                                        fontSize: "0.8em",
                                                        fontStyle: "italic",
                                                    }}
                                                >
                                                    ${(listing.price * usdPriceInEth).toFixed(2)}
                                                    &nbsp;
                                                    {" ≈ "}
                                                    &nbsp;
                                                    {listing.price} ETH
                                                </small>
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        <Link
                                            to={"/artwork-dettails?id=" + listing.artworkId}
                                            className="buyNowBtn"
                                        >
                                            <button className="sc-button style bag fl-button pri-3 no-bg">
                                                <span>Buy now</span>
                                            </button>
                                        </Link>

                                        <Link
                                            to="/activity-01"
                                            className="view-history reload"
                                            hidden
                                        >
                                            View History
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            {visible < data.length && (
                <div
                    className="col-md-12 wrap-inner load-more text-center mb-20"
                >
                    <Link
                        to="#"
                        id="load-more"
                        className="sc-button loadmore fl-button pri-3"
                        onClick={showMoreItems}
                    >
                        <span>Load More</span>
                    </Link>
                </div>
            )}
            <CardModal show={modalShow} onHide={() => setModalShow(false)}/>
        </div>

    );
};

DisplayArtworks.propTypes = {
    data: PropTypes.array.isRequired,
};

export default DisplayArtworks;
