import React, { useCallback, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';

import Swal from 'sweetalert2';
import {
  useAddress,
  useMetamask,
} from '@thirdweb-dev/react';

import { useAccount } from 'wagmi';
import Toggle from 'react-styled-toggle';

import {
  ref, set,
} from 'firebase/database';
import {
  ref as SRef,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { useSelector } from 'react-redux';
import db from '../firebase';
import storage from '../storage';
import img1 from '../assets/images/box-item/image-box-6.jpg';
import Footer from '../components/footer/Footer';

function CreatePublicCollection() {
  const adr = useAddress();
  const currentUser = useSelector((state) => state.usersReducer.currentUser);

  const { address, isConnected } = useAccount();

  const [bio, setBio] = useState('');

  const [title, setTitle] = useState('Collection name');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState();
  const [artisticCollection, setArtisticCollection] = useState(false);
  const [media, setMedia] = useState();
  let mediaURL = '';
  const [mediaPreview, setMediaPreview] = useState(img1);
  const [cover, setCover] = useState('');
  let coverURL = '';
  const [coverPreview, setCoverPreview] = useState(img1);
  const [royaltiesRecipient, setRoyaltiesRecipient] = useState(
    address.toString(),
  );
  const connect = useMetamask();
  const royaltiesPercentage = 10;

  const months = [
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
  ];

  const getArtistDescription = useCallback(() => {
    if (currentUser?.bio && (currentUser?.bio !== '') && (currentUser?.bio !== ' ')) {
      setBio(currentUser?.bio?.toString());
    }
  }, [currentUser]);

  // async function getArtistDescription() {
  //   const artistId = localStorage.getItem('userId');
  //   const artistRef = ref(db, `users/${artistId}`);
  //   await get(artistRef).then((snapshot) => {
  //     const dt = snapshot.val();
  //     const { artistBio } = dt;
  //     if (artistBio && artistBio !== '' && artistBio !== ' ') {
  //       setBio(bio.toString());
  //     }
  //   });
  // }

  useEffect(() => {
    getArtistDescription();
    connect();
  }, [getArtistDescription, connect]);

  async function checkDeployMetadataError() {
    await connect();
    let errorsExist;
    if (!title || title === '' || title === ' ' || title.length < 2) {
      await Swal.fire({
        icon: 'error',
        title: 'Collection name error !',
        text: "The collection name can't be empty.",
      });
      errorsExist = true;
    } else if (!symbol || symbol === '' || symbol === ' ') {
      await Swal.fire({
        icon: 'error',
        title: 'Collection symbol error !',
        text: "The collection symbol cna't be empty.",
      });
      errorsExist = true;
    } else if (
      !royaltiesRecipient
      || royaltiesRecipient === ''
      || royaltiesRecipient === ' '
    ) {
      await Swal.fire({
        icon: 'error',
        title: 'Royalties recipient error !',
        text: "The royalties recipient address cna't be empty.",
      });
      errorsExist = true;
    } else if (
      !royaltiesPercentage
      || royaltiesPercentage === ''
      || royaltiesPercentage === ' '
    ) {
      await Swal.fire({
        icon: 'error',
        title: 'Royalties percentage error !',
        text: "The royalties percentage cna't be empty.",
      });
      errorsExist = true;
    } else if (!isConnected || !adr) {
      await Swal.fire({
        icon: 'error',
        title: 'No connected wallet !',
        text: 'You need to connect a wallet in order to deploy the collection smart contrat.',
      });
      errorsExist = true;
    } else {
      errorsExist = false;
    }

    return errorsExist;
  }

  async function uploadMainMedia(f) {
    const newFileID = (
      Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
    ).toString();
    const stroageRef = SRef(storage, `/collectionImages/${newFileID}`);
    await new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(stroageRef, f);
      uploadTask.on(
        'state_changed',

        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            mediaURL = downloadURL;
            // setMediaURL(downloadURL);
            resolve();
          }).catch((error) => {
            reject(error);
          });
        },
      );
    });
  }

  async function uploadCover(f) {
    const newFileID = (
      Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
    ).toString();
    const stroageRef = SRef(storage, `/collectionCovers/${newFileID}`);
    const uploadTask = uploadBytesResumable(stroageRef, f);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            coverURL = downloadURL;
            // setCoverURL(downloadURL);
            resolve();
          }).catch((error) => {
            reject(error);
          });
        },
      );
    });
  }

  async function deployNFTCollection() {
    await connect();
    const metadataErrors = await checkDeployMetadataError();
    if (metadataErrors === false) {
      try {
        await uploadMainMedia(media);
        await uploadCover(cover);
        const newCollectionID = (
          Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
        ).toString();
        const currentTime = new Date();
        const month = currentTime.getMonth() + 1;
        const year = currentTime.getFullYear();
        const createdAt = `${months[month]} ${year.toString()}`;
        await set(ref(db, `collections/${newCollectionID}`), {
          name: title,
          description,
          symbol,
          owner: address,
          image: mediaURL,
          cover: coverURL,
          artisticCollection,
          address: newCollectionID,
          createdAt,

        });

        Swal.fire({
          icon: 'success',
          title: 'Collection created !',
          text: 'Your collection has been created on the ARTRISE public collection. '
            + 'Once approved, you will find your new collection in your profile.',
        }).then(() => {
          window.location.href = '/';
        });
      } catch (error) {
        console.error(error);
      }
    }

    // await sdk.deployer.deployNFTCollection()
  }

  return (
    <div className="create-item">
      <div className="tf-create-item tf-section">
        <div
          className="themesflat-container"
          style={{
            maxWidth: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <div className="row ">
            <div
              className="col-md-12"
              style={{ marginBottom: '5%', marginTop: '2%' }}
            >
              <h2 className="tf-title style4 mg-bt-20 ourArtists">
                Create a collection
              </h2>
              <h5 className="subTitleCreate">
                Using Artrise smart contract
              </h5>
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div
                className="sc-card-product"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <h4 className="title-create-item">
                  Main picture
                  {' '}
                  <small>(preview)</small>
                </h4>
                <div className="card-media collectionCoverPreview" style={{ maxWidth: '40%' }}>
                  <img src={mediaPreview} alt="" />
                </div>
              </div>
              <form action="#" className="uploadFile-form mb-35">
                <div>
                  <h4 className="mb-4">
                    Upload collection main picture
                  </h4>
                  <span>
                    (PNG, JPG, WEBP or AVIF. Max 200mb)
                  </span>
                </div>
                <div>
                  <label className="uploadFile-button" htmlFor="file">
                    Upload Picture
                    <input
                      type="file"
                      name="file"
                      style={{ display: 'none' }}
                      id="file"
                      onChange={(e) => {
                        setMedia(e.target.files[0]);
                        setMediaPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </label>
                </div>
              </form>
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="sc-card-product">
                <h4 className="title-create-item">
                  Cover picture
                  {' '}
                  <small>(preview)</small>
                </h4>
                <div className="card-media collectionCoverPreview">
                  <img src={coverPreview} alt="" />
                </div>
              </div>

              <form action="#" className="uploadFile-form  mb-35">
                <div>
                  <h4 className="mb-4">
                    Upload cover picture
                  </h4>
                  <span>
                    (PNG, JPG, WEBP or AVIF. Max 200mb)
                  </span>
                </div>
                <div>
                  <label className="uploadFile-button" htmlFor="coverPicture">
                    Upload Picture
                    <input
                      type="file"
                      name="file"
                      style={{ display: 'none' }}
                      id="coverPicture"
                      onChange={(e) => {
                        setCover(e.target.files[0]);
                        setCoverPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </label>
                </div>
              </form>
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-12  flat-tabs tab-create-item">

              <form action="#">
                <h4 className="title-create-item">Collection Name</h4>
                <input
                  type="text"
                  placeholder="Collection name"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <h4 className="title-create-item">Collection Type</h4>
                <div className="artisticBox">
                  <h4>
                    Personal Collection
                  </h4>
                  <Toggle
                    checked={artisticCollection}
                    onChange={() => {
                      setArtisticCollection(!artisticCollection);
                    }}
                  />
                  <h4>
                    Artistic Collection
                  </h4>
                </div>

                <h4 className="title-create-item">Collection Symbol</h4>
                <input
                  type="text"
                  placeholder="Collection symbol"
                  onChange={(e) => {
                    setSymbol(e.target.value);
                  }}
                />

                <h4 className="title-create-item">Collection Description</h4>
                <textarea
                  placeholder="e.g. “This is a single NFT ...”"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

                <h4 className="title-create-item">Artist Biography</h4>
                <textarea
                  placeholder={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                />

                <div className="row">
                  <div className="col-8">
                    <h4 className="title-create-item">
                      Royalties recipient address
                    </h4>
                    <input
                      type="text"
                      placeholder="The address that will recieve royalties on secondary sales."
                      onChange={(e) => {
                        setRoyaltiesRecipient(e.target.value);
                      }}
                      defaultValue={address}
                    />
                  </div>
                  <div className="col-4">
                    <h4 className="title-create-item">
                      Royalties percentage
                    </h4>
                    <input
                      type="number"
                      placeholder="Percentage of royalties on every secondary sale"
                      className="percentageInput"
                      defaultValue={10}
                      disabled
                    />
                  </div>
                </div>

                <button
                  type="button"
                  id="mintBtn"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#popup_bid_success"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    deployNFTCollection();
                  }}
                >
                  Deploy and create collection
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePublicCollection;
