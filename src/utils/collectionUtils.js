import { ref, get } from 'firebase/database';
import db from '../firebase';
import {
  setCollections,
  setSearchingArray,
} from '../redux/actions/userActions';

export const getCollections = async (dispatch) => {
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
};
