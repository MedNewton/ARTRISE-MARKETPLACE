import React, { useState, useRef, useEffect, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import liveAuctionData from "../assets/fake-data/data-live-auction";
import LiveAuction from "../components/layouts/LiveAuction";
import img1 from "../assets/images/avatar/avt-3.jpg";
import img2 from "../assets/images/avatar/avt-11.jpg";
import img3 from "../assets/images/avatar/avt-1.jpg";
import img4 from "../assets/images/avatar/avt-5.jpg";
import img5 from "../assets/images/avatar/avt-7.jpg";
import img6 from "../assets/images/avatar/avt-8.jpg";
import img7 from "../assets/images/avatar/avt-2.jpg";
import imgdetail1 from "../assets/images/box-item/images-item-details.jpg";
import { Accordion } from "react-bootstrap-accordion";
import yann from "../assets/images/avatar/yann.jpg";
import CardModal2 from "../components/layouts/CardModal2";
import db from "../firebase";
import { ref, onValue, get, update, set, child } from "firebase/database";
import BidModal1 from "../components/layouts/bidModal";
import { useAccount } from "wagmi";
import { fetchBalance } from '@wagmi/core'
import Swal from "sweetalert2";
import axios from "axios";

const Premiers = () => {
  const [dataHistory] = useState([
    {
      img: img1,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
    {
      img: img2,
      name: "Mason Woodward",
      time: "at 06/10/2021, 3:20 AM",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
    {
      img: img3,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
    {
      img: img4,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
    {
      img: img5,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
    {
      img: img6,
      name: "Mason Woodward",
      time: "8 hours ago",
      price: "4.89 ETH",
      priceChange: "$12.246",
    },
  ]);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [BLC, setBLC] = useState(0.0)

  const [bidModalShow, setBidModalShow] = useState(false)

  const images = [
    "https://themoroccan.dev/premiers/014.avif",
    "https://themoroccan.dev/premiers/DSC0028.avif",
    "https://themoroccan.dev/premiers/DSC0027.avif",
    "https://themoroccan.dev/premiers/DSC0019.avif",
    "https://themoroccan.dev/premiers/DSC0018.avif",
    "https://themoroccan.dev/premiers/DSC0015.avif",
  ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const { address, isConnected } = useAccount();

  const [bids, setBids] = useState([])

  async function placeBid(){
    if(!isConnected || !address){
      Swal.fire({
        icon: "error",
        title: "Your address is not connected !",
        text: "In order to place a bid in this auction, you need to connect your wallet.",
      });
    }else{
      const balance = await fetchBalance({address})
      const blc = parseFloat(balance.formatted.toString())
      setBLC(blc);
      if(blc <= 0.27) {
        Swal.fire({
          icon: "error",
          title: "You don\'t have enough funds !",
          text: "The minimum bid for this auction is 0.27 ETH ($500), plus the gas fees.",
        });
      }else{
        setBidModalShow(true)
      }
    }
    //const ThisUserRef = ref(db, "premierBids/");
  }

  async function getBids(){
    const allBidsRef = ref(db, "premierBids/")
    await get(allBidsRef).then(async (snapshot) => {
      let dt = snapshot.val();
      for(let i in dt){
        let b = dt[i]
        let bid = {
          "amount": b.bidAmount,
          "address": b.bidderAddress
        }
        setBids(current => [...current, bid])
      }
    })
  }

  const [usdPriceInEth, setUsdPriceInEth] = useState();

  useEffect(() => {
    async function fetching()
    {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }
    fetching();
  }, []);

  useEffect(() => {
    setInterval(async () => {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }, 30000);
  });
  
  useEffect(() => {
    getBids()
  }, [])
  

  return (
    <div className="item-details">
      <HeaderStyle2 />

      <div className="tf-section tf-item-details">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="content-left">
                <div className="media">
                  <img
                    src={"https://themoroccan.dev/premiers/DSC0014.avif"}
                    alt=""
                  />
                </div>
                <div className="metadataBox" style={{ marginTop: "2%" }}>
                  <div className="flat-accordion2">
                    <Accordion key="0" title="Properties">
                      <div className="row propertiesBox">
                        <div className="col-3 attr">
                          <p className="attributeTitle">Width</p>
                          <p className="attributeValue">50 cm</p>
                        </div>
                        <div className="col-3 attr">
                          <p className="attributeTitle">Height</p>
                          <p className="attributeValue">65 cm</p>
                        </div>
                        <div className="col-3 attr">
                          <p className="attributeTitle">Technique</p>
                          <p className="attributeValue">
                            Mosaique resine epoxy
                          </p>
                        </div>
                        <div className="col-3 attr">
                          <p className="attributeTitle">Shape</p>
                          <p className="attributeValue">Rectangle</p>
                        </div>
                        <div className="col-3 attr">
                          <p className="attributeTitle">Weight</p>
                          <p className="attributeValue">4,5 KG</p>
                        </div>
                      </div>
                    </Accordion>
                    <Accordion
                      key="1"
                      title="About Pixelized mosaic collection"
                    >
                      <p>
                        Pixelized in the form of 21mm mosaic tiles, from
                        meticulously hand-painted glass paste, Yann Faisant's
                        mosaic artworks pay tribute to the great Masters of
                        classical painting from a contemporary perspective.{" "}
                      </p>
                      <p>
                        Indeed, the use of the pixel allows the reinvention of
                        the color palette and the reshaping of the material of
                        the painting while preserving the beauty of the original
                        work.
                      </p>
                      <p>
                        Yann Faisant proposes a strong work that blends the best
                        of the classical age with a modern technique.
                      </p>
                      <p>
                        This delightful collection is embedded in the blockchain
                        as an NFT (non-fungible token).
                      </p>
                      <p>
                        Each of the physical artwork is linked to its NFT
                        version realized through the novice NFC tagging
                        technology.
                      </p>
                    </Accordion>
                    <Accordion key="2" title="About the artist">
                      <p>
                        Pixelized in the form of 21mm mosaic tiles, from
                        meticulously hand-painted glass paste, Yann Faisant's
                        mosaic artworks pay tribute to the great Masters of
                        classical painting from a contemporary perspective.{" "}
                      </p>
                      <p>
                        Indeed, the use of the pixel allows the reinvention of
                        the color palette and the reshaping of the material of
                        the painting while preserving the beauty of the original
                        work.
                      </p>
                      <p>
                        Yann Faisant proposes a strong work that blends the best
                        of the classical age with a modern technique.
                      </p>
                      <p>
                        This delightful collection is embedded in the blockchain
                        as an NFT (non-fungible token).
                      </p>
                      <p>
                        Each of the physical artwork is linked to its NFT
                        version realized through the novice NFC tagging
                        technology.
                      </p>
                    </Accordion>
                    <Accordion key="3" title="Details">
                      <div className="row">
                        <div className="col-6 detailLeft">
                          <p>Contract address</p>
                        </div>
                        <div className="col-6">
                          <p className="detailRight">
                            <Link
                              rel={"external"}
                              target="_blank"
                              to={
                                "http://etherscan.io/address/0xa6F0F91BF6e9bEdF044C3e989C6cB2e0376b40fC"
                              }
                            >
                              0xa6F...0fC
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 detailLeft">
                          <p>External Link</p>
                        </div>
                        <div className="col-6">
                          <Link
                            rel={"external"}
                            target="_blank"
                            to={
                              "http://imindyou.com/mosaicrecovery/quote3.html"
                            }
                          >
                            <p className="detailRight">
                              http://imindyou.com/mo...
                            </p>
                          </Link>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 detailLeft">
                          <p>Token ID</p>
                        </div>
                        <div className="col-6">
                          <p className="detailRight">31</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 detailLeft">
                          <p>Token Stdandard</p>
                        </div>
                        <div className="col-6">
                          <p className="detailRight">ERC-721</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 detailLeft">
                          <p>Chain</p>
                        </div>
                        <div className="col-6">
                          <p className="detailRight">Ethereum</p>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="content-right">
                <div className="sc-item-details">
                  <h2
                    className="style2"
                    style={{ textTransform: "capitalize" }}
                  >
                    “à jamais les premiers ”{" "}
                  </h2>
                  <div className="meta-item">
                    <div className="left">
                      <span className="viewed eye">13</span>
                    </div>
                    <div className="right">
                      <Link to="#" className="share"></Link>
                    </div>
                  </div>
                  <div className="client-infor sc-card-product">
                    <div className="meta-info">
                      <div className="author">
                        <div className="avatar">
                          <img src={yann} alt="Axies" />
                        </div>
                        <div className="info">
                          <span>Owned By</span>
                          <h6>
                            {" "}
                            <Link to="/author-02">Yann Faisant</Link>{" "}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="meta-info">
                      <div className="author">
                        <div className="avatar">
                          <img src={yann} alt="Axies" />
                        </div>
                        <div className="info">
                          <span>Create By</span>
                          <h6>
                            {" "}
                            <Link to="/author-02">Yann Faisant</Link>{" "}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "1.6em",
                      lineHeight: "1.4em",
                      marginBottom: "5%",
                    }}
                  >
                    The 30th anniversary of the victory of Olympique de
                    Marseille in the final of the UEFA Champions League (26 May
                    1993) against AC Milan, by the masterful goal from the head
                    of{" "}
                    <Link
                      to={"https://www.instagram.com/basileboli.off/"}
                      rel="external"
                      target="_blank"
                    >
                      <strong
                        style={{
                          fontStyle: "italic",
                          textDecoration: "underline",
                        }}
                      >
                        Basile Boli
                      </strong>
                    </Link>
                    , memorable, historic and eternal. A work, a date, a memory
                    engraved forever!
                  </p>
                  <div
                    style={{
                      width: "100%",
                      height: "50vh",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <iframe
                      style={{ width: "100%", height: "100%" }}
                      src="https://www.youtube.com/embed/8Tpaqd-kq5Q"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className="meta-item-details style2">
                    <div className="item meta-price">
                      <span className="heading">Auction Price</span>
                      <div className="price">
                        <div className="price-box">
                          <h5> 2.13 ETH</h5>
                          <span>= $4000</span>
                        </div>
                      </div>
                    </div>
                    <div className="item meta-price">
                      <span className="heading">Expert estimation</span>
                      <div className="price">
                        <div className="price-box">
                          <h5> 4.37 ETH</h5>
                          <span>= $8000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/"
                    className="sc-button loadmore style bag fl-button pri-3"
                    onClick={(e)=>{
                      e.preventDefault();
                      placeBid()
                      
                    }}
                  >
                    <span>Place a bid</span>
                  </Link>
                  <div className="physicalImages">
                    <h5 className="physicalArtworksTitle">
                      Pictures of the physical artwork:
                    </h5>
                    <div className="row" style={{ marginBottom: "3%" }}>
                      {images.map((src, index) => (
                        <div className="col-3 physImgCol">
                          <img
                            src={src}
                            onClick={() => openImageViewer(index)}
                            className={"physImg"}
                            key={index}
                            style={{ margin: "2px" }}
                            alt=""
                          />
                        </div>
                      ))}

                      {isViewerOpen && (
                        <ImageViewer
                          src={images}
                          currentIndex={currentImage}
                          disableScroll={true}
                          closeOnClickOutside={true}
                          onClose={closeImageViewer}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className="flat-tabs themesflat-tabs"
                    style={{ marginBottom: "5%" }}
                  >
                    <Tabs>
                      <TabList>
                        <Tab>Bid History</Tab>
                        <Tab>Provenance</Tab>
                      </TabList>

                      <TabPanel>
                        <ul className="bid-history-list">
                          {bids.map((item, index) => (
                            <li key={index} item={item}>
                              <div className="content">
                                <div className="client">
                                  <div className="sc-author-box style-2">
                                    
                                    <div className="author-infor">
                                      <div className="name">
                                        <h6>
                                          <Link to="/author-02">
                                            {item.address}{" "}
                                          </Link>
                                        </h6>{" "}
                                        <span> placed a bid</span>
                                      </div>
                                      
                                    </div>
                                  </div>
                                </div>
                                <div className="price">
                                  <h5>
                                  ${parseFloat(usdPriceInEth * item.amount).toFixed(2)}
                                    
                                    
                                    <small style={{fontSize: "1em", fontWeight: "400", color: "grey"}}>
                                      &nbsp;/ {item.amount} ETH
                                    </small>
                                  </h5>
                                  
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </TabPanel>

                      <TabPanel>
                        <div className="provenance">
                          <p>
                            This bid has a floor price of 2.73ETH{" "}
                            <small>($5000)</small>, with an NFT expert
                            estimation of the deserved price of 4.37 ETH{" "}
                            <small>($8000)</small>
                          </p>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BidModal1 balance={BLC.toFixed(2)} show={bidModalShow} onHide={() => setBidModalShow(false)} />
      <Footer />
    </div>
  );
};

export default Premiers;
