import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import { useContract } from "@thirdweb-dev/react";
import { ToastContainer } from "react-toastify";
import DisplayProfileInfo from "../components/layouts/ProfileDisplay/DisplayProfileInfo";
import DisplayArtistTabSection from "../components/layouts/ProfileDisplay/DisplayArtistTabSection";
import LoadingOverlay from "react-loading-overlay";
import {useSelector} from "react-redux";

const DisplayProfile = () => {
    const location = useLocation();

    const  allUsers= useSelector((state) => state.usersReducer.allUsers);
    const  lazyListed= useSelector((state) => state.usersReducer.lazyListed);
    const  currentUser= useSelector((state) => state.usersReducer.currentUser);
    const  currentUserId= useSelector((state) => state.usersReducer.currentUserId);
    const  collections= useSelector((state) => state.usersReducer.collections);

    const { contract } = useContract(
        "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
        "marketplace"
    );

    const [artistData, setArtistData] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

    async function getArtistData(id) {
        for (const a of allUsers) {
            if (a.userId === id) {
                setArtistData(a);
                setLoading(false); // Set loading to false when data is available
            }
        }
    }

    async function getMemberData(id) {
        for (const a of allUsers) {
            if (a.userId === id) {
                setArtistData(a);
                setLoading(false); // Set loading to false when data is available
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
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
    }, [location, currentUserId, allUsers]);

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
                        {artistData && allUsers && (
                            <DisplayProfileInfo
                                currentUserId={currentUserId}
                                artistData={artistData}
                                currentUser={currentUser}
                                allUsers={allUsers}
                            />
                        )}

                        {artistData && allUsers && (
                            <DisplayArtistTabSection
                                artistData={artistData}
                                lazyListed={lazyListed}
                                collections={collections}
                                currentUserId={currentUserId}
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
