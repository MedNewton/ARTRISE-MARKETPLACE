import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import img1 from "../assets/images/box-item/image-box-6.jpg";
import avt from "../assets/images/avatar/avt-9.jpg";

import Swal from "sweetalert2";
import {
  useAddress,
  useContract,
  useMintNFT,
  useMetamask,
  useConnect,
} from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
import Toggle from "react-styled-toggle";

import db from "../firebase";
import { ref, onValue, get, update, set, child } from "firebase/database";
import storage from "../storage";
import {
  ref as SRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import CollectionSuccessModal from "../components/layouts/collectionSuccessModal";



const CreatePublicCollection = () => {
  

  const sdk = useSDK();

  const connect = useMetamask();

  const [bio, setBio] = useState("");

  async function getArtistDescription() {
    let artistId = localStorage.getItem("UserKey");
    let artistRef = ref(db, "users/" + artistId);
    await get(artistRef).then((snapshot) => {
      let dt = snapshot.val();
      let bio = dt.bio;
      if (bio && bio != "" && bio != " ") {
        setBio(bio.toString());
      }
    });
  }

  useEffect(() => {
    getArtistDescription();
    connect();
  }, []);

  const adr = useAddress();

  const { address, isConnected } = useAccount();

  function checkDeployMetadataError() {
    connect();
    let errorsExist;
    if (!title || title == "" || title == " " || title.length < 2) {
      Swal.fire({
        icon: "error",
        title: "Collection name error !",
        text: "The collection name cna't be empty.",
      });
      errorsExist = true;
    } else if (!symbol || symbol == "" || symbol == " ") {
      Swal.fire({
        icon: "error",
        title: "Collection symbol error !",
        text: "The collection symbol cna't be empty.",
      });
      errorsExist = true;
    } else if (
      !royaltiesRecipient ||
      royaltiesRecipient == "" ||
      royaltiesRecipient == " "
    ) {
      Swal.fire({
        icon: "error",
        title: "Royalties recipient error !",
        text: "The royalties recipient address cna't be empty.",
      });
      errorsExist = true;
    } else if (
      !royaltiesPercentage ||
      royaltiesPercentage == "" ||
      royaltiesPercentage == " "
    ) {
      Swal.fire({
        icon: "error",
        title: "Royalties percentage error !",
        text: "The royalties percentage cna't be empty.",
      });
      errorsExist = true;
    } else if (!isConnected || !adr) {
      Swal.fire({
        icon: "error",
        title: "No connected wallet !",
        text: "You need to connect a wallet in order to deploy the collection smart contrat.",
      });
      errorsExist = true;
    } else {
      errorsExist = false;
    }

    return errorsExist;
  }

  async function uploadMainMedia(f){
    const newFileID = (
      Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
    ).toString();
    const stroageRef = SRef(storage, `/collectionImages/${newFileID}`);
    const uploadTask = uploadBytesResumable(stroageRef, f);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
          console.log(downloadURL)
          setMediaURL(downloadURL)
        })
      }
    )
  }

  async function uploadCover(f){
    const newFileID = (
      Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
    ).toString();
    const stroageRef = SRef(storage, `/collectionCovers/${newFileID}`);
    const uploadTask = uploadBytesResumable(stroageRef, f);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
          
          setCoverURL(downloadURL)
        })
      }
    )
  }

  async function deployNFTCollection() {
    connect();
    let metadataErrors = checkDeployMetadataError();

    if (metadataErrors == false) {
      setLoadingOverlay(true)
      await uploadMainMedia(media);
      await uploadCover(cover);
      console.log(coverURL)
      console.log(mediaURL)
      const newCollectionID = (
        Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
      ).toString();
      await set(ref(db, "collections/" + newCollectionID), {
        "name": title,
        "description": description,
        "symbol": symbol,
        "owner": address,
        "image": mediaURL,
        "cover": coverURL,
        "artisticCollection": artisticCollection,
        "address": newCollectionID
      })
      setLoadingOverlay(false)
      Swal.fire({
        icon: "success",
        title: "Collection created !",
        text: "Your collection has been created on the ARTRISE public collection. Once approved, you will find your new collection in your profile.",
      }).then(()=>{
        window.location.href = "/"
      })
    }

    //await sdk.deployer.deployNFTCollection()
  }

  

  const [title, setTitle] = useState("Collection name");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState();
  const [externalLink, setExternalLink] = useState("");
  const [artisticCollection, setArtisticCollection] = useState(false);
  const [media, setMedia] = useState();
  const [mediaURL, setMediaURL] = useState()
  const [mediaPreview, setMediaPreview] = useState(img1);
  const [cover, setCover] = useState()
  const [coverURL, setCoverURL] = useState()
  const [coverPreview, setCoverPreview] = useState(img1)
  const [primarySalesRecipient, setPrimarySalesRecipient] = useState();
  const [royaltiesRecipient, setRoyaltiesRecipient] = useState(address.toString());
  const [royaltiesPercentage, setRoyaltiesPercentage] = useState(10);
  const [loadingOverlay, setLoadingOverlay] = useState(false)

  return (
    <div className="create-item">
      <HeaderStyle2 />

      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row " style={{ padding: "0px 3%" }}>
            <div
              className="col-md-12"
              style={{ marginBottom: "5%", marginTop: "2%" }}
            >
              <h2 className="tf-title style4 mg-bt-38 ourArtists">
                Create a collection
              </h2>
              <h5 className="subTitleCreate">Using Artrise smart contract</h5>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-8 col-8">
              <div className="sc-card-product">
                <h4 className="title-create-item">
                  Cover picture <small>(preview)</small>
                </h4>
                <div className="card-media collectionCoverPreview">
                  <img src={coverPreview} alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-4">
              <div className="sc-card-product">
                <h4 className="title-create-item">
                  Main picture <small>(preview)</small>
                </h4>
                <div className="card-media collectionCoverPreview">
                  <img src={mediaPreview} alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="form-create-item">
                <form action="#">
                  <h4 className="title-create-item">Upload cover picture</h4>
                  <label className="uploadFile">
                    <span className="filename">
                      PNG, JPG, WEBP or AVIF. Max 200mb.
                    </span>
                    <input
                      type="file"
                      className="inputfile form-control uploadNFTMediaBtn"
                      name="file"
                      onChange={(e) => {
                        setCover(e.target.files[0]);
                        setCoverPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </label>
                </form>
                <form action="#">
                  <h4 className="title-create-item">
                    Upload collection main picture
                  </h4>
                  <label className="uploadFile">
                    <span className="filename">
                      PNG, JPG, WEBP or AVIF. Max 200mb.
                    </span>
                    <input
                      type="file"
                      className="inputfile form-control uploadNFTMediaBtn"
                      name="file"
                      onChange={(e) => {
                        setMedia(e.target.files[0]);
                        setMediaPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </label>
                </form>
                <div className="flat-tabs tab-create-item">
                  <Tabs>
                    <TabList>
                      <Tab></Tab>
                    </TabList>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Collection Type</h4>
                        <div className="artisticBox">
                          <h4 className="title-create-item">
                            Personal Collection
                          </h4>
                          <Toggle
                            checked={artisticCollection}
                            onChange={(e) => {
                              setArtisticCollection(!artisticCollection);
                            }}
                          />
                          <h4 className="title-create-item">
                            Artistic Collection
                          </h4>
                        </div>
                        <h4 className="title-create-item">Name</h4>
                        <input
                          type="text"
                          placeholder="Collection name"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />

                        <h4 className="title-create-item">Symbol</h4>
                        <input
                          type="text"
                          placeholder="Collection symbol"
                          onChange={(e) => {
                            setSymbol(e.target.value);
                          }}
                        />

                        <h4 className="title-create-item">Description</h4>
                        <textarea
                          placeholder="e.g. “This is a single NFT ...”"
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        ></textarea>

                        <h4 className="title-create-item">Artist Biography</h4>
                        <textarea
                          placeholder={bio}
                          onChange={(e) => {
                            setBio(e.target.value);
                          }}
                        ></textarea>

                        <h4 className="title-create-item">
                          External Link{" "}
                          <small style={{ fontWeight: "500" }}>
                            (if available)
                          </small>
                        </h4>
                        <input
                          type="text"
                          placeholder="External Link"
                          onChange={(e) => {
                            setExternalLink(e.target.value);
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

                        <div
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
                        </div>
                      </form>
                    </TabPanel>
                    
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CollectionSuccessModal 
        show={loadingOverlay}
        onHide={()=>{setLoadingOverlay(false)}}
      />
    </div>
  );
};

export default CreatePublicCollection;
