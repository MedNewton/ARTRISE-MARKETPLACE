import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CardModal from "./CardModal";
import yann from "../../assets/images/avatar/yann.jpg";
import {useContract, useListings } from "@thirdweb-dev/react";
import axios from "axios";
import MediaViewer from "../mediaViewer/MediaViewer";
import {useSelector} from "react-redux";

const TodayPicks = (props) => {
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);
  const data = props.data;
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
    };
  }, []);

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };
  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <section className="tf-section today-pick">
        <div className="themesflat-container homeTodaysPick">
          <div className="row" id="TDP">
            <div className="col-md-12">
              <div className="heading-live-auctions mg-bt-21">
                <h2 className="tf-title pad-l-7" style={{ marginTop: "2%" }}>
                  Artworks
                </h2>
                <Link to="/explore-01" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
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
                                <Link to="/Artists/Yann_Faisant">
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
                  return (
                      <div
                          key={index}
                          className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      >
                        <div className={`sc-card-product`}>
                          <div className="card-media">
                            <Link
                                to={"/artwork-details?id=" + listing.artworkId}
                            >
                              <MediaViewer mediaUrl = {listing?.data?.image}/>
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
                                  to={"/artwork-details?id=" + listing.artworkId}
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
                                to={"/artwork-details?id=" + listing.artworkId}
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

TodayPicks.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TodayPicks;
