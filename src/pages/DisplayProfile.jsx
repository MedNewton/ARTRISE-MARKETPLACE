import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import { useContract } from "@thirdweb-dev/react";
import db from "../firebase";
import { ref, get } from "firebase/database";
import { ToastContainer } from "react-toastify";
import { useAccount } from "wagmi";
import DisplayProfileInfo from "../components/layouts/ProfileDisplay/DisplayProfileInfo";
import DisplayArtistTabSection from "../components/layouts/ProfileDisplay/DisplayArtistTabSection";
import { useArtworkContext } from "../Store/ArtworkContext";
import { useCollectionsContext } from "../Store/CollectionsContext";
import { useUserContext } from "../Store/UserContext";
import LoadingOverlay from "react-loading-overlay";
import {useSelector} from "react-redux";

const DisplayProfile = () => {
    const location = useLocation();

    const  artistsState= useSelector((state) => state.usersReducer.artists);
    const  userState= useSelector((state) => state.usersReducer.members);
    const  allUsersState= useSelector((state) => state.usersReducer.allUsers);

    const { lazyListed, userArtist } = useArtworkContext();
    const { collections } = useCollectionsContext();
    const { user, allMemberArtists } = useUserContext();
    const { address, isConnected } = useAccount();
    const currentUserKey = address ? address : localStorage.getItem("userId");
    const { contract } = useContract(
        "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
        "marketplace"
    );

    const [artistData, setArtistData] = useState({});
    const [currentUserData, setCurrentUserData] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

    async function getArtistData(id) {
        for (const a of allUsersState) {
            if (a.userId === id) {
                setArtistData(a);
                setLoading(false); // Set loading to false when data is available
            }
        }
    }

    async function getMemberData(id) {
        for (const a of allUsersState) {
            if (a.userId === id) {
                setArtistData(a);
                setLoading(false); // Set loading to false when data is available
            }
        }
    }

    async function getCurrentUserData() {
        if (currentUserKey) {
            const usersRef = ref(db, "users/" + currentUserKey);
            const snapshot = await get(usersRef);
            const dt = snapshot.val();
            setCurrentUserData(dt);
            // setLoading(false); // Set loading to false when data is available
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
                    // setLoading(false); // Set loading to false when data is available

                } else if (queryParams.has("member")) {
                    const userValue = queryParams.get("member");
                    await getMemberData(userValue);
                    // setLoading(false); // Set loading to false when data is available

                } else {
                    console.log("URL doesn't contain artist or user query parameter.");
                    // setLoading(false); // Set loading to false when data is available

                }
            } catch (error) {
                console.error("An error occurred:", error);
                // You can add error handling logic here, such as displaying an error message.
                // setLoading(false); // Set loading to false in case of an error
            }
        };
        fetchData();
    }, [location, currentUserKey, allUsersState]);
    console.log("artistsState artistsState",artistsState)
    console.log("artistsState userState",userState)
    console.log("artistsState allUsers",allUsersState)
    console.log("artistsState currentUserData",currentUserData)
    return (
        <div className="authors-2">
            <HeaderStyle2 />

                <LoadingOverlay
                    active={loading}
                    spinner
                    spinnerColor="black" // Set the desired color here
                    text="Loading..."
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            background: "rgba(0,0,  0, 0.5)",
                        }),
                    }}
                >
                <>
                    <div className="profileInfoSection">
                        {artistData && allUsersState && (
                            <DisplayProfileInfo
                                currentUserKey={currentUserKey}
                                artistData={artistData}
                                currentUserData={currentUserData}
                                allMemberArtists={allUsersState}
                            />
                        )}

                        {/*{loading && <div className="overlay"></div>}*/}



                        {artistData && allUsersState && (
                            <DisplayArtistTabSection
                                artistData={artistData}
                                lazyListed={lazyListed}
                                collections={collections}
                                currentUserKey={currentUserKey}
                            />
                        )}


                    </div>
                </>
                  </LoadingOverlay>

            


            <ToastContainer />
            <Footer />
        </div>
    );
};

export default DisplayProfile;
