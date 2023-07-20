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

const ArtworksTom = (props) => {
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
                        "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/tomWhite%2F275285969_997294241189087_878247604983719410_n.jpg?alt=media&token=5557b763-5f9b-4167-92fc-d046003cd6b1"
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
                    <Link>Tom White Artwork 1</Link>
                  </h5>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/tomWhite%2F334662939_1630740137397035_2137941649254743133_n.jpg?alt=media&token=9dab6f99-ea0b-4d60-8c37-d482aeb4a33e"
                        }
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {" "}
                        <Link to="/Artists/Tom_White">Tom White</Link>{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="price">
                    <span>Price</span>
                    <h5>1.75 ETH<small
                                style={{
                                  fontWeight: "400",
                                  color: "grey",
                                  fontSize: "0.7em",
                                  fontStyle: "italic",
                                }}
                              >
                                (3165$)
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
                        "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/tomWhite%2F281207204_314760910824802_1142207878231542890_n.jpg?alt=media&token=e0d391fe-aa8d-46dc-8e8e-3920276a450c"
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
                    <Link>Tom White Artwork 2</Link>
                  </h5>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/tomWhite%2F334662939_1630740137397035_2137941649254743133_n.jpg?alt=media&token=9dab6f99-ea0b-4d60-8c37-d482aeb4a33e"
                        }
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {" "}
                        <Link to="/Artists/Tom_White">Tom White</Link>{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="price">
                    <span>Price</span>
                    <h5>1.93 ETH<small
                                style={{
                                  fontWeight: "400",
                                  color: "grey",
                                  fontSize: "0.7em",
                                  fontStyle: "italic",
                                }}
                              >
                                (3490$)
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
                        "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/tomWhite%2F284585711_2185253718309391_7393814280933797579_n.jpg?alt=media&token=f213cb4f-3eb9-4e97-923e-e7b6b57f0325"
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
                    <Link>Tom White Artwork 3</Link>
                  </h5>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/artrise-ffe4c.appspot.com/o/tomWhite%2F334662939_1630740137397035_2137941649254743133_n.jpg?alt=media&token=9dab6f99-ea0b-4d60-8c37-d482aeb4a33e"
                        }
                        alt=""
                      />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {" "}
                        <Link to="/Artists/Tom_White">Tom White</Link>{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="price">
                    <span>Price</span>
                    <h5>2.01 ETH<small
                                style={{
                                  fontWeight: "400",
                                  color: "grey",
                                  fontSize: "0.7em",
                                  fontStyle: "italic",
                                }}
                              >
                                (3635$)
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

ArtworksTom.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ArtworksTom;
