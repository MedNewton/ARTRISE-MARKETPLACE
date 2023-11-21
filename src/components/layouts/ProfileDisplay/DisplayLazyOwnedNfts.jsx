import React, {useState} from "react";
import {Link} from "react-router-dom";
import CardModal from "../CardModal";
import {useProfileContext} from "../../../Store/ProfileContext";
import {useSelector} from "react-redux";

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

const DisplayOwnedNfts = () => {

    const data = useSelector((state) => state.usersReducer.lazyOwned);
    const [visible, setVisible] = useState(6);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 4);
    };
    const [modalShow, setModalShow] = useState(false);

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
            <div className='d-flex flex-row'>
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
                                            style={{color: 'black'}}
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
                    className={showFilter ? 'd-flex flex-wrap flex-row artist-artworks-wrapper-collapsed' : 'd-flex flex-wrap flex-row artist-artworks-wrapper'}>
                    {data?.slice(0, visible)?.map((listing, index) => {
                        if (listing?.listable) {
                            return (
                                <div key={index} style={{maxWidth: "300px"}}>
                                    <div className={`sc-card-product`}>
                                        <div className="card-media">
                                            <Link
                                                to={"/private-display?id=" + listing?.id}
                                            >
                                                <img src={listing?.data?.image} alt=""/>
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
                                                    to={"/private-display?id=" + listing?.id}
                                                >
                                                    {listing?.data?.name}
                                                </Link>
                                            </h5>
                                        </div>
                                        <div className="card-bottom">
                                            <Link
                                                to={"/private-display?id=" + listing?.id}
                                                className="buyNowBtn"
                                            >
                                                <button className="sc-button style bag fl-button pri-3 no-bg">
                                                    <span>List this NFT</span>
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

                        } else {
                            return (
                                <div key={index} style={{maxWidth: "300px"}}>
                                    <div className={`sc-card-product`}>
                                        <div className="card-media">
                                            <Link
                                                to={"/artwork-dettails?id=" + listing.id}
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
                                                    to={"/artwork-dettails?id=" + listing.id}
                                                >
                                                    {listing.data.name}
                                                </Link>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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

export default DisplayOwnedNfts;
