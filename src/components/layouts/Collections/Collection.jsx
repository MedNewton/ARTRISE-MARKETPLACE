import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../footer/Footer';
import DisplayArtworks from '../ProfileDisplay/DisplayArtworks';

function Collection() {
  const collections = useSelector((state) => state.usersReducer.collections);
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);

  const [cover, setCover] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [collectionArtworksIds, setCollectionArtworksIds] = useState([]);
  const [displayArtworks, setDisplayArtworks] = useState([]);

  const getCollectionData = useCallback(async (id) => {
    const selectedCollection = collections.find((collection) => collection.id === id);

    if (selectedCollection) {
      setCover(selectedCollection.cover);
      setName(selectedCollection.name);
      setDescription(selectedCollection.description);
      setImage(selectedCollection.image);
      setCreatedAt(selectedCollection.createdAt);
      setCollectionArtworksIds(selectedCollection.artworks);
    }
  }, [collections]);

  const getArtworks = useCallback(() => {
    const selectedArtworks = lazyListed.filter((artwork) => collectionArtworksIds.includes(artwork.artworkId));

    setDisplayArtworks((prevState) => [...prevState, ...selectedArtworks]);
  }, [collectionArtworksIds, lazyListed]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    if (queryParams.has('id')) {
      const collectionId = queryParams.get('id');
      getCollectionData(collectionId);
    } else {
      console.error("URL doesn't contain the collection id query parameter.");
    }
  }, [getCollectionData]);

  useEffect(() => {
    getArtworks();
  }, [getArtworks, collectionArtworksIds, lazyListed]);

  return (
    <div>
      <div
        className="collectionCoverSection"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div
        className="collection-page-Image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <img src="" className="collectionImg" alt="" />
      </div>
      <div className="collection-page-wrapper">
        <div>
          <h3>{name || ''}</h3>
        </div>
        <div className="flex-row-align-center">
          <div className="flex-row-align-center">
            <p className="mg-r-12">Artworks</p>
            <h5>{collectionArtworksIds ? collectionArtworksIds.length.toString() : '0'}</h5>
          </div>
          <h4 style={{ paddingLeft: '10px', paddingRight: '10px' }}>-</h4>
          <div className="flex-row-align-center">
            <p className="mg-r-12">Created at</p>
            {' '}
            <h5>{createdAt || ''}</h5>
          </div>
          <h4 style={{ paddingLeft: '10px', paddingRight: '10px' }}>-</h4>
          <div className="flex-row-align-center">
            <p className="mg-r-12">Creator fees</p>
            {' '}
            <h5>10%</h5>
          </div>
        </div>
        <div className="flex-row-align-center">
          <p>
            {description || ''}
            {' '}
          </p>
        </div>
        <div>
          <h3>Artworks</h3>
        </div>
      </div>
      <div style={{ marginTop: '20px', marginLeft: '2%', marginRight: '2%' }}>
        {lazyListed && <DisplayArtworks data={displayArtworks} />}
      </div>
      <Footer />
    </div>
  );
}

export default Collection;
