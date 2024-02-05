import React from 'react';
import { useSelector } from 'react-redux';
import DisplayArtworks from './ProfileDisplay/DisplayArtworks';

function Artworks() {
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);

  return (
    <div style={{
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingTop:'60px',
        marginLeft: '0px',
        marginRight: '0px',
        width: '100%',
    }}>
      <div>
        <h2 className=" ourArtists">Artworks</h2>
      </div>
      {lazyListed && <DisplayArtworks data={lazyListed} />}
    </div>
  );
}

export default Artworks;
