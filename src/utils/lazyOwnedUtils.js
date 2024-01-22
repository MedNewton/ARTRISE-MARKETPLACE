import { ref, get } from 'firebase/database';
import axios from 'axios';
import db from '../firebase';
import {
  setLazyOwned,
} from '../redux/actions/userActions';

import { LazyNFT } from '../components/constants/LazyNFTClass';

export const fetchLazyOwned = async (dispatch, currentUserId) => {
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
};
