import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import {ConnectWallet, useAddress, useContract, useListings} from "@thirdweb-dev/react";
import menus from "../../pages/menu";
import DarkMode from "./DarkMode";
import logodark from "../../assets/images/logo/logo_dark_new.png";
import avt from "../../assets/images/avatar/avt-2.jpg";
import not from "../../assets/images/avatar/not.png";
import coin from "../../assets/images/logo/coin.svg";
import db from "../../firebase";
import { ref, onValue, get, update, set, child } from "firebase/database";
import LoginModal from "../layouts/loginModal";
import JoinChoicesModal from "../layouts/joinChicesModal";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

import {
  FaRegUser,
  FaPlus,
  FaLink,
  FaBook,
  FaFileAlt,
  FaHandsHelping,
  FaSlidersH,
  FaSignOutAlt,
} from "react-icons/fa";

import { AiOutlineBell } from "react-icons/ai";

import { BiCoinStack } from "react-icons/bi";
import axios from "axios";
import { useArtworkContext } from '../../Store/ArtworkContext';
import { useArtistContext } from '../../Store/ArtistContext';
import { useCollectionsContext } from "../../Store/CollectionsContext";
import {useUserContext} from "../../Store/UserContext";

const HeaderStyle2 = () => {
  const {lazyListed, userArtist } = useArtworkContext();
  const {artists} = useArtistContext();
  const {collections} = useCollectionsContext();
  const {user} = useUserContext();

  const navigate = useNavigate();

  const { contract } = useContract(
      "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
      "marketplace"
  );

  const [artistSearchList, setArtistSearchList] = useState([]);
  const [userSearchList, setUserSearchList] = useState([]);
  const [searchingArray, setSearchingArray] = useState([]);
  const [artWorks, setArtWorks] = useState([]);
  const [processedLazyListed, setProcessedLazyListed] = useState([]);
  const [processedUserArtist, setProcessedUserArtist] = useState([]);
  const [collectionList, setCollectionList]= useState([]);
  const { data: listings, isLoading, error } = useListings(contract);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const getArtworkForSearch = () => {
    if (listings) {
      let data = listings.map((artworkItem) => {
        return { "name": artworkItem.asset.name, "id": artworkItem.id, "type": "Artwork", "isDynamic": false  };
      });
      setArtWorks(data);
    }
  };

  const getLazyListedForSearch = () => {
    if (lazyListed) {
      let data = lazyListed.map((artworkItem) => {
        return { "name": artworkItem?.data?.name, "id": artworkItem?.artworkId, "type": "Artwork", "isDynamic": true };
      });
      setProcessedLazyListed(data);
    }
  };

  const getArtistsForSearch = () => {
    if (artists) {
      let data = artists.map((artist) => {
        return { "name": artist.name, "id": artist.slug, "type": "Artist" , "isDynamic": false };
      });
      setArtistSearchList(data);
    }
  };
  const getUserForSearch = () => {
    if (user) {
      let data = user.map((userItem) => {
        return { "name": userItem.name, "id": userItem.userId, "type": "Member" , "isDynamic": false };
      });
      setUserSearchList(data);
    }
  };

  const getUserArtistForSearch = () => {
    if (userArtist) {
      let data = userArtist.map((user) => {
        return { "name": user.name, "id": user.userId, "type": "Artist", "isDynamic": true };
      });
      setProcessedUserArtist(data);
    }
  };
  const getCollectionsForSearch = () => {
    if (collections) {
      let data = collections.map((collection) => {
        return { "name": collection.name, "id": collection.id, "type": "Collection" , "isDynamic": true };
      });
      setCollectionList(data);
    }
  };

  const getSearchElements = () => {
    const newArray = [...artWorks, ...artistSearchList, ...processedUserArtist, ...processedLazyListed, ...collectionList, ...userSearchList];
    const uniqueArray = Array.from(new Set(newArray));
    setSearchingArray(uniqueArray);
  };

  useEffect(() => {
    getArtworkForSearch();
    getArtistsForSearch();
    getUserForSearch();
    getLazyListedForSearch();
    getUserArtistForSearch();
    getCollectionsForSearch();

  }, [listings, artists, lazyListed, userArtist, collections, user]);

  useEffect(() => {
    getSearchElements();
  }, [artWorks, artistSearchList, processedUserArtist, processedLazyListed, collectionList, userSearchList]);

  const handleSearch = (event) => {
    const searchValue = event?.target?.value?.toLowerCase();
    setSearchQuery(searchValue);
    if (searchValue) {
      const searchWords = searchValue?.split(' ');
      const filteredResults = searchingArray?.filter((item) =>
          searchWords?.every((word) =>
              item?.name?.toLowerCase()?.includes(word)
          )
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleItemClick = (item) => {
    if (item?.type === 'Artwork') {
      if(item?.isDynamic){
        navigate(`/artwork-dettails?id=${item?.id}`)
      }else{
        navigate(`/item-details-01?listing=${item?.id}`)
      }
    } else if (item?.type === 'Artist') {
      if(item?.isDynamic){
        navigate(`/displayProfile?artist=${item?.id}`)
      }else{
        navigate(`/authors-02?artist=${item?.id}`)
      }
    }else if (item?.type === 'Collection') {
      if(item?.isDynamic){
        navigate(`/`)
      }else{
        navigate(`/`)
      }
    }else if (item?.type === 'Member') {
        navigate(`/displayProfile?member=${item?.id}`)
    }
    // You can add more cases for other types if needed
    setSearchQuery(''); // Clear the search query after clicking on an item
    setSearchResults([]); // Clear the search results after clicking on an item
  };

  useEffect(() => {
    window.ire("identify", { customerId: localStorage.getItem("UserKey") });
    console.log("impact test");
  }, []);

  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();

  const [pdp, setPdp] = useState(
    "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
  );
  const [accountType, setAccountType] = useState("");
  const [slug, setSlug] = useState("");
  const [menuVisibility, setMenuVisibility] = useState("none");

  const [isTwitterConected, setIsTwitterConected] = useState(false);

  const [loginModalOpen, setLoginModalOpen] = useState();
  const [joinChoicesModalOpen, setJoinChoicesModalOpen] = useState();

  const [referee, setReferee] = useState("");

  const { pathname } = useLocation();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const nav = useNavigate();
  const headerRef = useRef(null);

  useEffect(() => {
    document.title = "Artrise - Physical NFTs Marketplace";
    let acceuilLink = document.querySelector(
      "#menu-primary-menu > li:nth-child(1) > a"
    );
    let exploreLink = document.querySelector(
      "#menu-primary-menu > li.menu-item.menu-item-has-children > a"
    );
    let dropsLink = document.querySelector(
      "#menu-primary-menu > li:nth-child(3) > a"
    );

    acceuilLink.addEventListener("click", function (e) {
      e.preventDefault();
      nav("/");
    });

    exploreLink.addEventListener("click", function (e) {
      e.preventDefault();
      nav("/home-08");
    });

    dropsLink.addEventListener("click", function (e) {
      e.preventDefault();
      nav("/drops");
    });

    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const isSticky = (e) => {
    const header = document.querySelector(".js-header");
    const scrollTop = window.scrollY;
    scrollTop >= 300
      ? header.classList.add("is-fixed")
      : header.classList.remove("is-fixed");
    scrollTop >= 400
      ? header.classList.add("is-small")
      : header.classList.remove("is-small");
  };

  const menuLeft = useRef(null);
  const btnToggle = useRef(null);
  const avtToggle = useRef(null);

  const avatarPopUpToggle = () => {
    avtToggle.current.classList.toggle("visible");
  };

  const menuToggle = () => {
    menuLeft.current.classList.toggle("active");
    btnToggle.current.classList.toggle("active");
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  const userKey = localStorage.getItem("UserKey");
  let referredBy = "";

  function checkForReferralCode() {
    let url = window.location.href;

    if (url.toString().includes("?")) {
      setReferee(url.toString().split("?ref=")[1]);
    } else {
      setReferee("none");
    }
  }

  useEffect(() => {
    checkForReferralCode();
    let twitterState = localStorage.getItem("twitter");
    if (twitterState) setIsTwitterConected(true);
    else setIsTwitterConected(false);
  }, []);

  async function passwordlessLogin(snapshot) {
    let key = snapshot.key;
    localStorage.setItem("slug", snapshot.val().slug)
    localStorage.setItem("UserKey", snapshot.key);
    localStorage.setItem("name", snapshot.val().displayName);
    localStorage.setItem("pdpLink", snapshot.val().pdpLink);
    localStorage.setItem("followingYann", snapshot.val().followingYann);

    setPdp(snapshot.val().pdpLink);
    setAccountType(snapshot.val().accountType);
    setSlug(snapshot.val().slug);
    //localStorage.setItem('walletAddress', address);
  }

  async function checkUserExists(adr) {
    const ThisUserRef = ref(db, "users/" + adr);
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
      if (dt == null) {
        await set(ref(db, "users/" + adr), {
          name: "UNNAMED",
          displayName: "UNNAMED",
          referralCode: (Math.random() + 1).toString(36).substring(2),
          referrefBy: referee,
          accountType: "user",
          creator: "no",
          email: "No email yet ...",
          bio: "No Bio added yet ...",
          verified: "no",
          slug: (
            Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
          ).toString(),
          pdpLink:
            "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=",
          cover_link:
            "https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          website: "No url shared yet ...",
          Facebook: "No account shared yet ...",
          Instagram: "No account shared yet",
          Twitter: "No account shared yet ...",
          Discord: "No account shared yet ...",
          Tiktok: "No account shared yet ...",
          Youtube: "No account shared yet ...",
          emailNotifications: false,
          followedArtists: {
            0: "res",
          },
          followedCollections: {
            0: "res",
          },
          likedListings: {
            0: "res",
          },
          following: {
            0: "res",
          },
          followers: {
            0: "res",
          },
          followingYann: false,
          notifications: {
            text: "Welcome to Artise",
            link: "",
            img: "",
            seen: false,
          },
        });
        console.log(window.ire);
        let trackConversion = window.ire(
          "trackConversion",
          37268,
          {
            orderId: Math.floor(Math.random() * 10000000),
            customerId: adr,
          },
          {
            verifySiteDefinitionMatch: true,
          }
        );
        console.log(trackConversion)
        passwordlessLogin(snapshot);
      } else {
        passwordlessLogin(snapshot);
      }
    });
  }

  async function mobileWalletClick(e) {
    e.preventDefault();
  }

  if (
    isConnected &&
    !localStorage.getItem("twitter") &&
    !localStorage.getItem("google") &&
    !localStorage.getItem("facebook")
  ) {
    checkUserExists(address);

    let userName = localStorage.getItem("name");
    let UserPdpLink = localStorage.getItem("pdpLink");
    let walletType = localStorage.getItem("walletType");
    let walletAddress = localStorage.getItem("walletAddress");
    let followingYann = localStorage.getItem("followingYann");

    localStorage.setItem("walletAddress", address);

    // Header for connected users :
    const Logout = () => {
      disconnect();
      localStorage.removeItem("name");
      localStorage.removeItem("pdpLink");
      localStorage.removeItem("UserKey");
      localStorage.removeItem("walletType");
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("followingYann");
      nav("/");
    };

    console.log("searchingArraysearchingArray", searchingArray);

    return (
      <header
        id="header_main"
        className="header_1 header_2 style2 js-header"
        ref={headerRef}
      >
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div id="site-header-inner">
                <div className="wrap-box flex">
                  <div id="site-logo" className="clearfix">
                    <div id="site-logo-inner">
                      <Link to="/" rel="home" className="main-logo">
                        <img id="logo_header" src={logodark} alt="nft-gaming" style={{width:'auto'}}/>
                      </Link>
                    </div>
                  </div>
                  <div
                    className="mobile-button"
                    ref={btnToggle}
                    onClick={menuToggle}
                  >
                    <span></span>
                  </div>
                  <nav id="main-nav" className="main-nav" ref={menuLeft}>
                    <ul id="menu-primary-menu" className="menu">
                      {menus.map((data, index) => (
                        <li
                          key={index}
                          onClick={() => handleOnClick(index)}
                          className={`menu-item ${
                            data.namesub ? "menu-item-has-children" : ""
                          } ${activeIndex === index ? "active" : ""} `}
                        >
                          <Link to="#">{data.name}</Link>
                          {data.namesub && (
                            <ul className="sub-menu">
                              {data.namesub.map((submenu) => (
                                <li
                                  key={submenu.id}
                                  className={
                                    pathname === submenu.links
                                      ? "menu-item current-item"
                                      : "menu-item"
                                  }
                                >
                                  <Link to={submenu.links}>{submenu.sub}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                      <li key={6} className="menu-item mobileOnly">
                        <Link to={"/profile?id=" + slug}>Profile</Link>
                      </li>
                      {accountType == "user" ? (
                        <li key={6} className="menu-item mobileOnly">
                          <Link to={"/tokenize"}>Tokenize</Link>
                        </li>
                      ) : (
                        ""
                      )}

                      {accountType == "artist" ? (
                        <li key={7} className="menu-item mobileOnly">
                          <Link to={"/creator-choice"}>Create</Link>
                        </li>
                      ) : (
                        ""
                      )}
                      <li key={8} className="menu-item mobileOnly">
                        <Link to={"/referral-program"}>Referral</Link>
                      </li>
                      <li key={9} className="menu-item mobileOnly">
                        <Link to={"/faq"}>Learn</Link>
                      </li>
                      <li key={10} className="menu-item mobileOnly">
                        <Link to={"/ressources"} target="_blank">
                          Ressources
                        </Link>
                      </li>
                      <li key={11} className="menu-item mobileOnly">
                        <Link to={"/help-center"}>Help</Link>
                      </li>
                      <li key={12} className="menu-item mobileOnly">
                        <Link to={"/settings"}>Settings</Link>
                      </li>
                      <li key={13} className="menu-item mobileOnly">
                        <Link
                          to={"/"}
                          onClick={(e) => {
                            e.preventDefault();
                            Logout();
                          }}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="question-form">
                    <div className="">
                      <input
                          type="text"
                          placeholder="Type to search..."
                          value={searchQuery}
                          onChange={handleSearch}
                      />
                      {searchResults.length > 0 && (
                          <div className="search-dropdown">
                            {searchResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="search-item"
                                    onClick={() => handleItemClick(result)}
                                >
                                  <p>{result.name}</p>
                                  <p className="search-item-detail">{result.type}</p>
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                  </div>

                  <div className="flat-search-btn flex">
                    <div className="sc-btn-top mg-r-12" id="site-header">
                      <Link
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          menuToggle();
                          open();
                        }}
                        className="sc-button header-slider style style-1 wallet fl-button pri-1"
                      >
                        <span>
                          {address.toString().slice(0, 6)}...
                          {address
                            .toString()
                            .substring(address.toString().length - 3)}
                        </span>
                      </Link>
                    </div>
                    <div className="separator"></div>
                    <div className="admin_active" id="header_admin">
                      <div className="header_avatar">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdownNotifButton">
                            <AiOutlineBell size={25} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            align={"end"}
                            style={{ marginTop: "1vh" }}
                          >
                            <Dropdown.Item href={"/profile?id=" + slug}>
                              No new notifications
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                          <Dropdown.Toggle id="dropdownMenuButton">
                            <img
                              className="avatar"
                              src={
                                "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
                              }
                              alt="avatar"
                            />
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            align={"end"}
                            style={{ marginTop: "1vh" }}
                          >
                            <Dropdown.Item href={"/profile?id=" + slug}>
                              <FaRegUser size={15} />
                              Profile
                            </Dropdown.Item>
                            {accountType == "user" ? (
                              <Dropdown.Item href="/tokenize">
                                <BiCoinStack size={15} />
                                Tokenize
                              </Dropdown.Item>
                            ) : (
                              ""
                            )}

                            {accountType == "artist" ? (
                              <Dropdown.Item href="/creator-choice">
                                <FaPlus size={15} />
                                Create
                              </Dropdown.Item>
                            ) : (
                              ""
                            )}

                            <Dropdown.Item href="/referral-program">
                              <FaLink size={15} />
                              Referral
                            </Dropdown.Item>
                            <Dropdown.Item href="/faq">
                              <FaBook size={15} />
                              Learn
                            </Dropdown.Item>
                            <Dropdown.Item href="/ressources">
                              <FaFileAlt size={18} />
                              Ressources
                            </Dropdown.Item>
                            <Dropdown.Item href="/help-center">
                              <FaHandsHelping size={17} />
                              Help
                            </Dropdown.Item>
                            <Dropdown.Item href="/settings">
                              <FaSlidersH size={15} />
                              Settings
                            </Dropdown.Item>
                            <Dropdown.Item
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                disconnect();
                                Logout();
                              }}
                            >
                              <FaSignOutAlt size={15} />
                              Logout
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                        <div className="avatar_popup mt-20" ref={avtToggle}>
                          <div className="d-flex align-items-center mt-10">
                            <div className="info ml-12">
                              <p className="text-sm font-book text-gray-400 popup-name">
                                {userName}
                              </p>
                            </div>
                          </div>

                          <div className="hr"></div>
                          <div className="divider popup-divider"></div>
                          <div className="links mt-20">
                            <Link to="/edit-profile">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.774902 18.333C0.774902 18.7932 1.14762 19.1664 1.60824 19.1664C2.06885 19.1664 2.44157 18.7932 2.44157 18.333C2.44157 15.3923 4.13448 12.7889 6.77329 11.5578C7.68653 12.1513 8.77296 12.4997 9.94076 12.4997C11.113 12.4997 12.2036 12.1489 13.119 11.5513C13.9067 11.9232 14.6368 12.4235 15.2443 13.0307C16.6611 14.4479 17.4416 16.3311 17.4416 18.333C17.4416 18.7932 17.8143 19.1664 18.2749 19.1664C18.7355 19.1664 19.1083 18.7932 19.1083 18.333C19.1083 15.8859 18.1545 13.5845 16.4227 11.8523C15.8432 11.2725 15.1698 10.7754 14.4472 10.3655C15.2757 9.3581 15.7741 8.06944 15.7741 6.66635C15.7741 3.44979 13.1569 0.833008 9.94076 0.833008C6.72461 0.833008 4.10742 3.44979 4.10742 6.66635C4.10742 8.06604 4.60379 9.35154 5.42863 10.3579C2.56796 11.9685 0.774902 14.9779 0.774902 18.333V18.333ZM9.94076 2.49968C12.2381 2.49968 14.1074 4.36898 14.1074 6.66635C14.1074 8.96371 12.2381 10.833 9.94076 10.833C7.6434 10.833 5.77409 8.96371 5.77409 6.66635C5.77409 4.36898 7.6434 2.49968 9.94076 2.49968V2.49968Z"
                                  fill="white"
                                ></path>
                              </svg>
                              <span className="popup-white-text popup-links">
                                {" "}
                                Profile
                              </span>
                            </Link>
                            <a className="mt-10" href="/wallet-connect">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17.1154 0.730469H2.88461C1.29402 0.730469 0 2.02449 0 3.61508V14.3843C0 15.9749 1.29402 17.2689 2.88461 17.2689H17.1154C18.706 17.2689 20 15.9749 20 14.3843V3.61508C20 2.02449 18.706 0.730469 17.1154 0.730469ZM18.7529 10.6035H14.6154C13.6611 10.6035 13 9.95407 13 8.99969C13 8.04532 13.661 7.34544 14.6154 7.34544H18.7529V10.6035ZM18.7529 6.11508H14.6154C13.0248 6.11508 11.7308 7.40911 11.7308 8.99969C11.7308 10.5903 13.0248 11.8843 14.6154 11.8843H18.7529V14.3843C18.7529 15.3386 18.0698 15.9996 17.1154 15.9996H2.88461C1.93027 15.9996 1.29231 15.3387 1.29231 14.3843V3.61508C1.29231 2.66074 1.93023 1.99963 2.88461 1.99963H17.1266C18.0809 1.99963 18.7529 2.6607 18.7529 3.61508V6.11508Z"
                                  fill="white"
                                ></path>
                              </svg>
                              <span className="popup-white-text popup-links">
                                {" "}
                                Wallet
                              </span>
                            </a>
                            <a
                              className="mt-10"
                              href=""
                              id="logout"
                              onClick={Logout}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.9668 18.3057H2.49168C2.0332 18.3057 1.66113 17.9335 1.66113 17.4751V2.52492C1.66113 2.06644 2.03324 1.69437 2.49168 1.69437H9.9668C10.4261 1.69437 10.7973 1.32312 10.7973 0.863828C10.7973 0.404531 10.4261 0.0332031 9.9668 0.0332031H2.49168C1.11793 0.0332031 0 1.15117 0 2.52492V17.4751C0 18.8488 1.11793 19.9668 2.49168 19.9668H9.9668C10.4261 19.9668 10.7973 19.5955 10.7973 19.1362C10.7973 18.6769 10.4261 18.3057 9.9668 18.3057Z"
                                  fill="white"
                                ></path>
                                <path
                                  d="M19.7525 9.40904L14.7027 4.42564C14.3771 4.10337 13.8505 4.10755 13.5282 4.43396C13.206 4.76036 13.2093 5.28611 13.5366 5.60837L17.1454 9.16982H7.47508C7.01578 9.16982 6.64453 9.54107 6.64453 10.0004C6.64453 10.4597 7.01578 10.8309 7.47508 10.8309H17.1454L13.5366 14.3924C13.2093 14.7147 13.2068 15.2404 13.5282 15.5668C13.691 15.7313 13.9053 15.8143 14.1196 15.8143C14.3306 15.8143 14.5415 15.7346 14.7027 15.5751L19.7525 10.5917C19.9103 10.4356 20 10.2229 20 10.0003C20 9.77783 19.9111 9.56603 19.7525 9.40904Z"
                                  fill="white"
                                ></path>
                              </svg>
                              <span className="popup-white-text popup-links">
                                {" "}
                                Logout
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DarkMode />
      </header>
    );
  } else if (
    localStorage.getItem("twitter") ||
    localStorage.getItem("google") ||
    localStorage.getItem("facebook")
  ) {
    let userName = localStorage.getItem("name");
    let UserPdpLink = localStorage.getItem("pdpLink");
    let walletType = localStorage.getItem("walletType");
    let walletAddress = localStorage.getItem("walletAddress");
    let followingYann = localStorage.getItem("followingYann");
    let slug = localStorage.getItem("slug");

    const Logout = () => {
      localStorage.removeItem("name");
      localStorage.removeItem("pdpLink");
      localStorage.removeItem("UserKey");
      localStorage.removeItem("walletType");
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("followingYann");
      localStorage.removeItem("twitter");
      localStorage.removeItem("google");
      localStorage.removeItem("facebook");
      localStorage.removeItem("slug");
      nav("/");
    };

    return (
      <header
        id="header_main"
        className="header_1 header_2 style2 js-header"
        ref={headerRef}
      >
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div id="site-header-inner">
                <div className="wrap-box flex">
                  <div id="site-logo" className="clearfix">
                    <div id="site-logo-inner">
                      <Link to="/" rel="home" className="main-logo">
                        <img id="logo_header" src={logodark} alt="nft-gaming" style={{width:'auto'}} />
                      </Link>
                    </div>
                  </div>
                  <div
                    className="mobile-button"
                    ref={btnToggle}
                    onClick={menuToggle}
                  >
                    <span></span>
                  </div>
                  <nav id="main-nav" className="main-nav" ref={menuLeft}>
                    <ul id="menu-primary-menu" className="menu">
                      {menus.map((data, index) => (
                        <li
                          key={index}
                          onClick={() => handleOnClick(index)}
                          className={`menu-item ${
                            data.namesub ? "menu-item-has-children" : ""
                          } ${activeIndex === index ? "active" : ""} `}
                        >
                          <Link to="#">{data.name}</Link>
                          {data.namesub && (
                            <ul className="sub-menu">
                              {data.namesub.map((submenu) => (
                                <li
                                  key={submenu.id}
                                  className={
                                    pathname === submenu.links
                                      ? "menu-item current-item"
                                      : "menu-item"
                                  }
                                >
                                  <Link to={submenu.links}>{submenu.sub}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                      <li key={8} className="menu-item mobileOnly">
                        <Link to={"/profile?id=" + slug}>Profile</Link>
                      </li>
                      {accountType == "user" ? (
                        <li key={6} className="menu-item mobileOnly">
                          <Link to={"/tokenize"}>Tokenize</Link>
                        </li>
                      ) : (
                        ""
                      )}

                      {accountType == "artist" ? (
                        <li key={7} className="menu-item mobileOnly">
                          <Link to={"/creator-choice"}>Create</Link>
                        </li>
                      ) : (
                        ""
                      )}
                      <li key={9} className="menu-item mobileOnly">
                        <Link to={"/referral-program"}>Referral</Link>
                      </li>
                      <li key={10} className="menu-item mobileOnly">
                        <Link to={"/faq"}>Learn</Link>
                      </li>
                      <li key={11} className="menu-item mobileOnly">
                        <Link to={"/ressources"} target="_blank">
                          Ressources
                        </Link>
                      </li>
                      <li key={12} className="menu-item mobileOnly">
                        <Link to={"/help-center"}>Help</Link>
                      </li>
                      <li key={13} className="menu-item mobileOnly">
                        <Link to={"/settings"}>Settings</Link>
                      </li>
                      <li key={14} className="menu-item mobileOnly">
                        <Link
                          to={"/"}
                          onClick={(e) => {
                            e.preventDefault();
                            Logout();
                          }}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="question-form">
                    <div className="">
                      <input
                          type="text"
                          placeholder="Type to search..."
                          value={searchQuery}
                          onChange={handleSearch}
                      />
                      {searchResults.length > 0 && (
                          <div className="search-dropdown">
                            {searchResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="search-item"
                                    onClick={() => handleItemClick(result)}
                                >
                                  <p>{result.name}</p>
                                  <p className="search-item-detail">{result.type}</p>
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                  </div>

                  <div className="flat-search-btn flex">
                    <div className="sc-btn-top mg-r-12" id="site-header">
                      <Link
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          open();
                        }}
                        className="sc-button header-slider style style-1 wallet fl-button pri-1"
                      >
                        <span>Connect Wallet</span>
                      </Link>
                    </div>
                    <div className="separator"></div>
                    <div className="admin_active" id="header_admin">
                      <div className="header_avatar">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdownNotifButton">
                            <AiOutlineBell size={25} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            align={"end"}
                            style={{ marginTop: "1vh" }}
                          >
                            <Dropdown.Item href={"/profile?id=" + slug}>
                              No new notifications
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                          <Dropdown.Toggle
                            id="dropdownMenuButton"
                            style={{ marginRight: "2.8vw" }}
                          >
                            <img
                              className="avatar"
                              src={UserPdpLink}
                              alt="avatar"
                            />
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            align={"end"}
                            style={{ marginTop: "1vh" }}
                          >
                            <Dropdown.Item href={"/profile?id=" + slug}>
                              <FaRegUser size={15} />
                              Profile
                            </Dropdown.Item>
                            {accountType == "user" ? (
                              <Dropdown.Item href="/tokenize">
                                <BiCoinStack size={15} />
                                Tokenize
                              </Dropdown.Item>
                            ) : (
                              ""
                            )}

                            {accountType == "artist" ? (
                              <Dropdown.Item href="/creator-choice">
                                <FaPlus size={15} />
                                Create
                              </Dropdown.Item>
                            ) : (
                              ""
                            )}

                            <Dropdown.Item href="/referral-program">
                              <FaLink size={15} />
                              Referral
                            </Dropdown.Item>
                            <Dropdown.Item href="/faq">
                              <FaBook size={15} />
                              Learn
                            </Dropdown.Item>
                            <Dropdown.Item href="/ressources">
                              <FaFileAlt size={18} />
                              Ressources
                            </Dropdown.Item>
                            <Dropdown.Item href="/help-center">
                              <FaHandsHelping size={17} />
                              Help
                            </Dropdown.Item>
                            <Dropdown.Item href="/settings">
                              <FaSlidersH size={15} />
                              Settings
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="/"
                              onClick={(e) => {
                                e.preventDefault();
                                Logout();
                              }}
                            >
                              <FaSignOutAlt size={15} />
                              Logout
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <DarkMode />
                        <div className="avatar_popup mt-20" ref={avtToggle}>
                          <div className="d-flex align-items-center mt-10">
                            <div className="info ml-12">
                              <p className="text-sm font-book text-gray-400 popup-name">
                                {userName}
                              </p>
                            </div>
                          </div>

                          <div className="hr"></div>
                          <div className="divider popup-divider"></div>
                          <div className="links mt-20">
                            <Link to="/edit-profile">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.774902 18.333C0.774902 18.7932 1.14762 19.1664 1.60824 19.1664C2.06885 19.1664 2.44157 18.7932 2.44157 18.333C2.44157 15.3923 4.13448 12.7889 6.77329 11.5578C7.68653 12.1513 8.77296 12.4997 9.94076 12.4997C11.113 12.4997 12.2036 12.1489 13.119 11.5513C13.9067 11.9232 14.6368 12.4235 15.2443 13.0307C16.6611 14.4479 17.4416 16.3311 17.4416 18.333C17.4416 18.7932 17.8143 19.1664 18.2749 19.1664C18.7355 19.1664 19.1083 18.7932 19.1083 18.333C19.1083 15.8859 18.1545 13.5845 16.4227 11.8523C15.8432 11.2725 15.1698 10.7754 14.4472 10.3655C15.2757 9.3581 15.7741 8.06944 15.7741 6.66635C15.7741 3.44979 13.1569 0.833008 9.94076 0.833008C6.72461 0.833008 4.10742 3.44979 4.10742 6.66635C4.10742 8.06604 4.60379 9.35154 5.42863 10.3579C2.56796 11.9685 0.774902 14.9779 0.774902 18.333V18.333ZM9.94076 2.49968C12.2381 2.49968 14.1074 4.36898 14.1074 6.66635C14.1074 8.96371 12.2381 10.833 9.94076 10.833C7.6434 10.833 5.77409 8.96371 5.77409 6.66635C5.77409 4.36898 7.6434 2.49968 9.94076 2.49968V2.49968Z"
                                  fill="white"
                                ></path>
                              </svg>
                              <span className="popup-white-text popup-links">
                                {" "}
                                Profile
                              </span>
                            </Link>
                            <a className="mt-10" href="/wallet-connect">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17.1154 0.730469H2.88461C1.29402 0.730469 0 2.02449 0 3.61508V14.3843C0 15.9749 1.29402 17.2689 2.88461 17.2689H17.1154C18.706 17.2689 20 15.9749 20 14.3843V3.61508C20 2.02449 18.706 0.730469 17.1154 0.730469ZM18.7529 10.6035H14.6154C13.6611 10.6035 13 9.95407 13 8.99969C13 8.04532 13.661 7.34544 14.6154 7.34544H18.7529V10.6035ZM18.7529 6.11508H14.6154C13.0248 6.11508 11.7308 7.40911 11.7308 8.99969C11.7308 10.5903 13.0248 11.8843 14.6154 11.8843H18.7529V14.3843C18.7529 15.3386 18.0698 15.9996 17.1154 15.9996H2.88461C1.93027 15.9996 1.29231 15.3387 1.29231 14.3843V3.61508C1.29231 2.66074 1.93023 1.99963 2.88461 1.99963H17.1266C18.0809 1.99963 18.7529 2.6607 18.7529 3.61508V6.11508Z"
                                  fill="white"
                                ></path>
                              </svg>
                              <span className="popup-white-text popup-links">
                                {" "}
                                Wallet
                              </span>
                            </a>
                            <a
                              className="mt-10"
                              href=""
                              id="logout"
                              onClick={Logout}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.9668 18.3057H2.49168C2.0332 18.3057 1.66113 17.9335 1.66113 17.4751V2.52492C1.66113 2.06644 2.03324 1.69437 2.49168 1.69437H9.9668C10.4261 1.69437 10.7973 1.32312 10.7973 0.863828C10.7973 0.404531 10.4261 0.0332031 9.9668 0.0332031H2.49168C1.11793 0.0332031 0 1.15117 0 2.52492V17.4751C0 18.8488 1.11793 19.9668 2.49168 19.9668H9.9668C10.4261 19.9668 10.7973 19.5955 10.7973 19.1362C10.7973 18.6769 10.4261 18.3057 9.9668 18.3057Z"
                                  fill="white"
                                ></path>
                                <path
                                  d="M19.7525 9.40904L14.7027 4.42564C14.3771 4.10337 13.8505 4.10755 13.5282 4.43396C13.206 4.76036 13.2093 5.28611 13.5366 5.60837L17.1454 9.16982H7.47508C7.01578 9.16982 6.64453 9.54107 6.64453 10.0004C6.64453 10.4597 7.01578 10.8309 7.47508 10.8309H17.1454L13.5366 14.3924C13.2093 14.7147 13.2068 15.2404 13.5282 15.5668C13.691 15.7313 13.9053 15.8143 14.1196 15.8143C14.3306 15.8143 14.5415 15.7346 14.7027 15.5751L19.7525 10.5917C19.9103 10.4356 20 10.2229 20 10.0003C20 9.77783 19.9111 9.56603 19.7525 9.40904Z"
                                  fill="white"
                                ></path>
                              </svg>
                              <span className="popup-white-text popup-links">
                                {" "}
                                Logout
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="nonConnectedBtnBox">
                        <div className="nonConnectedBtns"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  } else {
    // Header for NON connected users :

    return (
      <header
        id="header_main"
        className="header_1 header_2 style2 js-header"
        ref={headerRef}
      >
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div id="site-header-inner">
                <div className="wrap-box flex">
                  <div id="site-logo" className="clearfix">
                    <div id="site-logo-inner">
                      <Link to="/" rel="home" className="main-logo">
                        <img id="logo_header" src={logodark} alt="" style={{width:'auto'}} />
                      </Link>
                    </div>
                  </div>
                  <div
                    className="mobile-button"
                    ref={btnToggle}
                    onClick={menuToggle}
                  >
                    <span></span>
                  </div>
                  <nav id="main-nav" className="main-nav" ref={menuLeft}>
                    <ul id="menu-primary-menu" className="menu">
                      {menus.map((data, index) => {
                        if (data.name != "Profile")
                          return (
                            <li
                              key={index}
                              onClick={() => handleOnClick(index)}
                              className={`menu-item ${
                                data.namesub ? "menu-item-has-children" : ""
                              } ${activeIndex === index ? "active" : ""} `}
                            >
                              <Link to="#">{data.name}</Link>
                              {data.namesub && (
                                <ul className="sub-menu">
                                  {data.namesub.map((submenu) => (
                                    <li
                                      key={submenu.id}
                                      className={
                                        pathname === submenu.links
                                          ? "menu-item current-item"
                                          : "menu-item"
                                      }
                                    >
                                      <Link to={submenu.links}>
                                        {submenu.sub}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                      })}
                    </ul>
                    <div
                      className="mobileJoinBtn mobileOnly"
                      onClick={() => {
                        menuToggle();
                        setLoginModalOpen(true);
                      }}
                    >
                      <h5>Login</h5>
                    </div>
                    <div
                      className="mobileJoinBtn mobileOnly"
                      onClick={() => {
                        menuToggle();
                        setJoinChoicesModalOpen(true);
                      }}
                    >
                      <h5>Join</h5>
                    </div>
                  </nav>
                  <div className="question-form">
                    <div className="">
                      <input
                          type="text"
                          placeholder="Type to search..."
                          value={searchQuery}
                          onChange={handleSearch}
                      />
                      {searchResults?.length > 0 && (
                          <div className="search-dropdown">
                            {searchResults?.map((result) => (
                                <div
                                    key={result.id}
                                    className="search-item"
                                    onClick={() => handleItemClick(result)}
                                >
                                  <p>{result.name}</p>
                                  <p className="search-item-detail">{result.type}</p>
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                  </div>
                  <div className="flat-search-btn flex">
                    <div className="admin_active hideElement" id="header_admin">
                      <div className="header_avatar">
                        <img className="avatar" src={avt} alt="avatar" />
                        <img
                          className="avatar notifications"
                          src={not}
                          alt="notifications"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="nonConnectedBtnBox">
                    <div className="nonConnectedBtns">
                      <Link
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          setJoinChoicesModalOpen(true);
                        }}
                        className="nonConnectedJoinBtn"
                      >
                        <span>Join us</span>
                      </Link>
                      <Link
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          setLoginModalOpen(true);
                        }}
                        className="nonConnectedLoginBtn"
                      >
                        <span>Login</span>
                      </Link>
                    </div>
                    <DarkMode />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <JoinChoicesModal
          show={joinChoicesModalOpen}
          onHide={() => setJoinChoicesModalOpen(false)}
        />
        <LoginModal
          show={loginModalOpen}
          onHide={() => setLoginModalOpen(false)}
        />
      </header>
    );
  }
};

export default HeaderStyle2;
