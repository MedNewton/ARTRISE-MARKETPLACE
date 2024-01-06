import React from 'react';
import { useSelector } from 'react-redux';
import DisplayArtworks from './ProfileDisplay/DisplayArtworks';

function Artworks() {
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);

  return (
    <div style={{ paddingTop: '10px' }}>
      <div>
        <h2 className="artists-page-title">Artworks</h2>
      </div>
      {lazyListed && <DisplayArtworks data={lazyListed} />}
    </div>
  );
}

export default Artworks;
