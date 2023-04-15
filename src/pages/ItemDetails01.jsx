import React, { useState, useRef, useEffect, useCallback } from "react";
import { render } from "react-dom";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import ImageViewer from "react-simple-image-viewer";
import Footer from "../components/footer/Footer";
import { Link, useSearchParams } from "react-router-dom";
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import liveAuctionData from "../assets/fake-data/data-live-auction";
import LiveAuction from "../components/layouts/LiveAuction";
import RelatedArtworks from "../components/layouts/relatedArtworks";
import img1 from "../assets/images/avatar/avt-3.jpg";
import img2 from "../assets/images/avatar/avt-11.jpg";
import img3 from "../assets/images/avatar/avt-1.jpg";
import img4 from "../assets/images/avatar/avt-5.jpg";
import img5 from "../assets/images/avatar/avt-7.jpg";
import img6 from "../assets/images/avatar/avt-8.jpg";
import img7 from "../assets/images/avatar/avt-2.jpg";
import imgdetail1 from "../assets/images/box-item/images-item-details.jpg";
import yann from "../assets/images/avatar/yann.jpg";
import artrise from "../assets/images/logo/logo2.png";
import TodayPicks from "../components/layouts/TodayPicks";
import todayPickData from "../assets/fake-data/data-today-pick";
import { Accordion } from "react-bootstrap-accordion";
import SimpleImageSlider from "react-simple-image-slider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CardModal2 from "../components/layouts/CardModal2";
import CardModal from "../components/layouts/CardModal";
import ShippingModal from "../components/layouts/ShippingModal";
import db from "../firebase";
import { BigNumber, ethers } from "ethers";
import {
  ref,
  onValue,
  get,
  update,
  set,
  child,
  remove,
  push,
} from "firebase/database";

import {
  useContract,
  useListing,
  useListings,
  useActiveListings,
  useNFT,
  ThirdwebNftMedia,
  MediaRenderer,
  useAddress,
} from "@thirdweb-dev/react";
import axios from "axios";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import Web3 from "web3";


