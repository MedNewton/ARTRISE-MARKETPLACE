import React, {useState, useEffect} from "react";
import {useLocation } from 'react-router-dom';
import "react-tabs/style/react-tabs.css";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import {useContract} from "@thirdweb-dev/react";
import db from "../firebase";
import {ref, get} from "firebase/database";
import {ToastContainer} from "react-toastify";
import {useAccount} from "wagmi";
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


    const [artistData, setArtistData] = useState({});
    const [currentUserData, setCurrentUserData] = useState({});

    async function getArtistData(id) {
        for (const a of userArtist) {
            if (a.userId === id) {
                await setArtistData(a);
            }
        }
    }

    async function getMemberData(id) {
        for (const a of allMemberArtists) {
            if (a.userId === id) {
                await setArtistData(a);
            }
        }
    }

    async function getCurrentUserData() {
        if (currentUserKey) {
            const usersRef = ref(db, "users/" + currentUserKey);
            const snapshot = await get(usersRef);
            const dt = snapshot.val();
            setCurrentUserData(dt);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentUserKey) {
                    await getCurrentUserData();
                }

                const queryParams = new URLSearchParams(location.search);
                if (queryParams.has("artist")) {
                    const userValue = queryParams.get("artist");
                    await getArtistData(userValue);
                } else if (queryParams.has("member")) {
                    const userValue = queryParams.get("member");
                    await getMemberData(userValue);
                } else {
                    console.log("herere URL doesn't contain artist or user query parameter.");
                }
            } catch (error) {
                console.error("herere An error occurred:", error);
                // You can add error handling logic here, such as displaying an error message.
            }
        };
        fetchData();
    }, [location]);

    // useEffect(() => {
    //     getCurrentUserData();
    // }, [artistData]);

    console.log("herere artistData",artistData);
    console.log("herere allMemberArtists",allMemberArtists);
    console.log("herere currentUserKey",currentUserKey);
    console.log("herere currentUserData",currentUserData);

    return (
        <div className="authors-2">
            <HeaderStyle2/>
                <>
                    <div className="profileInfoSection">
                        {(artistData && allMemberArtists) &&
                            <DisplayProfileInfo
                                currentUserKey={currentUserKey}
                                artistData = {artistData}
                                currentUserData={currentUserData}
                                allMemberArtists={allMemberArtists}
                            />
                        }
                        <DisplayArtistTabSection
                            artistData = {artistData}
                            lazyListed={lazyListed}
                            collections={collections}
                            currentUserKey={currentUserKey}
                        />
                    </div>
                </>
            <ToastContainer/>
            <Footer/>
        </div>
    );
};

export default DisplayProfile;