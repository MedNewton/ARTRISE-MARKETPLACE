import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';

import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import 'react-tabs/style/react-tabs.css';

import { useAccount } from 'wagmi';
import {
  ref, get, update, set,
} from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Toggle from 'react-styled-toggle';
import {
  Navigation, Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signMessage } from '@wagmi/core';
import { useMediaQuery } from 'react-responsive';
import db from '../firebase';
import img1 from '../assets/images/box-item/image-box-6.jpg';
import Footer from '../components/footer/Footer';
import { fetchUsers } from '../utils/allUsersUtils';
import { fetchCurrentUser } from '../utils/currentUserUtils';
import { fetchLazyOwned } from '../utils/lazyOwnedUtils';
import { PageWidthWrapper } from '../components/layouts/createItem/Tokenize.styles';

const TraitForm = (tr, v) => ({
  trait_type: tr,
  trait_value: v,
});

const toastOptions = {
  position: 'top-left',
  autoClose: 7000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

function CreateItem() {
  const currentUserState = useSelector((state) => state.usersReducer.currentUser);
  const navigate = useNavigate();
  const currentUserId = useSelector((state) => state.usersReducer.currentUserId);
  const dispatch = useDispatch();
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  // const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  // const { contract } = useContract(
  //   '0x91FBfcDDa7FE1aD979C34dF707D2691FcD5663B0',
  // );

  const { address } = useAccount();
  const [mintButtonDisabled, setMintButtonDisabled] = useState(false);
  const [title, setTitle] = useState('Artwork title');
  const [name, setName] = useState('');
  const [artistCollections, setArtistCollections] = useState([]);
  const [bio, setBio] = useState('');
  const [description, setDescription] = useState();
  const [collectionName, setCollectionName] = useState(
    'Choose your collection',
  );

  const [collectionID, setCollectionID] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [supply, setSupply] = useState(1);
  const [media, setMedia] = useState();
  const [mediaPreview, setMediaPreview] = useState(img1);
  const [physicalMedia, setPhysicalMedia] = useState([]);
  const [physicalMediaPreview, setPhysicalMediaPreview] = useState([]);
  const [traits, setTraits] = useState([
    TraitForm('Width', 'Value'),
    TraitForm('Length', 'Value'),
    TraitForm('Weight', 'Value'),
  ]);
  let existingArtworksIds;
  let existingArtworksThumbnails;

  const months = useMemo(() => [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ], []);

  const getArtistCollections = useCallback(async () => {
    const userId = localStorage.getItem('userId');
    const collectionsRef = ref(db, 'collections/');
    await get(collectionsRef).then((snapshot) => {
      const dt = snapshot.val();
      Object.values(dt).forEach((collection) => {
        if (collection.owner === userId) {
          setArtistCollections((current) => [...current, collection]);
        }
      });
    });
  }, []);

  const getArtistDescription = useCallback(async () => {
    setBio(currentUserState?.bio);
    setName(currentUserState.name);
  }, [currentUserState]);

  useEffect(() => {
    getArtistCollections();
    getArtistDescription();
  }, [currentUserState, getArtistDescription, getArtistCollections]);

  // to prevent filling up the collections state when component rerenders
  useEffect(() => () => {
    setArtistCollections([]);
  }, [currentUserState]);

  useEffect(() => {
    setCollectionID(artistCollections[0]?.address);
    setCollectionName(artistCollections[0]?.name);
  }, [artistCollections]);

  function addTrait() {
    setTraits([...traits, TraitForm('Property', 'Value')]);
  }

  function removeTrait(index) {
    setTraits(traits.filter((_, i) => i !== index));
  }

  function handleTypeChange(index, event) {
    const updatedTraits = [...traits];
    updatedTraits[index].trait_type = event.target.value;
    setTraits(updatedTraits);
  }

  function handleValueChange(index, event) {
    const updatedTraits = [...traits];
    updatedTraits[index].trait_value = event.target.value;
    setTraits(updatedTraits);
  }

  async function handleFileChange(e) {
    for (let i = 0; i < e.target.files.length; i += 1) {
      const newImage = e.target.files[i];
      setPhysicalMedia((prevState) => [...prevState, newImage]);
      const newImageDisplay = URL.createObjectURL(e.target.files[i]);
      setPhysicalMediaPreview((prevState) => [...prevState, newImageDisplay]);
    }
  }

  async function uploadToIPFS(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { _boundary: boundary } = formData;

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
            pinata_api_key: '60828f433db3b1676e12',
            pinata_secret_api_key:
                            '95b607311bab336cf4506cc84805ead472dff424782b1a3838e61fa35534b6fc',
          },
        },
      );
      localStorage.setItem(
        'mainMediaURL',
        `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
      );
      toast.info(
        'Uploading physical images to the IPFS ...',
        toastOptions,
      );
      return response.data.IpfsHash;
    } catch (error) {
      toast.error('Problem while Uploading images to IPFS ...', toastOptions);
      throw error;
    }
  }

  async function uploadMultipleToIPFS(files) {
    try {
      localStorage.setItem('physicalImagesURLs', '');
      let urls = '';

      // Use Promise.all to concurrently execute the asynchronous operations
      await Promise.all(files.map(async (file) => {
        const fd = new FormData();
        fd.append('file', file);
        const { _boundary: boundary } = fd;

        const response = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          fd,
          {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${boundary}`,
              pinata_api_key: '60828f433db3b1676e12',
              pinata_secret_api_key: '95b607311bab336cf4506cc84805ead472dff424782b1a3838e61fa35534b6fc',
            },
          },
        );

        urls += `|https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      }));

      localStorage.setItem('physicalImagesURLs', urls);
    } catch (error) {
      toast.error('Problem while Uploading multiple images to IPFS ...', toastOptions);
      throw error;
    }
  }

  function createMetadata() {
    try {
      toast.info('Creating metadata ...', toastOptions);
      const urls = localStorage.getItem('physicalImagesURLs').split('|');
      urls.shift();
      const physicalImages = urls.map((url, index) => ({
        image_title: `image ${index + 1}`,
        image_url: url,
      }));

      const metadata = {
        name: title,
        description,
        image: localStorage.getItem('mainMediaURL').toString(),
        external_link: externalLink,
        physical_images: physicalImages,
        attributes: traits,
      };
      return metadata;
    } catch (error) {
      toast.error('Problem occurred while Creating metadata ...', toastOptions);
      throw error;
    }
  }

  async function uploadMetadata(metadata) {
    try {
      toast.info('Uploading metadata ...', toastOptions);
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        metadata,
        {
          headers: {
            pinata_api_key: '60828f433db3b1676e12',
            pinata_secret_api_key:
                            '95b607311bab336cf4506cc84805ead472dff424782b1a3838e61fa35534b6fc',
          },
        },
      );
      const metadataUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      localStorage.setItem('newURI', metadataUrl);
      return metadataUrl;
    } catch (error) {
      toast.error('Problem occurred while Uploading metadata ...', toastOptions);
      throw error;
    }
  }

  async function getCollectionID(newID) {
    if (artistCollections.length === 0) {
      try {
        const newCollectionID = (
          Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
        ).toString();
        const currentTime = new Date();
        const month = currentTime.getMonth() + 1;
        const year = currentTime.getFullYear();
        const createdAt = `${months[month]} ${year.toString()}`;
        await set(
          ref(db, `collections/${newCollectionID}`),
          {
            name: `${name}'s Collection`,
            description: `${name}'s Collection Description`,
            symbol: `${name[0].toUpperCase()}C`,
            owner: address,
            image: localStorage.getItem('mainMediaURL').toString(),
            cover: localStorage.getItem('mainMediaURL').toString(),
            artisticCollection: true,
            address: newCollectionID,
            createdAt,
            artworks: [newID],
          },
        );
        toast.success('Collection Created!', toastOptions);
        return newCollectionID;
      } catch (error) {
        toast.error('Problem occurred while Creating Collection ...', toastOptions);
        throw error;
      }
    } else if (artistCollections.length > 0) {
      const collRef = ref(db, `collections/${collectionID}`);
      let existingArtworksInCollection = [];
      await get(collRef).then((snapshot) => {
        const dt = snapshot.val();
        existingArtworksInCollection = dt?.artworks ? dt?.artworks : [];
      });
      existingArtworksInCollection.push(newID);
      await update(collRef, {
        artworks: [...existingArtworksInCollection],
      });
      return collectionID;
    }
    return null;
  }

  async function createLazyMintingNFT(uri) {
    try {
      // Generate a new ID for the NFT
      const newID = (Math.random() + 1).toString(36).substring(2);
      // Define a reference to the artworks in the database
      const artworksRef = ref(db, `artworks/${newID}`);
      // Sign a message (you might want to provide more context here)
      await signMessage({
        message: `Lazy minting\nThis action is signed by a public address wallet.\nThe asset generated by 
        this action signature is not available for transfer or listing on secondary marketplaces, 
        unless it has submitted a signed buying action\nRarible 
        Token ID: ${newID.toString()}\nIPFS PUBLIC URI: ${localStorage.getItem('newURI')}`,
      });
      // Toast to inform the user
      toast.info('Minting ...', toastOptions);
      // Get the collection ID
      const collID = await getCollectionID(newID);
      // Set the artwork data in the database
      await set(artworksRef, {
        type: 'lazyMinted',
        ipfsURI: localStorage.getItem('newURI'),
        owner: address.toString(),
        collection: collID,
        listed: false,
      }).then(() => {
        if (currentUserState?.artworks?.length > 0) {
          existingArtworksIds = [...currentUserState.artworks];
          existingArtworksIds.push(newID);
        } else {
          existingArtworksIds = [newID];
        }
        if (currentUserState?.artworkThumbNails?.length > 0) {
          existingArtworksThumbnails = [...currentUserState.artworkThumbNails];
          const existingArtworksThumbnailsLength = existingArtworksThumbnails.unshift(uri);
          if (existingArtworksThumbnailsLength > 4) {
            existingArtworksThumbnails.pop();
          }
        } else {
          existingArtworksThumbnails = [uri];
        }
      });
      await update(ref(db, `users/${address}`), {
        artworks: existingArtworksIds,
        artworkThumbNails: existingArtworksThumbnails,
      });

      // Toast to inform the user
      toast.success('Minted! Redirecting you to the homepage...', toastOptions);
      // Delay before redirecting (consider whether 8 seconds is necessary)

      if (currentUserId) {
        await fetchUsers(dispatch);
        await fetchCurrentUser(dispatch, currentUserId);
        await fetchLazyOwned(dispatch, currentUserId);
      }
      // Redirect to the homepage
      await navigate('/');
    } catch (error) {
      toast.error('Problem occurred while adding artwork to DB ...', toastOptions);
      throw error;
    }
  }

  async function mintButtonClickHandler() {
    try {
      setMintButtonDisabled(true);
      toast.info('Uploading main NFT image to IPFS ...', toastOptions);
      await uploadToIPFS(media);
      await uploadMultipleToIPFS(physicalMedia);
      const metadata = createMetadata();
      const uri = await uploadMetadata(metadata);
      await createLazyMintingNFT(uri);
    } catch (error) {
      toast.error('Problem occurred while Minting Artwork ...', toastOptions);
      throw error;
    }
  }

  return (
    <div className="create-item">
      <div className="d-flex flex-row, justify-content-center">
        <PageWidthWrapper isDeviceMobile={isDeviceMobile}>
          <div>
            <h2 className="tf-title style4 mg-bt-20 ourArtists">Integrate</h2>
            <h5 className="subTitleCreate mb-5">
              Integrate & turn your physical artwork into a hybrid
              NFT
            </h5>
          </div>

          <div className="sc-card-product">
            <div className="d-flex flex-column align-items-center">
              <div className="card-media " style={{ maxWidth: '40%' }}>
                <img src={mediaPreview} alt="" />
              </div>
              <div>
                <h5>{title}</h5>
              </div>
            </div>
          </div>

          <form action="#" className="uploadFile-form mb-35">
            <div>
              <h4 className="mb-4">Upload NFT file</h4>
              <span>
                (PNG, JPG, GIF, WEBP or MP4. Max 200mb.)
              </span>
            </div>
            <div>
              <label
                className="uploadFile-button"
                htmlFor="physicalImage"
              >
                Upload file
                <input
                  type="file"
                  name="file"
                  style={{ display: 'none' }}
                  id="physicalImage"
                  onChange={(e) => {
                    setMedia(e.target.files[0]);
                    setMediaPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </label>
            </div>
          </form>

          <div>
            <div className="flat-tabs tab-create-item">

              <form action="#">
                <h4 className="title-create-item">Artwork Name</h4>
                <input
                  type="text"
                  placeholder="Artwork Name"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <h4 className="title-create-item">Artwork Description</h4>
                <textarea
                  placeholder="e.g. “This is a single NFT ...”"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

                <h4 className="title-create-item">
                  External Link
                  {' '}
                  <small style={{ fontWeight: '500' }}>
                    (if available)
                  </small>
                </h4>
                <input
                  type="url"
                  placeholder="External Link"
                  onChange={(e) => {
                    setExternalLink(e.target.value);
                  }}
                />

                <h4 className="title-create-item">Artist Biography</h4>
                <textarea
                  placeholder={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                />

                <h4 className="title-create-item">
                  Collection name
                  {' '}
                  <p style={{ fontWeight: '500' }}>
                    This is the collection where your item will appear.
                  </p>
                </h4>
                <Dropdown>
                  <Dropdown.Toggle
                    id="collectionsList"
                    style={{
                      width: '100%',
                      height: 'fit-content',
                      padding: '1.5% 1% 1.5% 2%',
                      background: 'transparent',
                      border: 'solid 1px rgba(138, 138, 160, 0.3)',
                      borderRadius: '10px',
                      marginBottom: '3%',
                    }}
                  >
                    <h5
                      style={{
                        color: '#020202',
                        textAlign: 'left',
                        fontSize: '1.4em',
                        fontWeight: '400',
                      }}
                    >
                      {collectionName || `${name}'s Collection`}
                    </h5>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: '100%' }}>
                    {artistCollections.map((collection) => (
                      <Dropdown.Item
                        key={collection}
                        style={{
                          height: 'fit-content',
                          padding: '1.5% 1%',
                          marginBottom: '0px',
                        }}
                        onClick={() => {
                          setCollectionID(collection.address);
                          setCollectionName(collection.name);
                        }}
                      >
                        {collection.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <div className="row traitsWrapper">
                  <div className="traitsHeader">
                    <h5>properties</h5>
                    <button
                      type="button"
                      className="addTraitBtn"
                      onClick={() => {
                        addTrait();
                      }}
                      onKeyDown={() => {
                        addTrait();
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="traitListWrapper">
                    {traits.map((property, index) => (
                      <div key={property} className="trait">
                        <div className="traitForm row">
                          <div className="col-5">
                            <input
                              type="text"
                              placeholder={property.trait_type}
                              value={property.trait_type}
                              onChange={(event) => handleTypeChange(index, event)}
                            />
                          </div>
                          <div className="col-5">
                            <input
                              type="text"
                              placeholder={property.trait_value}
                              value={property.trait_value}
                              onChange={(event) => handleValueChange(index, event)}
                            />
                          </div>
                          <div className="col-2">
                            <button
                              type="button"
                              className="removeTraitBtn"
                              onClick={() => {
                                removeTrait(index);
                              }}
                              onKeyDown={() => {
                                removeTrait(index);
                              }}
                            >
                              x
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <h4 className="title-create-item">
                  Unlockable content
                </h4>
                <div className="artisticBox">
                  <Toggle checked disabled />
                </div>

                <h4 className="title-create-item">Supply </h4>
                <input
                  type="number"
                  placeholder="Supply"
                  defaultValue={supply}
                  onChange={(e) => {
                    setSupply(e.target.value);
                  }}
                />

                <div>
                  <div className="sc-card-product">
                    <div className="d-flex flex-column align-items-center">

                      <div className="card-media" style={{ maxHeight: 'fit-content' }}>
                        <Swiper
                          style={{ width: '20vw' }}
                          modules={[Navigation, Pagination]}
                          loop
                          pagination={{ clickable: true }}
                          slidesPerView={1}
                        >
                          {physicalMediaPreview.map((item) => {
                            const image = item;
                            return (
                              <SwiperSlide key={item}>
                                <div
                                  className="physicalMediaPreview"
                                  style={{
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundImage: `url(${image})`,
                                  }}
                                />
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </div>
                      <div>
                        <h5>
                          Artwork images
                          <span><small> (Slide Right Or Left To See)</small></span>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <form action="#" className="uploadFile-form mb-35">
                    <div>
                      <h4 className="title-create-item">
                        Upload physical images of the artwork
                        {' '}
                        <small style={{ fontWeight: '500' }}>
                          Upload 2 images: front and back.
                        </small>
                      </h4>
                      <span>
                        (PNG, JPG, GIF, WEBP or MP4. Max 200mb.)
                      </span>
                    </div>
                    <div>
                      <label
                        className="uploadFile-button"
                        htmlFor="file"
                      >
                        Upload file
                        <input
                          type="file"
                          name="file"
                          style={{ display: 'none' }}
                          id="file"
                          multiple
                          onChange={(e) => {
                            handleFileChange(e);
                          }}
                        />
                      </label>
                    </div>
                  </form>
                </div>

                <Button
                  id="mintBtn"
                  className="btn btn-primary mb-40"
                  data-toggle="modal"
                  data-target="#popup_bid_success"
                  data-dismiss="modal"
                  aria-label="Close"
                  disabled={mintButtonDisabled}
                  onClick={() => mintButtonClickHandler()}
                >
                  Mint
                </Button>
              </form>
            </div>
          </div>
        </PageWidthWrapper>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Footer />
    </div>
  );
}

export default CreateItem;
