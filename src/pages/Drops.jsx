import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Link, useNavigate , withRouter } from 'react-router-dom';
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import heroSliderData from '../assets/fake-data/data-slider';
import Slider from '../components/slider/Slider';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import liveAuctionData2 from '../assets/fake-data/data-live-auction-2';
import LiveAuction from '../components/layouts/LiveAuction';
import LiveAuction2 from '../components/layouts/LiveAuction2';
import TopSeller from '../components/layouts/TopSeller';
import topSellerData from '../assets/fake-data/data-top-seller'
import TodayPicks from '../components/layouts/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';
import PopularCollection from '../components/layouts/PopularCollection';
import popularCollectionData from '../assets/fake-data/data-popular-collection';
import Create from '../components/layouts/Create';
import SeperatingHeader1 from '../components/layouts/SeperatingHeader1';
import SeperatingHeader2 from '../components/layouts/SeperatingHeader2';
import ComingSoon from '../components/layouts/ComingSoon';
import ComingSoonData from '../assets/fake-data/comingSoonData';

import { useContract, useMarketplace, useListings } from "@thirdweb-dev/react";

const Drops = () => {

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

    const selectedTags = [];

    function editTags(val, target){
        if(selectedTags.includes(val)){
            selectedTags.pop(val);
            target.classList.remove('selectedTag');
            target.classList.add('tag');
        }else{
            selectedTags.push(val);
            target.classList.remove('tag');
            target.classList.add('selectedTag');
        }
    
        console.log(selectedTags);
    }

    return (
        <div className='home-1'>
            <HeaderStyle2 />
            <section className="tf-section our-creater dark-style2">
                <div className="themesflat-container"
                style={{
                    paddingLeft: "1%",
                    paddingRight: "1%",
                    marginLeft: "0px",
                    marginRight: "0px",
                    width: "100%"
                }}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="tf-title style4 mg-bt-38 dropsPageTitle">
                                Drops</h2>
                        </div>
                        <div className="col-md-12 col-sm-12 mobileTags">
                        <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="painter">
                                        Painter
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="photographer">
                                        Photographer
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="sculpturer">
                                        Sculpturer
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="ceramic_artist">
                                        Ceramic artist
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="others">
                                        Others
                                    </div>
                        </div>
                        <div className="col-12">
                            <div className="row tagsBar">
                                <div className="col-12">
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="sculpturer">
                                        Sculptors
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="painter">
                                        Painters
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="photographer">
                                        Photographers
                                    </div>
                                    
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="others">
                                        Others
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <LiveAuction2 data={liveAuctionData2} />
                        </div>
                        <div className="col-md-12">
                            <LiveAuction data={liveAuctionData} />
                        </div>
                        <div className="col-md-12">
                        <ComingSoon data={ComingSoonData} />
                        </div>
                        
                    </div>
                </div>
            </section>
            
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

export default Drops;
