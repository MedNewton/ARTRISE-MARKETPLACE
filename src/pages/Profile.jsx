import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "react-sliding-pane/dist/react-sliding-pane.css";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import {
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useAccount } from "wagmi";

import CreateModal from "../components/layouts/createModal";
import Dropdown from "react-bootstrap/Dropdown";
import Tokenized from "./tokenized";
import LikedItems from "./LikedItems";
import MyCollections from "./myCollections";
import {toast} from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProfileContext } from '../Store/ProfileContext';
import { useUserContext } from '../Store/UserContext';
import Modal from 'react-bootstrap/Modal';

const Profile = () => {
  const navigate = useNavigate();
  const {profileData, lazyOwned} = useProfileContext();
  const {allMemberArtists} = useUserContext();
  const [createModalShow, setCreateModalShow] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [pdpLink, setPdpLink] = useState("");
  const [coverLink, setCoverLink] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBio, setUserBio] = useState("");
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [slug, setSlug] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const { address, isConnected } = useAccount();
  const [artistType, setArtistType] = useState("");
  const [show, setShow] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function setUserData(dt) {
      setDisplayName(dt.displayName);
      setUserEmail(dt.email);
      setUserBio(dt.bio);
      setPdpLink(dt.pdpLink);
      setCoverLink(dt.cover_link);
      setFacebookLink(dt.Facebook);
      setTwitterLink(dt.Twitter);
      setInstagramLink(dt.instagram);
      setDiscordLink(dt.Discord);
      setAccountType(dt.accountType);
      setArtistType(dt.artistType);
      setSlug(dt.slug);
      dt?.followers && handleSetFollowers(dt?.followers);
      dt?.following && handleSetFollowing(dt?.following);
      document.getElementById("pdp").style.backgroundImage = dt.pdpLink;
  }

  useEffect(() => {
    setUserData(profileData);
    if(address){
    }
  }, [profileData]);

  const { contract } = useContract(
    "0xa6F0F91BF6e9bEdF044C3e989C6cB2e0376b40fC",
    "nft-collection"
  );

  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);


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
  const handleSetFollowers = (array) => {
    setFollowersList((prevState) =>{
      let updatedList = [...prevState];
      for (let val of array) {
        const found = allMemberArtists?.find((user)=>user?.userId === val);
        if (found && (updatedList?.findIndex((obj)=> obj?.userId === found?.userId) === -1)) {
          updatedList?.push({'name':found?.name, 'userId':found.userId, 'type':(found?.verified ? "Artist" : "Member"), 'isDynamic':true});
        }
      }
      return updatedList;
    })
  };
  const handleSetFollowing = (array) => {
    setFollowingList((prevState) =>{
      let updatedList = [...prevState];
      for (let val of array) {
        const found = allMemberArtists?.find((user)=>user?.userId === val);
        if (found && (updatedList?.findIndex((obj)=> obj?.userId === found?.userId) === -1)) {
          updatedList?.push({'name':found?.name, 'userId':found?.userId, 'type':(found?.verified ? "Artist" : "Member"), 'isDynamic':true});
        }
      }
      return updatedList;
    })
  };
  function handleFollowersClick() {
    setShowFollowers(!showFollowers);
    handleShow();
  };
  function handleFollowingClick() {
    handleShow();
  };
  function followerFollowingItemClick (item) {
    if(item?.isDynamic){
    if(item?.type === "Artist"){
      navigate(`/displayProfile?artist=${item?.userId}`)
    }else if (item?.type === 'Member'){
      navigate(`/displayProfile?member=${item?.userId}`)
    }
    }else if(item?.isDynamic === false){
      navigate(`/authors-02?artist=${item?.userId}`)
    }
  }

  return (
    <div className="authors-2">
      <HeaderStyle2 />
      <div className="tf-create-item tf-section" >
        <div className="themesflat-container" >
          <div className="row">
            <div
                className="userCoverSection"
                id="userCover"
                style={{backgroundImage: `url(${coverLink ? coverLink : ""})`}}
            ></div>
            <div className="col-md-12 col-lg-12 col-sm-12 col-12 profileInfoSection">
              <div>
                <div className="pdpContainer">
                  <div className="pdpSpace artistpdpSpace" id="pdp">
                    <img src={pdpLink ? pdpLink : ""} alt="" />
                  </div>
                </div>
              </div>
              <div className="userDataContainer">
                <h5 className="userName">{displayName ? displayName : "Unnamed"}</h5>
                <p className="userAttribution">
                  {accountType === "artist" ? `${artistType ? artistType : "Artist"}` : "Member"}
                </p>
                <div className="userSocialsContainer">
                  <i onClick={handleFacebookIconClick}
                     style={{fontSize: "1.8em", cursor:'pointer'}}
                     className="fab fa-facebook"
                  ></i>
                  <i onClick={handleTwitterIconClick}
                     style={{fontSize: "1.8em", cursor:'pointer'}}
                     className="fab fa-twitter"
                  ></i>
                  <i onClick={handleInstagramIconClick}
                     style={{fontSize: "1.8em", cursor:'pointer'}}
                     className="fab fa-instagram"
                  ></i>
                </div>
                <div className="folContainer">
                  <div className="ContainerofFollowers" onClick = {()=>{handleFollowersClick()}}>
                    <h5 className="dataOfFollowers">{followersList?.length}</h5>
                    <h5 className="titleOfFollowers">followers</h5>
                  </div>
                  <div className="ContainerofFollowing"  onClick = {()=>{handleFollowingClick()}}>
                    <h5 className="dataOfFollowing">{followingList?.length}</h5>
                    <h5 className="titleOfFollowing">following</h5>
                  </div>
                </div>
                <div className="userButtonsContainer">

                    <div
                      className="followUserBtn"
                      onClick={() => {
                        window.location.href = "/edit-profile";
                      }}
                    >
                      <i className="fa fa-pen"></i>
                      <h5 style={{ whiteSpace: "nowrap" }}>Edit info</h5>
                    </div>
                  <div className="shareUserBtn">
                    <i className="fa fa-share-alt"></i>
                  </div>
                  <div className="shareUserBtn">
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
            <Tabs style={{width: "100%"}}>
              <TabList style={{padding: "0 0 0 0"}}>
                <Tab key={0} style={{fontSize: '16px',padding:'0.6% 50px 1%'}}>Owned</Tab>
                <Tab key={1}  style={{fontSize: '16px',padding:'0.6% 50px 1%'}}>Tokenized</Tab>
                <Tab key={2}  style={{fontSize: '16px',padding:'0.6% 50px 1%'}}>Liked items</Tab>
                {accountType === "artist" ? <Tab key={3} style={{fontSize: '16px',padding:'0.6% 50px 1%'}}>Collections</Tab> : ""}
                <Tab key={4}><div className="tagLink">
                  <Dropdown>
                    <Dropdown.Toggle id="profileTabDropdown">
                      <i
                          className="fa fa-ellipsis-h"
                          aria-hidden="true"
                      ></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/">
                        <p className="tagLinkDropdownItemText">Owned</p>
                      </Dropdown.Item>
                      <Dropdown.Item href="/">
                        <p className="tagLinkDropdownItemText">Liked Items</p>
                      </Dropdown.Item>
                      <Dropdown.Item href="/">
                        <p className="tagLinkDropdownItemText">Offers Made</p>
                      </Dropdown.Item>
                      <Dropdown.Item href="/">
                        <p className="tagLinkDropdownItemText">Offers Received</p>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                </Tab>
              </TabList>
            <TabPanel key={0}>
              {!isLoading && ownedNFTs && address
                  ? ownedNFTs?.map((nft) => {
                    if (nft?.metadata?.id !== 0) {
                      return (
                          <div
                              key={nft?.metadata?.id}
                              className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                          >
                            <div className={`sc-card-product`}>
                              <div className="card-media">
                                <img src={nft?.metadata?.image} alt="" />
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
                                <h5 className="style2">{nft?.metadata?.name}</h5>
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
              {address && lazyOwned?.map((nft, index) => {
                    if (nft) {
                      let id = nft?.id;
                      if(nft?.listable){
                        return (
                            <div
                                key={index}
                                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                            >
                              <div className={`sc-card-product`}>
                                <div className="card-media">
                                  <Link to={"/private-display?id=" + id}>
                                    <img src={nft?.data?.image} alt="" />
                                  </Link>
                                </div>
                                <div className="card-title">
                                  <Link to={"/private-display?id=" + id}>
                                    <h5 className="style2">{nft?.data?.name}</h5>
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
                      else{
                        return (
                            <div
                                key={index}
                                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                            >
                              <div className={`sc-card-product`}>
                                <div className="card-media">
                                  <Link to={"/artwork-details?id=" + id}>
                                    <img src={nft?.data?.image} alt="" />
                                  </Link>
                                </div>
                                <div className="card-title">
                                  <Link to={"/artwork-details?id=" + id}>
                                    <h5 className="style2">{nft?.data?.name}</h5>
                                  </Link>
                                </div>

                              </div>
                            </div>
                        );
                      }

                    }
                  })}
            </TabPanel>
            <TabPanel key = {1}>
              <Tokenized/>
            </TabPanel>
            <TabPanel key = {2}>
              <LikedItems/>
            </TabPanel>
            <TabPanel key = {3}>
              <MyCollections/>
            </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      <ToastContainer />

      <>
        <Modal show={show} onHide={()=>{
          setShowFollowers(false);
          handleClose()}}>
          <Modal.Header closeButton>
            <Modal.Title>{showFollowers ? <h3>Followers</h3> : <h4>Following</h4>}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{paddingTop:'0px'}}>

            {showFollowers ? followersList : followingList?.map((item, index)=>{
              return(
              <div className="search-item" key={index} onClick={() =>followerFollowingItemClick(item)}>
              <h5>{item?.name}</h5>
              <p  className="search-item-detail">{item.type}</p>
              </div>
              )
            })}
          </Modal.Body>
        </Modal>
      </>
      <CreateModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
      <Footer />
    </div>
  );
};

export default Profile;
