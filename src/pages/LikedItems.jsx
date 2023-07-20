import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, withRouter } from "react-router-dom";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import avt from "../assets/images/avatar/avata_profile.jpg";
import bg1 from "../assets/images/backgroup-secsion/option1_bg_profile.jpg";
import bg2 from "../assets/images/backgroup-secsion/option2_bg_profile.jpg";
import yann from "../assets/images/avatar/yann.jpg";
import db from "../firebase";
import storage from "../storage";
import { ref, onValue, get, update, set, child } from "firebase/database";
import {
  ConnectWallet,
  useListings,
  useAddress,
  useContract,
  useNFTs,
  useOwnedNFTs,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
import {
  ref as SRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import Swal from "sweetalert2";
import CreateModal from "../components/layouts/createModal";
import Dropdown from "react-bootstrap/Dropdown";

let myLikes = [];
const LikedItems = () => {
  const nav = useNavigate();

  const [createModalShow, setCreateModalShow] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [facebookLink, setFacbookLink] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [pdpLink, setPdpLink] = useState("");
  const [coverLink, setCoverLink] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userFollowers, setUserFollowers] = useState("0");
  const [userFollowing, setUserFollowing] = useState("0");
  const [accountType, setAccountType] = useState("");
  const [slug, setSlug] = useState("");
  const [urlSlug, setUrlSlug] = useState("");

  const { address, isConnected } = useAccount();

  async function getUserData(adr) {
    const ThisUserRef = ref(db, "users/" + adr);
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
      setDisplayName(dt.displayName);
      setUserEmail(dt.email);
      setUserBio(dt.bio);
      setPdpLink(dt.pdpLink);
      setCoverLink(dt.cover_link);
      setFacbookLink(dt.Facebook);
      setTwitterLink(dt.Twitter);
      setDiscordLink(dt.Discord);
      setAccountType(dt.accountType);
      setSlug(dt.slug);
      let following =
        Object.entries(dt.followedArtists).length +
        Object.entries(dt.following).length;
      let followers = Object.entries(dt.followers).length;
      setUserFollowers(followers - 1);
      setUserFollowing(following - 2);

      document.getElementById("pdp").style.backgroundImage = dt.pdpLink;
    });
  }

  useEffect(() => {
    let url = window.location.href.toString();
    if (url.includes("?")) {
      let s = url.split("?id=")[1].toString();
      setUrlSlug(s);
    } else {
      nav("/");
    }
    if (address) getUserData(address);
    else {
      if (
        localStorage.getItem("twitter") ||
        localStorage.getItem("google") ||
        localStorage.getItem("facebook")
      ) {
        getUserData(localStorage.getItem("UserKey").toString());
      }
    }
  }, []);

  const { contract } = useContract(
    "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
    "marketplace"
  );
  const { data: listings, isLoading, error } = useListings(contract);

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  function weiToEther(wei) {
    let ether = wei / 1000000000000000000;
    return ether;
  }

  async function getMyLikes() {
    const ThisUserRef = ref(db, "users/" + address);
    await get(ThisUserRef).then((snapshot) => {
      let dt = snapshot.val();
      let likes = dt.likedListings;

      for (let likeIndex in likes) {
        myLikes.push(likes[likeIndex]);
      }
    });
  }

  useEffect(() => {
    getMyLikes();
  }, []);

  async function becomeArtist() {
    await update(ref(db, "users/" + address), {
      accountType: "artist",
      collections: "",
    });
    setAccountType("artist");
    window.open("//forms.gle/dVamYz7mYkfz7EaW7", "_blank");
    Swal.fire({
      icon: "success",
      title: "Gongratulations !",
      text: "You are now part of the Artrise artists community. You can start creating your own collections and minting artworks.",
      confirmButtonText: "Let's go !",
    });
  }

  return (
    <div>
      <HeaderStyle2 />

      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row profilePadding ">
            <div
              className="row userCoverSection"
              id="userCover"
              style={{ backgroundImage: `url(${coverLink})` }}
            ></div>
            <div className="col-md-12 col-lg-12 col-sm-12 col-12 profileInfoSection">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 pdpContainer">
                  <div className="pdpSpace" id="pdp">
                    <img src={pdpLink} alt="" />
                  </div>
                </div>
              </div>
              <div className="userDataContainer">
                <h5 className="userName">{displayName}</h5>
                <p className="userAttribution">
                  {accountType == "artist" ? "Member" : "Artist"}
                </p>
                <div className="userSocialsContainer">
                  <i class="fab fa-facebook"></i>
                  <i class="fab fa-twitter"></i>
                  <i class="fab fa-instagram"></i>
                </div>
                <div className="folContainer">
                  <div className="ContainerofFollowers">
                    <h5 className="dataOfFollowers">{userFollowers}</h5>
                    <h5 className="titleOfFollowers">followers</h5>
                  </div>
                  <div className="ContainerofFollowing">
                    <h5 className="dataOfFollowing">{userFollowing}</h5>
                    <h5 className="titleOfFollowing">following</h5>
                  </div>
                </div>
                <div className="userButtonsContainer">
                  {slug == urlSlug ? (
                    ""
                  ) : (
                    <div className="followUserBtn">
                      <i class="fa fa-user-plus"></i>
                      <h5>Follow</h5>
                    </div>
                  )}
                  {slug == urlSlug ? (
                    <div
                      className="followUserBtn"
                      onClick={() => {
                        window.location.href = "/edit-profile";
                      }}
                    >
                      <i class="fa fa-pen"></i>
                      <h5 style={{ whiteSpace: "nowrap" }}>Edit info</h5>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="shareUserBtn">
                    <i className="fa fa-share-alt"></i>
                  </div>
                  <div className="shareUserBtn">
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row tagLinksBar">
                    <div className="col-12 tlBar">
                      <Link to={"/profile?id=" + urlSlug}>
                        <div className="tagLink">Owned</div>
                      </Link>

                      <Link to={"/tokenized?id=" + urlSlug}>
                        <div className="tagLink">Tokenized</div>
                      </Link>
                      <Link to={"/likedItems?id=" + urlSlug}>
                        <div className="tagLink tagLinkSelected">
                          Liked items
                        </div>
                      </Link>
                      {accountType == "artist" ? (
                        <div className="tagLink">My collections</div>
                      ) : (
                        ""
                      )}

                      <div className="tagLink">
                        <Dropdown>
                          <Dropdown.Toggle id="profileTabDropdown">
                            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
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
                            <Dropdown.Item href="/">
                              <p className="tagLinkDropdownItemText">
                                Pending Tokenization
                              </p>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!isLoading && listings && address ? (
              listings?.map((listing) => {
                if (
                  myLikes.includes(listing.id.toString()) &&
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
                            <h5>
                              $1800
                            <small
                                style={{
                                  fontWeight: "400",
                                  color: "grey",
                                  fontSize: "0.7em",
                                  fontStyle: "italic",
                                }}
                              >
                                {"("+weiToEther(listing.buyoutPrice).toString()+")"} ETH
                              </small>
                              
                              
                            </h5>
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
                <div style={{width: "100%"}}>
                <div className="noArtworks">
                  <img
                    src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
                    alt=""
                    
                  />
                </div>
                <div className="row sorry">
                  <div className="col-12">
                    <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                      Sorry, We Couldn’t Find Any Artworks that you liked.
                    </h2>
                    <h5 className="sub-title help-center mg-bt-32 ">
                      Maybe your wallet is not connected, or you don't have any owned NFTs. The content of this page will updated as soon as you
                      purchase one or more <br /> of our unique and amazing
                      artworks.
                    </h5>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CreateModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
      <Footer />
    </div>
  );
};

export default LikedItems;
