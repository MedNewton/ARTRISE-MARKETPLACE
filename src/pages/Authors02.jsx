import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import CardModal from "../components/layouts/CardModal";

import avt from "../assets/images/avatar/avt-author-tab.jpg";
import img1 from "../assets/images/box-item/card-item-3.jpg";
import imga1 from "../assets/images/avatar/avt-1.jpg";
import imgCollection1 from "../assets/images/avatar/avt-18.jpg";
import img2 from "../assets/images/box-item/card-item-4.jpg";
import imga2 from "../assets/images/avatar/avt-2.jpg";
import imgCollection2 from "../assets/images/avatar/avt-18.jpg";
import img3 from "../assets/images/box-item/card-item-2.jpg";
import imga3 from "../assets/images/avatar/avt-4.jpg";
import imgCollection3 from "../assets/images/avatar/avt-18.jpg";
import img4 from "../assets/images/box-item/card-item-7.jpg";
import imga4 from "../assets/images/avatar/avt-3.jpg";
import imgCollection4 from "../assets/images/avatar/avt-18.jpg";
import img5 from "../assets/images/box-item/card-item8.jpg";
import imga5 from "../assets/images/avatar/avt-12.jpg";
import imgCollection5 from "../assets/images/avatar/avt-18.jpg";
import img6 from "../assets/images/box-item/card-item-9.jpg";
import imga6 from "../assets/images/avatar/avt-1.jpg";
import imgCollection6 from "../assets/images/avatar/avt-18.jpg";
import img7 from "../assets/images/box-item/image-box-6.jpg";
import imga7 from "../assets/images/avatar/avt-4.jpg";
import imgCollection7 from "../assets/images/avatar/avt-18.jpg";
import img8 from "../assets/images/box-item/image-box-11.jpg";
import imga8 from "../assets/images/avatar/avt-3.jpg";
import imgCollection8 from "../assets/images/avatar/avt-18.jpg";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import yann from "../assets/images/avatar/yann.jpg";
import SideBar from "../components/layouts/home-8/SideBar";
import { useAddress, useContract, useListings } from "@thirdweb-dev/react";
import popularCollectionData from "../assets/fake-data/data-popular-collection";
import Artworks from "../components/layouts/artworks";
import ArtworksRaw from "../components/layouts/artworksRaw";
import todayPickData from "../assets/fake-data/data-today-pick";
import DropsRaw from "../components/layouts/dropsRaw";
import ReadMoreReact from "read-more-react";
import db from "../firebase";
import { ref, onValue, get, update, set, child } from "firebase/database";

import ArtworksTom from "../components/layouts/TomWhiteArtworks";
import ArtworksOdibo from "../components/layouts/ArtworksOdibo";
import ArtworksVilte from "../components/layouts/ArtworksVilte";
import Dropdown from "react-bootstrap/Dropdown";
import {toast, ToastContainer} from "react-toastify";
import {useAccount} from "wagmi";


function importAll(r) {
  return r.keys().map(r);
}

const allArtworksImages = importAll(
  require.context("../assets/images/carre", false, /\.(JPG|png|jpe?g|svg)$/)
);
const paintingsImages = importAll(
  require.context(
    "../assets/images/artworks/paintings",
    false,
    /\.(JPG|png|jpe?g|svg)$/
  )
);
const mosaicImages = importAll(
  require.context(
    "../assets/images/artworks/mosaic",
    false,
    /\.(JPG|png|jpe?g|svg)$/
  )
);
const statuesImages = importAll(
  require.context(
    "../assets/images/artworks/statues",
    false,
    /\.(JPG|png|jpe?g|svg)$/
  )
);

let allArtworks = [];
let paintings = [];
let statues = [];
let mosaics = [];

allArtworksImages.forEach((element) => {
  let artworkImage = element;
  let artworkName = "OPUS MAGNA";
  let authorImg = imga1;
  let authorName = "Yann Faisant";
  let artworkPrice = "4.89 ETH";
  let artworkPriceChange = "$12.246";
  let artworkWhitelist = "100";
  let artworkCollectionImage = imgCollection1;
  let artworkCollectionName = "Carré";

  let artwork = {
    img: artworkImage,
    title: artworkName,
    tags: "bsc",
    imgAuthor: imga1,
    nameAuthor: "Yann Faisant",
    price: "4.89 ETH",
    priceChange: "$12.246",
    wishlist: "100",
    imgCollection: imgCollection1,
    nameCollection: "Carré",
  };

  allArtworks.push(artwork);
});

