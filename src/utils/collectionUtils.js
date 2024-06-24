import { ref, get } from 'firebase/database';
import db from '../firebase';
import {
  setCollections,
  setSearchingArray,
} from '../redux/actions/userActions';

export const getCollections = async (dispatch) => {
  const collectionRef = ref(db, 'collections/');
  try {
    const snapshot = await get(collectionRef);
    const collectionsArray = snapshot.val();
    if (!collectionsArray) {
      console.error('No collections found');
      return;
    }

    const collections = await Promise.all(
      Object.keys(collectionsArray).map(async (i) => {
        const dt = collectionsArray[i];
        const ownerID = dt.owner;

        // Fetch owner data
        const ownerRef = ref(db, `users/${ownerID}`);
        const ownerSnap = await get(ownerRef);
        const ownerDt = ownerSnap.val();

        // Get the first 4 artworks
        const artworkThumbnails = await Promise.all(
          ((dt?.artworks?.length > 0 ? dt.artworks.slice(0, 4) : [])).map(async (artworkId) => {
            const artworkRef = ref(db, `artworks/${artworkId}`);
            const artworkSnapshot = await get(artworkRef);
            const artwork = artworkSnapshot.val();

            return artwork?.ipfsURI || null;
          }),
        );

        // Prepare unique thumbnails array
        const thumbnails = [dt.cover, dt.image];
        artworkThumbnails.filter(Boolean).forEach((thumb) => {
          if (thumbnails.length < 4 && !thumbnails.includes(thumb)) {
            thumbnails.push(thumb);
          }
        });

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
          thumbnails, // Unique thumbnails array
        };
      }),
    );

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
    console.error('Error fetching collections:', error);
  }
};