const ItemDetails01 = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [shippingModalShow, setShippingModalShow] = useState(false);
  const [buyModalShow, setBuyModalShow] = useState(false);
  const [lst, setLst] = useState(0);
  const [assetContractAddress, setAssetContractAddress] = useState();
  const [tokenId, setTokenId] = useState();
  const [currencyContractAddress, setcurrencyContractAddress] = useState();

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [itemLikes, setItemLikes] = useState(0);

  let address = useAddress();

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const MySwal = withReactContent(Swal);

  const [searchParams] = useSearchParams();
  const listingID = searchParams.get("listing");

  const { contract } = useContract(
    "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
    "marketplace"
  );
  const { data: listings, isLoading, Error } = useListings(contract);

  const [usdPriceInEth, setUsdPriceInEth] = useState();

  useEffect(async () => {
    const response = await axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );
    setUsdPriceInEth(parseFloat(response.data.USD));
  }, []);

  useEffect(() => {
    setInterval(async () => {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }, 30000);
  });

  async function getItemLikes() {
    let ThisItemLikesRef = ref(db, "listings/" + listingID);
    await get(ThisItemLikesRef).then((snapshot) => {
      let dt = snapshot.val();
      let likes = dt.likes;
      setItemLikes(likes);
    });
  }

  useEffect(() => {
    getItemLikes();
  }, []);

  let images = [];
  if (listingID == 18) {
    images = [
      "http://artrise.io/physicalImages/A_Windmill_on_a_Polder_Waterway/1.jpeg",
      "http://artrise.io/physicalImages/A_Windmill_on_a_Polder_Waterway/2.jpeg",
      "http://artrise.io/physicalImages/A_Windmill_on_a_Polder_Waterway/3.jpeg",
      "http://artrise.io/physicalImages/A_Windmill_on_a_Polder_Waterway/4.jpeg",
      "http://artrise.io/physicalImages/A_Windmill_on_a_Polder_Waterway/5.jpeg",
    ];
  } else if (listingID == 20) {
    images = [
      "http://artrise.io/physicalImages/Bakker_Arent_Oostwaard_en_zijn_vrouw_Catharina_Keizerswaard/1.jpeg",
      "http://artrise.io/physicalImages/Bakker_Arent_Oostwaard_en_zijn_vrouw_Catharina_Keizerswaard/2.jpeg",
      "http://artrise.io/physicalImages/Bakker_Arent_Oostwaard_en_zijn_vrouw_Catharina_Keizerswaard/3.jpeg",
      "http://artrise.io/physicalImages/Bakker_Arent_Oostwaard_en_zijn_vrouw_Catharina_Keizerswaard/4.jpeg",
      "http://artrise.io/physicalImages/Bakker_Arent_Oostwaard_en_zijn_vrouw_Catharina_Keizerswaard/5.jpeg",
    ];
  } else if (listingID == 27) {
    images = [
      "http://artrise.io/physicalImages/Five_Prints_on_Flowers_in_glass_vase/1.jpeg",
      "http://artrise.io/physicalImages/Five_Prints_on_Flowers_in_glass_vase/2.jpeg",
      "http://artrise.io/physicalImages/Five_Prints_on_Flowers_in_glass_vase/3.jpeg",
      "http://artrise.io/physicalImages/Five_Prints_on_Flowers_in_glass_vase/4.jpeg",
      "http://artrise.io/physicalImages/Five_Prints_on_Flowers_in_glass_vase/5.jpeg",
    ];
  } else if (listingID == 25) {
    images = [
      "http://artrise.io/physicalImages/Het_sterfbed_van_Maria/1.jpeg",
      "http://artrise.io/physicalImages/Het_sterfbed_van_Maria/2.jpeg",
      "http://artrise.io/physicalImages/Het_sterfbed_van_Maria/3.jpeg",
      "http://artrise.io/physicalImages/Het_sterfbed_van_Maria/4.jpeg",
      "http://artrise.io/physicalImages/Het_sterfbed_van_Maria/5.jpeg",
    ];
  } else if (listingID == 16) {
    images = [
      "http://artrise.io/physicalImages/Self_portrait_with_felt_hat/1.jpeg",
      "http://artrise.io/physicalImages/Self_portrait_with_felt_hat/2.jpeg",
      "http://artrise.io/physicalImages/Self_portrait_with_felt_hat/3.jpeg",
      "http://artrise.io/physicalImages/Self_portrait_with_felt_hat/4.jpeg",
      "http://artrise.io/physicalImages/Self_portrait_with_felt_hat/5.jpeg",
    ];
  } else if (listingID == 24) {
    images = [
      "http://artrise.io/physicalImages/The_Milkmaid_Het_melkmeisje/1.jpeg",
      "http://artrise.io/physicalImages/The_Milkmaid_Het_melkmeisje/2.jpeg",
      "http://artrise.io/physicalImages/The_Milkmaid_Het_melkmeisje/3.jpeg",
      "http://artrise.io/physicalImages/The_Milkmaid_Het_melkmeisje/4.jpeg",
      "http://artrise.io/physicalImages/The_Milkmaid_Het_melkmeisje/5.jpeg",
    ];
  } else {
    images = [
      "http://cdn.dribbble.com/users/46425/screenshots/1799682/shot.gif",
      "http://cdn.dribbble.com/users/46425/screenshots/1799682/shot.gif",
      "http://cdn.dribbble.com/users/46425/screenshots/1799682/shot.gif",
    ];
  }

  async function shareArtwork(e) {
    e.preventDefault();
    setModalShow(true);
  }

  const [dataHistory] = useState([
    {
      img: "http://marketplace.artrise.io/assets/icon/Favicon.png",
      name: "Artrise",
      time: "+1 month ago",
      price: "3.35 ETH",
      priceChange: "$12.246",
    },
  ]);

  async function buyNFT(listing) {
    let newPrice = (3500 / usdPriceInEth).toFixed(2);
    let newPriceInWei = Web3.utils.toWei(newPrice, 'ether');
    console.log(Web3.utils.toWei(newPrice, 'ether'))
    let bignumberPrice = BigNumber.from(newPriceInWei)
    
    let bignumberDate1 = BigNumber.from(Date.now())
    setBuyModalShow(false);
    try {
      let lstID = lst;
      
      
      let updateResult = await contract.direct.updateListing({
        id: lstID,
        quantity: 1,
        buyoutPrice: bignumberPrice,
        currencyContractAddress: currencyContractAddress,
        startTimeInSeconds: bignumberDate1,
        secondsUntilEnd: 86400
      })
      await contract.interceptor.overrideNextTransaction(() => ({
        gasLimit: 0,
      }));
      await contract.buyoutListing(lstID, 1);
      
    } catch (error) {
      let errMsg = error.toString();
      if (errMsg.includes("requires a connected wallet")) {
        Swal.fire({
          icon: "error",
          title: "Connect your wallet",
          text: "Buying and bidding operations using cruptocurrencies\nrequire a connected wallet.",
        });
      } else if (errMsg.includes("user rejected transaction")) {
        Swal.fire({
          icon: "error",
          title: "Rejected transaction",
          text: "No worries, the transaction was rejected by the wallet owner.",
        });
      } else if (errMsg.includes("insufficient funds")) {
        Swal.fire({
          icon: "error",
          title: "Insufficient funds",
          text: "It seems that you don't have sufficient funds in your wallet to perform this action.\nPlease, change or top-up your wallet with Ether.",
        });
      }
      console.log(error);
    }
  }

  function weiToEther(wei) {
    let ether = wei / 1000000000000000000;
    return ether;
  }

  function etherToWei(eth){
    let wei = eth * 1000000000000000000;
    return wei;
  }


  async function likeBtnHandle() {
    if (!address || address == null || address == "" || address == " ") {
      Swal.fire({
        icon: "error",
        title: "Connect your wallet",
        text: "This action\nrequires a connected wallet.",
      });
    }
    const ThisUserRef = ref(db, "users/" + address);
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
      let myLikes = dt.likedListings;
      let alreadyLiked = false;
      for (let l in myLikes) {
        if (myLikes[l] == listingID) alreadyLiked = true;
      }

      if (!alreadyLiked) {
        let newItemLikes = itemLikes + 1;
        let ThisUserLikesRef = ref(db, "users/" + address + "/likedListings/");
        let ThisItemLikesRef = ref(db, "listings/" + listingID);

        setItemLikes(newItemLikes);
        await update(ThisItemLikesRef, {
          likes: newItemLikes,
        });
        await push(ThisUserLikesRef, listingID);
      } else {
        Swal.fire({
          icon: "success",
          title: "Liked!",
          text: "This item is added to your liked items list!",
        });
      }
    });
  }

  return (
    <div className="item-details">
      <HeaderStyle2 />

      {!isLoading && listings ? (
        listings?.map((listing, index) => {
          if (listing.id == listingID) {
            let NFTProperties = listing.asset.attributes;

            return (
              <div key={index} className="tf-section tf-item-details">
                <div className="themesflat-container">
                  <div className="row desktopOnly">
                    <div className="col-xl-6 col-md-12">
                      <div className="content-left">
                        <div className="media">
                          <video controls autoPlay loop muted>
                            <source
                              src={listing.asset.animation_url}
                              type="video/mp4"
                            />
                          </video>
                        </div>

                        <div className="metadataBox">
                          <div className="flat-accordion2">
                            <Accordion key="0" title="Properties">
                              <div className="row propertiesBox">
                                {NFTProperties.map((attribute, index) => (
                                  <div className="col-3 attr">
                                    <p className="attributeTitle">
                                      {attribute.trait_type}
                                    </p>
                                    <p className="attributeValue">
                                      {attribute.value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </Accordion>
                            <Accordion
                              key="1"
                              title="About Pixelized mosaic collection"
                            >
                              <p>
                                Pixelized in the form of 21mm mosaic tiles, from
                                meticulously hand-painted glass paste, Yann
                                Faisant's mosaic artworks pay tribute to the
                                great Masters of classical painting from a
                                contemporary perspective.{" "}
                              </p>
                              <p>
                                Indeed, the use of the pixel allows the
                                reinvention of the color palette and the
                                reshaping of the material of the painting while
                                preserving the beauty of the original work.
                              </p>
                              <p>
                                Yann Faisant proposes a strong work that blends
                                the best of the classical age with a modern
                                technique.
                              </p>
                              <p>
                                This delightful collection is embedded in the
                                blockchain as an NFT (non-fungible token).
                              </p>
                              <p>
                                Each of the physical artwork is linked to its
                                NFT version realized through the novice NFC
                                tagging technology.
                              </p>
                            </Accordion>
                            <Accordion key="2" title="About the artist">
                              <p>
                                Pixelized in the form of 21mm mosaic tiles, from
                                meticulously hand-painted glass paste, Yann
                                Faisant's mosaic artworks pay tribute to the
                                great Masters of classical painting from a
                                contemporary perspective.{" "}
                              </p>
                              <p>
                                Indeed, the use of the pixel allows the
                                reinvention of the color palette and the
                                reshaping of the material of the painting while
                                preserving the beauty of the original work.
                              </p>
                              <p>
                                Yann Faisant proposes a strong work that blends
                                the best of the classical age with a modern
                                technique.
                              </p>
                              <p>
                                This delightful collection is embedded in the
                                blockchain as an NFT (non-fungible token).
                              </p>
                              <p>
                                Each of the physical artwork is linked to its
                                NFT version realized through the novice NFC
                                tagging technology.
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
                                        "//etherscan.io/address/" +
                                        listing.assetContractAddress.toString()
                                      }
                                    >
                                      {listing.assetContractAddress
                                        .toString()
                                        .substring(0, 5) +
                                        "..." +
                                        listing.assetContractAddress
                                          .toString()
                                          .substring(
                                            listing.assetContractAddress.toString()
                                              .length - 3
                                          )}
                                    </Link>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6 detailLeft">
                                  <p>Token ID</p>
                                </div>
                                <div className="col-6">
                                  <p className="detailRight">
                                    {listing.asset.id}
                                  </p>
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
                          <h2 className="style2">{listing.asset.name}</h2>
                          <h5 className="style2 collectionName">
                            Pixelized mosaic collection
                          </h5>
                          <div className="meta-item">
                            <div className="left">
                              <span
                                className="viewed eye"
                                id="likeBtn"
                                onClick={(e) => {
                                  likeBtnHandle();
                                }}
                              >
                                {itemLikes}
                              </span>
                              <span
                                className="liked heart wishlist-button mg-l-8"
                                hidden
                              >
                                <span className="number-like">100</span>
                              </span>
                            </div>
                            <div className="right">
                              <Link
                                to="#"
                                onClick={(e) => {
                                  shareArtwork(e);
                                }}
                                id="shareBtn"
                                className="share"
                              ></Link>
                              <Link to="/" className="option" hidden></Link>
                            </div>
                          </div>
                          <p className="artworkDescription">
                            {listing.asset.description}
                          </p>
                          <div className="client-infor sc-card-product">
                            <div className="meta-info">
                              <div className="author">
                                <div className="avatar">
                                  <img src={yann} alt="" />
                                </div>
                                <div className="info">
                                  <span>Owned By</span>
                                  <h6>
                                    {" "}
                                    <Link to="/author-02">
                                      Yann Faisant
                                    </Link>{" "}
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
                                  <span>Created By</span>
                                  <h6>
                                    {" "}
                                    <Link to="/author-02">
                                      Yann Faisant
                                    </Link>{" "}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="meta-item-details style2">
                            <div className="item meta-price">
                              <span className="heading">Price</span>
                              <div className="price">
                                <div className="price-box">
                                  <h5>
                                    {(3500 / usdPriceInEth).toFixed(2)} ETH{" "}
                                    <span className="smallPrice"> / 3500$</span>
                                    <BsFillQuestionCircleFill
                                      color="#000"
                                      size={12}
                                      className='smallpriceQuestion'
                                      onClick={() => {
                                        Swal.fire({
                                          icon: "question",
                                          title: "Flexible price NFTs",
                                          text: "In order to protect users from unexpected market swings,\nARTRISE implemented the notion of flexible price NFTs\nto keep all the artworks aligned with the actual cryptocurrencies market prices.",
                                        });
                                      }}
                                    />
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="meta-item-details style2"
                            id="shipping"
                          >
                            <div className="item meta-price">
                              <span className="heading">
                                Estimated shipping cost{" "}
                                <span
                                  className="shippingDetails"
                                  onClick={() => {
                                    setShippingModalShow(true);
                                  }}
                                >
                                  {"(View Shipping Info)"}
                                </span>
                              </span>
                              <div className="price">
                                <div className="price-box">
                                  <h5>63$</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="BuyNowBtn"
                            onClick={() => {
                              setLst(listing.id);
                              setAssetContractAddress(listing.assetContractAddress)
                              setTokenId(listing.tokenId)
                              setcurrencyContractAddress(listing.currencyContractAddress)
                              setBuyModalShow(true);
                            }}
                          >
                            <span className="sc-button loadmore style bag fl-button pri-3">
                              <span id="buyNowBtn">Buy Now</span>
                            </span>
                          </div>
                          <div className="physicalImages">
                            <h5 className="physicalArtworksTitle">
                              Pictures of the physical artwork:
                            </h5>
                            <div className="row">
                              {images.map((src, index) => (
                                <div className="col-3">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row desktopOnly">
                    <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                      <div className="content-right desktopHistoryTab">
                        <div className="flat-tabs themesflat-tabs">
                          <Tabs>
                            <TabList>
                              <Tab>Artwork History</Tab>
                            </TabList>

                            <TabPanel>
                              <ul className="bid-history-list">
                                {dataHistory.map((item, index) => (
                                  <li key={index} item={item}>
                                    <div className="content">
                                      <div className="client">
                                        <div className="sc-author-box style-2">
                                          <div className="author-avatar">
                                            <Link to="#">
                                              <img
                                                src={item.img}
                                                alt=""
                                                className="avatar"
                                              />
                                            </Link>
                                            <div className="badge"></div>
                                          </div>
                                          <div className="author-infor">
                                            <div className="name">
                                              <h6>
                                                <Link to="/author-02">
                                                  {item.name}{" "}
                                                </Link>
                                              </h6>{" "}
                                              <span> Listed this artwork</span>
                                            </div>
                                            <span className="time">
                                              {item.time}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="price">
                                        <h5>{item.price}</h5>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </TabPanel>
                          </Tabs>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mobileOnly">
                    <div className="col-xl-6 col-md-12">
                      <div className="content-left" hidden>
                        <div className="media">
                          <video controls autoPlay loop muted>
                            <source
                              src={listing.asset.animation_url}
                              type="video/mp4"
                            />
                          </video>
                        </div>

                        <div className="metadataBox">
                          <div className="flat-accordion2">
                            <Accordion key="0" title="Properties">
                              <div className="row propertiesBox">
                                {NFTProperties.map((attribute, index) => (
                                  <div className="col-3 attr">
                                    <p className="attributeTitle">
                                      {attribute.trait_type}
                                    </p>
                                    <p className="attributeValue">
                                      {attribute.value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </Accordion>
                            <Accordion
                              key="1"
                              title="About Pixelized mosaic collection"
                            >
                              <p>
                                Pixelized in the form of 21mm mosaic tiles, from
                                meticulously hand-painted glass paste, Yann
                                Faisant's mosaic artworks pay tribute to the
                                great Masters of classical painting from a
                                contemporary perspective.{" "}
                              </p>
                              <p>
                                Indeed, the use of the pixel allows the
                                reinvention of the color palette and the
                                reshaping of the material of the painting while
                                preserving the beauty of the original work.
                              </p>
                              <p>
                                Yann Faisant proposes a strong work that blends
                                the best of the classical age with a modern
                                technique.
                              </p>
                              <p>
                                This delightful collection is embedded in the
                                blockchain as an NFT (non-fungible token).
                              </p>
                              <p>
                                Each of the physical artwork is linked to its
                                NFT version realized through the novice NFC
                                tagging technology.
                              </p>
                            </Accordion>
                            <Accordion key="2" title="About the artist">
                              <p>
                                Pixelized in the form of 21mm mosaic tiles, from
                                meticulously hand-painted glass paste, Yann
                                Faisant's mosaic artworks pay tribute to the
                                great Masters of classical painting from a
                                contemporary perspective.{" "}
                              </p>
                              <p>
                                Indeed, the use of the pixel allows the
                                reinvention of the color palette and the
                                reshaping of the material of the painting while
                                preserving the beauty of the original work.
                              </p>
                              <p>
                                Yann Faisant proposes a strong work that blends
                                the best of the classical age with a modern
                                technique.
                              </p>
                              <p>
                                This delightful collection is embedded in the
                                blockchain as an NFT (non-fungible token).
                              </p>
                              <p>
                                Each of the physical artwork is linked to its
                                NFT version realized through the novice NFC
                                tagging technology.
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
                                        "//etherscan.io/address/" +
                                        listing.assetContractAddress.toString()
                                      }
                                    >
                                      {listing.assetContractAddress
                                        .toString()
                                        .substring(0, 5) +
                                        "..." +
                                        listing.assetContractAddress
                                          .toString()
                                          .substring(
                                            listing.assetContractAddress.toString()
                                              .length - 3
                                          )}
                                    </Link>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6 detailLeft">
                                  <p>Token ID</p>
                                </div>
                                <div className="col-6">
                                  <p className="detailRight">
                                    {listing.asset.id}
                                  </p>
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
                      <div className="content-left">
                        <div className="media">
                          <video controls autoPlay loop muted>
                            <source
                              src={listing.asset.animation_url}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6 col-md-12">
                      <div className="content-right">
                        <div className="sc-item-details">
                          <h2 className="style2">{listing.asset.name}</h2>
                          <h5 className="style2 collectionName">
                            Pixelized mosaic collection
                          </h5>
                          <div className="meta-item">
                            <div className="left">
                              <span className="viewed eye">225</span>
                              <span
                                to="/login"
                                className="liked heart wishlist-button mg-l-8"
                                hidden
                              >
                                <span className="number-like">100</span>
                              </span>
                            </div>
                            <div className="right">
                              <Link
                                to="#"
                                onClick={(e) => {
                                  shareArtwork(e);
                                }}
                                id="shareBtn"
                                className="share"
                              ></Link>
                              <Link to="/" className="option" hidden></Link>
                            </div>
                          </div>
                          <p className="artworkDescription">
                            {listing.asset.description}
                          </p>
                          <div className="client-infor sc-card-product">
                            <div className="meta-info">
                              <div className="author">
                                <div className="avatar">
                                  <img src={yann} alt="" />
                                </div>
                                <div className="info">
                                  <span>Owned By</span>
                                  <h6>
                                    {" "}
                                    <Link to="/author-02">
                                      Yann Faisant
                                    </Link>{" "}
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
                                    <Link to="/author-02">
                                      Yann Faisant
                                    </Link>{" "}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="meta-item-details style2">
                            <div className="item meta-price">
                              <span className="heading">Price</span>
                              <div className="price">
                                <div className="price-box">
                                  <h5>
                                    {weiToEther(listing.buyoutPrice).toString()}{" "}
                                    ETH
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="meta-item-details style2"
                            id="shipping"
                            hidden
                          >
                            <div className="item meta-price">
                              <span className="heading">
                                Estimated shipping cost
                              </span>
                              <div className="price">
                                <div className="price-box">
                                  <h5>63$</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="BuyNowBtn"
                            onClick={() => {
                              setLst(listing.id);
                              setBuyModalShow(true);
                            }}
                          >
                            <span className="sc-button loadmore style bag fl-button pri-3">
                              <span id="buyNowBtn">Buy Now</span>
                            </span>
                          </div>
                          <div className="physicalImages">
                            <h5 className="physicalArtworksTitle">
                              Pictures of the physical artwork:
                            </h5>
                            <SimpleImageSlider
                              images={images}
                              showBullets={false}
                              showNavs={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content-left">
                        <div className="metadataBox">
                          <div className="flat-accordion2">
                            <Accordion key="0" title="Properties">
                              <div className="row propertiesBox">
                                {NFTProperties.map((attribute, index) => (
                                  <div className="col-3 attr">
                                    <p className="attributeTitle">
                                      {attribute.trait_type}
                                    </p>
                                    <p className="attributeValue">
                                      {attribute.value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </Accordion>
                            <Accordion
                              key="1"
                              title="About Pixelized mosaic collection"
                            >
                              <p>
                                Pixelized in the form of 21mm mosaic tiles, from
                                meticulously hand-painted glass paste, Yann
                                Faisant's mosaic artworks pay tribute to the
                                great Masters of classical painting from a
                                contemporary perspective.{" "}
                              </p>
                              <p>
                                Indeed, the use of the pixel allows the
                                reinvention of the color palette and the
                                reshaping of the material of the painting while
                                preserving the beauty of the original work.
                              </p>
                              <p>
                                Yann Faisant proposes a strong work that blends
                                the best of the classical age with a modern
                                technique.
                              </p>
                              <p>
                                This delightful collection is embedded in the
                                blockchain as an NFT (non-fungible token).
                              </p>
                              <p>
                                Each of the physical artwork is linked to its
                                NFT version realized through the novice NFC
                                tagging technology.
                              </p>
                            </Accordion>
                            <Accordion key="2" title="About the artist">
                              <p>
                                Pixelized in the form of 21mm mosaic tiles, from
                                meticulously hand-painted glass paste, Yann
                                Faisant's mosaic artworks pay tribute to the
                                great Masters of classical painting from a
                                contemporary perspective.{" "}
                              </p>
                              <p>
                                Indeed, the use of the pixel allows the
                                reinvention of the color palette and the
                                reshaping of the material of the painting while
                                preserving the beauty of the original work.
                              </p>
                              <p>
                                Yann Faisant proposes a strong work that blends
                                the best of the classical age with a modern
                                technique.
                              </p>
                              <p>
                                This delightful collection is embedded in the
                                blockchain as an NFT (non-fungible token).
                              </p>
                              <p>
                                Each of the physical artwork is linked to its
                                NFT version realized through the novice NFC
                                tagging technology.
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
                                        "//etherscan.io/address/" +
                                        listing.assetContractAddress.toString()
                                      }
                                    >
                                      {listing.assetContractAddress
                                        .toString()
                                        .substring(0, 5) +
                                        "..." +
                                        listing.assetContractAddress
                                          .toString()
                                          .substring(
                                            listing.assetContractAddress.toString()
                                              .length - 3
                                          )}
                                    </Link>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6 detailLeft">
                                  <p>Token ID</p>
                                </div>
                                <div className="col-6">
                                  <p className="detailRight">
                                    {listing.asset.id}
                                  </p>
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

                    <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                      <div className="content-right mobileHistoryTab">
                        <h5 className="style2 ">Artwork history:</h5>
                        <div className="flat-tabs themesflat-tabs">
                          <Tabs>
                            <TabList>
                              <Tab>Artwork History</Tab>
                            </TabList>

                            <TabPanel>
                              <ul className="bid-history-list">
                                {dataHistory.map((item, index) => (
                                  <li key={index} item={item}>
                                    <div className="content">
                                      <div className="client">
                                        <div className="sc-author-box style-2">
                                          <div className="author-avatar">
                                            <Link to="#">
                                              <img
                                                src={item.img}
                                                alt=""
                                                className="avatar"
                                              />
                                            </Link>
                                            <div className="badge"></div>
                                          </div>
                                          <div className="author-infor">
                                            <div className="name">
                                              <h6>
                                                <Link to="/author-02">
                                                  {item.name}{" "}
                                                </Link>
                                              </h6>{" "}
                                              <span> Listed this artwork</span>
                                            </div>
                                            <span className="time">
                                              {item.time}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="price">
                                        <h5>{item.price}</h5>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </TabPanel>
                          </Tabs>
                        </div>
                      </div>
                    </div>
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
      <RelatedArtworks data={liveAuctionData} />
      <CardModal2 show={modalShow} onHide={() => setModalShow(false)} />
      <ShippingModal
        show={shippingModalShow}
        onHide={() => setShippingModalShow(false)}
      />
      <CardModal
        show={buyModalShow}
        onHide={() => setBuyModalShow(false)}
        parentFunction={buyNFT}
      />
      <Footer />
    </div>
  );
};

export default ItemDetails01;
