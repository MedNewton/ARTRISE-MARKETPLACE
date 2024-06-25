import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/footer/Footer';
import { ArtistsContainer } from '../components/layouts/craftsmen/craftsmenStyles/CraftsMen.styles';
import CollectionCard from '../components/layouts/Collections/CollectionCard';
import CollectionsFilter from '../components/layouts/Collections/CollectionsFilter';

function Collections() {
  const collections = useSelector((state) => state.usersReducer.collections);
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  return (
    <>
      <div className="margin-Left-Right-Top">
        <h2 className=" ourArtists">
          Collections
        </h2>
        <div className="flex flex-column">
          <CollectionsFilter />
          <ArtistsContainer isDeviceMobile={isDeviceMobile} isDeviceTablet={isDeviceTablet}>
            {collections?.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                isDeviceMobile={isDeviceMobile}
                isDeviceTablet={isDeviceTablet}
              />
            ))}
          </ArtistsContainer>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Collections;
