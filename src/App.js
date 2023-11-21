import './App.css';
import {Routes, Route} from 'react-router-dom';
import routes from './pages/index'
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {get, ref} from "firebase/database";
import db from "./firebase";
import {
    setAllUsers,
    setArtists,
    setCurrentUser, setCurrentUserId,
    setLazyListed,
    setLazyOwned,
    setMembers
} from "./redux/actions/userActions";
import axios from "axios";

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

class LazyNFT {
    constructor(i, d, l) {
        this.id = i;
        this.data = d;
        this.listable = l;
    }
}

function App() {
    const currentUserId = useSelector((state) => state.usersReducer.currentUserId);
    let members = [];
    let artists = [];
    let allUsers = [];
    let lazyListed = [];
    let lazyOwned = [];
    const dispatch = useDispatch();

    function fetchUsers() {
        const userRef = ref(db, 'users/');
        get(userRef).then(async (snapshot) => {
            let dt = snapshot.val();
            for (let userId in dt) {
                let a = dt[userId];
                if (a?.socialMediaVerified && a?.profileType === "artist") {
                    let artistItem = {
                        userId: userId,
                        ...a
                    }
                    artists.push(artistItem);
                } else if (!a?.socialMediaVerified) {
                    let memberItem = {
                        userId: userId,
                        ...a
                    }
                    members.push(memberItem);
                }
                let userItem = {
                    userId: userId,
                    ...a
                }
                allUsers.push(userItem)
            }

            dispatch(setAllUsers({allUsers}));
            dispatch(setMembers({members}));
            dispatch(setArtists({artists}));
        })
    }

    function fetchLazyListed() {
        const listingsRef = ref(db, "listings/");
        get(listingsRef).then(async (snapshot) => {
            let dt = snapshot?.val();
            for (let i in dt) {
                let listing = dt[i];
                let listingArtworkId = listing?.artwork_id;
                let price = listing?.price;
                let artworkRef = ref(db, "artworks/" + listingArtworkId);
                await get(artworkRef).then(async (snapshot) => {
                    let artwork = snapshot?.val();
                    let ipfsURI = artwork?.ipfsURI;
                    let artworkOwner = artwork?.owner;
                    let ownerRef = ref(db, "users/" + artworkOwner);
                    await get(ownerRef).then(async (snapshot) => {
                        let owner = snapshot?.val();
                        let ownerName = owner?.name;
                        let ownerImage = owner?.pdpLink;
                        try {
                            const response = await fetch(ipfsURI);
                            if (response?.ok) {
                                const data = await response?.json();
                                const lazyNFT = new LazyNFTListing(
                                    i,
                                    data,
                                    price,
                                    ownerName,
                                    ownerImage,
                                    artworkOwner,
                                    listingArtworkId
                                );
                                lazyListed.push(lazyNFT);
                            } else {
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    });
                });
            }
            dispatch(setLazyListed({lazyListed}));
        });
    }

    async function fetchCurrentUser() {
        if (currentUserId) {
            const ThisUserRef = ref(db, 'users/' + currentUserId);
            await get(ThisUserRef).then(async (snapshot) => {
                let currentUser = snapshot.val();
                dispatch(setCurrentUser({currentUser}));
            });
        }
    }

    async function fetchLazyOwned() {
        if (currentUserId) {
            const artworksRef = ref(db, 'artworks/');
            await get(artworksRef).then(async (snapshot) => {
                let dt = snapshot.val();
                for (let i in dt) {
                    let lazyArtwork = dt[i];
                    let listable = !lazyArtwork?.listed;
                    if (lazyArtwork.owner === currentUserId) {
                        console.log(lazyArtwork.ipfsURI);
                        try {
                            let res = await axios.get(lazyArtwork.ipfsURI);
                            let lazyNFT = new LazyNFT(i, res.data, listable);
                            lazyOwned.push(lazyNFT);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
                dispatch(setLazyOwned({lazyOwned}));
            });
        }
    }

    useEffect(() => {
        let currentUserId = localStorage.getItem("userId")
        dispatch(setCurrentUserId({currentUserId}));
        if (currentUserId) {
            fetchCurrentUser();
            fetchLazyOwned();
        }
    }, [currentUserId]);

    useEffect(() => {
        async function changeTitle() {
            document.title = "Artrise - Physical NFTs Marketplace";
        }

        changeTitle();
        fetchUsers();
        fetchLazyListed();
    }, [])
    return (
        <Routes>
            {
                routes.map((data, index) => (
                    <Route onUpdate={() => window.scrollTo(0, 0)} exact={true} path={data.path} element={data.component}
                           key={index}/>
                ))
            }
        </Routes>
    );
}

export default App;
