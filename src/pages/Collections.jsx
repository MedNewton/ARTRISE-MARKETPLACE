import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/footer/Footer';
import { ArtistsContainer } from '../components/layouts/craftsmen/craftsmenStyles/CraftsMen.styles';
import CollectionCard from '../components/layouts/Collections/CollectionCard';

function Collections() {
  const collections = useSelector((state) => state.usersReducer.collections);
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  const selectedTags = [];

  function editTags(val, target) {
    if (selectedTags.includes(val)) {
      selectedTags.pop(val);
      target.classList.remove('selectedTag');
      target.classList.add('tag');
    } else {
      selectedTags.push(val);
      target.classList.remove('tag');
      target.classList.add('selectedTag');
    }
  }

  return (
    <>
      <div className="margin-Left-Right-Top">
        <h2 className=" ourArtists">
          Artists
        </h2>
        <div className="flex flex-column">
          <div className="tagsBar flex">
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="painting"
            >
              Painting
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="photography"
            >
              Photography
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="sculpture"
            >
              Sculpture
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="mosaic"
            >
              Mosaic
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="others"
            >
              Others
            </button>
          </div>
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
