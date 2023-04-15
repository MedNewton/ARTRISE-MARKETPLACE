import React , { useRef , useState , useEffect } from 'react';
import { Link, useNavigate , withRouter } from 'react-router-dom';
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import avt from '../assets/images/avatar/avata_profile.jpg'
import bg1 from '../assets/images/backgroup-secsion/option1_bg_profile.jpg'
import bg2 from '../assets/images/backgroup-secsion/option2_bg_profile.jpg'
import yann from "../assets/images/avatar/yann.jpg"
import db from '../firebase';
import storage from '../storage';
import { Accordion } from 'react-bootstrap-accordion'
import {ref, onValue, get, update, set, child} from "firebase/database";
import { ConnectWallet, useAddress, useContract, useNFTs, useOwnedNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";

import { ref as SRef , getDownloadURL, uploadBytesResumable } from "firebase/storage";



const Referral = () => {

    const [data] = useState(
        [
            {   key: "0",
                show: "show",
                title: 'Up to 10 invitee',
                text: 'Inviter gets 15% on every invitee purchase, invitee gets 3% off on first sale.'
            },
            {
                key: "1",
                title: 'Up to 50 invitee',
                text: 'Inviter gets 20% on every invitee purchase, invitee gets 5% off on first sale.'
            },
            {
                key: "2",
                title: 'Up to 100 invitee',
                text: 'Inviter gets 25% on every invitee purchase, invitee gets 7% off on first sale.'
            },
            {
                key: "3",
                title: 'More than 100 invitee',
                text: 'Inviter gets 30% on every invitee purchase, invitee gets 10% off on first sale.'
            },
        ]
    )

    const [data2] = useState(
        [
            {   key: "0",
                show: "show",
                title: 'Artists',
                text: 'Whenever an artists gets referred by another artist, and is fully integrated on Artrise, each one of them gets a free artwork tokenization.'
            },
            {
                key: "1",
                title: 'Influencers',
                text: 'Every influencer can promote Artrise and its artworks on social media or any other bias, and get 10% of the affiliate sale as a reward.'
            },
        ]
    )

    const nav = useNavigate();

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
    
    const address = useAddress();

    async function getUserData(adr){
        const ThisUserRef = ref(db, 'users/'+adr); 
        await get(ThisUserRef).then(async (snapshot) => {
            let dt = snapshot.val();
            setDisplayName(dt.displayName);
            setUserEmail(dt.email);
            setUserBio(dt.bio);
            setPdpLink(dt.pdpLink);
            setCoverLink(dt.cover_link);
            setFacbookLink(dt.Facebook);
            setTwitterLink(dt.Twitter);
            setDiscordLink(dt.Discord);
            let following = Object.entries(dt.followedArtists).length + Object.entries(dt.following).length;
            let followers = Object.entries(dt.followers).length;
            setUserFollowers(followers-1);
            setUserFollowing(following-2);
            
            document.getElementById('pdp').style.backgroundImage = dt.pdpLink;
            console.log(dt.pdpLink);
        })
    }


    useEffect(() => {
        getUserData(address);
    }, [])

    const {contract} = useContract("0xa6F0F91BF6e9bEdF044C3e989C6cB2e0376b40fC", "nft-collection");
    const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);


    

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
                                    {address.toString().substring(0,5) + "..." + address.toString().slice(-3)}
                                </h5>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col6 userNameSpace">
                                <div className="tag">Edit profile</div>
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
                                        <Link to={'/profile'}>
                                            <div className='tagLink '>
                                                My artworks
                                            </div>
                                        </Link>
                                        <Link to={'/likedItems'}>
                                            <div className='tagLink'>
                                                Liked items
                                            </div>
                                        </Link>
                                        
                                        <div className='tagLink tagLinkSelected'>
                                            Referral program
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                        
                    </div>

                    <div className="row referralPadding">
                        <h3>Referral program:</h3>
                        
                    </div>
                    <div className="row referralPadding">
                        <p className='referralText'>Artrise users can have a new source of earning simply by inviting their friends to join our platform.</p>
                    </div>
                    <div className="row referralPadding">
                        <p className='referralText'>Artrise referral program offers rewards to inviter for every NFT sold in the store that is registered from the inviter's referral link, for up to 6 months. The more artists and friends you refer, the more you can earn. What's even better is that both you and your friends can earn the reward. Everybody wins!</p>
                    </div>
                    <div className="row referralPadding">
                        <p className='referralText'>Detailed reward rules are simple as follows:</p>
                    </div>

                        <div className="row referralAccordion">
                            <div className="col-md-12">
                                <div className="flat-accordion2">
                                    {
                                        data.map((item,index) => (
                                            <Accordion key={index} title={item.title} >
                                                <p>{item.text}</p>
                                            </Accordion>
                                        ))
                                    }                             
                                </div>
                            </div>
                        </div>

                        <div className="row referralPadding">
                            <p className='referralText'>Artists & influencers have a special referral program:</p>
                        </div>

                        <div className="row referralAccordion">
                            <div className="col-md-12">
                                <div className="flat-accordion2">
                                    {
                                        data2.map((item,index) => (
                                            <Accordion key={index} title={item.title} >
                                                <p>{item.text}</p>
                                            </Accordion>
                                        ))
                                    }                             
                                </div>
                            </div>
                        </div>
               
                    
                </div>
            </div>
            <Footer />

        </div>
    );
}

export default Referral;
