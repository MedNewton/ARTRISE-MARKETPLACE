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

const MyCollections = () => {
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
  const [myCollections, setMyCollections] = useState([]);

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

  async function getMyCollections(adr) {
    const collectionsRef = ref(db, "collections/");
    await get(collectionsRef).then(async (snapshot) => {
      let dt = snapshot.val();
      for (let i in dt) {
        let collection = dt[i];
        if (collection.owner === adr) {
          setMyCollections((prevState) => [...prevState, collection]);
        }
      }
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
      getMyCollections(address);
      console.log(myCollections);
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

  return (
      <div   className='profile-tabPanel-item'>
        {address ? (
            myCollections.map((collection, id) => {
              if (collection) {
                return (
                    <div
                      key={id}
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    >
                      <div className={`sc-card-product`}>
                        <div className="card-media">
                          <Link
                            to={"/collection-items?id=" + collection.address}
                          >
                            <img src={collection.image} alt="" />
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
                          <Link
                            to={"/collection-items?id=" + collection.address}
                          >
                            <h5 className="style2">{collection.name}</h5>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <div>
                <div>
                  <img
                    src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
                    alt=""
                  />
                </div>
                <div className="row sorry">
                  <div className="col-12">
                    <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                      Sorry, We Couldn’t Find Any Artworks that you own.
                    </h2>
                    <h5 className="sub-title help-center mg-bt-32 ">
                      Maybe your wallet is not connected, or you don't have any
                      owned NFTs. The content of this page will updated as soon
                      as you purchase one or more <br /> of our unique and
                      amazing artworks.
                    </h5>
                  </div>
                </div>
              </div>
            )}
          </div>

  );
};

export default MyCollections;