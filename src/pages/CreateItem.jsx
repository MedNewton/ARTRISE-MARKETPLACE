import React from "react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {Button} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import Countdown from "react-countdown";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import img1 from "../assets/images/box-item/image-box-6.jpg";
import avt from "../assets/images/avatar/avt-9.jpg";
import Swal from "sweetalert2";
import {
    useAddress,
    useContract,
    useMintNFT,
    useMetamask,
} from "@thirdweb-dev/react";
import {useAccount, useDisconnect, useSignMessage} from "wagmi";
import {signMessage} from "@wagmi/core";
import {useWeb3Modal} from "@web3modal/react";
import {ref, onValue, get, update, set, child} from "firebase/database";
import {
    ref as SRef,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import db from "../firebase";
import storage from "../storage";
import Toggle from "react-styled-toggle";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper";

import {Swiper, SwiperSlide} from "swiper/react";

import {useSwiper} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";


const TraitForm = (tr, v) => {
    return {
        trait_type: tr,
        trait_value: v,
    };
};

const toastOptions = {
    position: "top-left",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

const CreateItem = () => {
    const {contract} = useContract(
        "0x91FBfcDDa7FE1aD979C34dF707D2691FcD5663B0"
    );
    const {mutateAsync: mintNft, isLoading, error} = useMintNFT(contract);

    const {address, isConnected} = useAccount();
    const [isCreator, setIsCreator] = useState("");

    const connect = useMetamask();

    const adr = useAddress();
    const {accountAddress, isAccountConnected} = useAccount();

    const [sdk, setSdk] = useState();

    const [mintButtonDisabled, setMintButtonDisabled] = useState(false);

    const [title, setTitle] = useState("Artwork title");

    const [artistName, setArtistName] = useState("");
    const [artistID, setArtistID] = useState("");
    const [artistCollections, setArtistCollections] = useState([]);
    const [bio, setBio] = useState("");
    const [description, setDescription] = useState();
    const [collectionName, setCollectionName] = useState(
        "Choose your collection"
    );
    const [collectionID, setCollectionID] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const [supply, setSupply] = useState(1);
    const [media, setMedia] = useState();
    const [mediaPreview, setMediaPreview] = useState(img1);
    const [physicalMedia, setPhysicalMedia] = useState([]);

    const [physicalMediaPreview, setPhysicalMediaPreview] = useState([]);
    const [traits, setTraits] = useState([
        TraitForm("Width", "Value"),
        TraitForm("Length", "Value"),
        TraitForm("Weight", "Value"),
    ]);

    const [mainMediaUrl, setMainMediaUrl] = useState("");
    const [physicalMediaURLs, setPhysicalMediaURLs] = useState([]);

    const swiper = useSwiper();

    const [provider, setProvider] = useState();

    const [accounts, setAccounts] = useState([]);

    const [multipleFilesUrl, setMultipleFilesUrl] = useState("");
    const {signatureData, signatureError, isSignatureLoading, signMessage, signatureVariables} = useSignMessage()

    const [royaltiesPercentage, setRoyaltiesPercentage] = useState(10);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];


    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        async function getCreatorStatus() {
            const ThisUserRef = ref(db, "users/" + address);
            await get(ThisUserRef).then(async (snapshot) => {
                let dt = snapshot.val();
                setIsCreator(dt.creator);
            });
        }

        async function getArtistCollections() {
            let artistId = address;
            let collectionsRef = ref(db, "collections/");
            await get(collectionsRef).then((snapshot) => {
                let dt = snapshot.val();
                for (let i in dt) {
                    let collection = dt[i];
                    if (collection.owner === address) {
                        setArtistCollections((current) => [...current, collection]);
                    }
                }
            });
        }

        async function getArtistDescription() {
            let artistId = localStorage.getItem("UserKey");
            let artistRef = ref(db, "users/" + artistId);
            await get(artistRef).then((snapshot) => {
                let dt = snapshot.val();
                let key = snapshot.key;
                let bio = dt.bio;
                let name = dt.displayName;
                if (bio && bio != "" && bio != " ") {
                    setBio(bio.toString());
                    setArtistID(key.toString());
                    setArtistName(name.toString());
                }
            });
        }

        getCreatorStatus();
        getArtistCollections();
        getArtistDescription();

        connect();
    }, []);

    useEffect(() => {
        setCollectionID(artistCollections[0]?.address)
        setCollectionName(artistCollections[0]?.name);
    }, [artistCollections]);

    const fileReader = new FileReader();

    function addTrait() {
        //traitsList.push(TraitForm("Property", "Value"));
        setTraits([...traits, TraitForm("Property", "Value")]);
        console.log(traits);
    }

    function removeTrait(index) {
        setTraits(traits.filter((value, i) => i != index));
        console.log(traits);
    }

    async function handleFileChange(e) {
        let imgs = Array.from(e.target.files);
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            setPhysicalMedia((prevState) => [...prevState, newImage]);
            const newImageDisplay = URL.createObjectURL(e.target.files[i]);
            setPhysicalMediaPreview((prevState) => [...prevState, newImageDisplay]);
        }
    }

    async function uploadToIPFS(file) {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                        pinata_api_key: "60828f433db3b1676e12",
                        pinata_secret_api_key:
                            "95b607311bab336cf4506cc84805ead472dff424782b1a3838e61fa35534b6fc",
                    },
                }
            );
            localStorage.setItem(
                "mainMediaURL",
                `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
            );
            toast.info(
                "Uploading physical images to the IPFS ...",
                toastOptions
            );
            return response.data.IpfsHash;
        } catch (error) {
            console.error("error", error);
            throw error;
        }
    }

    async function uploadMultipleToIPFS(files) {
        try {
            const formData = new FormData();
            localStorage.setItem("physicalImagesURLs", "");
            let urls = "";
            for (let i = 0; i < files.length; i++) {
                let fd = new FormData();
                fd.append("file", files[i]);
                const response = await axios.post(
                    "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    fd,
                    {
                        headers: {
                            "Content-Type": `multipart/form-data; boundary=${fd._boundary}`,
                            pinata_api_key: "60828f433db3b1676e12",
                            pinata_secret_api_key:
                                "95b607311bab336cf4506cc84805ead472dff424782b1a3838e61fa35534b6fc",
                        },
                    }
                );
                urls =
                    urls +
                    "|" +
                    `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
                localStorage.setItem("physicalImagesURLs", urls);
            }
        } catch (error) {
            console.error("error", error);
            throw error;
        }
    }

    function createMetadata() {
        toast.info("Creating metadata ...", toastOptions);
        let urls = localStorage.getItem("physicalImagesURLs").split("|");
        urls.shift();
        console.log(urls);
        const physicalImages = urls.map((url, index) => ({
            image_title: `image ${index + 1}`,
            image_url: url,
        }));

        const metadata = {
            name: title,
            description: description,
            image: localStorage.getItem("mainMediaURL").toString(),
            external_link: externalLink,
            physical_images: physicalImages,
            attributes: traits,
        };

        console.log(metadata);
        return metadata;
    }

    async function uploadMetadata(metadata) {
        toast.info("Uploading metadata ...", toastOptions);
        const response = await axios.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            metadata,
            {
                headers: {
                    pinata_api_key: "60828f433db3b1676e12",
                    pinata_secret_api_key:
                        "95b607311bab336cf4506cc84805ead472dff424782b1a3838e61fa35534b6fc",
                },
            }
        );
        const metadataUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        localStorage.setItem('newURI', metadataUrl);
        return metadataUrl;
    }

    async function getCollectionID(){
        if (artistCollections.length === 0) {
            try {
                const newCollectionID = (
                    Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
                ).toString();
                const currentTime = new Date();
                const month = currentTime.getMonth() + 1;
                const year = currentTime.getFullYear();
                const createdAt = months[month] + " " + year.toString();
                await set(ref(db, "collections/" + newCollectionID), {
                    name: `${artistName}'s Collection`,
                    description: `${artistName}'s Collection Description`,
                    symbol: `${artistName[0].toUpperCase()}C`,
                    owner: address,
                    image: localStorage.getItem("mainMediaURL").toString(),
                    cover: localStorage.getItem("mainMediaURL").toString(),
                    artisticCollection: true,
                    address: newCollectionID,
                    createdAt: createdAt,
                })
                toast.success("Collection Created!", toastOptions);
                return newCollectionID;
            } catch (error) {
                console.log("error", error)
            }
        }else if(artistCollections.length > 0){
            return collectionID;
        }
    }
    async function createLazyMintingNFT(uri) {
        let newID = (Math.random() + 1).toString(36).substring(2);
        const artworksRef = ref(db, "artworks/" + newID);
        await signMessage({
            message:
                "Lazy minting \nThis action is signed by a public address wallet.\nThe asset generated by this action signature is not available for transfer of listing on secondary marketplaces, unless it has submitted a signed buying action "
                +
                "\nRarible Token ID : " + newID.toString()
                + "\nIPFS PUBLIC URI: " + localStorage.getItem("newURI")
        })
        toast.info("Minting ...", toastOptions);
        const collID = await getCollectionID();
        await set(artworksRef, {
            type: "lazyMinted",
            ipfsURI: localStorage.getItem("newURI"),
            owner: address.toString(),
            collection: collID,
            listed: "no"
        }).then(() => {
            toast.success("Minted ! redirecting you to homepage...", toastOptions);
            delay(8000);
            window.location.href = '/';
        })
    }

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

    return (
        <div className="create-item">
            <HeaderStyle2/>

            <div className="d-flex flex-row, justify-content-center">
                <div className="d-flex flex-column" style={{width: "60%"}}>
                    <div>
                        <h2 className="tf-title style4 mg-bt-20 ourArtists">Integrate</h2>
                        <h5 className="subTitleCreate mb-5">Integrate & turn your physical artwork into a hybrid
                            NFT</h5>
                    </div>

                    <div className="sc-card-product">
                        <div className="d-flex flex-column align-items-center">
                            <div className="card-media " style={{maxWidth: "40%"}}>
                                <img src={mediaPreview} alt=""/>
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
                                style={{display: "none"}}
                                id="physicalImage"
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

                                <h4 className="title-create-item">Artwork Description</h4>
                                <textarea
                                    placeholder="e.g. “This is a single NFT ...”"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                ></textarea>

                                <h4 className="title-create-item">
                                    External Link{" "}
                                    <small style={{fontWeight: "500"}}>
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
                                ></textarea>

                                <h4 className="title-create-item">
                                    Collection name{" "}
                                    <small style={{fontWeight: "500"}}>
                                        {"This is the collection where your item will appear."}
                                    </small>
                                </h4>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        id="collectionsList"
                                        style={{
                                            width: "100%",
                                            height: "fit-content",
                                            padding: "1.5% 1% 1.5% 2%",
                                            background: "transparent",
                                            border: "solid 1px rgba(138, 138, 160, 0.3)",
                                            borderRadius: "10px",
                                            marginBottom: "3%",
                                        }}
                                    >
                                        <h5
                                            style={{
                                                color: "#020202",
                                                textAlign: "left",
                                                fontSize: "1.4em",
                                                fontWeight: "400",
                                            }}
                                        >
                                            {collectionName ? collectionName : `${artistName}'s Collection`}
                                        </h5>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{width: "100%"}}>
                                        {artistCollections.map((collection, index) => {
                                            return (
                                                <Dropdown.Item
                                                    key={index}
                                                    style={{
                                                        height: "fit-content",
                                                        padding: "1.5% 1%",
                                                        marginBottom: "0px",
                                                    }}
                                                    onClick={() => {
                                                        setCollectionID(collection.address)
                                                        setCollectionName(collection.name);
                                                    }}
                                                >
                                                    {collection.name}
                                                </Dropdown.Item>
                                            );
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>

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
                                        {traits.map((property, index) => {
                                            return (
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
                                            );
                                        })}
                                    </div>
                                </div>

                                <h4 className="title-create-item">
                                    Unlockable content
                                </h4>
                                <div className="artisticBox">
                                    <Toggle checked={true} disabled/>
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

                                            <div className="card-media" style={{maxHeight: "fit-content"}}>
                                                <Swiper style={{width: "20vw"}}
                                                        modules={[Navigation, Pagination]}
                                                        loop
                                                        pagination={{clickable: true}}
                                                        slidesPerView={1}
                                                >
                                                    {physicalMediaPreview.map((item, index) => {
                                                        let image = item;
                                                        return (
                                                            <SwiperSlide key={index}>
                                                                <div
                                                                    className="physicalMediaPreview"
                                                                    style={{
                                                                        backgroundPosition: "center center",
                                                                        backgroundRepeat: "no-repeat",
                                                                        backgroundSize: "contain",
                                                                        backgroundImage: `url(${image})`
                                                                    }}
                                                                ></div>
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
                                                style={{display: "none"}}
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
                                    onClick={() => mintButtonClickHandler()}
                                >
                                    Mint
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
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
            <Footer/>
        </div>
    );
};

export default CreateItem;
