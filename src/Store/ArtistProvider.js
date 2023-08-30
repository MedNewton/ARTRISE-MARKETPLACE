import React, {useState, useEffect} from 'react';
import {get, ref} from "firebase/database";
import db from "../firebase";

import {ArtistContext} from './ArtistContext';

export const ArtistProvider = ({children}) => {
    const [artists, setArtists] = useState([]);

    async function fetchArtists() {
        const artistsRef = ref(db, 'artists/');
        await get(artistsRef).then(async (snapshot) => {
            let dt = snapshot.val();
            for (let artistKey in dt) {
                let a = dt[artistKey];
                if (a.name != "Armin Simon") {
                    let artist = {
                        "name": a.name,
                        "type": a.artistType,
                        "pdpLink": a.pdpLink,
                        "img1": a.img1,
                        "img2": a.img2,
                        "img3": a.img3,
                        "img4": a.img4,
                        "slug": a.slug
                    }

                    setArtists(current => [...current, artist]);
                }
            }
        })
    }

    useEffect(() => {
        fetchArtists();
    }, []);

    return (
        <ArtistContext.Provider value={{artists}}>
            {children}
        </ArtistContext.Provider>
    );
};
