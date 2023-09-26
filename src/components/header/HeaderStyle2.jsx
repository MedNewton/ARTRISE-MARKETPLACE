import React, {useRef, useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useContract} from "@thirdweb-dev/react";
import DarkMode from "./DarkMode";
import db from "../../firebase";
import {ref, get, set} from "firebase/database";
import LoginModal from "../layouts/loginModal";
import JoinChoicesModal from "../layouts/joinChicesModal";
import {useAccount, useDisconnect} from "wagmi";
import {useWeb3Modal} from "@web3modal/react";
import HeaderSearch from "./HeaderSearch/HeaderSearch"
import RenderLogo from "./RenderLogo/RenderLogo";
import RenderHomeExploreDropButtons from "./RenderHomeExporeDropButtons/RenderHomeExploreDropButtons";
import RenderNotifyIcon from "./RenderNotifyIcon/RenderNotifyIcon";
import RenderCartIcon from "./RenderCartIcon/RenderCartIcon";
import RenderProfileIcon from "./RenderProfileIcon/RenderProfileIcon";
import RenderWalletAddress from "./RenderWalletAddressSection/RenderWalletAddress";
import RenderConnectWalletAddress from "./RenderWalletAddressSection/RenderConnectWalletAddress";
import RenderJoinLoginButton from "./RenderJoinLoginButton/RenderJoinLoginButton";
import RenderBurgerMenuIcon from "./RenderBurgerMenu/RenderBurgerMenuIcon";
import MobileVersionMenuModal from "./MenuModal/MobileVersionMenuModal";

import {useMediaQuery} from 'react-responsive'
import RenderSearchIconForMobileView from "./RenderSearchIconForMobileView/RenderSearchIconForMobileView";


const HeaderStyle2 = () => {

    const isDeviceMobile = useMediaQuery({query: '(max-width: 1224px)'})
    const [showMenuModal, setShowMenuModal] = useState(false);

    const handleMenuModalClose = () => setShowMenuModal(false);
    const handleShowMenuModal = () => setShowMenuModal(true);


    const {contract} = useContract(
        "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
        "marketplace"
    );
    const {address, isConnected} = useAccount();
    const {disconnect} = useDisconnect();


    useEffect(() => {
        window.ire("identify", {customerId: localStorage.getItem("UserKey")});
    }, []);

    useEffect(() => {
        if (address) {
            localStorage.setItem("accountTypeChoice", "artist");
            localStorage.setItem("UserKey", address);
            localStorage.setItem("walletAddress", address);
        }
    }, [address]);

    const {isOpen, open, close, setDefaultChain} = useWeb3Modal();

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

    const {pathname} = useLocation();

    const nav = useNavigate();
    const headerRef = useRef(null);

    useEffect(() => {
        document.title = "Artrise - Physical NFTs Marketplace";

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

    const [activeIndex, setActiveIndex] = useState(null);
    const handleOnClick = (index) => {
        setActiveIndex(index);
    };


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

    return (
        <>
            <header
                id="header_main"
                className="header_1 header_2 style2 js-header"
                ref={headerRef}
            >
                <div className="themesflat-container">

                    <div className="row">

                        <div className="col-md-12 white-black-color-switch">

                            <div id="site-header-inner">

                                <div className="wrap-box flex">

                                    {isDeviceMobile &&
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width:"100vw"
                                        }}>
                                            <div style={{display: "flex", gap: "5vw"}}>
                                                <RenderBurgerMenuIcon handleShowMenuModal={handleShowMenuModal}/>
                                                <RenderLogo/>
                                            </div>
                                            <div style={{display: "flex",gap:"2vw"}}>
                                                <div style={{marginRight: "2vw"}}><RenderSearchIconForMobileView/></div>

                                                <div style={{marginRight: "8vw"}}><RenderCartIcon /></div>

                                                <DarkMode/>
                                            </div>
                                        </div>

                                    }


                                    {!isDeviceMobile &&
                                        <>
                                            <RenderLogo/>
                                            <RenderHomeExploreDropButtons/>
                                            <HeaderSearch/>
                                            {
                                                (isConnected &&
                                                    !localStorage.getItem("twitter") &&
                                                    !localStorage.getItem("google") &&
                                                    !localStorage.getItem("facebook"))
                                                    ?
                                                    (
                                                        <>
                                                            {
                                                                (() => {
                                                                    checkUserExists(address);
                                                                    // You can add any other code here if needed
                                                                })
                                                            }
                                                            <div className="flat-search-btn flex">

                                                                {
                                                                    address ? <RenderWalletAddress address={address}
                                                                                                   open={open}/> :
                                                                        <RenderConnectWalletAddress open={open}/>

                                                                }
                                                                <div className="separator"></div>

                                                                <div className="admin_active" id="header_admin">

                                                                    <div className="header_avatar" style={{
                                                                        display: 'flex',
                                                                        gap: '1vw',
                                                                        alignItems: 'flex-start'
                                                                    }}>
                                                                        <RenderNotifyIcon/>
                                                                        <RenderProfileIcon
                                                                            UserPdpLink={localStorage.getItem("pdpLink")}
                                                                            disconnect={disconnect}
                                                                        />
                                                                        <RenderCartIcon/>
                                                                        <DarkMode/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                    :
                                                    localStorage.getItem("twitter") ||
                                                    localStorage.getItem("google") ||
                                                    localStorage.getItem("facebook")
                                                        ?
                                                        (
                                                            <div className="flat-search-btn flex">

                                                                <RenderConnectWalletAddress open={open}/>
                                                                <div className="separator"></div>

                                                                <div className="admin_active" id="header_admin">

                                                                    <div className="header_avatar" style={{
                                                                        display: 'flex',
                                                                        gap: '1vw',
                                                                        alignItems: 'flex-start'
                                                                    }}>
                                                                        <RenderNotifyIcon/>
                                                                        <RenderProfileIcon
                                                                            UserPdpLink={localStorage.getItem("pdpLink")}
                                                                            disconnect={disconnect}
                                                                        />
                                                                        <RenderCartIcon/>
                                                                        <DarkMode/>

                                                                    </div>
                                                                    <div className="nonConnectedBtnBox">

                                                                        <div className="nonConnectedBtns"></div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )

                                                        :
                                                        (
                                                            <RenderJoinLoginButton
                                                                setJoinChoicesModalOpen={setJoinChoicesModalOpen}
                                                                setLoginModalOpen={setLoginModalOpen}
                                                            />
                                                        )
                                            }
                                        </>
                                    }
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
            <MobileVersionMenuModal showMenuModal={showMenuModal} handleMenuModalClose={handleMenuModalClose}
                                    handleShowMenuModal={handleShowMenuModal}/>


        </>

    );


};

export default HeaderStyle2;


