import React, {useRef, useState, useEffect} from "react";
import DarkMode from "./DarkMode";
import LoginModal from "../layouts/loginModal";
import JoinChoicesModal from "../layouts/joinChoicesModal";
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
import {CheckUserExists} from "../../services/AuthServices/CheckUserExists";

import {useMediaQuery} from 'react-responsive'
import RenderSearchIconForMobileView from "./RenderSearchIconForMobileView/RenderSearchIconForMobileView";
import HeaderSearchForMobileView from "./HeaderSearch/HeaderSearchForMobileView";
import {useDispatch, useSelector} from "react-redux";
import {get, ref} from "firebase/database";
import db from "../../firebase";
import {setUsers} from "../../redux/actions/userActions";

const HeaderStyle2 = () => {
    const isDeviceMobile = useMediaQuery({query: '(max-width: 1224px)'})
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [showSearchField, setShowSearchField] = useState(false);

    const [isWalletConnected, setIsWalletConnected] = useState(localStorage.getItem("walletAddress") !== null);
    const [isTwitterConnected, setIsTwitterConnected] = useState(localStorage.getItem("twitter") !== null)
    const [isGoogleConnected, setIsGoogleConnected] = useState(localStorage.getItem("google") !== null);
    const [isFacebookConnected, setIsFacebookConnected] = useState(localStorage.getItem("facebook") !== null);

    const handleMenuModalClose = () => setShowMenuModal(false);
    const handleShowMenuModal = () => setShowMenuModal(true);

    const {address, isConnected} = useAccount();
    const {disconnect} = useDisconnect();


    let members = [];
    let artists = [];
    let allUsers = [];
    const dispatch = useDispatch();
    const  artistsState= useSelector((state) => state.usersReducer.artists);
    const  userState= useSelector((state) => state.usersReducer.members);
    async function fetchUsers() {
        const userRef = ref(db, 'users/');
        await get(userRef).then(async (snapshot) => {
            let dt = snapshot.val();
            for (let UserKey in dt) {
                let a = dt[UserKey];
                if(a?.socialMediaVerified && a?.profileType === "artist"){
                    let artistItem = {
                        userId: UserKey,
                        ...a
                    }
                    artists.push(artistItem);
                }else if (!a?.socialMediaVerified){
                    let memberItem = {
                        userId: UserKey,
                        ...a
                    }
                    members.push(memberItem);
                }
                let userItem = {
                    userId: UserKey,
                    ...a
                }
                allUsers.push(userItem)
            }
        })
        dispatch(setUsers({members, artists, allUsers}));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        window.ire("identify", {customerId: localStorage.getItem("UserKey")});
    }, []);

    useEffect(() => {
        if (address) {
             CheckUserExists(address, referee).then(() => {
            let walletConnectedState = localStorage.getItem("walletAddress");
            if (walletConnectedState) setIsWalletConnected(true);
            else setIsWalletConnected(false);
            let twitterState = localStorage.getItem("twitter");
            if (twitterState) setIsTwitterConnected(true);
            else setIsTwitterConnected(false);
            let googleState = localStorage.getItem("google");
            if (googleState) setIsGoogleConnected(true);
            else setIsGoogleConnected(false);
            let facebookState = localStorage.getItem("facebook");
            if (facebookState) setIsFacebookConnected(true);
            else setIsFacebookConnected(false);
             });
        }
    }, [address]);

    const {isOpen, open, close, setDefaultChain} = useWeb3Modal();
    const [loginModalOpen, setLoginModalOpen] = useState();
    const [joinChoicesModalOpen, setJoinChoicesModalOpen] = useState();
    const [referee, setReferee] = useState("");
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
    }, []);

    console.log("artistsStateartistsState",artistsState)
    console.log("artistsStateuserState",userState)

    return (
        <>
            <header
                id="header_main"
                className="header_1 header_2 style2 js-header"
                ref={headerRef}
            >
                <div className="themesflat-container">
                    <div className="row">
                        <div
                            className={isDeviceMobile ?
                                "col-12-mobile-version white-black-color-switch"
                                :
                                "col-md-12 white-black-color-switch"
                            }>
                            <div id="site-header-inner">
                                <div className="wrap-box flex flex-row justify-content-between align-items-center">
                                    {isDeviceMobile && !showSearchField &&
                                        <div className="navbar-mobile-version-wrapper">
                                            <div
                                                className="navbar-left-half-mobile-version-wrapper">
                                                <RenderLogo/>
                                            </div>
                                            <div className="navbar-right-half-mobile-version-wrapper">
                                                <RenderSearchIconForMobileView
                                                    setShowSearchField={setShowSearchField}
                                                    showSearchField={showSearchField}
                                                    handleMenuModalClose={handleMenuModalClose}
                                                />
                                                <DarkMode/>
                                                <RenderBurgerMenuIcon handleShowMenuModal={handleShowMenuModal}/>
                                            </div>
                                        </div>
                                    }
                                    {isDeviceMobile && showSearchField &&
                                        <HeaderSearchForMobileView
                                            setShowSearchField={setShowSearchField}
                                        />
                                    }
                                    {!isDeviceMobile &&
                                        <>
                                            <RenderLogo/>
                                            <RenderHomeExploreDropButtons/>
                                            <HeaderSearch/>
                                            {
                                                isWalletConnected &&
                                                !isTwitterConnected &&
                                                !isGoogleConnected &&
                                                !isFacebookConnected
                                                    ?
                                                    (
                                                        <>
                                                           {/*{()=>{CheckUserExists(address, referee)}}*/}
                                                            <div className="flat-search-btn flex">
                                                                {
                                                                    address ?
                                                                        <RenderWalletAddress address={address} open={open}/>
                                                                        :
                                                                        <RenderConnectWalletAddress open={open}/>
                                                                }
                                                                <div className="separator"></div>

                                                                <div className="admin_active" id="header_admin">

                                                                    <div className="header_avatar flex-row-flex-start-gap1"
                                                                    >
                                                                        <RenderNotifyIcon/>
                                                                        <RenderProfileIcon
                                                                            UserPdpLink={localStorage?.getItem("pdpLink")}
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
                                                    !isWalletConnected &&
                                                    (isTwitterConnected ||
                                                        isGoogleConnected ||
                                                        isFacebookConnected)
                                                        ?
                                                        (
                                                            <div className="flat-search-btn flex">
                                                                <RenderConnectWalletAddress open={open}/>
                                                                <div className="separator"></div>
                                                                <div className="admin_active" id="header_admin">
                                                                    <div className="header_avatar flex-row-flex-start-gap1">
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
            <MobileVersionMenuModal
                showMenuModal={showMenuModal}
                handleMenuModalClose={handleMenuModalClose}
                handleShowMenuModal={handleShowMenuModal}
                joinChoicesModalOpen={joinChoicesModalOpen}
                setJoinChoicesModalOpen={setJoinChoicesModalOpen}
                loginModalOpen={loginModalOpen}
                setLoginModalOpen={setLoginModalOpen}
                setShowSearchField={setShowSearchField}
                showSearchField={showSearchField}
            />
        </>
    );

};

export default HeaderStyle2;