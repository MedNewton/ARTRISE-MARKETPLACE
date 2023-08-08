import React, { createContext, useContext, useState, useEffect } from 'react';
import {get, ref} from "firebase/database";
import db from "../firebase";

const ArtworkContext = createContext();

export const useArtworkContext = () => useContext(ArtworkContext);

class LazyNFTListing {
    constructor(i, d, p, on, oi, ai) {
        this.id = i;
        this.data = d;
        this.price = p;
        this.ownerName = on;
        this.ownerImage = oi;
        this.artworkId = ai;
    }
}

export const ArtworkProvider = ({ children }) => {
    const [artists, setArtists] = useState([]);
    const [lazyListed, setLazyListed] = useState([]);
    const [users, setUsers] = useState([]);

    async function fetchLazyOwned() {
        const listingsRef = ref(db, "listings/");
        await get(listingsRef).then(async (snapshot) => {
            let dt = snapshot.val();
            const usersData = {}; // Use an object to collect user data with their artworks

            let index = 0;
            for (let i in dt) {
                index = index + 1;
                let listing = dt[i];
                if (i > 27) {
                    let listingArtworkId = listing.artwork_id;
                    let price = listing.price;
                    let artworkRef = ref(db, "artworks/" + listingArtworkId);
                    await get(artworkRef).then(async (snapshot) => {
                        let artwork = snapshot.val();
                        let ipfsURI = artwork.ipfsURI;
                        let owner = artwork.owner;
                        let ownerRef = ref(db, "users/" + owner);
                        await get(ownerRef).then(async (snapshot) => {
                            let owner = snapshot.val();
                            let ownerName = owner.displayName;
                            let ownerImage = owner.pdpLink;
                            let ownerType = owner.artistType;
                            let ownerSlug = owner.slug;
                            try {
                                const response = await fetch(ipfsURI);
                                if (response.ok) {
                                    const data = await response.json();
                                    const lazyNFT = new LazyNFTListing(
                                        i,
                                        data,
                                        price,
                                        ownerName,
                                        ownerImage,
                                        listingArtworkId
                                    );

                                    if (!usersData[ownerName]) {
                                        usersData[ownerName] = {
                                            name: owner.name,
                                            pdpLink: owner.pdpLink,
                                            slug: owner.slug,
                                            type: owner.type,

                                            artworks: [{ img: data.image, listingId: i }]
                                        };
                                    } else {
                                        usersData[ownerName].artworks.push({ img: data.image, listingId: i });
                                    }

                                    setLazyListed((prevState) => [...prevState, lazyNFT]);
                                } else {
                                    console.log('Network response was not ok');
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        });
                    });
                }
            }
            // Convert the usersData object into an array and set the state
            const usersArray = Object.values(usersData);
            setUsers(usersArray);
        });
    }

    async function fetchArtists(){
        let ARTISTS = [];
        const artistsRef = ref(db, 'artists/');
        await get(artistsRef).then(async(snapshot) => {
            let dt = snapshot.val();
            for(let artistKey in dt){
                let a = dt[artistKey];
                if(a.name != "Armin Simon"){
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

                    setArtists(current=>[...current, artist]);
                }

            }
        })
    }

    useEffect(() => {
        fetchArtists();
        fetchLazyOwned();
    }, []);

    return (
        <ArtworkContext.Provider value={{ artists, lazyListed, users }}>
            {children}
        </ArtworkContext.Provider>
    );
};
