import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, {useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get, ref } from 'firebase/database';
import axios from 'axios';
import db from './firebase';
import {
  setAllUsers,
  setArtists,
  setCollections,
  setCurrentUser,
  setCurrentUserId,
  setLazyListed,
  setLazyOwned,
  setMembers,
  setSearchingArray,
} from './redux/actions/userActions';
import routes from './pages';
import { LazyNFTListing } from './components/constants/LazyNFTListingClass';
import { LazyNFT } from './components/constants/LazyNFTClass';

function App() {
  const currentUserId = useSelector((state) => state.usersReducer.currentUserId);

  const members = [];
  const artists = [];
  const allUsers = [];
  const dispatch = useDispatch();

  function fetchUsers() {
    const userRef = ref(db, 'users/');
    get(userRef).then(async (snapshot) => {
      const dt = snapshot.val();
      Object.keys(dt).forEach((userId) => {
        const a = dt[userId];
        if (a?.socialMediaVerified && a?.profileType === 'artist') {
          const artistItem = {
            userId,
            ...a,
          };
          artists.push(artistItem);
        } else if (!a?.socialMediaVerified) {
          const memberItem = {
            userId,
            ...a,
          };
          members.push(memberItem);
        }
        const userItem = {
          userId,
          ...a,
        };
        allUsers.push(userItem);
      });

      dispatch(setAllUsers({ allUsers }));
      dispatch(setMembers({ members }));
      dispatch(setArtists({ artists }));
      if (allUsers) {
        const searchingArray = allUsers.map((userItem) => ({ name: userItem.name, id: userItem.userId, type: userItem?.profileType ? userItem?.profileType : 'member' }));
        dispatch(setSearchingArray({ searchingArray }));
      }
    });
  }

  // function fetchLazyListed() {
  //   const listingsRef = ref(db, 'listings/');
  //   get(listingsRef).then(async (snapshot) => {
  //     const dt = snapshot?.val();
  //
  //     // for (const i in dt) {
  //       Object.keys(dt).forEach((i) => {
  //         const listing = dt[i];
  //         const listingArtworkId = listing?.artwork_id;
  //         const price = listing?.price;
  //         const artworkRef = ref(db, `artworks/${listingArtworkId}`);
  //         get(artworkRef).then(async (snapshot) => {
  //           const artwork = snapshot?.val();
  //           const ipfsURI = artwork?.ipfsURI;
  //           const artworkOwner = artwork?.owner;
  //           const ownerRef = ref(db, `users/${artworkOwner}`);
  //           await get(ownerRef).then(async (snapshot) => {
  //             const owner = snapshot?.val();
  //             const ownerName = owner?.name;
  //             const ownerImage = owner?.pdpLink;
  //             try {
  //               const response = await fetch(ipfsURI);
  //               if (response?.ok) {
  //                 const data = await response?.json();
  //                 const lazyNFT = new LazyNFTListing(
  //                     i,
  //                     data,
  //                     price,
  //                     ownerName,
  //                     ownerImage,
  //                     artworkOwner,
  //                     listingArtworkId,
  //                 );
  //                 lazyListed.push(lazyNFT);
  //               } else {
  //                 console.error(response);
  //               }
  //             } catch (error) {
  //               console.error(error);
  //             }
  //           });
  //         });
  //       }
  //     dispatch(setLazyListed({ lazyListed }));
  //     if (lazyListed) {
  //       const searchingArray = lazyListed.map((artworkItem) => ({
  //         name: artworkItem?.data?.name,
  //         id: artworkItem?.artworkId,
  //         type: 'artwork',
  //       }));
  //       dispatch(setSearchingArray({ searchingArray }));
  //     }
  //   });
  // }

  async function fetchLazyListed() {
    const listingsRef = ref(db, 'listings/');
    try {
      const snapshot = await get(listingsRef);
      const dt = snapshot?.val();

      const promises = Object.keys(dt).map(async (i) => {
        const listing = dt[i];
        const listingArtworkId = listing?.artwork_id;
        const price = listing?.price;

        const artworkRef = ref(db, `artworks/${listingArtworkId}`);
        const artworkSnapshot = await get(artworkRef);
        const artwork = artworkSnapshot?.val();

        const ipfsURI = artwork?.ipfsURI;
        const artworkOwner = artwork?.owner;

        const ownerRef = ref(db, `users/${artworkOwner}`);
        const ownerSnapshot = await get(ownerRef);
        const owner = ownerSnapshot?.val();

        const ownerName = owner?.name;
        const ownerImage = owner?.pdpLink;

        try {
          const response = await fetch(ipfsURI);
          if (response?.ok) {
            const data = await response?.json();
            return new LazyNFTListing(
              i,
              data,
              price,
              ownerName,
              ownerImage,
              artworkOwner,
              listingArtworkId,
            );
          }
          console.error(response);
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      const lazyListed = await Promise.all(promises.filter(Boolean));
      dispatch(setLazyListed({ lazyListed }));

      if (lazyListed) {
        const searchingArray = lazyListed.map((artworkItem) => ({
          name: artworkItem?.data?.name,
          id: artworkItem?.artworkId,
          type: 'artwork',
        }));
        dispatch(setSearchingArray({ searchingArray }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCurrentUser() {
    if (currentUserId) {
      const ThisUserRef = ref(db, `users/${currentUserId}`);
      await get(ThisUserRef).then(async (snapshot) => {
        const currentUser = snapshot.val();
        dispatch(setCurrentUser({ currentUser }));
      });
    }
  }

  // async function fetchLazyOwned() {
  //   if (currentUserId) {
  //     const artworksRef = ref(db, 'artworks/');
  //     await get(artworksRef).then(async (snapshot) => {
  //       const dt = snapshot.val();
  //       for (const i in dt) {
  //         const lazyArtwork = dt[i];
  //         const listable = !lazyArtwork?.listed;
  //         if (lazyArtwork.owner === currentUserId) {
  //           try {
  //             const res = await axios.get(lazyArtwork.ipfsURI);
  //             const lazyNFT = new LazyNFT(i, res.data, listable);
  //             lazyOwned.push(lazyNFT);
  //           } catch (error) {
  //             console.error(error);
  //           }
  //         }
  //       }
  //       dispatch(setLazyOwned({ lazyOwned }));
  //     });
  //   }
  // }

  async function fetchLazyOwned() {
    if (!currentUserId) {
      return;
    }

    const artworksRef = ref(db, 'artworks/');
    try {
      const snapshot = await get(artworksRef);
      const dt = snapshot.val();

      const promises = Object.keys(dt).map(async (i) => {
        const lazyArtwork = dt[i];
        const listable = !lazyArtwork?.listed;

        if (lazyArtwork.owner === currentUserId) {
          try {
            const res = await axios.get(lazyArtwork.ipfsURI);
            return new LazyNFT(i, res.data, listable);
          } catch (error) {
            console.error(error);
            return null;
          }
        }

        return null;
      });

      const lazyOwned = (await Promise.all(promises)).filter(Boolean);
      dispatch(setLazyOwned({ lazyOwned }));
    } catch (error) {
      console.error(error);
    }
  }

  // async function getCollections() {
  //   const collections = [];
  //   const collectionRef = ref(db, 'collections/');
  //   await get(collectionRef).then(async (snapshot) => {
  //     const collectionsArray = snapshot.val();
  //     for (const i in collectionsArray) {
  //       const dt = collectionsArray[i];
  //       const ownerID = dt.owner;
  //       let ownerName = '';
  //       let ownerImage = '';
  //       let ownerProfileType = '';
  //       const ownerRef = ref(db, `users/${ownerID}`);
  //       await get(ownerRef).then((snap) => {
  //         const ownerDt = snap.val();
  //         ownerName = ownerDt.name;
  //         ownerImage = ownerDt.pdpLink;
  //         ownerProfileType = ownerDt.profileType;
  //       });
  //       const collection = {
  //         image: dt.image,
  //         cover: dt.cover,
  //         name: dt.name,
  //         description: dt.description,
  //         owner: dt.owner,
  //         createdAt: dt.createdAt,
  //         owner_name: ownerName,
  //         owner_image: ownerImage,
  //         owner_profile_type: ownerProfileType,
  //         id: i,
  //         artworks: dt?.artworks,
  //       };
  //       collections.push(collection);
  //     }
  //     dispatch(setCollections({ collections }));
  //
  //     if (collections) {
  //       const searchingArray = collections.map((collection) => (
  //       { name: collection.name, id: collection.id, type: 'collection' }));
  //       dispatch(setSearchingArray({ searchingArray }));
  //     }
  //   });
  // }

  async function getCollections() {
    const collections = [];
    const collectionRef = ref(db, 'collections/');

    try {
      const snapshot = await get(collectionRef);
      const collectionsArray = snapshot.val();

      const collectionPromises = Object.keys(collectionsArray).map(async (i) => {
        const dt = collectionsArray[i];
        const ownerID = dt.owner;

        const ownerRef = ref(db, `users/${ownerID}`);
        const ownerSnap = await get(ownerRef);
        const ownerDt = ownerSnap.val();

        const collection = {
          image: dt.image,
          cover: dt.cover,
          name: dt.name,
          description: dt.description,
          owner: dt.owner,
          createdAt: dt.createdAt,
          owner_name: ownerDt?.name || '',
          owner_image: ownerDt?.pdpLink || '',
          owner_profile_type: ownerDt?.profileType || '',
          id: i,
          artworks: dt?.artworks || [],
        };

        return collection;
      });

      collections.push(...await Promise.all(collectionPromises));

      dispatch(setCollections({ collections }));

      if (collections.length > 0) {
        const searchingArray = collections.map((collection) => ({
          name: collection.name,
          id: collection.id,
          type: 'collection',
        }));
        dispatch(setSearchingArray({ searchingArray }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  // function to get the listings and then artworks from useListings(contract) with help of contract
  // const {data: listings, isLoading, error} = useListings(contract);
  // const getArtworkForSearch = () => {
  //     if (listings) {
  //         let data = listings.map((artworkItem) => {
  //             return {"name": artworkItem.asset.name, "id": artworkItem.id, "type": "artwork"};
  //         });
  //         setArtWorks(data);
  //     }
  // };

  useEffect(() => {
    dispatch(setCurrentUserId({ currentUserId }));
    if (currentUserId) {
      fetchCurrentUser();
      fetchLazyOwned();
    }
  }, [currentUserId]);

  useEffect(() => {
    async function changeTitle() {
      document.title = 'Artrise - Physical NFTs Marketplace';
    }
    changeTitle();
    fetchUsers();
    fetchLazyListed();
    getCollections();
  }, [currentUserId]);

  const memoizedRoutes = useMemo(() => (
      routes.map((data) => (
          <Route
              onUpdate={() => window.scrollTo(0, 0)}
              exact
              path={data.path}
              element={data.component}
              key={data.id}
          />
      ))
  ), []); // Empty dependency array ensures that useMemo runs only once


  return (
    <Routes>
      {memoizedRoutes}
    </Routes>
  );
}

export default App;
