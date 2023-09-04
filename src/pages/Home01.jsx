import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Link, useNavigate , withRouter } from 'react-router-dom';
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import heroSliderData from '../assets/fake-data/data-slider';
import Slider from '../components/slider/Slider';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import liveAuctionData2 from '../assets/fake-data/data-live-auction-2';
import ComingSoonData from '../assets/fake-data/comingSoonData';
import LiveAuction from '../components/layouts/LiveAuction';
import LiveAuction2 from '../components/layouts/LiveAuction2';
import ComingSoon from '../components/layouts/ComingSoon';
import TopSeller from '../components/layouts/TopSeller';
import topSellerData from '../assets/fake-data/data-top-seller'
import TodayPicks from '../components/layouts/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';
import PopularCollection from '../components/layouts/PopularCollection';
import popularCollectionData from '../assets/fake-data/data-popular-collection';
import Create from '../components/layouts/Create';
import SeperatingHeader1 from '../components/layouts/SeperatingHeader1';
import SeperatingHeader2 from '../components/layouts/SeperatingHeader2';

import { useContract, useMarketplace, useListings } from "@thirdweb-dev/react";
import {ref, update} from "firebase/database";
import db from "../firebase";
import {useAccount} from "wagmi";


const Home01 = () => {

    const nav = useNavigate();
    const { address, isConnected } = useAccount();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            fetchUserProfile(code);
        }
    }, []);

    const fetchUserProfile = async (code) => {
        const url = 'https://api.instagram.com/oauth/access_token';
        const clientId = 276266121931752; // instagram app id
        const clientSecret = 'b5bdd5a389495eb95d172aa76cdc2928';
        const redirectUri = 'https://marketplace.artrise.io/';
        const formData = new URLSearchParams();
        formData.append('client_id', clientId);
        formData.append('client_secret', clientSecret);
        formData.append('grant_type', 'authorization_code');
        formData.append('redirect_uri', redirectUri);
        formData.append('code', code);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        })
            .then(response => response.json())
            .then(data => {
                fetchUserProfileInfo(data.access_token);
            })
            .catch(error => {
                console.error('error:', error);
            });

    };

    const fetchUserProfileInfo = async (accessToken) => {
        try {
        const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
        const data = await response.json();
        if (data.username) {
            const userProfileLink = `https://www.instagram.com/${data.username}`;
            const userKey = address ? address : localStorage.getItem("UserKey");
            await update(ref(db, "users/" + userKey), {
                Instagram: userProfileLink,
            });
            window.close();
        }
            return null;
        } catch (error) {
            window.close();
            return null;
        }
    };

    useEffect(() => {
        async function getUserInfo()
        {
            let userKey = localStorage.getItem('UserKey');
            if(userKey && (userKey !== "") && (userKey !== " "))
            {
                let userName = localStorage.getItem('name');
                let UserPdpLink = localStorage.getItem('pdpLink');
            }
        }
        getUserInfo();
        
    }, []);

    // Impact : 
    useEffect(() => {
        window.ire('identify', { customerId: localStorage.getItem('UserKey') });
      }, []);

    return (
        <div className='home-1'>
            <HeaderStyle2 />
            <Slider data={heroSliderData} />
            <TodayPicks data={todayPickData} />
            <LiveAuction data={liveAuctionData} />
            <LiveAuction2 data={liveAuctionData2} />
            <ComingSoon data={ComingSoonData} />
            <SeperatingHeader1/>
            <div className='btnDiv'>
                <Link to={'//forms.gle/dVamYz7mYkfz7EaW7'}>
                    <button className='artistButton'>Artist Application</button>
                </Link>
                
            </div>
            
            <Create />
            <Footer />
        </div>
    );
}

export default Home01;
