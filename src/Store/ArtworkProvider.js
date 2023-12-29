import React, {useState, useEffect} from 'react';
import {get, ref} from "firebase/database";
import db from "../firebase";
import {ArtworkContext} from './ArtworkContext';

class LazyNFTListing {
    constructor(i, d, p, on, oi, oid, ai,) {
        this.id = i;
        this.data = d;
        this.price = p;
        this.ownerName = on;
        this.ownerImage = oi;
        this.ownerId = oid;
        this.artworkId = ai;
    }
}

export const ArtworkProvider = ({children}) => {
    const [lazyListed, setLazyListed] = useState([]);
    const [userArtist, setUserArtist] = useState([]);

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
                        let artworkOwner = artwork.owner;
                        let ownerRef = ref(db, "users/" + artworkOwner);
                        await get(ownerRef).then(async (snapshot) => {
                            let owner = snapshot.val();
                            let ownerName = owner.displayName;
                            let ownerImage = owner.pdpLink;
                            let ownerType = owner.artistType;
                            let ownerSlug = owner.slug;
                            let ownerId = artworkOwner;
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
                                        ownerId,
                                        listingArtworkId
                                    );

                                    if (!usersData[ownerName]) {
                                        usersData[ownerName] = {
                                            userId: artworkOwner,
                                            name: owner?.name,
                                            bio: owner?.bio,
                                            pdpLink: owner?.pdpLink,
                                            cover_link: owner?.cover_link,
                                            Facebook: owner?.Facebook,
                                            Instagram: owner?.Instagram,
                                            Twitter:owner?.Twitter,
                                            website: owner?.website,
                                            artistType:owner?.artistType,
                                            followedArtists: owner?.followedArtists,
                                            followedCollections: owner?.followedCollections,
                                            followers:owner?.followers,
                                            following:owner?.following,
                                            slug: owner?.slug,
                                            verified: owner?.verified,
                                            artworks: [{img: data.image, listingId: i}]
                                        };
                                    } else {
                                        usersData[ownerName].artworks.push({img: data.image, listingId: i});
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
            setUserArtist(usersArray);
        });
    }

    useEffect(() => {
        fetchLazyOwned();
    }, []);

    return (
        <ArtworkContext.Provider value={{lazyListed, userArtist}}>
            {children}
        </ArtworkContext.Provider>
    );
};
