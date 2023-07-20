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

const ArtworksVilte = (props) => {
  const data = props.data;

  const [openPanel, setOpenPanel] = useState(false);

  const address = useAddress();

  const { contract } = useContract(
    "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
    "marketplace"
  );
  const { data: listings, isLoading, error } = useListings(contract);

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
        <div className="themesflat-container">
          <div className="row" id="TDP">
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

            <div key={0} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className={`sc-card-product`}>
                <div className="card-media">
                  <Link>
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/vilt%C3%A9%2F325591593_888489049058575_6840803505274648910_n.jpg?alt=media&token=73c0971e-4b69-41c1-8138-db10355fe972"
                      }
                      alt=""
                    />
                  </Link>
                  <Link to="/login" className="wishlist-button heart" hidden>
                    <span className="number-like">10</span>
                  </Link>
                  <div className="coming-soon" hidden>
                    10
                  </div>
                </div>
                <div className="card-title">
                  <h5 className="style2">
                    <Link>Vilté Fuller Artwork 1</Link>
                  </h5>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/vilt%C3%A9%2F335516755_760392705357745_5254239554492995511_n.jpg?alt=media&token=5939d3c0-f381-44e6-9967-a0a1528c1bcb"
                        }
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {" "}
                        <Link to="/Artists/Tom_White">Vilté Fuller</Link>{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="price">
                    <span>Price</span>
                    <h5>1.75 ETH <small
                                style={{
                                  fontWeight: "400",
                                  color: "grey",
                                  fontSize: "0.7em",
                                  fontStyle: "italic",
                                }}
                              >
                                (1800$)
                              </small></h5>
                  </div>
                </div>
                <div className="card-bottom">
                  <Link className="buyNowBtn">
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
            <div key={0} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className={`sc-card-product`}>
                <div className="card-media">
                  <Link>
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/vilt%C3%A9%2F336047904_1255816038638124_3963666446376088944_n.jpg?alt=media&token=42e40d4c-f444-4ba8-a8a8-acda8e0ea895"
                      }
                      alt=""
                    />
                  </Link>
                  <Link to="/login" className="wishlist-button heart" hidden>
                    <span className="number-like">10</span>
                  </Link>
                  <div className="coming-soon" hidden>
                    10
                  </div>
                </div>
                <div className="card-title">
                  <h5 className="style2">
                    <Link>Vilté Fuller Artwork 2</Link>
                  </h5>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/vilt%C3%A9%2F335516755_760392705357745_5254239554492995511_n.jpg?alt=media&token=5939d3c0-f381-44e6-9967-a0a1528c1bcb"
                        }
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {" "}
                        <Link to="/Artists/Tom_White">Vilté Fuller</Link>{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="price">
                    <span>Price</span>
                    <h5>1.93 ETH <small
                                style={{
                                  fontWeight: "400",
                                  color: "grey",
                                  fontSize: "0.7em",
                                  fontStyle: "italic",
                                }}
                              >
                                (1800$)
                              </small></h5>
                  </div>
                </div>
                <div className="card-bottom">
                  <Link className="buyNowBtn">
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
            <div key={0} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className={`sc-card-product`}>
                <div className="card-media">
                  <Link>
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/vilt%C3%A9%2F337689626_1185028275534965_4742551989839253257_n.jpg?alt=media&token=bdd25404-505e-4a61-a76a-dd3d847006bd"
                      }
                      alt=""
                    />
                  </Link>
                  <Link to="/login" className="wishlist-button heart" hidden>
                    <span className="number-like">10</span>
                  </Link>
                  <div className="coming-soon" hidden>
                    10
                  </div>
                </div>
                <div className="card-title">
                  <h5 className="style2">
                    <Link>Vilté Fuller Artwork 3</Link>
                  </h5>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/vilt%C3%A9%2F335516755_760392705357745_5254239554492995511_n.jpg?alt=media&token=5939d3c0-f381-44e6-9967-a0a1528c1bcb"
                        }
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {" "}
                        <Link to="/Artists/Tom_White">Vilté Fuller</Link>{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="price">
                    <span>Price</span>
                    <h5>2.01 ETH <small
                                style={{
                                  fontWeight: "400",
                                  color: "grey",
                                  fontSize: "0.7em",
                                  fontStyle: "italic",
                                }}
                              >
                                (1800$)
                              </small></h5>
                  </div>
                </div>
                <div className="card-bottom">
                  <Link className="buyNowBtn">
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

ArtworksVilte.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ArtworksVilte;
