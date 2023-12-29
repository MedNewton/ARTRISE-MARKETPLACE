import React, { useState, useEffect, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import './styles/artwork.css'
import { Accordion } from "react-bootstrap-accordion";
import yann from "../assets/images/avatar/yann.jpg";
import db from "../firebase";
import { useLocation } from "react-router-dom";
import {
  ref,
  onValue,
  get,
  update,
  set,
  child,
  remove,
  query,
  equalTo,
} from "firebase/database";
import { useAccount, useBalance } from "wagmi";
import axios from "axios";
import Web3 from "web3";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import Swal from "sweetalert2";

import ShippingModal from "../components/layouts/ShippingModal";
import { Modal , Button} from "react-bootstrap";
import { ethers } from "ethers";
import { icons } from "react-icons";

class LazyNFT {
  constructor(i, d, o, c) {
    this.id = i;
    this.data = d;
    this.owner = o;
    this.collection = c;
  }
}

const Artwork = () => {

  const location = useLocation();
  const initialData = location.state ? location.state.data : null;
  const [Offerdata, setData] = useState(initialData);
  // console.log(Offerdata);
  const [Listed, setListed] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [nft, setNFT] = useState();
  const [owner, setOwner] = useState();
  const [ownerAddress, setOwnerAddress] = useState("");
  const [CollectionID, setCollectionID] = useState("");
  const [physicalImages, setPhysicalImages] = useState([]);
  const [ipfsURL, setIpfsURL] = useState("");
  const [price, setPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [listingID, setListingID] = useState("");
  const [OfferModal, setOfferModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [shippingModalShow, setShippingModalShow] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("");

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  async function getNFTData() {
    let lazyNFT;
    let nftID = window.location.href.toString().split("id=")[1];
    const artworkRef = ref(db, "artworks/" + nftID);
    await get(artworkRef).then(async (snapshot) => {
      let collectionID = snapshot.val().collection;
      setCollectionID(collectionID)
      let key = snapshot.key;
      let IPFS_URL = snapshot.val().ipfsURI;
      setIpfsURL(IPFS_URL);
      let data = await axios.get(IPFS_URL);
      let collection;
      let collectionRef = ref(db, "collections/" + collectionID);
      await get(collectionRef).then(async (snapshot) => {
        collection = snapshot.val();
      })
      let ownerID = snapshot.val().owner;
      setOwnerAddress(ownerID);
      const userRef = ref(db, "users/" + ownerID);
      await get(userRef).then(async (snapshot) => {
        let owner = snapshot.val();
        lazyNFT = new LazyNFT(key, data.data, owner);
        setNFT(lazyNFT);
      });
    });
    return lazyNFT;
  }

  async function getPrice() {
    let nftID = window.location.href.toString().split("id=")[1];
    let listingsRef = ref(db, "listings/");
    await get(listingsRef).then(async (snapshot) => {
      let listings = snapshot.val();
      for (let i in listings) {
        let listing = listings[i];
        if (listing.artwork_id === nftID) {
          setListed(true);
          setListingID(i);
          if(Offerdata != null){
            setPrice(Offerdata?.offeredprice);
          }else{

            setPrice(listing.price);
          }
          setShippingPrice(parseFloat(listing.shipping));
        }
      }
    });
  }

  useEffect(() => {
    getNFTData();
    getPrice();
  }, []);

  const payForNFT = async () => {
    let nftID = window.location.href.toString().split("id=")[1];
    if(address != null){
    let userBalance = parseFloat(data.formatted);
    // let userBalance = 1000;
    alert(userBalance);
    // alert(usdPriceInEth);
    let totalToPay = price + (shippingPrice / 1806.96);
    // alert('price: '+price)
    // alert(shippingPrice)
    // let totalToPay = price;
    alert(totalToPay);
    let totalToPayInWei = ethers.utils.parseEther(totalToPay.toString());
    // alert(totalToPayInWei);
    if (userBalance < totalToPay) {
      Swal.fire({
        icon: "error",
        title: "Insufficient funds !",
        text: "The funds in your wallet are insufficient to pay for this artwork.",
      });
    } else {
      try {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const transaction = {
          to: "0x18C41549ee05F893B5eA6ede6f8dccC1a9C16f44",
          value: totalToPayInWei,
        };
        const sendTransaction = await signer.sendTransaction(transaction);
        setTransactionStatus(`Transaction Hash: ${sendTransaction.hash}`);
        if (sendTransaction.hash) {
          await handleMint().then(async () => {
            let listingsRef = ref(db, "listings/" + listingID);
            await set(listingsRef, null).then(() => {
              Swal.fire({
                icon: "success",
                title: "The Artwork is now yours ! !",
                text: "You can see this artwork in your wallet, use it, or list it again on ARTRISE to gain profits !.",
              });
              let orderID =(Math.random() + 1).toString(36).substring(2);
              let orderRef = ref(db,"orders/"+orderID);
              set(orderRef,
                {
                  "artworkid" : nftID,
                  "listingid" : listingID,
                  "sellersid" : ownerAddress,
                  "buyersid" : address,
                  "price" : totalToPay,
                  "Collectionid" : CollectionID,
                  "buyersWallet" : address,
                  "status": "Pending Shipping",
                  "purchasedate" : Date().getTime()
                });

            });
          });
        }
      } catch (error) {
        setTransactionStatus("Error transferring ETH");
      }
    }
  }else{
    Swal.fire({
      icon: "error",
      title: "Wallet Not Connected !",
      text: "Please Connect Your Wallet in Order to Complete the Purchase",
    });
  }
  };

  const handleMint = async () => {
    setLoading(true);
    setStatus("");

    const web3 = new Web3(window.ethereum);

    const raribleProtocolAddress = "0x9201a886740D193E315F1F1B2B193321D6701D07";
    const raribleProtocolABI = [
      {
        inputs: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "string", name: "baseURI", type: "string" },
          { internalType: "uint256", name: "batch_amount", type: "uint256" },
          { internalType: "uint256", name: "royalty_amount", type: "uint256" },
          { internalType: "address", name: "creator", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "RecievedRoyalties",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "amount_made",
            type: "uint256",
          },
        ],
        name: "SeriesMade",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "token_id",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        name: "SeriesPurchased",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
        ],
        name: "TransferFee",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "TransferPayment",
        type: "event",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "BalancesMap",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_MINT",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MintableAddress",
        outputs: [
          { internalType: "address payable", name: "", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "PreMintData",
        outputs: [
          {
            internalType: "uint256",
            name: "amount_of_tokens_left",
            type: "uint256",
          },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "address payable", name: "creator", type: "address" },
          { internalType: "string", name: "url", type: "string" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "PrintSeries",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "_batchMintOwnersMap",
        outputs: [
          { internalType: "uint256", name: "start", type: "uint256" },
          { internalType: "uint256", name: "end", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "_exists",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_totalBatches",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "count", type: "uint256" },
        ],
        name: "batchMint",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_amount", type: "uint256" },
          { internalType: "uint256", name: "_price", type: "uint256" },
          { internalType: "string", name: "_url", type: "string" },
        ],
        name: "createPrintSeries",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "exchange",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "hasRoyalties",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "to", type: "address" }],
        name: "mint",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_seriesID", type: "uint256" },
          { internalType: "address", name: "_to", type: "address" },
        ],
        name: "mintSeries",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "string", name: "url", type: "string" },
        ],
        name: "mintWithURI",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_creator", type: "address" },
          { internalType: "address", name: "_buyer", type: "address" },
          { internalType: "uint256", name: "_amount", type: "uint256" },
        ],
        name: "royaltiesRecieved",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "royaltyAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "royaltyInfo",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "address", name: "", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "bytes", name: "_data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_exchange", type: "address" },
        ],
        name: "setExchangeContract",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
        name: "tokenByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        name: "tokenOwners",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSeries",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const raribleContract = new web3.eth.Contract(
      raribleProtocolABI,
      raribleProtocolAddress
    );

    const metadataURI = ipfsURL;
    if (address != null) {
      
    
    await raribleContract.methods
      .mintWithURI(address, metadataURI)
      .send({ from: address });
  }};

  const SendOffer = async () => {
    if (address != null) {
      
      // console.log('offersent');
      let nftID = window.location.href.toString().split("id=")[1];
      let userBalance = parseFloat(data.formatted);
      let OfferAmount = document.getElementById('OfferAmount').value
      // console.log(OfferAmount)
      
      // User Balance
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const UserBalanceInEth = ethers.utils.formatEther(balance);
      // console.log(balanceInEth);
  
      if(UserBalanceInEth >= OfferAmount){
        let OfferId =(Math.random() + 1).toString(36).substring(2);
        let OfferRef = ref(db,"offers/"+OfferId);
        await set(OfferRef,
          {
            "artworkid" : nftID,
            "listingid" : listingID,
            "sellersid" : ownerAddress,
            "buyersid" : address,
            "image" : nft.data.image,
            "price" : price,
            "offeredprice" : OfferAmount,
            "Collectionid" : CollectionID,
            "buyersWallet" : address,
            "status": "Pending",
            "offerdate" : new Date().getTime()
          }).then(
            async ()=>{
              Swal.fire({
                icon: "success",
                title : "Offer Sent",
                text : "Offer Has Been Successfully sent to the Owner of this Artwork!"
              });
            }
          );
  
      }
      else{
        Swal.fire({
          icon: "error",
          title : "Insufficient Balance",
          text : "Please Add Balance to your Etherium Wallet!"
        })
      }
    }
    else {
      Swal.fire({
        icon: "warning",
        title : "User Not Logged In!",
        text : "Please Login to Send an Offer!"
      })
    }


  }
  const showOfferModal = () => setOfferModal(true);
  const hideOfferModal = () => setOfferModal(false);
  
  const [usdPriceInEth, setUsdPriceInEth] = useState();

  useEffect(() => {
    async function fetchPrice() {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }
    fetchPrice();
  }, [usdPriceInEth]);

  useEffect(() => {
    setInterval(async () => {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }, 30000);
  });

  return (
    <div className="item-details">
      <HeaderStyle2 />
      <Modal show={OfferModal} onHide={hideOfferModal}>
        <Modal.Header closeButton>
          <Modal.Title>Make an Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Current Price: {price} ETH</h4>
          <div className="offer-modal form-inline">
            <span className="offer-label">Your Offer ETH:</span><input id="OfferAmount" className="form-control" type="number" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideOfferModal}>
            Close
          </Button>
          <Button variant="primary" onClick={async (e) => {
            e.preventDefault();
            hideOfferModal();
            SendOffer();
          }

            }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {nft ? (
        <div className="tf-section tf-item-details">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-xl-6 col-md-12">
                <div className="content-left">
                  <div className="media">
                    <img src={nft.data.image} alt="" />
                  </div>
                  <div className="metadataBox" style={{ marginTop: "2%" }}>
                    <div className="flat-accordion2">
                      <Accordion key="0" title="Properties">
                        <div className="row propertiesBox">
                          {nft?.data?.attributes?.map((attribute)=>{
                            return(
                                <div className="col-3 attr">
                                  <p className="attributeTitle">{attribute?.trait_type}</p>
                                  <p className="attributeValue">{attribute?.trait_value}</p>
                                </div>
                            )
                          })}
                        </div>
                      </Accordion>
                      <Accordion key="1" title="About the artist">
                        <p>{nft?.owner.bio}</p>
                      </Accordion>
                      <Accordion key="2" title="Details">
                        <div className="row">
                          <div className="col-6 detailLeft">
                            <p>Contract address</p>
                          </div>
                          <div className="col-6">
                            <p className="detailRight">
                              <Link
                                rel={"external"}
                                target="_blank"
                                to={
                                  "http://etherscan.io/address/0x6E42262978de5233C8d5B05B128C121fBa110DA4"
                                }
                              >
                                0xa6F...0fC
                              </Link>
                            </p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6 detailLeft">
                            <p>Token ID</p>
                          </div>
                          <div className="col-6">
                            <p className="detailRight">31</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 detailLeft">
                            <p>Token Stdandard</p>
                          </div>
                          <div className="col-6">
                            <p className="detailRight">ERC-721</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 detailLeft">
                            <p>Chain</p>
                          </div>
                          <div className="col-6">
                            <p className="detailRight">Ethereum</p>
                          </div>
                        </div>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-12">
                <div className="content-right">
                  <div className="sc-item-details">
                    <h2
                      className="style2"
                      style={{ textTransform: "capitalize" }}
                    >
                      {nft.data.name}
                    </h2>
                    <h5 className="style2 collectionName">
                      {nft?.collection?.name ? nft?.collection?.name : "ARTRISE Shared Collection"}
                    </h5>
                    <div className="meta-item">
                      <div className="left">
                        <span
                          className="viewed eye"
                          id="likeBtn"
                          onClick={(e) => {}}
                        >
                          {1}
                        </span>
                        <span
                          className="liked heart wishlist-button mg-l-8"
                          hidden
                        >
                          <span className="number-like">100</span>
                        </span>
                      </div>
                      <div className="right">
                        <Link
                          to="#"
                          onClick={(e) => {}}
                          id="shareBtn"
                          className="share"
                        ></Link>
                        <Link to="/" className="option" hidden></Link>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "1.6em",
                        lineHeight: "1.4em",
                        marginBottom: "5%",
                      }}
                    >
                      {nft.data.description}
                    </p>
                    <div className="client-infor sc-card-product">
                      <div className="meta-info">
                        <div className="author">
                          <div className="avatar">
                            <img src={nft.owner.pdpLink} alt="Axies" />
                          </div>
                          <div className="info">
                            <span>Owned By</span>
                            <h6>{nft.owner.displayName}</h6>
                          </div>
                        </div>
                      </div>
                      <div className="meta-info">
                        <div className="author">
                          <div className="avatar">
                            <img src={nft.owner.pdpLink} alt="Axies" />
                          </div>
                          <div className="info">
                            <span>Create By</span>
                            <h6>{nft.owner.displayName}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="meta-item-details style2">
                      <div className="item meta-price">
                        <span className="heading">Price <small className="shippingDetails">(late minting gas not included)</small></span>
                        <div className="price">
                          <div className="price-box">
                          <h6>
                              ${(usdPriceInEth * price).toFixed(2).toString()}
                              &nbsp;
                              {" ≈ "}
                              &nbsp;
                              {price.toString()} ETH
                            &nbsp;
                            <BsFillQuestionCircleFill
                                color="#000"
                                size={12}
                                className="smallpriceQuestion"
                                onClick={() => {
                                  Swal.fire({
                                    icon: "question",
                                    title: "Flexible price NFTs",
                                    text: "In order to protect users from unexpected market swings,\nARTRISE implemented the notion of flexible price NFTs\nto keep all the artworks aligned with the actual cryptocurrencies market prices.",
                                  });
                                }}
                            />
                          </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="meta-item-details style2" id="shipping">
                      <div className="item meta-price">
                        <span className="heading">
                          Estimated shipping cost{" "}
                          <span
                            className="shippingDetails"
                            onClick={() => {
                              setShippingModalShow(true);
                            }}
                          >
                            {"(View Shipping Info)"}
                          </span>
                        </span>
                        <div className="price">
                          <div className="price-box">
                            <h5>${shippingPrice}</h5>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/"
                      className="sc-button disabled  loadmore style bag fl-button pri-3"
                      onClick={async (e) => {
                        e.preventDefault();
                        await payForNFT();
                      }}

                    >
                      <span>{Listed? 'Buy Now' : 'Not Available'}</span>
                    </Link>
                    <Link
                      to="/"
                      className="sc-button disabled offer-btn loadmore style fl-button pri-3"
                      onClick={async (e) => {
                        e.preventDefault();
                        showOfferModal();
                      }}

                    >
                      <span>Make an Offer!</span>
                    </Link>
                    
                    <div className="physicalImages">
                      <h5 className="physicalArtworksTitle">
                        Pictures of the physical artwork:
                      </h5>
                      <div className="row" style={{ marginBottom: "3%" }}>
                        {nft.data.physical_images.map((image, index) => (
                          <>
                            <div className="col-3 physImgCol" key={index + 1}>
                              <img
                                src={image.image_url}
                                onClick={() => openImageViewer(index)}
                                className={"physImg"}
                                key={index + 1}
                                style={{ margin: "2px" }}
                                alt=""
                              />
                            </div>
                          </>
                        ))}

                        {isViewerOpen && (
                          <ImageViewer
                            src={physicalImages}
                            currentIndex={currentImage}
                            disableScroll={true}
                            closeOnClickOutside={true}
                            onClose={closeImageViewer}
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className="flat-tabs themesflat-tabs"
                      style={{ marginBottom: "5%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Footer />
      <ShippingModal
        show={shippingModalShow}
        onHide={() => setShippingModalShow(false)}
      />
    </div>
  );
};

export default Artwork;
