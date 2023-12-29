import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import TodayPicks from "../components/layouts/TodayPicks";
import todayPickData from "../assets/fake-data/data-today-pick";
import liveAuctionData from "../assets/fake-data/data-live-auction";
import liveAuctionData2 from "../assets/fake-data/data-live-auction-2";
import LiveAuction from "../components/layouts/LiveAuction";
import SideBar from "../components/layouts/home-8/SideBar";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Accordion } from "react-bootstrap-accordion";
import Artworks from "../components/layouts/artworks";
import db from "../firebase";
import { get, ref } from "firebase/database";
import axios from "axios";

const CollectionItems = () => {
  const [collection, setCollection] = useState(null);
  const [collectionArtworks, setCollectionArtworks] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [ownerImage, setOwnerImage] = useState("");
  const [usdPriceInEth, setUsdPriceInEth] = useState();
  const [openPanel, setOpenPanel] = useState(false);

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

  async function getCollectionData() {
    let collectionID = window.location.href.toString().split("id=")[1];
    const collectionRef = ref(db, "collections/" + collectionID);
    await get(collectionRef).then(async (snapshot) => {
      let dt = snapshot.val();
      let ownerID = dt.owner;
      let ownerName = "";
      let ownerImage = "";
      const ownerRef = ref(db, "users/" + ownerID);
      await get(ownerRef).then((snap) => {
        let ownerDt = snap.val();
        ownerName = ownerDt.displayName;
        ownerImage = ownerDt.pdpLink;
        setOwnerImage(ownerDt.pdpLink);
        setOwnerName(ownerDt.displayName);
      });
      let collectionData = {
        image: dt.image,
        cover: dt.cover,
        name: dt.name,
        description: dt.description,
        owner: dt.owner,
        createdAt: dt.createdAt,
        owner_name: ownerName,
        owner_image: ownerImage
      };
      setCollection(collectionData);
    });
  }

  async function getCollectionArtworks() {
    let collectionID = window.location.href.toString().split("id=")[1];
    const artworksRef = ref(db, "artworks/");
    await get(artworksRef).then(async (snapshot) => {
      let allArtworks = snapshot.val();
      for (let i in allArtworks) {
        let artwork = allArtworks[i];
        if (artwork.collection === collectionID) {
          const listingsRef = ref(db, "listings/");
          let res = await axios.get(artwork.ipfsURI);
          await get(listingsRef).then((snap) => {
            let listings = snap.val();
            for (let j in listings) {
              if (listings[j].artwork_id === i) {
                let item = {
                  id: i,
                  artworkData: res.data,
                  ownerName: ownerName,
                  ownerImage: ownerImage,
                  price: listings[j].price,
                };
                setCollectionArtworks((prevState) => [...prevState, item]);
              }
            }
          });
          //setCollectionArtworks((prevState)=>[...prevState, artwork])
        }
      }
    });
  }

  function showMore() {
    let hiddenText = document.getElementsByClassName("hid");
    hiddenText[0].classList.remove("hid");
    document.getElementById("showMore").classList.add("hid");
  }

  function showLess() {
    let hiddenText = document.getElementsByClassName("rest");
    hiddenText[0].classList.add("hid");
    document.getElementById("showMore").classList.remove("hid");
  }

  useEffect(() => {
    getCollectionData();
    getCollectionArtworks();
    console.log(ownerImage);
    console.log(ownerName)
  }, []);

  if (collection === null) {
    return (
      <div>
        <HeaderStyle2 />
        <div className="loadingBig">
          <img
            src="https://media.tenor.com/eL-cXQYmRjQAAAAM/loading-load.gif"
            className="loadingGIF"
            style={{marginTop: '15vh'}}
          ></img>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <HeaderStyle2 />
        <div
          className="row collectionHeader"
          style={{ backgroundImage: `url(${collection.cover})` }}
        >
          <p className="collectionTitle heading text-center">
            {collection.name}
          </p>
        </div>
        <div
          className="collectionImage"
          style={{ backgroundImage: `url(${collection.image})` }}
        >
          <img src="" className="collectionImg" alt="" />
        </div>

        <section className="tf-section collectionInfo">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-md-6">
                <div className="heading-live-auctions mg-bt-21">
                  <h2 className="tf-title pad-l-7">Description</h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="widget-social style-3 collectionLinks">
                  <ul>
                    <li className="style-2">
                      <Link to="#">
                        <i className="fab fa-telegram-plane"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fab fa-youtube"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="//mobile.twitter.com/yannfaisant_">
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                    <li className="mgr-none">
                      <Link to="//www.facebook.com/YFaisant/">
                        <i className="fab fa-facebook"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-12 blockchainDetails desktopOnly">
                <div className="row">
                  <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                    <h5 className="blockchainDetailsTitle">Artworks</h5>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                    <h5 className="blockchainDetailsTitle">Created at</h5>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                    <h5 className="blockchainDetailsTitle">Creator fees</h5>
                  </div>
                </div>
                <div className="row blockchainDetailsData">
                  <div className="col-md-2">
                    <h5 className="blockchainDetailsText">
                      {collectionArtworks.length.toString()}
                    </h5>
                  </div>
                  <div className="col-md-2">
                    <h5 className="blockchainDetailsText">
                      {collection.createdAt}
                    </h5>
                  </div>
                  <div className="col-md-2">
                    <h5 className="blockchainDetailsText">10%</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mobileOnly blockchainDetails">
                <div className="row">
                  <div className="col-4">
                    <h5 className="blockchainDetailsTitle">Artworks</h5>
                  </div>
                  <div className="col-4">
                    <h5 className="blockchainDetailsTitle">Created At</h5>
                  </div>
                  <div className="col-4">
                    <h5 className="blockchainDetailsTitle">Creator fees</h5>
                  </div>
                </div>
                <div className="row blockchainDetailsData">
                  <div className="col-4 blockchainDetailsText">
                    <h5 className="blockchainDetailsText">10</h5>
                  </div>
                  <div className="col-4 blockchainDetailsText">
                    <h5 className="blockchainDetailsText">
                      {collection.createdAt}
                    </h5>
                  </div>
                  <div className="col-4 blockchainDetailsText">
                    <h5 className="blockchainDetailsText">10%</h5>
                  </div>
                </div>
                <div className="sep"></div>

                <div className="sep"></div>
              </div>

              <div className="col-md-12 createdBy">
                <h5 className="blockchainDetailsTitle">
                  Created by :{" "}
                  <span className="artistName1">{collection.owner_name}</span>
                </h5>
              </div>
              <div className="col-md-12">{collection.description}</div>
              <div className="col-md-12 blockchainDetails desktopOnly secondBD">
                <div className="row">
                  <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                    <h5 className="blockchainDetailsTitle">Total sales</h5>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                    <h5 className="blockchainDetailsTitle">Floor price</h5>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                    <h5 className="blockchainDetailsTitle ">Owned by</h5>
                  </div>
                </div>
                <div className="row blockchainDetailsData">
                  <div className="col-md-2">
                    <h5 className="blockchainDetailsText BDTXT">0</h5>
                  </div>
                  <div className="col-md-2">
                    <h5 className="blockchainDetailsText BDTXT">Not defined</h5>
                  </div>
                  <div className="col-md-2">
                    <h5 className="blockchainDetailsText BDTXT">1</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mobileOnly blockchainDetails secondBD">
                <div className="sep"></div>
                <div className="row">
                  <div className="col-4">
                    <h5 className="blockchainDetailsTitle">Total sales</h5>
                  </div>
                  <div className="col-4">
                    <h5 className="blockchainDetailsTitle ">Floor price</h5>
                  </div>
                  <div className="col-4">
                    <h5 className="blockchainDetailsTitle">Owned by</h5>
                  </div>
                </div>
                <div className="row blockchainDetailsData">
                  <div className="col-4 blockchainDetailsText">
                    <h5 className="blockchainDetailsText BDTXT">0</h5>
                  </div>
                  <div className="col-4 blockchainDetailsText">
                    <h5 className="blockchainDetailsText BDTXT">Not defined</h5>
                  </div>
                  <div className="col-4 blockchainDetailsText">
                    <h5 className="blockchainDetailsText BDTXT">1</h5>
                  </div>
                </div>
                <div className="sep"></div>
              </div>
            </div>
          </div>
        </section>
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
              {collectionArtworks.map((artwork, index) => {
                return (
                  <div
                    key={index}
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  >
                    <div className={`sc-card-product`}>
                      <div className="card-media">
                        <Link to={"/artwork-dettails?id="+artwork.id}>
                          <img src={artwork.artworkData.image} alt="" />
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
                          <Link to={"/artwork-dettails?id="+artwork.id}>
                            {artwork.artworkData.name}
                          </Link>
                        </h5>
                      </div>
                      <div className="meta-info">
                        <div className="author">
                          <div className="avatar">
                            <img src={collection.owner_image} alt="" />
                          </div>
                          <div className="info">
                            <span>Owned By</span>
                            <h6> {collection.owner_name}</h6>
                          </div>
                        </div>
                        <div className="price">
                          <span>Price</span>
                          <h5>
                            ${(artwork.price * usdPriceInEth).toFixed(2)}
                            <small
                              style={{
                                fontWeight: "400",
                                color: "grey",
                                fontSize: "0.7em",
                                fontStyle: "italic",
                              }}
                            >
                              &nbsp;
                              {" / " + artwork.price + " "} ETH&nbsp;
                            </small>
                          </h5>
                        </div>
                      </div>
                      <div className="card-bottom">
                        <Link
                          to={"/artwork-dettails?id="+artwork.id}
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
              })}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
};

export default CollectionItems;
