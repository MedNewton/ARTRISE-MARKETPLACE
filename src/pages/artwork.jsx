import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import './styles/artwork.css';
import { Accordion } from 'react-bootstrap-accordion';

import {
  ref,
  get,
  set,
} from 'firebase/database';
import { useAccount, useBalance } from 'wagmi';
import axios from 'axios';
import Web3 from 'web3';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import Swal from 'sweetalert2';

import { Modal, Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { FaRegHeart } from 'react-icons/fa';
import { BiNavigation } from 'react-icons/bi';
import db from '../firebase';
import ShippingModal from '../components/layouts/ShippingModal';
import Footer from '../components/footer/Footer';
import MediaViewer from '../components/layouts/mediaViewer/MediaViewer';
import PhysicalImagesViewer from '../components/layouts/artwork/PhysicalImagesViewer';
import {
  ArtworkCollectionName,
  ArtworkDescription,
  ArtworkDetailsWrapper,
  ArtworkName,
  ArtworkPageWrapper,
  AvatarWrapper, ButtonsWrapper,
  InfoWrapper, LikeButtonWrapper, LikeShareButtonsWrapper,
  MainImageAttributesWrapper, ModalInputField, ModalInputLabel,
  OwnerName,
  OwnerNameHeading,
  OwnersSectionDetailsWrapper,
  OwnerWrapper,
  PriceHeading, PriceNotification, PriceSectionWrapper,
  PriceSubSection, ShareButtonWrapper,
} from '../components/layouts/artwork/artwork.styles';
import { COLORS } from '../components/shared/styles-constants';
import placeHolderMainImage from '../assets/images/box-item/collection-item-bottom-4.jpg';

class LazyNFT {
  constructor(i, d, o, c) {
    this.id = i;
    this.data = d;
    this.owner = o;
    this.collection = c;
  }
}

function Artwork() {
  const theme = useSelector((state) => state.themeReducer.theme);

  const [nftID, setNftID] = useState('');
  const location = useLocation();
  const initialData = location.state ? location.state.data : null;
  const [Offerdata] = useState(initialData);
  const [Listed, setListed] = useState(false);
  const [nft, setNFT] = useState();
  const [ownerAddress, setOwnerAddress] = useState('');
  const [CollectionID, setCollectionID] = useState('');
  const [ipfsURL, setIpfsURL] = useState('');
  const [price, setPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [listingID, setListingID] = useState('');
  const [OfferModal, setOfferModal] = useState(false);

  const [setLoading] = useState(false);
  const [setStatus] = useState('');

  const [shippingModalShow, setShippingModalShow] = useState(false);
  const [setTransactionStatus] = useState('');

  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });

  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });

  // const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  const getNFTData = useCallback(async () => {
    let lazyNFT;
    // const nftID = window.location.href.toString().split('id=')[1];
    const artworkRef = ref(db, `artworks/${nftID}`);
    await get(artworkRef).then(async (snapshot) => {
      const collectionID = snapshot.val().collection;
      setCollectionID(collectionID);
      const { key } = snapshot;
      const IPFS_URL = snapshot.val().ipfsURI;
      setIpfsURL(IPFS_URL);
      const IPFSdata = await axios.get(IPFS_URL);
      let collection;
      const collectionRef = ref(db, `collections/${collectionID}`);
      await get(collectionRef).then(async (collectionSnapshot) => {
        collection = collectionSnapshot.val();
      });
      const ownerID = snapshot.val().owner;
      setOwnerAddress(ownerID);
      const userRef = ref(db, `users/${ownerID}`);
      await get(userRef).then(async (ownerSnapshot) => {
        const owner = ownerSnapshot.val();
        lazyNFT = new LazyNFT(key, IPFSdata.data, owner, collection);
        setNFT(lazyNFT);
      });
    });
    return lazyNFT;
  }, [nftID]);

  const getPrice = useCallback(async () => {
    try {
      // const nftID = new URLSearchParams(window.location.search).get('id');
      const listingsRef = ref(db, 'listings/');
      const snapshot = await get(listingsRef);

      if (snapshot.exists()) {
        const listings = snapshot.val();

        Object.keys(listings).forEach((listingId) => {
          const listing = listings[listingId];

          if (listing.artwork_id === nftID) {
            setListed(true);
            setListingID(listingId);
            setPrice(Offerdata?.offeredprice || listing.price);
            setShippingPrice(parseFloat(listing.shipping));
            // Stop looping once a match is found
          }
        });
      } else {
        console.error('Listings data not found.');
      }
    } catch (error) {
      console.error('Error fetching price:', error);
    }
  }, [nftID, Offerdata?.offeredprice]);

  useEffect(() => {
    setNftID(new URLSearchParams(window.location.search).get('id'));
    if (nftID) {
      getNFTData();
      getPrice();
    }
  }, [getPrice, getNFTData, nftID]);

  const handleMint = async () => {
    setLoading(true);
    setStatus('');

    const web3 = new Web3(window.ethereum);

    const raribleProtocolAddress = '0x9201a886740D193E315F1F1B2B193321D6701D07';
    const raribleProtocolABI = [
      {
        inputs: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'string', name: 'baseURI', type: 'string' },
          { internalType: 'uint256', name: 'batch_amount', type: 'uint256' },
          { internalType: 'uint256', name: 'royalty_amount', type: 'uint256' },
          { internalType: 'address', name: 'creator', type: 'address' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'buyer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'RecievedRoyalties',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'amount_made',
            type: 'uint256',
          },
        ],
        name: 'SeriesMade',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'buyer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'token_id',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
        ],
        name: 'SeriesPurchased',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
        ],
        name: 'TransferFee',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'TransferPayment',
        type: 'event',
      },
      {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'BalancesMap',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'MAX_MINT',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'MintableAddress',
        outputs: [
          { internalType: 'address payable', name: '', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'PreMintData',
        outputs: [
          {
            internalType: 'uint256',
            name: 'amount_of_tokens_left',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'address payable', name: 'creator', type: 'address' },
          { internalType: 'string', name: 'url', type: 'string' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'PrintSeries',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: '_batchMintOwnersMap',
        outputs: [
          { internalType: 'uint256', name: 'start', type: 'uint256' },
          { internalType: 'uint256', name: 'end', type: 'uint256' },
          { internalType: 'address', name: 'owner', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: '_exists',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_totalBatches',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'baseURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'count', type: 'uint256' },
        ],
        name: 'batchMint',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: '_amount', type: 'uint256' },
          { internalType: 'uint256', name: '_price', type: 'uint256' },
          { internalType: 'string', name: '_url', type: 'string' },
        ],
        name: 'createPrintSeries',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'exchange',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'hasRoyalties',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'address', name: 'operator', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
        name: 'mint',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: '_seriesID', type: 'uint256' },
          { internalType: 'address', name: '_to', type: 'address' },
        ],
        name: 'mintSeries',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'string', name: 'url', type: 'string' },
        ],
        name: 'mintWithURI',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: '_creator', type: 'address' },
          { internalType: 'address', name: '_buyer', type: 'address' },
          { internalType: 'uint256', name: '_amount', type: 'uint256' },
        ],
        name: 'royaltiesRecieved',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'royaltyAmount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'royaltyInfo',
        outputs: [
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'address', name: '', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'bytes', name: '_data', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'operator', type: 'address' },
          { internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: '_exchange', type: 'address' },
        ],
        name: 'setExchangeContract',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' },
        ],
        name: 'supportsInterface',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'tokenByIndex',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        name: 'tokenOfOwnerByIndex',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        name: 'tokenOwners',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSeries',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];

    const raribleContract = new web3.eth.Contract(
      raribleProtocolABI,
      raribleProtocolAddress,
    );

    const metadataURI = ipfsURL;
    if (address != null) {
      await raribleContract.methods
        .mintWithURI(address, metadataURI)
        .send({ from: address });
    }
  };

  const payForNFT = async () => {
    // const nftID = window.location.href.toString().split('id=')[1];
    if (address != null) {
      const userBalance = parseFloat(data.formatted);
      // let userBalance = 1000;
      // alert(userBalance);
      // alert(usdPriceInEth);
      const totalToPay = price + (shippingPrice / 1806.96);
      // alert('price: '+price)
      // alert(shippingPrice)
      // let totalToPay = price;
      // alert(totalToPay);
      const totalToPayInWei = ethers.utils.parseEther(totalToPay.toString());
      // alert(totalToPayInWei);
      if (userBalance < totalToPay) {
        Swal.fire({
          icon: 'error',
          title: 'Insufficient funds !',
          text: 'The funds in your wallet are insufficient to pay for this artwork.',
        });
      } else {
        try {
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const transaction = {
            to: '0x18C41549ee05F893B5eA6ede6f8dccC1a9C16f44',
            value: totalToPayInWei,
          };
          const sendTransaction = await signer.sendTransaction(transaction);
          setTransactionStatus(`Transaction Hash: ${sendTransaction.hash}`);
          if (sendTransaction.hash) {
            await handleMint().then(async () => {
              const listingsRef = ref(db, `listings/${listingID}`);
              await set(listingsRef, null).then(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'The Artwork is now yours ! !',
                  text: `You can see this artwork in your wallet, 
                  use it, or list it again on ARTRISE to gain profits !.`,
                });
                const orderID = (Math.random() + 1).toString(36).substring(2);
                const orderRef = ref(db, `orders/${orderID}`);
                set(
                  orderRef,
                  {
                    artworkid: nftID,
                    listingid: listingID,
                    sellersid: ownerAddress,
                    buyersid: address,
                    price: totalToPay,
                    Collectionid: CollectionID,
                    buyersWallet: address,
                    status: 'Pending Shipping',
                    purchasedate: Date().getTime(),
                  },
                );
              });
            });
          }
        } catch (error) {
          setTransactionStatus('Error transferring ETH');
        }
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Wallet Not Connected !',
        text: 'Please Connect Your Wallet in Order to Complete the Purchase',
      });
    }
  };

  const SendOffer = async () => {
    if (address != null) {
      // console.log('offersent');
      // const nftID = window.location.href.toString().split('id=')[1];
      // const userBalance = parseFloat(data.formatted);
      const OfferAmount = document.getElementById('OfferAmount').value;
      // console.log(OfferAmount)

      // User Balance
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const UserBalanceInEth = ethers.utils.formatEther(balance);
      // console.log(balanceInEth);

      if (UserBalanceInEth >= OfferAmount) {
        const OfferId = (Math.random() + 1).toString(36).substring(2);
        const OfferRef = ref(db, `offers/${OfferId}`);
        await set(
          OfferRef,
          {
            artworkid: nftID,
            listingid: listingID,
            sellersid: ownerAddress,
            buyersid: address,
            image: nft.data.image,
            price,
            offeredprice: OfferAmount,
            Collectionid: CollectionID,
            buyersWallet: address,
            status: 'Pending',
            offerdate: new Date().getTime(),
          },
        ).then(
          async () => {
            Swal.fire({
              icon: 'success',
              title: 'Offer Sent',
              text: 'Offer Has Been Successfully sent to the Owner of this Artwork!',
            });
          },
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Insufficient Balance',
          text: 'Please Add Balance to your Etherium Wallet!',
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'User Not Logged In!',
        text: 'Please Login to Send an Offer!',
      });
    }
  };
  const showOfferModal = () => setOfferModal(true);
  const hideOfferModal = () => setOfferModal(false);

  const [usdPriceInEth, setUsdPriceInEth] = useState();

  useEffect(() => {
    async function fetchPrice() {
      const response = await axios.get(
        'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }
    fetchPrice();
  }, [usdPriceInEth]);

  useEffect(() => {
    setInterval(async () => {
      const response = await axios.get(
        'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
      );
      setUsdPriceInEth(parseFloat(response.data.USD));
    }, 30000);
  });

  return (
    <div className="item-details">
      <Modal show={OfferModal} onHide={hideOfferModal}>
        <Modal.Header closeButton>
          <Modal.Title>Make an Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            Current Price:
            {price}
            {' '}
            ETH
          </h4>
          <ModalInputLabel htmlFor="OfferAmount">
            <span><p>Your Offer ETH:</p></span>
            <ModalInputField type="number" id="OfferAmount" placeholder="ETH" />
          </ModalInputLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideOfferModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async (e) => {
              e.preventDefault();
              hideOfferModal();
              SendOffer();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {nft ? (
        <ArtworkPageWrapper isDeviceMobile={isDeviceMobile}>
          <MainImageAttributesWrapper isDeviceMobile={isDeviceMobile}>
            <div className="artwork-media-wrapper">
              <MediaViewer mediaUrl={nft?.data?.image} />
            </div>
            <div className="metadataBox" style={{ marginTop: '2%' }}>
              <div className="flat-accordion2">
                <Accordion key="0" title="Properties">
                  <div className="row propertiesBox">
                    {nft?.data?.attributes?.map((attribute) => (
                      <div className="attr">
                        <p className="attributeTitle">{attribute?.trait_type}</p>
                        <p>{attribute?.trait_value}</p>
                      </div>
                    ))}
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
                          rel="external"
                          target="_blank"
                          to="http://etherscan.io/address/0x6E42262978de5233C8d5B05B128C121fBa110DA4"
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
                      <p>Token Standard</p>
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
          </MainImageAttributesWrapper>
          <ArtworkDetailsWrapper isDeviceMobile={isDeviceMobile}>
            <ArtworkName theme={theme}>
              {nft?.data?.name}
            </ArtworkName>
            <ArtworkCollectionName theme={theme}>
              {nft?.collection?.name ? nft?.collection?.name : 'ARTRISE Shared Collection'}
            </ArtworkCollectionName>
            <LikeShareButtonsWrapper>
              <LikeButtonWrapper theme={theme}>
                <FaRegHeart style={{ color: 'red' }} />
                <span>1</span>
              </LikeButtonWrapper>
              <ShareButtonWrapper theme={theme}>
                <BiNavigation />
              </ShareButtonWrapper>
            </LikeShareButtonsWrapper>
            <ArtworkDescription theme={theme}>
              {nft?.data?.description}
            </ArtworkDescription>
            <OwnersSectionDetailsWrapper>
              <OwnerWrapper theme={theme}>
                <AvatarWrapper>
                  <img style={{ borderRadius: '5px' }} src={nft?.owner?.pdpLink} alt="Axies" />
                </AvatarWrapper>
                <InfoWrapper>
                  <OwnerNameHeading theme={theme}>Owned By</OwnerNameHeading>
                  <OwnerName theme={theme}>{nft?.owner?.name}</OwnerName>
                </InfoWrapper>
              </OwnerWrapper>
              <OwnerWrapper theme={theme}>
                <AvatarWrapper>
                  <img style={{ borderRadius: '5px' }} src={nft?.owner?.pdpLink} alt="Axies" />
                </AvatarWrapper>
                <InfoWrapper>
                  <OwnerNameHeading theme={theme}>Created By</OwnerNameHeading>
                  <OwnerName theme={theme}>{nft?.owner?.name}</OwnerName>
                </InfoWrapper>
              </OwnerWrapper>
            </OwnersSectionDetailsWrapper>
            <PriceSectionWrapper>
              <PriceSubSection>
                <PriceHeading theme={theme}>Price</PriceHeading>
                <PriceNotification theme={theme}>(late minting gas not included)</PriceNotification>
              </PriceSubSection>
              <PriceSubSection>
                <PriceHeading theme={theme}>
                  $
                  {(usdPriceInEth * price).toFixed(2).toString()}
                  &nbsp;
                  {' ≈ '}
                  &nbsp;
                  {price.toString()}
                  {' '}
                  ETH
                  &nbsp;
                  <BsFillQuestionCircleFill
                    color={theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont}
                    size={12}
                    className="smallpriceQuestion"
                    onClick={() => {
                      Swal.fire({
                        icon: 'question',
                        title: 'Flexible price NFTs',
                        text: 'In order to protect users from unexpected market swings,\nARTRISE '
                              + 'implemented the notion of flexible price NFTs\nto keep all the artworks '
                              + 'aligned with the actual cryptocurrencies market prices.',
                      });
                    }}
                  />
                </PriceHeading>
              </PriceSubSection>
            </PriceSectionWrapper>
            <PriceSectionWrapper>
              <PriceSubSection>
                <PriceHeading theme={theme}>Estimated shipping cost</PriceHeading>
                <PriceNotification
                  theme={theme}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShippingModalShow(true);
                  }}
                >
                  (View Shipping Info)
                </PriceNotification>
              </PriceSubSection>
              <PriceSubSection>
                <PriceHeading
                  theme={theme}
                >
                  $
                  {shippingPrice}
                </PriceHeading>
              </PriceSubSection>
            </PriceSectionWrapper>
            <ButtonsWrapper>
              <button
                type="button"
                id="load-more"
                className="sc-button loadmore fl-button pri-3"
                onClick={async (e) => {
                  e.preventDefault();
                  await payForNFT();
                }}
              >
                <span>{Listed ? 'Buy Now' : 'Not Available'}</span>
              </button>
              <button
                type="button"
                id="load-more"
                className="sc-button loadmore fl-button pri-3"
                onClick={async (e) => {
                  e.preventDefault();
                  showOfferModal();
                }}
              >
                <span>Make an Offer!</span>
              </button>
            </ButtonsWrapper>
            <PhysicalImagesViewer physicalImages={nft?.data?.physical_images} />
          </ArtworkDetailsWrapper>
        </ArtworkPageWrapper>

      ) : (
        <ArtworkPageWrapper isDeviceMobile={isDeviceMobile}>
          <MainImageAttributesWrapper isDeviceMobile={isDeviceMobile}>
            <div className="artwork-media-wrapper">
              <MediaViewer />
            </div>
            <div className="metadataBox" style={{ marginTop: '2%' }}>
              <div className="flat-accordion2">
                <Accordion key="0" title="Properties" />
                <Accordion key="1" title="About the artist">
                  <p>Owner&apos;s Bio</p>
                </Accordion>
                <Accordion key="2" title="Details" />
              </div>
            </div>
          </MainImageAttributesWrapper>
          <ArtworkDetailsWrapper isDeviceMobile={isDeviceMobile}>
            <ArtworkName theme={theme}>
              Artwork&apos;s Name
            </ArtworkName>
            <ArtworkCollectionName theme={theme}>
              ARTRISE Shared Collection
            </ArtworkCollectionName>
            <LikeShareButtonsWrapper>
              <LikeButtonWrapper theme={theme}>
                <FaRegHeart style={{ color: 'red' }} />
                <span>1</span>
              </LikeButtonWrapper>
              <ShareButtonWrapper theme={theme}>
                <BiNavigation />
              </ShareButtonWrapper>
            </LikeShareButtonsWrapper>
            <ArtworkDescription theme={theme}>
              Artwork&apos;s Description
            </ArtworkDescription>
            <OwnersSectionDetailsWrapper>
              <OwnerWrapper theme={theme}>
                <AvatarWrapper>
                  <img style={{ borderRadius: '5px' }} src={placeHolderMainImage} alt="Axies" />
                </AvatarWrapper>
                <InfoWrapper>
                  <OwnerNameHeading theme={theme}>Owned By</OwnerNameHeading>
                  <OwnerName theme={theme}>Owner&apos;s Name</OwnerName>
                </InfoWrapper>
              </OwnerWrapper>
              <OwnerWrapper theme={theme}>
                <AvatarWrapper>
                  <img style={{ borderRadius: '5px' }} src={placeHolderMainImage} alt="Axies" />
                </AvatarWrapper>
                <InfoWrapper>
                  <OwnerNameHeading theme={theme}>Created By</OwnerNameHeading>
                  <OwnerName theme={theme}>Creator&apos;s Name</OwnerName>
                </InfoWrapper>
              </OwnerWrapper>
            </OwnersSectionDetailsWrapper>
            <PriceSectionWrapper>
              <PriceSubSection>
                <PriceHeading theme={theme}>Price</PriceHeading>
                <PriceNotification theme={theme}>(late minting gas not included)</PriceNotification>
              </PriceSubSection>
              <PriceSubSection>
                <PriceHeading theme={theme}>
                  $
                  0.00
                  &nbsp;
                  {' ≈ '}
                  &nbsp;
                  0.00
                  {' '}
                  ETH
                  &nbsp;
                  <BsFillQuestionCircleFill
                    color={theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont}
                    size={12}
                    className="smallpriceQuestion"
                    onClick={() => {
                      Swal.fire({
                        icon: 'question',
                        title: 'Flexible price NFTs',
                        text: 'In order to protect users from unexpected market swings,\nARTRISE '
                                + 'implemented the notion of flexible price NFTs\nto keep all the artworks '
                                + 'aligned with the actual cryptocurrencies market prices.',
                      });
                    }}
                  />
                </PriceHeading>
              </PriceSubSection>
            </PriceSectionWrapper>
            <PriceSectionWrapper>
              <PriceSubSection>
                <PriceHeading theme={theme}>Estimated shipping cost</PriceHeading>
                <PriceNotification
                  theme={theme}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShippingModalShow(true);
                  }}
                >
                  (View Shipping Info)
                </PriceNotification>
              </PriceSubSection>
              <PriceSubSection>
                <PriceHeading
                  theme={theme}
                >
                  $
                  0.00
                </PriceHeading>
              </PriceSubSection>
            </PriceSectionWrapper>
            <ButtonsWrapper>
              <button
                type="button"
                id="load-more"
                className="sc-button loadmore fl-button pri-3"
                onClick={async (e) => {
                  e.preventDefault();
                  await payForNFT();
                }}
              >
                <span>{Listed ? 'Buy Now' : 'Not Available'}</span>
              </button>
              <button
                type="button"
                id="load-more"
                className="sc-button loadmore fl-button pri-3"
                onClick={async (e) => {
                  e.preventDefault();
                  showOfferModal();
                }}
              >
                <span>Make an Offer!</span>
              </button>
            </ButtonsWrapper>
            <PhysicalImagesViewer physicalImages={nft?.data?.physical_images} />
          </ArtworkDetailsWrapper>
        </ArtworkPageWrapper>
      )}
      <Footer />
      <ShippingModal
        show={shippingModalShow}
        onHide={() => setShippingModalShow(false)}
      />
    </div>
  );
}

export default Artwork;
