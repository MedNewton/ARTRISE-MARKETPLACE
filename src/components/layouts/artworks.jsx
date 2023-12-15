import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CardModal from "./CardModal";
import yann from "../../assets/images/avatar/yann.jpg";
import { useAddress, useContract, useListings } from "@thirdweb-dev/react";
import SideBar from "./home-8/SideBar";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import axios from "axios";
import { useArtworkContext } from '../../Store/ArtworkContext';
import DisplayArtworks from "./ProfileDisplay/DisplayArtworks";

const Artworks = (props) => {
  const {lazyListed} = useArtworkContext();
  const data = props.data;
  const [openPanel, setOpenPanel] = useState(false);
  const address = useAddress();
  const { contract } = useContract(
    "0x3ad7E785612f7bcA47e0d974d08f394d78B4b955",
    "marketplace"
  );
  const { data: listings, isLoading, error } = useListings(contract);
  const [usdPriceInEth, setUsdPriceInEth] = useState();
  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };
  const [modalShow, setModalShow] = useState(false);

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
