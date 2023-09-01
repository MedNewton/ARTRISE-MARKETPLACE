import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import CardModal from "../components/layouts/CardModal";
import {useContract, useListings} from "@thirdweb-dev/react";
import db from "../firebase";
import {ref, get, update} from "firebase/database";
import Dropdown from "react-bootstrap/Dropdown";
import {toast, ToastContainer} from "react-toastify";
import {useAccount} from "wagmi";
import DisplayArtworks from "../components/layouts/ProfileDisplay/DisplayArtworks";
import DisplayCollections from "../components/layouts/ProfileDisplay/DisplayCollections";
import {useArtworkContext} from "../Store/ArtworkContext";
import {useArtistContext} from "../Store/ArtistContext";
import {useCollectionsContext} from "../Store/CollectionsContext";
import {useUserContext} from "../Store/UserContext";

const DisplayProfile = () => {

    const {lazyListed, userArtist} = useArtworkContext();
    const {collections} = useCollectionsContext();
    const {user} = useUserContext();
    const {address, isConnected} = useAccount();
    const currentUserKey = address ? address : localStorage.getItem("UserKey");
    const {contract} = useContract(
        "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
        "marketplace"
    );
    const [id, setId] = useState("");
    const [verified, setVerified] = useState("");
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
    const [followedArtists, setFollowedArtists] = useState([]);
    const [followed, setFollowed] = useState(false);
    const [followedText, setFollowedText] = useState("Follow");
    const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
    const [userArtworks, setUserArtworks] = useState([]);
    const [userCollections, setUserCollections] = useState([]);

    async function getArtistData(id) {
        for (const a of userArtist) {
            if (a.userId === id) {
                setId(a.userId);
                setVerified(a?.verified)
                setName(a?.name);
                setBio(a?.bio);
                setPdp(a?.pdpLink);
                setCover(a?.cover_link);
                setFacebookLink(a?.Facebook);
                setInstagramLink(a?.Instagram);
                setTwitterLink(a?.Twitter);
                setWebsite(a?.website);
                setArtistType(a?.artistType);
                setFollowers(a?.followers);
                setFollowing(a?.following);
                setFollowedArtists(a?.followedArtists);
            }
        }
    }

    async function getMemberData(id) {
        for (const a of user) {
            if (a.userId === id) {
                console.log("abc  6 a:", a)
                setId(a.userId);
                setVerified(a?.verified)
                setName(a?.name);
                setBio(a?.bio);
                setPdp(a?.pdpLink);
                setCover(a?.cover_link);
                setFacebookLink(a?.Facebook);
                setInstagramLink(a?.Instagram);
                setTwitterLink(a?.Twitter);
                setWebsite(a?.website);
                setArtistType(a?.artistType);
                setFollowers(a?.followers);
                setFollowing(a?.following);
                setFollowedArtists(a?.followedArtists);
                // setUserArtworks(a?.artworks);
            }
        }
    }

    async function getCurrentUserData() {
        const usersRef = ref(db, "users/" + currentUserKey);
        await get(usersRef).then(async (snapshot) => {
            let dt = snapshot.val();
            setCurrentUserFollowing(dt.following);
        });
        if (currentUserFollowing.includes(id)) {
            setFollowedText("Unfollow");
        }
    }

    async function getArtworks(id) {
        for (const a of lazyListed) {
            if (a.ownerId === id) {
                setUserArtworks((prevState) => [...prevState, a]);
            }
        }
    }
    async function getCollections(id) {
        for (const a of collections) {
            if (a.owner === id) {
                setUserCollections((prevState) => [...prevState, a]);
            }
        }
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        const queryParams = new URLSearchParams(url.search);

        if (queryParams.has("artist")) {
            const userValue = queryParams.get("artist");
            getArtistData(userValue);
        } else if (queryParams.has("member")) {
            const userValue = queryParams.get("member");
            getMemberData(userValue);
        } else {
            console.log("URL doesn't contain artist or user query parameter.");
        }
    }, [userArtist]);

    useEffect(() => {
        getCurrentUserData();
        getArtworks(id);
        getCollections(id);
    }, [id])

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

    async function followUnfollow() {
        if (followedText === "Follow") {
            const tempFollowersArray = [...followers, currentUserKey]
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
        } else if (followedText === "Unfollow") {
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
            <HeaderStyle2/>
            {name != "" ? (
                <>
                    <div
                        className="userCoverSection"
                        id="userCover"
                        style={{backgroundImage: `url(${cover})`}}
                    ></div>
                    <div className="profileInfoSection">
                        <div>
                            <div className="pdpContainer">
                                <div className="pdpSpace artistpdpSpace" id="pdp">
                                    <img src={pdp} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div
                            className="userDataContainer"
                            style={{marginBottom: "2%"}}
                        >
                            <h5 className="userName">{name}</h5>
                            <p className="userAttribution">
                                {(verified === "yes" || verified === true) ? (artistType ? artistType : "Artist") : "Member"}
                            </p>
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
                            <TabList style={{padding: "0 0 0 2%", columnGap: '100px', display: 'flex',alignItems: 'center'}} >
                                {menuTab?.map((item, index) => (
                                    <Tab style={{fontSize: '16px', padding: '15px 0px 15px 0px'}}
                                         key={index}>{item?.name}</Tab>
                                ))}
                                <Tab style={{padding: '0% 0px 0% 0px'}}>
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
                                <DisplayArtworks data={userArtworks}/>
                            </TabPanel>
                            <TabPanel key={1}>
                                <DisplayCollections data={userCollections}/>
                            </TabPanel>
                            <TabPanel key={2}>
                                <div></div>
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
            <ToastContainer/>
            <CardModal show={modalShow} onHide={() => setModalShow(false)}/>
            <Footer/>
        </div>
    );
};

export default DisplayProfile;


