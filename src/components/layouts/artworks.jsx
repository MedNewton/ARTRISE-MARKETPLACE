import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {useContract, useListings } from "@thirdweb-dev/react";
import "react-sliding-pane/dist/react-sliding-pane.css";
import axios from "axios";
import DisplayArtworks from "./ProfileDisplay/DisplayArtworks";
import {useSelector} from "react-redux";

const Artworks = (props) => {
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);
  const { contract } = useContract(
    "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
    "marketplace"
  );
  const { data: listings, isLoading, error } = useListings(contract);
  const [usdPriceInEth, setUsdPriceInEth] = useState();

  useEffect(() => {
    async function fetchPrice() {
      let response = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }
    fetchPrice();

    return () => {
    };
  }, []);

  useEffect(() => {
    setInterval(async () => {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }, 30000);
    return () => {
    };
  }, []);

  return (
    <div>
      <div style={{paddingTop:'10px'}}>
        <div>
          <h2 className="artists-page-title">Artworks</h2>
        </div>
        {lazyListed && <DisplayArtworks data={lazyListed}/>}
      </div>
    </div>
  );
};

Artworks.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Artworks;
