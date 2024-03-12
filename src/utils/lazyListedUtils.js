import { ref, get } from 'firebase/database';
import db from '../firebase';
import {
  setLazyListed,
  setSearchingArray,
} from '../redux/actions/userActions';

import { LazyNFTListing } from '../components/constants/LazyNFTListingClass';

export const fetchLazyListed = async (dispatch) => {
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
};
