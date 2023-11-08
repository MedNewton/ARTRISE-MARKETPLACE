import React, { useState, useEffect, useReducer } from 'react';
import { get, ref } from 'firebase/database';
import db from '../firebase';
import { ProfileContext } from './ProfileContext';
import { useAccount } from 'wagmi';
import axios from 'axios';
import useLocalStorageUserKeyChange from '../hooks/useLocalStorageUserKeyChange';


class LazyNFT {
    constructor(i, d, l) {
        this.id = i;
        this.data = d;
        this.listable = l;
    }
}
// Define an initial state object
const initialState = {
    profileData: null,
    lazyOwned: [],
};

// Define a reducer function to handle state updates
function profileReducer(state, action) {
    switch (action.type) {
        case 'SET_PROFILE_DATA':
            return { ...state, profileData: action.payload };
        case 'ADD_LAZY_OWNED':
            return { ...state, lazyOwned: [...state.lazyOwned, action.payload] };
        default:
            return state;
    }
}

export const ProfileProvider = ({children}) => {
    const [state, dispatch] = useReducer(profileReducer, initialState);
    // const { address, isConnected } = useAccount();


    async function getUserData(adr) {
        const ThisUserRef = ref(db, 'users/' + adr);
        await get(ThisUserRef).then(async (snapshot) => {
            let dt = snapshot.val();
            dispatch({ type: 'SET_PROFILE_DATA', payload: dt });
        });
    }

    async function getLazyOwned(adr) {
        const artworksRef = ref(db, 'artworks/');
        await get(artworksRef).then(async (snapshot) => {
            let dt = snapshot.val();
            for (let i in dt) {
                let lazyArtwork = dt[i];
                let listable = false;
                if (lazyArtwork.listed === 'no') listable = true;
                if (lazyArtwork.owner === adr && lazyArtwork.type === 'lazyMinted') {
                    console.log(lazyArtwork.ipfsURI);
                    try {
                        let res = await axios.get(lazyArtwork.ipfsURI);
                        let lazyNFT = new LazyNFT(i, res.data, listable);
                        dispatch({ type: 'ADD_LAZY_OWNED', payload: lazyNFT });
                    } catch (error) {
                        console.log('error');
                    }
                }
            }
        });
    }

    // Use the custom hook to listen for changes in local storage
    useLocalStorageUserKeyChange('UserKey', (newValue) => {
        if (newValue) {
            getUserData(newValue);
            getLazyOwned(newValue);
        }
    });


    useEffect(() => {
        let address = localStorage.getItem("walletAddress");
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
        <ProfileContext.Provider value={state}>
            {children}
        </ProfileContext.Provider>
    );
};
