import React, {useState, useEffect} from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import { useNavigate, useLocation } from 'react-router-dom';

import "react-tabs/style/react-tabs.css";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import {useContract} from "@thirdweb-dev/react";
import db from "../firebase";
import {ref, get, update} from "firebase/database";
import Dropdown from "react-bootstrap/Dropdown";
import {toast, ToastContainer} from "react-toastify";
import {useAccount} from "wagmi";
import DisplayArtworks from "../components/layouts/ProfileDisplay/DisplayArtworks";
import DisplayCollections from "../components/layouts/ProfileDisplay/DisplayCollections";
import DisplayProfileInfo from "../components/layouts/ProfileDisplay/DisplayProfileInfo";
import DisplayArtistTabSection from "../components/layouts/ProfileDisplay/DisplayArtistTabSection";
import {useArtworkContext} from "../Store/ArtworkContext";
import {useCollectionsContext} from "../Store/CollectionsContext";
import {useUserContext} from "../Store/UserContext";

const DisplayProfile = () => {
    const location = useLocation();
    const {lazyListed, userArtist} = useArtworkContext();
    const {collections} = useCollectionsContext();
    const {user, allMemberArtists} = useUserContext();
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
    const [followersList, setFollowersList] = useState([]);
    const [followingList, setFollowingList] = useState([]);

    const [artistData, setArtistData] = useState({});
    const [currentUserData, setCurrentUserData] = useState({});


    async function getArtistData(id) {
        for (const a of userArtist) {
            if (a.userId === id) {
                setArtistData(a);
            }
        }
    }

    async function getMemberData(id) {
        for (const a of user) {
            if (a.userId === id) {
                setArtistData(a);
                // setId(a.userId);
                // setVerified(a?.verified)
                // setName(a?.name);
                // setBio(a?.bio);
                // setPdp(a?.pdpLink);
                // setCover(a?.cover_link);
                // setFacebookLink(a?.Facebook);
                // setInstagramLink(a?.Instagram);
                // setTwitterLink(a?.Twitter);
                // setWebsite(a?.website);
                // setArtistType(a?.artistType);
                // a?.followers && handleSetFollowers(a?.followers);
                // a?.followedArtists && handleSetFollowing(a?.followedArtists);
                // a?.following && handleSetFollowing(a?.following);
                // setUserArtworks(a?.artworks);
            }
        }
    }

    async function getCurrentUserData() {
        if (currentUserKey) {
            const usersRef = ref(db, "users/" + currentUserKey);
            await get(usersRef).then(async (snapshot) => {
                let dt = snapshot.val();
                setCurrentUserData(dt);
            });
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

    const handleSetFollowers = (array) => {
        setFollowersList((prevState) =>{
            let updatedList = [...prevState];
            for (let val of array) {
                const found = allMemberArtists.find((user)=>user.userId === val);
                if (found && (updatedList.findIndex((obj)=> obj.userId === found.userId) === -1)) {
                    updatedList.push(found);
                }
            }
            return updatedList;
        })
    }

    const handleSetFollowing = (array) => {
        setFollowingList((prevState) =>{
            let updatedList = [...prevState];
            for (let val of array) {
                const found = allMemberArtists.find((user)=>user.userId === val);
                if (found && (updatedList.findIndex((obj)=> obj.userId === found.userId) === -1)) {
                    updatedList.push(found);
                }
            }
            return updatedList;
        })
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.has("artist")) {
            const userValue = queryParams.get("artist");
            getArtistData(userValue);
        } else if (queryParams.has("member")) {
            const userValue = queryParams.get("member");
            getMemberData(userValue);
        } else {
            console.log("URL doesn't contain artist or user query parameter.");
        }
    }, [location]);

    useEffect(() => {
        getCurrentUserData();
        getArtworks(artistData.userId);
        getCollections(artistData.userId);
    }, [artistData]);

    return (
        <div className="authors-2">
            <HeaderStyle2/>
                <>
                    <div className="profileInfoSection">
                        {(artistData && allMemberArtists) &&
                            <DisplayProfileInfo currentUserKey={currentUserKey} artistData = {artistData} currentUserData={currentUserData} allMemberArtists={allMemberArtists} />
                        }
                        <DisplayArtistTabSection artistData = {artistData} lazyListed={lazyListed} collections={collections} currentUserKey={currentUserKey} />
                    </div>
                </>
            <ToastContainer/>
            <Footer/>
        </div>
    );
};

export default DisplayProfile;