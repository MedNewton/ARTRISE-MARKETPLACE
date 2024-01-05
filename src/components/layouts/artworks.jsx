import React from 'react';
// import axios from 'axios';
import { useSelector } from 'react-redux';
import DisplayArtworks from './ProfileDisplay/DisplayArtworks';

function Artworks() {
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);

  // const [setUsdPriceInEth] = useState();

  // useEffect(() => {
  //   async function fetchPrice() {
  //     const response = await axios.get(
  //       'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
  //     );
  //     setUsdPriceInEth(parseFloat(response.data.USD));
  //   }
  //   fetchPrice();
  //
  //   return () => {
  //   };
  // }, []);
  //
  // useEffect(() => {
  //   setInterval(async () => {
  //     const response = await axios.get(
  //       'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
  //     );
  //     setUsdPriceInEth(parseFloat(response.data.USD));
  //   }, 30000);
  //   return () => {
  //   };
  // }, []);

  return (
    <div>
      <div style={{ paddingTop: '10px' }}>
        <div>
          <h2 className="artists-page-title">Artworks</h2>
        </div>
        {lazyListed && <DisplayArtworks data={lazyListed} />}
      </div>
    </div>
  );
}

export default Artworks;
