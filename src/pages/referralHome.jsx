import React , { useRef , useState , useEffect } from 'react';
import { Link, useNavigate , withRouter } from 'react-router-dom';
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import avt from '../assets/images/avatar/avata_profile.jpg'
import bg1 from '../assets/images/backgroup-secsion/option1_bg_profile.jpg'
import bg2 from '../assets/images/backgroup-secsion/option2_bg_profile.jpg'
import db from '../firebase';
import storage from '../storage';
import {ref, onValue, get, update, set, child} from "firebase/database";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import { ref as SRef , getDownloadURL, uploadBytesResumable } from "firebase/storage";


const ReferralHome = () => {

    const nav = useNavigate();


    
    const address = useAddress();
    
    
    

    

    return (
        <div>
            <HeaderStyle2 />
            
            <div className="tf-create-item tf-section">
                <div className="themesflat-container">

                    <div className="row profilePadding">
                        
                        <div className='noreferral'>
                            <img src="https://i.pinimg.com/originals/3b/95/d8/3b95d8c378005109e60f93b00a244f59.gif" alt="" />
                        </div>
                        <div className='row sorry '>
                            <div className="col-12">
                                <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                Sorry, but the referral program will available very soon.
                                </h2>
                                <h5 className="sub-title help-center mg-bt-32 ">
                                    The content of this page will be available as soon as the referral program is ready to use.
                                </h5>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ReferralHome;
