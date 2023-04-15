import React , { useRef , useState , useEffect } from 'react';
import { Link, useNavigate , withRouter } from 'react-router-dom';


import avt from '../../assets/images/avatar/avata_profile.jpg'
import bg1 from '../../assets/images/backgroup-secsion/option1_bg_profile.jpg'
import bg2 from '../../assets/images/backgroup-secsion/option2_bg_profile.jpg'
import {ref, onValue, get, update, set, child} from "firebase/database";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import { ref as SRef , getDownloadURL, uploadBytesResumable } from "firebase/storage";
import LiveAuction from './LiveAuction';
import LiveAuction2 from './LiveAuction2';
import liveAuctionData from '../../assets/fake-data/data-live-auction';
import liveAuctionData2 from '../../assets/fake-data/data-live-auction-2';

const DropsRaw = () => {

    const nav = useNavigate();


    
    const address = useAddress();
    
    
    

    

    return (
        <div className='dropsRawContainer'>
            <LiveAuction data={liveAuctionData} />
            <div className='dropsSeparator'></div>
            <LiveAuction2 data={liveAuctionData2} />
        </div>
    );
}

export default DropsRaw;
