import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { useCallback, useEffect, useMemo } from 'react';
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
import HeaderStyle2 from './components/header/HeaderStyle2';

function App() {
  const currentUserId = useSelector((state) => state.usersReducer.currentUserId);

  // const members = [];
  // const artists = [];
  // const allUsers = [];
  const dispatch = useDispatch();

  const fetchUsers = useCallback(async () => {
    const userRef = ref(db, 'users/');
    try {
      const snapshot = await get(userRef);
      const dt = snapshot.val();

      const artists = Object.keys(dt)
        .filter((userId) => dt[userId]?.socialMediaVerified && dt[userId]?.profileType === 'artist')
        .map((userId) => ({ userId, ...dt[userId] }));

      const members = Object.keys(dt)
        .filter((userId) => !dt[userId]?.socialMediaVerified)
        .map((userId) => ({ userId, ...dt[userId] }));

      const allUsers = Object.keys(dt)
        .map((userId) => ({ userId, ...dt[userId] }));

      dispatch(setAllUsers({ allUsers }));
      dispatch(setMembers({ members }));
      dispatch(setArtists({ artists }));

      if (allUsers && allUsers.length > 0) {
        const searchingArray = allUsers.map((userItem) => ({
          name: userItem.name,
          id: userItem.userId,
          type: userItem.profileType || 'member',
        }));
        dispatch(setSearchingArray({ searchingArray }));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [dispatch]);

  const fetchLazyListed = useCallback(async () => {
    const listingsRef = ref(db, 'listings/');
    try {
      const snapshot = await get(listingsRef);
      const dt = snapshot?.val();

      const promises = Object.keys(dt)
        .map(async (i) => {
          const listing = dt[i];
          const listingArtworkId = listing?.artwork_id;
          const price = listing?.price;

          const artworkRef = ref(db, `artworks/${listingArtworkId}`);
          const artworkSnapshot = await get(artworkRef);
          const artwork = artworkSnapshot?.val();

          const ipfsURI = artwork?.ipfsURI;
          const artworkOwner = artwork?.owner;
          const listed = artwork?.listed;

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
                listed,
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
  }, [dispatch]);

  const fetchCurrentUser = useCallback(async () => {
    if (currentUserId) {
      const ThisUserRef = ref(db, `users/${currentUserId}`);
      await get(ThisUserRef)
        .then(async (snapshot) => {
          const currentUser = snapshot.val();
          dispatch(setCurrentUser({ currentUser }));
        });
    }
  }, [currentUserId, dispatch]);

  const fetchLazyOwned = useCallback(async () => {
    if (!currentUserId) {
      return;
    }
    const artworksRef = ref(db, 'artworks/');
    try {
      const snapshot = await get(artworksRef);
      const dt = snapshot.val();

      const promises = Object.keys(dt)
        .map(async (i) => {
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
  }, [currentUserId, dispatch]);

  const getCollections = useCallback(async () => {
    const collections = [];
    const collectionRef = ref(db, 'collections/');

    try {
      const snapshot = await get(collectionRef);
      const collectionsArray = snapshot.val();

      const collectionPromises = Object.keys(collectionsArray)
        .map(async (i) => {
          const dt = collectionsArray[i];
          const ownerID = dt.owner;

          const ownerRef = ref(db, `users/${ownerID}`);
          const ownerSnap = await get(ownerRef);
          const ownerDt = ownerSnap.val();

          return {
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
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentUserId({ currentUserId }));
    if (currentUserId) {
      fetchUsers();
      fetchCurrentUser();
      fetchLazyOwned();
    }
  }, [currentUserId, dispatch, fetchUsers, fetchCurrentUser, fetchLazyOwned]);

  useEffect(() => {
    async function changeTitle() {
      document.title = 'Artrise - Physical NFTs Marketplace';
    }

    changeTitle();
    fetchUsers();
    fetchLazyListed();
    getCollections();
  }, [fetchLazyListed, fetchUsers, getCollections]);

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
    <>
      <HeaderStyle2 />
      <Routes>
        {memoizedRoutes}
      </Routes>
    </>
  );
}

export default App;
