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
import {ref, onValue, get, update, set, child} from "firebase/database";
import { ConnectWallet, useAddress, useContract, useNFTs, useOwnedNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";

import { ref as SRef , getDownloadURL, uploadBytesResumable } from "firebase/storage";


const MyArtworks = () => {

    const nav = useNavigate();
    
    const address = useAddress();


    const {contract} = useContract("0xa6F0F91BF6e9bEdF044C3e989C6cB2e0376b40fC", "nft-collection");
    const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);


    console.log(ownedNFTs);

    return (
        <div>
            <HeaderStyle2 />
            
            <div className="tf-create-item tf-section">
                <div className="themesflat-container">
                
                    <div className="row profilePadding ">
                    <div className='row profileBar'>
                            <div className='col-6'>
                                <Link to={'/edit-profile'}>
                                    <button className='btn btn-lg tf-button-submit mg-t-15 profileBarBtn'>
                                        <p className='btnText'>General Info</p>
                                    </button>
                                </Link>
                                

                            </div>
                            <div className='col-6'>
                                <Link to={'/referral-program'}>
                                    <button className='btn btn-lg tf-button-submit mg-t-15 profileBarBtn'>
                                        <p className='btnText'>Referral program</p>
                                    </button>
                                </Link>
                                
                            </div>
                        </div>
                        {
                            !isLoading && ownedNFTs ? (
                                ownedNFTs.map((nft)=> {
                                    if(nft.metadata.id != 0){
                                        return(
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
                            ) : !isLoading && !ownedNFTs (
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
            <Footer />

        </div>
    );
}

export default MyArtworks;
