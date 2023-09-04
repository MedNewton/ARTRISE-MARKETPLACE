import React, {useState, useEffect} from 'react';
import {get, ref} from "firebase/database";
import db from "../firebase";

import {ProfileContext} from './ProfileContext';
import {useAccount} from "wagmi";
import axios from "axios";

class LazyNFT {
    constructor(i, d, l) {
        this.id = i;
        this.data = d;
        this.listable = l;
    }
}

export const ProfileProvider = ({children}) => {
    const [profileData, setProfileData] = useState();
    const [lazyOwned, setLazyOwned] = useState([]);
    const {address, isConnected} = useAccount();

    async function getUserData(adr) {
        const ThisUserRef = ref(db, "users/" + adr);
        await get(ThisUserRef).then(async (snapshot) => {
            let dt = snapshot.val();
            setProfileData(dt);
        });
    }

    async function getLazyOwned(adr) {
        const artworksRef = ref(db, "artworks/");
        await get(artworksRef).then(async (snapshot) => {
            let dt = snapshot.val();
            for (let i in dt) {
                let lazyArtwork = dt[i];
                let listable = false;
                if (lazyArtwork.listed === "no") listable = true;
                if (lazyArtwork.owner === adr && lazyArtwork.type === "lazyMinted") {

                    console.log(lazyArtwork.ipfsURI);
                    try {
                        let res = await axios.get(lazyArtwork.ipfsURI);
                        let lazyNFT = new LazyNFT(i, res.data, listable);
                        setLazyOwned((prevState) => [...prevState, lazyNFT]);
                    } catch (error) {
                        console.log("error")
                    }
                }
            }
        });
    }


    useEffect(() => {
        if (address) {
            getUserData(address);
            getLazyOwned(address);
        } else {
            if (
                localStorage.getItem("twitter") ||
                localStorage.getItem("google") ||
                localStorage.getItem("facebook")
            ) {
                getUserData(localStorage.getItem("UserKey").toString());
            }
        }
    }, []);

    return (
        <ProfileContext.Provider value={{profileData, lazyOwned}}>
            {children}
        </ProfileContext.Provider>
    );
};
