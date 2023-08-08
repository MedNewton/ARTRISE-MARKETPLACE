import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CardModal from "./CardModal";
import yann from "../../assets/images/avatar/yann.jpg";
import { useAddress, useContract, useListings } from "@thirdweb-dev/react";
import SideBar from "./home-8/SideBar";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Accordion } from "react-bootstrap-accordion";
import axios from "axios";
import db from "../../firebase";
import { ref, get } from "firebase/database";
import { useArtworkContext } from '../../Store/ArtworkContext';

const Artworks = (props) => {
  const {lazyListed} = useArtworkContext();
  const data = props.data;
  const [openPanel, setOpenPanel] = useState(false);
  const address = useAddress();
  const { contract } = useContract(
    "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
    "marketplace"
  );
  const { data: listings, isLoading, error } = useListings(contract);
  const [usdPriceInEth, setUsdPriceInEth] = useState();

  useEffect(() => {
    async function fetchPrice() {
      let response = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }
    fetchPrice();

    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);

  useEffect(() => {
    setInterval(async () => {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }, 30000);
    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);

  //this.setState(data);

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };
  const [modalShow, setModalShow] = useState(false);

  function weiToEther(wei) {
    let ether = wei / 1000000000000000000;
    return ether;
  }

  const [dataCate] = useState([
    {
      title: "Categories",
      content: [
        {
          field: "Paitings",
          checked: "checked",
        },
        {
          field: "Photography",
          checked: "",
        },
        {
          field: "Sculptures",
          checked: "",
        },
        {
          field: "Mosaic (10)",
          checked: "",
        },
      ],
    },
    {
      title: "File Types",
      content: [
        {
          field: "Image",
          checked: "checked",
        },
        {
          field: "Video (10)",
          checked: "",
        },
      ],
    },
    {
      title: "Currencies",
      content: [
        {
          field: "ETH (10)",
          checked: "",
        },
      ],
    },
  ]);

  return (
    <Fragment>
      <section className="tf-section today-pick">
        <div
          className="themesflat-container"
          style={{
            paddingLeft: "1%",
            paddingRight: "1%",
            marginLeft: "0px",
            marginRight: "0px",
            width: "100%",
          }}
        >
          <div className="row" id="TDP">
            <div className="col-md-12">
              <div className="heading-live-auctions mg-bt-21">
                <h2 className="tf-title pad-l-7 ourArtists">Artworks</h2>
              </div>
            </div>
            <div className="col-md-12">
              <div className="filtersBtn" onClick={(e) => setOpenPanel(true)}>
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
              <SlidingPane
                closeIcon={<div>Some div containing custom close icon.</div>}
                isOpen={openPanel}
                title="Hey, it is optional pane title.  I can be React component too."
                from="left"
                width="fit-content"
                onRequestClose={() => setOpenPanel(false)}
              >
                <SideBar></SideBar>
              </SlidingPane>
            </div>
            {!isLoading && listings ? (
              listings?.map((listing) => {
                if (
                  listing.id != 0 &&
                  listing.id != 17 &&
                  listing.id != 21 &&
                  listing.id != 28 &&
                  listing.id != 29 &&
                  listing.id >= 16
                ) {
                  return (
                    <div
                      key={listing.id}
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    >
                      <div className={`sc-card-product`}>
                        <div className="card-media">
                          <Link
                            to={{
                              pathname: "/item-details-01",
                              search: `?listing=${listing.id}`,
                            }}
                          >
                            <img src={listing.asset.image} alt="" />
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
                              to={{
                                pathname: "/item-details-01",
                                search: `?listing=${listing.id}`,
                              }}
                            >
                              {listing.asset.name}
                            </Link>
                          </h5>
                        </div>
                        <div className="meta-info">
                          <div className="author">
                            <div className="avatar">
                              <img src={yann} alt="" />
                            </div>
                            <div className="info">
                              <span>Owned By</span>
                              <h6>
                                {" "}
                                <Link to="//Artists/Yann_Faisant">
                                  Yann FAISANT
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
                                $3500 ≈ {(3500 / usdPriceInEth).toFixed(2)} ETH
                              </small>

                            </h6>
                          </div>
                        </div>
                        <div className="card-bottom">
                          <Link
                            to={{
                              pathname: "/item-details-01",
                              search: `?listing=${listing.id}`,
                            }}
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
                  );
                }
              })
            ) : (
              <div className="loadingBig">
                <img
                  src="https://media.tenor.com/eL-cXQYmRjQAAAAM/loading-load.gif"
                  className="loadingGIF"
                ></img>
              </div>
            )}

            {!isLoading && listings
              ? lazyListed.map((listing, index) => {
                console.log(listing)
                  return (
                    <div
                      key={index}
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    >
                      <div className={`sc-card-product`}>
                        <div className="card-media">
                          <Link
                            to={"/artwork-dettails?id=" + listing.artworkId}
                          >
                            <img src={listing.data.image} alt="" />
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
                              <img src={listing.ownerImage} alt="" />
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
                  );
                })
              : ""}

            {visible < data.length && (
              <div
                className="col-md-12 wrap-inner load-more text-center"
                hidden
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
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

Artworks.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Artworks;
