/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
import {
  useMetamask,
} from '@thirdweb-dev/react';
import { useAccount } from 'wagmi';
import {
  ref, get,
} from 'firebase/database';
import {
  ref as SRef,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import Toggle from 'react-styled-toggle';
import {
  Navigation, Pagination,
} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { ToastContainer, toast } from 'react-toastify';
import storage from '../storage';
import db from '../firebase';
import img1 from '../assets/images/box-item/image-box-6.jpg';
import Footer from '../components/footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import {useMediaQuery} from "react-responsive";
import {PageWidthWrapper} from "../components/layouts/createItem/Tokenize.styles";

const TraitForm = (tr, v) => ({
  trait_type: tr,
  trait_value: v,
});

function Tokenize() {
  const [title, setTitle] = useState('Artwork title');
  const [artistName, setArtistName] = useState('');
  const [description, setDescription] = useState('');
  const [collectionName, setCollectionName] = useState(
    'ARTRISE SHARED COLLECTION',
  );
  const [collectionCheckButton, setCollectionCheckButton] = useState(false);
  const [collectionDescription, setCollectionDescription] = useState('');
  const [supply, setSupply] = useState(1);
  const [media, setMedia] = useState();
  const [mediaPreview, setMediaPreview] = useState(img1);
  const [physicalMedia, setPhysicalMedia] = useState([]);
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  // const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });


  const [physicalMediaPreview, setPhysicalMediaPreview] = useState([]);
  const [traits, setTraits] = useState([
    TraitForm('Width', 'Value'),
    TraitForm('Length', 'Value'),
    TraitForm('Weight', 'Value'),
  ]);

  const { address, isConnected } = useAccount();
  const [isCreator, setIsCreator] = useState('');
  const [artistCollections, setArtistCollections] = useState([]);
  const [mintButtonDisabled, setMintButtonDisabled] = useState(false);

  async function getCreatorStatus() {
    const ThisUserRef = ref(db, `users/${address}`);
    await get(ThisUserRef).then(async (snapshot) => {
      const dt = snapshot.val();
      setIsCreator(dt.creator);
    });
  }

  const connect = useMetamask();

  const [bio, setBio] = useState('');

  async function getArtistDescription() {
    const artistId = localStorage.getItem('userId');
    const artistRef = ref(db, `users/${artistId}`);
    await get(artistRef).then((snapshot) => {
      const dt = snapshot.val();
      const { key } = snapshot;
      const { bio } = dt;
      const name = dt.displayName;
      if (bio && bio !== '' && bio !== ' ') {
        setBio(bio.toString());
        setArtistName(name.toString());
      }
    });
  }

  async function getArtistCollections() {
    const collectionsRef = ref(db, 'collections/');
    await get(collectionsRef).then((snapshot) => {
      const dt = snapshot.val();
      for (const i in dt) {
        const collection = dt[i];
        if (collection.owner === address) {
          setArtistCollections((current) => [...current, collection]);
        }
      }
    });
  }

  useEffect(() => {
    getArtistDescription();
    getArtistCollections();
    getCreatorStatus();
    connect();
  }, []);

  function addTrait() {
    // traitsList.push(TraitForm("Property", "Value"));
    setTraits([...traits, TraitForm('Property', 'Value')]);
  }

  function removeTrait(index) {
    setTraits(traits.filter((value, i) => i != index));
  }

  // async function mintingSingleNFT() {
  //   const metadata = {
  //     name: title,
  //     description,
  //     Image: media,
  //   };
  //
  //   if (isConnected && address) {
  //     try {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Congratulations',
  //         text: 'Your artwork has been submitted, and waiting for administration approval.',
  //       });
  //       // const tx = await contract.erc721.mintTo(address, metadata);
  //       // const rec = tx.receipt;
  //     } catch (error) {
  //       const errMsg = error.toString();
  //       if (errMsg.includes('requires a connected wallet')) {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Connect your wallet',
  //           text: 'Buying and bidding operations using cruptocurrencies\nrequire a connected wallet.',
  //         });
  //       } else if (errMsg.includes('user rejected transaction')) {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Rejected transaction',
  //           text: 'No worries, the transaction was rejected by the wallet owner.',
  //         });
  //       }
  //     }
  //   } else if (
  //     !isConnected
  //       || !address
  //       || isCreator == 'no'
  //       || isCreator == 'pending'
  //   ) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Waiting for approval !',
  //       text: 'Unfortunately, Your wallet address hasn\t been approved for minting on shared collection yet.\nContact support for further information.',
  //       confirmButtonText: "Let's go !",
  //     });
  //   }
  // }

  const traitsList = [
    TraitForm('Width', 'Value'),
    TraitForm('Length', 'Value'),
    TraitForm('Weight', 'Value'),
  ];

  async function handleFileChange(e) {
    // const imgs = Array.from(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];

      setPhysicalMedia((prevState) => [...prevState, newImage]);
      const newImageDisplay = URL.createObjectURL(e.target.files[i]);
      setPhysicalMediaPreview((prevState) => [...prevState, newImageDisplay]);
    }
  }

  async function uploadMainFile(f) {
    const pr = [];
    const newImageId = (
      Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
    ).toString();
    const stroageRef = SRef(storage, `/pendingArtworks/${newImageId}`);
    const uploadTask = uploadBytesResumable(stroageRef, f);
    pr.push(uploadTask);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
      },
      (error) => {
        console.log(error);
      },
      async () => {
        await getDownloadURL(stroageRef).then((url) => {
          localStorage.setItem('mainURL', url);
        });
      },
    );

    Promise.all(pr)
      .then(() => {
        console.log(mainMediaUrl);
        console.log(physicalMediaURLs);
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  }

  async function uploadPhysicalImages() {
    const promises = [];
    const urls = [];
    physicalMedia.map((img) => {
      const newImageId = (
        Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
      ).toString();
      const storageRef = SRef(storage, `/PAPI/${newImageId}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      promises.push(uploadTask);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
        },
        (error) => {
          console.error(error);
        },
        async () => {
          await getDownloadURL(storageRef).then((url) => {
            urls.push(url);
          });
        },
      );
    });
  }

  // async function createPendingArtwork() {
  //   if (title !== '' && artistName !== '' && description !== '' && media) {
  //     if (physicalMedia.length >= 0) {
  //       const artworksRef = ref(db, 'artworks/');
  //       const newArtworkId = (
  //         Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
  //       ).toString();
  //       await uploadMainFile(media);
  //       await uploadPhysicalImages();
  //     } else {
  //       await Swal.fire({
  //         icon: 'error',
  //         title: 'We need pictures of the physical artwork !',
  //         text: 'To approve the artwork, we need at least two pictures of the physical artwork.',
  //       });
  //     }
  //   } else {
  //     await Swal.fire({
  //       icon: 'error',
  //       title: 'Artwork data is not complete !',
  //       text: 'To approve the artwork, we need all the fields to be filled if possible.',
  //     });
  //   }
  // }

  async function mintButtonClickHandler() {
  setMintButtonDisabled(true);
  toast.info(
      "Uploading main NFT image to the IPFS ...",toastOptions
  );
  await uploadToIPFS(media);
  await uploadMultipleToIPFS(physicalMedia);
  let metadata = await createMetadata();
  let uri = await uploadMetadata(metadata);
  await createLazyMintingNFT(uri);
  }

  useEffect(() => {
    setCollectionName(artistCollections[0]?.name);
  }, [artistCollections]);

  return (
    <div className="create-item">
      <div className="d-flex flex-row, justify-content-center">
        <PageWidthWrapper isDeviceMobile={isDeviceMobile}>
          <div>
            <h2 className="tf-title style4 mg-bt-20 ourArtists">Tokenize</h2>
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
              <label className="uploadFile-button" htmlFor="physicalImage">Upload file</label>
              <input
                type="file"
                name="file"
                style={{ display: 'none' }}
                id="physicalImage"
                value={media ? media : ''}
                onChange={(e) => {
                  setMedia(e.target.files[0]);
                  setMediaPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
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
                <h4 className="title-create-item">Artist Name</h4>
                <input
                  type="text"
                  placeholder="Artwork Name"
                  value={artistName}
                  onChange={(e) => {
                    setArtistName(e.target.value);
                  }}
                />

                <h4 className="title-create-item">Artwork Description</h4>
                <textarea
                  placeholder="e.g. “This is a single NFT ...”"
                  value={description ? description : ' '}
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
                  }}
                />
                <h4 className="title-create-item">
                  The Artwork belongs to an Artist’s Collection?
                </h4>
                <div className="artisticBox">
                  <Toggle onChange={() => {
                    setCollectionCheckButton(!collectionCheckButton);
                  }}
                  />
                </div>
                {collectionCheckButton
                      && (
                      <>
                        <h4 className="title-create-item">
                          Collection name
                          {' '}
                          <small style={{ fontWeight: '500' }}>
                            This is the collection where your item will appear.
                          </small>
                        </h4>
                        <input
                          type="text"
                          placeholder="Collection Link"
                          value={collectionName || ''}
                          onChange={(e) => {
                            setCollectionName(e.target.value);
                          }}
                        />

                        <h4 className="title-create-item">
                          Collection Description
                        </h4>
                        <textarea
                          placeholder="Collection Description"
                          value={collectionDescription || ''}
                          onChange={(e) => {
                            setCollectionDescription(e.target.value);
                          }}
                        />

                        {/* <Dropdown> */}
                        {/*  <Dropdown.Toggle */}
                        {/*      id="collectionsList" */}
                        {/*      style={{ */}
                        {/*        width: "100%", */}
                        {/*        height: "fit-content", */}
                        {/*        padding: "1.5% 1% 1.5% 2%", */}
                        {/*        background: "transparent", */}
                        {/*        border: "solid 1px rgba(138, 138, 160, 0.3)", */}
                        {/*        borderRadius: "10px", */}
                        {/*        marginBottom: "3%", */}
                        {/*      }} */}
                        {/*  > */}
                        {/*    <h5 */}
                        {/*        style={{ */}
                        {/*          color: "#020202", */}
                        {/*          textAlign: "left", */}
                        {/*          fontSize: "1.4em", */}
                        {/*          fontWeight: "400", */}
                        {/*        }} */}
                        {/*    > */}
                        {/*      {collectionName ? collectionName : artistName ? `${artistName}'s Collection` : "Please Login to get the collection names"  } */}
                        {/*    </h5> */}
                        {/*  </Dropdown.Toggle> */}
                        {/*  <Dropdown.Menu style={{width: "100%"}}> */}
                        {/*    {artistCollections.map((collection, index) => { */}
                        {/*      return ( */}
                        {/*          <Dropdown.Item */}
                        {/*              key={index} */}
                        {/*              style={{ */}
                        {/*                height: "fit-content", */}
                        {/*                padding: "1.5% 1%", */}
                        {/*                marginBottom: "0px", */}
                        {/*              }} */}
                        {/*              onClick={() => { */}
                        {/*                setCollectionID(collection.address) */}
                        {/*                setCollectionName(collection.name); */}
                        {/*              }} */}
                        {/*          > */}
                        {/*            {collection.name} */}
                        {/*          </Dropdown.Item> */}
                        {/*      ); */}
                        {/*    })} */}
                        {/*  </Dropdown.Menu> */}
                        {/* </Dropdown> */}
                      </>
                      )}

                <h4 className="title-create-item">Artist Biography</h4>
                <textarea
                  placeholder={'Add Artist\'s Biography here...'}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                />

                <div className="row traitsWrapper">
                  <div className="traitsHeader">
                    <h5>properties</h5>
                    <div
                      className="addTraitBtn"
                      onClick={() => {
                        addTrait();
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div className="traitListWrapper">
                    {traits.map((property, index) => (
                      <div key={index} className="trait">
                        <div className="traitForm row">
                          <div className="col-5">
                            <input
                              type="text"
                              placeholder={property.trait_type}
                            />
                          </div>
                          <div className="col-5">
                            <input
                              type="text"
                              placeholder={property.trait_value}
                            />
                          </div>
                          <div className="col-2">
                            <div
                              className="removeTraitBtn"
                              onClick={() => {
                                removeTrait(index);
                              }}
                            >
                              x
                            </div>
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
                          {physicalMediaPreview.map((item, index) => {
                            const image = item;
                            return (
                              <SwiperSlide key={index}>
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
                      <h4 className="mb-4">Upload physical images of the artwork</h4>
                      <span>
                        (PNG, JPG, GIF, WEBP or MP4. Max 200mb.)
                      </span>
                    </div>
                    <div>
                      <label className="uploadFile-button" htmlFor="file">Upload file</label>
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
                  onClick={() => {
                    // mintButtonClickHandler()
                    toast.warn(
                      'The Ethereum mainnet is so congested at the moment, try later !',
                      {
                        position: 'top-left',

                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                      },
                    );
                  }}
                >
                  Mint to shared collection
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

export default Tokenize;