const Authors02 = () => {
  const [openPanel, setOpenPanel] = useState(false);
  const { address, isConnected } = useAccount();
  const currentUserKey = address ? address : localStorage.getItem("UserKey");

  const { contract } = useContract(
    "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
    "marketplace"
  );
  const { data: listings, isLoading, error } = useListings(contract);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pdp, setPdp] = useState("");
  const [bio, setBio] = useState("");
  const [cover, setCover] = useState("");
  const [website, setWebsite] = useState("");
  const [artistType, setArtistType] = useState('');
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [followedText, setFollowedText] = useState("Follow");
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);

  let url = window.location.href.toString();
  let artistName = url.split("?artist=")[1];

  async function getArtistData(slug) {
    const artistsRef = ref(db, "artists/");
    await get(artistsRef).then(async (snapshot) => {
      let dt = snapshot.val();
      for (let artistKey in dt) {
        let a = dt[artistKey];
        if (a.slug == slug) {
          setId(artistKey);
          setName(a.name);
          setBio(a.description);
          setPdp(a.pdpLink);
          setCover(a.coverLink);
          setFacebookLink(a.facebook);
          setInstagramLink(a.instagram);
          setTwitterLink(a.twitter);
          setWebsite(a.website);
          setArtistType(a.artistType);
        }
      }
    });
  }

  async function getUserData(slug) {
    const usersRef = ref(db, "users/");
    await get(usersRef).then(async (snapshot) => {
      let dt = snapshot.val();
      for (let userKey in dt) {
        let a = dt[userKey];
        if (a.slug === slug) {
          setId(userKey);
          setName(a?.name);
          setBio(a?.description);
          setPdp(a?.pdpLink);
          setCover(a?.coverLink);
          setFacebookLink(a?.facebook);
          setInstagramLink(a?.instagram);
          setTwitterLink(a?.twitter);
          setWebsite(a?.website);
          setArtistType(a?.artistType);
          setFollowers(a?.followers);
          setFollowing(a?.following);
        }
      }
    });
  }

  async function getCurrentUserData() {
    const usersRef = ref(db, "users/" + currentUserKey);
    await get(usersRef).then(async (snapshot) => {
      let dt = snapshot.val();
      setCurrentUserFollowing(dt.following);
    });
    if(currentUserFollowing.includes(id)){
      setFollowedText("Unfollow");
    }
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    if (queryParams.has("artist")) {
      const artistValue = queryParams.get("artist");
      getArtistData(artistValue);
    } else if (queryParams.has("user")) {
      const userValue = queryParams.get("user");
      getUserData(userValue);
    } else {
      console.log("URL doesn't contain artist or user query parameter.");
    }
  }, []);

  useEffect(()=>{
    getCurrentUserData();
  },[id])

  const [menuTab] = useState([
    {
      class: "active",
      name: "Artworks",
    },
    {
      class: "",
      name: "Collections",
    },
    {
      class: "",
      name: "Drops",
    },
    {
      class: "",
      name: "About",
    },
  ]);
  const [panelTab] = useState([
    {
      id: 1,
      dataContent: allArtworks,
    },
    {
      id: 2,
      dataContent: paintings,
    },
    {
      id: 3,
      dataContent: mosaics,
    },
    {
      id: 4,
      dataContent: statues,
    },
  ]);

  const [collectionsData] = useState(popularCollectionData);

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const [modalShow, setModalShow] = useState(false);

  const selectedCollectionTags = [];

  function editTags(val, target) {
    if (selectedCollectionTags.includes(val)) {
      selectedCollectionTags.pop(val);
      target.classList.remove("selectedTag");
      target.classList.add("tag");
    } else {
      selectedCollectionTags.push(val);
      target.classList.remove("tag");
      target.classList.add("selectedTag");
    }
  }

  const selectedArtistTags = [];

  function editArtistTags(val, target) {
    if (selectedArtistTags.includes(val)) {
      selectedArtistTags.pop(val);
      target.classList.remove("selectedTag");
      target.classList.add("tag");
    } else {
      selectedArtistTags.push(val);
      target.classList.remove("tag");
      target.classList.add("selectedTag");
    }
  }


  async function followUnfollow() {
    if (followedText === "Follow") {
      const tempFollowersArray = [...followers,currentUserKey]
      setFollowers(tempFollowersArray)
      await update(ref(db, "users/" + id), {
        followers: tempFollowersArray
      }).catch(error => {
            console.error('error:', error);
          });
      const tempFollowingArray = [...currentUserFollowing, id]
      setCurrentUserFollowing(tempFollowingArray)
      await update(ref(db, "users/" + currentUserKey), {
        following: tempFollowingArray
      }).catch(error => {
            console.error('error:', error);
          });
      setFollowed(true);
      setFollowedText("Unfollow");
    }
     else if (followedText === "Unfollow") {
      const tempFollowersArray = followers.filter(e => e !== currentUserKey)
      setFollowers(tempFollowersArray)
      await update(ref(db, "users/" + id), {
        followers: tempFollowersArray
      }).catch(error => {
            console.error('error:', error);
          });
      const tempFollowingArray = currentUserFollowing.filter(e => e !== id)
      setCurrentUserFollowing(tempFollowingArray)
      await update(ref(db, "users/" + currentUserKey), {
        following: tempFollowingArray
      }).catch(error => {
            console.error('error:', error);
          });
      setFollowed(false);
      setFollowedText("Follow");
    }
  }
  const handleTwitterIconClick = () => {
    if (twitterLink && twitterLink !== "No account shared yet ...") {
      window.open(twitterLink, "_blank");
    } else {
      toast.error("No twitter account shared yet...", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleInstagramIconClick = () => {
    if (instagramLink && instagramLink !== "No account shared yet") {
      window.open(instagramLink, "_blank");
    } else {
      toast.error("No instagram account shared yet...", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleFacebookIconClick = () => {
    if (facebookLink && facebookLink !== "No account shared yet ...") {
      window.open(facebookLink, "_blank");
    } else {
      toast.error("No facebook account shared yet...", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="authors-2">
      <HeaderStyle2 />
      {name != "" ? (

          <>
              <div
                  className="userCoverSection"
                id="userCover"
                style={{ backgroundImage: `url(${cover})` }}
              ></div>
              <div className="profileInfoSection">
                <div>
                  <div className="pdpContainer">
                    <div className="pdpSpace artistpdpSpace" id="pdp">
                      <img src={pdp} alt="" />
                    </div>
                  </div>
                </div>
                <div
                  className="userDataContainer"
                  style={{ marginBottom: "2%" }}
                >
                  <h5 className="userName">{name}</h5>
                  <p className="userAttribution">{artistType ?artistType : "Artist"}</p>
                  <div className="userSocialsContainer">
                    <i onClick={handleFacebookIconClick}
                       style={{fontSize: "1.8em"}}
                       className="fab fa-facebook"
                    ></i>
                    <i onClick={handleTwitterIconClick}
                       style={{fontSize: "1.8em"}}
                       className="fab fa-twitter"
                    ></i>
                    <i onClick={handleInstagramIconClick}
                       style={{fontSize: "1.8em"}}
                       className="fab fa-instagram"
                    ></i>
                  </div>
                  <div className="userButtonsContainer">
                    <div className="followUserBtn" onClick={followUnfollow}>
                      <i class="fa fa-user-plus"></i>
                      <h5>{followedText}</h5>
                    </div>

                    <div className="shareUserBtn">
                      <i className="fa fa-share-alt"></i>
                    </div>
                    <div className="shareUserBtn">
                      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
                <Tabs>
                  <TabList style={{padding: "0 0 0 0"}}>
                    {menuTab?.map((item, index) => (
                      <Tab style={{fontSize: '16px',padding:'0.6% 50px 1%'}} key={index}>{item?.name}</Tab>
                    ))}
                    <Tab><div className="tagLink">
                      <Dropdown>
                        <Dropdown.Toggle id="profileTabDropdown">
                          <i
                              className="fa fa-ellipsis-h"
                              aria-hidden="true"
                          ></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="/">
                            <p className="tagLinkDropdownItemText">
                              Owned
                            </p>
                          </Dropdown.Item>
                          <Dropdown.Item href="/">
                            <p className="tagLinkDropdownItemText">
                              Liked Items
                            </p>
                          </Dropdown.Item>
                          <Dropdown.Item href="/">
                            <p className="tagLinkDropdownItemText">
                              Offers Made
                            </p>
                          </Dropdown.Item>
                          <Dropdown.Item href="/">
                            <p className="tagLinkDropdownItemText">
                              Offers Received
                            </p>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    </Tab>
                  </TabList>



                        <TabPanel key={0}>
                          {artistName == "Yann_FAISANT" ? (
                            <ArtworksRaw data={todayPickData} />
                          ) : (
                            ""
                          )}
                          {artistName == "Tom_White" ? (
                            <ArtworksTom data={todayPickData} />
                          ) : (
                            ""
                          )}
                          {artistName == "Odibu_Odia" ? (
                            <ArtworksOdibo data={todayPickData} />
                          ) : (
                            ""
                          )}
                          {artistName == "Vilte_Fuller" ? (
                            <ArtworksVilte data={todayPickData} />
                          ) : (
                            ""
                          )}
                        </TabPanel>
                        <TabPanel key={1}>
                          {artistName == "Yann_FAISANT" ? (
                            <div className="row" style={{padding: "1% 1.5%"}}>
                              <div className="col-12">
                                <div className="row tagsBar">
                                  <div className="col-12">
                                    <div
                                      className="tag"
                                      onClick={(e) =>
                                        editTags(e.target.id, e.target)
                                      }
                                      id="collection_painter"
                                    >
                                      Painting
                                    </div>
                                    <div
                                      className="tag"
                                      onClick={(e) =>
                                        editTags(e.target.id, e.target)
                                      }
                                      id="collection_photographer"
                                    >
                                      Photography
                                    </div>
                                    <div
                                      className="tag"
                                      onClick={(e) =>
                                        editTags(e.target.id, e.target)
                                      }
                                      id="collection_sculpturer"
                                    >
                                      Sculpture
                                    </div>
                                    <div
                                      className="tag"
                                      onClick={(e) =>
                                        editTags(e.target.id, e.target)
                                      }
                                      id="collection_ceramic_artist"
                                    >
                                      Ceramic Artworks
                                    </div>
                                    <div
                                      className="tag"
                                      onClick={(e) =>
                                        editTags(e.target.id, e.target)
                                      }
                                      id="collection_others"
                                    >
                                      Others...
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {collectionsData
                                .slice(0, visible)
                                .map((item, index) => (
                                  <div
                                    key={index}
                                    className="col-lg-4 col-md-6 col-12"
                                  >
                                    <div className="sc-card-collection style-2">
                                      <div className="card-bottom">
                                        <div className="author">
                                          <div className="sc-author-box style-2">
                                            <div className="author-avatar">
                                              <img
                                                src="http://marketplace.artrise.io/static/media/carre2.22139fe1474fade1785f.jpg"
                                                alt=""
                                                className="avatar"
                                              />
                                              <div className="badge"></div>
                                            </div>
                                          </div>
                                          <div className="content">
                                            <h4>
                                              <Link to="/pixelizd-mosaic-collection">
                                                {"Pixelized Mosaic"}
                                              </Link>
                                            </h4>
                                            <p>
                                              By{" "}
                                              <Link to="/Artists/Yann_Faisant">
                                                <span className="authorName">
                                                  Yann Faisant
                                                </span>
                                              </Link>
                                            </p>
                                          </div>
                                        </div>
                                        <Link
                                          to="/login"
                                          className="sc-button fl-button pri-3"
                                        >
                                          <span>Following</span>
                                        </Link>
                                      </div>
                                      <Link to="/author-02">
                                        <div className="media-images-collection">
                                          <div className="box-left">
                                            <img
                                              src="http://marketplace.artrise.io/static/media/carre4.ab991fdacaae0540bf90.jpg"
                                              alt=""
                                            />
                                          </div>
                                          <div className="box-right">
                                            <div className="top-img">
                                              <img
                                                src="http://marketplace.artrise.io/static/media/carre3.6147bdea570afcdc03a4.jpg"
                                                alt=""
                                              />
                                              <img
                                                src="http://marketplace.artrise.io/static/media/carre1.d7ad1702258665b20fd6.jpg"
                                                alt=""
                                              />
                                            </div>
                                            <div className="bottom-img">
                                              <img
                                                src="http://marketplace.artrise.io/static/media/Portret%20van%20Joan%20Jacob%20Mauricius.53f33d98075c90aec764.jpg"
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                ))}
                              {visible < collectionsData.length && (
                                <div className="col-md-12 wrap-inner load-more text-center">
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
                          ) : (
                            ""
                          )}
                        </TabPanel>
                        <TabPanel key={2}>
                          {artistName == "Yann_FAISANT" ? <DropsRaw /> : ""}
                        </TabPanel>
                        <TabPanel key={3}>
                          <h5 className="bioTabText">{bio}</h5>
                        </TabPanel>



                </Tabs>
              </div>

          </>

      ) : (
        ""
      )}
      <ToastContainer />
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
      <Footer />
    </div>
  );
};

export default Authors02;


