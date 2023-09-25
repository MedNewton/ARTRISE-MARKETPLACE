import React, {useState} from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import profile from "../../../assets/images/icon/profile.png";
import {Link, useNavigate} from "react-router-dom";
import {FaBook, FaFileAlt, FaHandsHelping, FaLink, FaPlus, FaRegUser, FaSignOutAlt, FaSlidersH} from "react-icons/fa";
import {BiCoinStack} from "react-icons/bi";


const RenderProfileIcon = ({UserPdpLink, disconnect }) =>{


    const nav = useNavigate();

    const [pdp, setPdp] = useState(
        "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
    );


    const Logout = async () => {
        try {
            disconnect();
            localStorage.removeItem("walletType");
            localStorage.removeItem("walletAddress");
            localStorage.removeItem("accountTypeChoice");
            localStorage.removeItem("verified");
            localStorage.removeItem("firebase:host:artrise-ffe4c-default-rtdb.firebaseio.com");
            localStorage.removeItem("wagmi.cache");
            localStorage.removeItem("wagmi.store");
            localStorage.removeItem("W3M_VERSION");
            localStorage.removeItem("W3M_VERSION");
            localStorage.removeItem("__TW__/metamask/injected.shimDisconnect");
            localStorage.removeItem("__TW__/coordinatorStorage/lastConnectedWallet");
            localStorage.removeItem("wagmi.wallet");
            localStorage.removeItem("wagmi.connected");
            localStorage.removeItem("walletAddress");
            localStorage.removeItem("slug");
            localStorage.removeItem("UserKey");
            localStorage.removeItem("name");
            localStorage.removeItem("pdpLink");
            localStorage.removeItem("followingYann");
            localStorage.removeItem("twitter");
            localStorage.removeItem("google");
            localStorage.removeItem("facebook");
            nav("/");
            await window.location.reload(true);
        } catch (error) {
        }
    }

    const ArtistProfileHandler = () => {
        nav("/displayProfile?artist=" + localStorage.getItem("UserKey"));
    }
    const UserProfileHandler = () => {
        nav("/displayProfile?member=" + localStorage.getItem("UserKey"));
    }

    return(
        <Dropdown>
            <Dropdown.Toggle id="dropdownMenuButton">
                <img className="avatar" src={UserPdpLink ? UserPdpLink : pdp}/>
            </Dropdown.Toggle>

            <Dropdown.Menu
                align={"end"}
                style={{ marginTop: "1vh" }}
            >
                {localStorage.getItem("accountTypeChoice") === "artist" && (
                        <Dropdown.Item onClick={ArtistProfileHandler}>
                            <FaRegUser size={15}/>
                            Profile
                        </Dropdown.Item>
                )}
                {localStorage.getItem("accountTypeChoice") === "user" && (

                    <Dropdown.Item  onClick={UserProfileHandler}>
                            <FaRegUser size={15} />
                            Profile
                    </Dropdown.Item>

                )}
                {(localStorage.getItem("accountTypeChoice") === "user" && localStorage.getItem("walletAddress")) ? (
                    <Dropdown.Item href="/tokenize">
                        <BiCoinStack size={15} />
                        Tokenize
                    </Dropdown.Item>
                ) : (
                    ""
                )}

                {(localStorage.getItem("accountTypeChoice") === "artist" && localStorage.getItem("walletAddress")) ? (
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
                <Dropdown.Item href="/learn">
                    <FaBook size={15} />
                    Learn
                </Dropdown.Item>
                <Dropdown.Item href="/ressources">
                    <FaFileAlt size={18} />
                    Resources
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
    )
}
export default RenderProfileIcon;