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
  useAddress,
  useContract,
  useOwnedNFTs,
  useConnectedWallet,
} from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
import Swal from "sweetalert2";
import {
  ref as SRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import CreateModal from "../components/layouts/createModal";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

class LazyNFT {
  constructor(i, d) {
    this.id = i;
    this.data = d;
  }
}

const Profile = () => {
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
  const [lazyOwned, setLazyOwned] = useState([]);

  async function getLazyOwned(adr) {
    const artworksRef = ref(db, "artworks/");
    await get(artworksRef).then(async (snapshot) => {
      let dt = snapshot.val();
      for (let i in dt) {
        let lazyArtwork = dt[i];
        if (lazyArtwork.owner === adr && lazyArtwork.type === "lazyMinted") {
          console.log(lazyArtwork.ipfsURI);
          try {
            let res = await axios.get(lazyArtwork.ipfsURI);
            let lazyNFT = new LazyNFT(i, res.data);
            setLazyOwned((prevState) => [...prevState, lazyNFT]);
          } catch (error) {console.log("error")}
        }
      }
    });
  }

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
    if (address) {
      getUserData(address);
      getLazyOwned(address);
    } else {
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
    "0xa6F0F91BF6e9bEdF044C3e989C6cB2e0376b40fC",
    "nft-collection"
  );

  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);

  async function becomeArtist() {
    await update(ref(db, "users/" + address), {
      accountType: "artist",
      creator: "pending",
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
                  {accountType == "artist" ? "Artist" : "Member"}
                </p>
                <div className="userSocialsContainer">
                  <i
                    style={{ fontSize: "1.8em" }}
                    className="fab fa-facebook"
                  ></i>
                  <i
                    style={{ fontSize: "1.8em" }}
                    className="fab fa-twitter"
                  ></i>
                  <i
                    style={{ fontSize: "1.8em" }}
                    className="fab fa-instagram"
                  ></i>
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
                      <i className="fa fa-user-plus"></i>
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
                      <i className="fa fa-pen"></i>
                      <h5 style={{ whiteSpace: "nowrap" }}>Edit info</h5>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="shareUserBtn">
                    <i className="fa fa-share-alt"></i>
                  </div>
                  <div className="shareUserBtn">
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row tagLinksBar">
                    <div className="col-12 tlBar">
                      <div className="tagLink tagLinkSelected">Owned</div>
                      <Link to={"/tokenized?id=" + urlSlug}>
                        <div className="tagLink">Tokenized</div>
                      </Link>
                      <Link to={"/likedItems?id=" + urlSlug}>
                        <div className="tagLink">Liked items</div>
                      </Link>
                      {accountType == "artist" ? (
                        <Link to={"/myCollections?id=" + urlSlug}>
                          <div className="tagLink">My collections</div>
                        </Link>
                      ) : (
                        ""
                      )}

                      <div className="tagLink">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!isLoading && ownedNFTs && address
              ? ownedNFTs.map((nft) => {
                  if (nft.metadata.id != 0) {
                    return (
                      <div
                        key={nft.metadata.id}
                        className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      >
                        <div className={`sc-card-product`}>
                          <div className="card-media">
                            <img src={nft.metadata.image} alt="" />
                            <Link
                              to="/"
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
                            <h5 className="style2">{nft.metadata.name}</h5>
                          </div>
                          <div className="card-bottom">
                            <Link to={"/"} className="buyNowBtn">
                              <button className="sc-button style bag fl-button pri-3 no-bg">
                                <span>List this NFT</span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              : ""}
            {address
              ? lazyOwned.map((nft, index) => {
                  if (nft) {
                    let id = nft.id;

                    return (
                      <div
                        key={index}
                        className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      >
                        <div className={`sc-card-product`}>
                          <div className="card-media">
                            <Link to={"/private-display?id=" + id}>
                              <img src={nft.data.image} alt="" />
                            </Link>
                          </div>
                          <div className="card-title">
                            <Link to={"/private-display?id=" + id}>
                              <h5 className="style2">{nft.data.name}</h5>
                            </Link>
                          </div>
                          <div className="card-bottom">
                            <Link
                              to={"/private-display?id=" + id}
                              className="buyNowBtn"
                            >
                              <button className="sc-button style bag fl-button pri-3 no-bg">
                                <span>List this NFT</span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              : ""}
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

export default Profile;
