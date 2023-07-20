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

const Home01 = () => {

    const nav = useNavigate();


    

    /*useEffect(() => {
        async function getListings() {
            try {
                console.log(listings);
            } catch (error) {
                console.log(error);
            }
        }
        getListings();
    });*/

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

    /*
    return (
        <div className='home-1'>
            <HeaderStyle2 />
            <Slider data={heroSliderData} />
            <TodayPicks data={todayPickData} />
            <LiveAuction data={liveAuctionData} />
            <PopularCollection data={popularCollectionData} />
            <SeperatingHeader1/>
            <TopSeller data={topSellerData} />
            
            <Create />
            <Footer />
        </div>
    ); 
    */
}

export default Home01;
