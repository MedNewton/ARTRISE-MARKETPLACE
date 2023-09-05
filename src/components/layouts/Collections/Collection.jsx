import React, {useEffect, useState} from "react";
import HeaderStyle2 from "../../header/HeaderStyle2";
import Footer from "../../footer/Footer";
import {useCollectionsContext} from "../../../Store/CollectionsContext";
import {useArtworkContext} from "../../../Store/ArtworkContext";

import DisplayArtworks from "../ProfileDisplay/DisplayArtworks";
const Collection = () => {

    const {collections} = useCollectionsContext();
    const {lazyListed} = useArtworkContext();

    const [cover, setCover] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [ownerImage, setOwnerImage] = useState("");
    const [collectionId, setCollectionId] = useState("");
    const [collectionArtworksIds, setCollectionArtworksIds] = useState([]);
    const [displayArtworks, setDisplayArtworks] = useState([]);

    async function getCollectionData(id) {

        for (let collection of collections) {
            console.log("inside for loop collection:", collection);
            if (collection.id === id) {
                setCover(collection.cover);
                setName(collection.name);
                setDescription(collection.description);
                setImage(collection.image);
                setOwnerId(collection.owner);
                setCreatedAt(collection.createdAt);
                setOwnerName(collection.owner_name);
                setOwnerImage(collection.owner_image);
                setCollectionId(collection.id);
                setCollectionArtworksIds(collection.artworks);
            }
        }
    }

    async function getArtworks() {
        for (let artworkId of collectionArtworksIds) {
            for (let artwork of lazyListed) {
                if (artwork.artworkId === artworkId) {
                    setDisplayArtworks((prevState) => [...prevState, artwork]);
                }
            }
        }
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        const queryParams = new URLSearchParams(url.search);
        if (queryParams.has("id")) {
            const collectionId = queryParams.get("id");
            getCollectionData(collectionId);
        } else {
            console.log("URL doesn't contain the collection id query parameter.");
        }
    }, []);

    useEffect(() => {
        getArtworks();
    }, [collectionArtworksIds, lazyListed])

    return (
        <div>
            <HeaderStyle2/>
            <div
                className="row collectionHeader"
                style={{backgroundImage: `url(${cover})`}}
            >
            </div>
            <div
                className="collection-page-Image"
                style={{backgroundImage: `url(${image})`}}
            >
                <img src="" className="collectionImg" alt=""/>
            </div>
                <div className='collection-page-wrapper'>
                    <div>
                        <h3>{name ? name : ""}</h3>
                    </div>
                    <div className='flex-row-align-center'>
                        <div className='flex-row-align-center'>
                            <p className='mg-r-12'>Artworks</p>
                            <h5>{collectionArtworksIds ? collectionArtworksIds.length.toString() : "0"}</h5>
                        </div>
                        <h4 style={{paddingLeft: '10px', paddingRight: '10px'}}>-</h4>
                        <div className='flex-row-align-center'>
                            <p className='mg-r-12'>Created at</p> <h5>{createdAt ? createdAt : ""}</h5>
                        </div>
                        <h4 style={{paddingLeft: '10px', paddingRight: '10px'}}>-</h4>
                        <div className='flex-row-align-center'>
                            <p  className='mg-r-12'>Creator fees</p> <h5>10%</h5>
                        </div>
                    </div>
                    <div className='flex-row-align-center'>
                        <p>{description? description: ""} </p>
                    </div>
                    <div>
                        <h3>Artworks</h3>
                    </div>
                </div>
            <div style={{marginTop: '20px'}}>
                {lazyListed && <DisplayArtworks data={displayArtworks}/>}
            </div>
            <Footer/>
        </div>
    );

};

export default Collection;
