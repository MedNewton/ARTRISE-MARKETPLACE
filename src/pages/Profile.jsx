import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, withRouter } from 'react-router-dom';
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import avt from '../assets/images/avatar/avata_profile.jpg'
import bg1 from '../assets/images/backgroup-secsion/option1_bg_profile.jpg'
import bg2 from '../assets/images/backgroup-secsion/option2_bg_profile.jpg'
import yann from "../assets/images/avatar/yann.jpg"
import db from '../firebase';
import storage from '../storage';
import { ref, onValue, get, update, set, child } from "firebase/database";
import { useAddress, useContract, useOwnedNFTs, useConnectedWallet } from "@thirdweb-dev/react";
import { useAccount } from 'wagmi'
import Swal from 'sweetalert2';
import { ref as SRef, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import CreateModal from '../components/layouts/createModal';

const Profile = () => {


    const nav = useNavigate();

    const [createModalShow, setCreateModalShow] = useState(false);

    const [displayName, setDisplayName] = useState('');
    const [facebookLink, setFacbookLink] = useState('');
    const [discordLink, setDiscordLink] = useState('');
    const [twitterLink, setTwitterLink] = useState('');
    const [pdpLink, setPdpLink] = useState('');
    const [coverLink, setCoverLink] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userBio, setUserBio] = useState('');
    const [userFollowers, setUserFollowers] = useState('0');
    const [userFollowing, setUserFollowing] = useState('0');
    const [accountType, setAccountType] = useState('');
    const { address, isConnected } = useAccount();




    async function getUserData(adr) {
        const ThisUserRef = ref(db, 'users/' + address);
        await get(ThisUserRef).then(async (snapshot) => {
            let dt = snapshot.val();
            console.log(dt)
            setDisplayName(dt.displayName);
            setUserEmail(dt.email);
            setUserBio(dt.bio);
            setPdpLink(dt.pdpLink);
            setCoverLink(dt.cover_link);
            setFacbookLink(dt.Facebook);
            setTwitterLink(dt.Twitter);
            setDiscordLink(dt.Discord);
            setAccountType(dt.accountType);
            let following = Object.entries(dt.followedArtists).length + Object.entries(dt.following).length;
            let followers = Object.entries(dt.followers).length;
            setUserFollowers(followers - 1);
            setUserFollowing(following - 2);

            document.getElementById('pdp').style.backgroundImage = dt.pdpLink;

        })
    }


    useEffect(() => {
        getUserData(address);
    }, [])

    const { contract } = useContract("0xa6F0F91BF6e9bEdF044C3e989C6cB2e0376b40fC", "nft-collection");
    const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);

    async function becomeArtist() {
        await update(ref(db, 'users/' + address), {
            'accountType': 'artist',
            'creator': "pending",
        });
        
        setAccountType('artist');
        window.open('//forms.gle/dVamYz7mYkfz7EaW7', '_blank')
        Swal.fire({
            icon: "success",
            title: "Gongratulations !",
            text: "You are now part of the Artrise artists community. You can start creating your own collections and minting artworks.",
            confirmButtonText: "Let\'s go !"
        });
    }



    return (
        <div>
            <HeaderStyle2 />

            <div className="tf-create-item tf-section">
                <div className="themesflat-container">

                    <div className="row profilePadding ">
                        <div className='row userCoverSection' id='userCover' style={{ backgroundImage: `url(${coverLink})` }}></div>
                        <div className="col-md-12 col-lg-12 col-sm-12 col-12 profileInfoSection">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                    <div className="pdpSpace" id='pdp'>
                                        <img src={pdpLink} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-6 col6 userNameSpace">
                                    <h4 className='userNameTitle'>
                                        {displayName}
                                    </h4>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-1 col-md-1 col-sm-6 col6 userNameSpace">
                                    <h5 className='userAddress'>
                                        {
                                            address ? (address.toString().substring(0, 5) + "..." + address.toString().slice(-3)) : ("....")
                                        }
                                    </h5>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-6 col6 userNameSpace">
                                    <Link to={'/edit-profile'}><div className="tag">Edit profile</div></Link>
                                    {
                                        accountType == "user" ? (<Link to={'/edit-profile'} onClick={(e) => { e.preventDefault(); becomeArtist(); }}><div className="tag">Become an artist</div></Link>) : accountType == "pending_artist" ? (<Link to={'/profile'}><div className="tag">Pending ...</div></Link>) : ('')
                                    }
                                    {
                                        accountType == "artist" ? (<Link to={'/'} onClick={(e) => { e.preventDefault(); setCreateModalShow(true); }}><div className="tag">Start creating</div></Link>) : ('')
                                    }

                                </div>

                            </div>
                            <div className="row followers">
                                <div className="col-lg-1 col-md-1 col-sm-6 col6 userNameSpace">
                                    <h5>Followers</h5>
                                </div>
                                <div className="col-lg-1 col-md-1 col-sm-6 col6 userNameSpace">
                                    <h5>Following</h5>
                                </div>
                            </div>
                            <div className="row followersData">
                                <div className="col-lg-1 col-md-1 col-sm-6 col6 userNameSpace">
                                    <h5>{userFollowers}</h5>
                                </div>
                                <div className="col-lg-1 col-md-1 col-sm-6 col6 userNameSpace">
                                    <h5>{userFollowing}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="row tagLinksBar">
                                        <div className="col-12">

                                            <div className='tagLink tagLinkSelected'>
                                                My artworks
                                            </div>
                                            <Link to={'/likedItems'}>
                                                <div className='tagLink'>
                                                    Liked items
                                                </div>
                                            </Link>
                                            {
                                                accountType == "artist" ? (<div className='tagLink'>
                                                    My collections
                                                </div>) : ("")
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            !isLoading && ownedNFTs ? (
                                ownedNFTs.map((nft) => {
                                    if (nft.metadata.id != 0) {
                                        return (
                                            <div key={nft.metadata.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                                <div className={`sc-card-product`}>
                                                    <div className="card-media">
                                                        <img src={nft.metadata.image} alt="" />
                                                        <Link to="/login" className="wishlist-button heart" hidden><span className="number-like">10</span></Link>
                                                        <div className="coming-soon" hidden>10</div>
                                                    </div>
                                                    <div className="card-title">
                                                        <h5 className="style2">{nft.metadata.name}</h5>

                                                    </div>
                                                    <div className="card-bottom">
                                                        <Link to={'/'} className="buyNowBtn">
                                                            <button className="sc-button style bag fl-button pri-3 no-bg"><span>List this NFT</span></button>
                                                        </Link>


                                                    </div>


                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            ) : !isLoading && !ownedNFTs(
                                <div>
                                    <div className='noArtworks'>
                                        <img src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif" alt="" />
                                    </div>
                                    <div className='row sorry'>
                                        <div className="col-12">
                                            <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                                Sorry, We Couldn’t Find Any Artworks that you own.
                                            </h2>
                                            <h5 className="sub-title help-center mg-bt-32 ">
                                                The content of this page will updated as soon as you purchase one or more <br /> of our unique and amazing artworks.
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>


                </div>
            </div>
            <CreateModal
                show={createModalShow}
                onHide={() => setCreateModalShow(false)}
            />
            <Footer />

        </div>
    );
}

export default Profile;
