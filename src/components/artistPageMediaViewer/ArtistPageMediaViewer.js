import React, {useState, useEffect} from 'react';
import cardItem1 from "../../assets/images/box-item/card-item-1.jpg";
import MediaViewer from "../mediaViewer/MediaViewer";

const ArtistPageMediaViewer = ({artworksArray}) => {
    const [artworksImagesArray, setArtworksImagesArray] = useState([]);

    useEffect(() => {
        if (artworksArray) {
            artworksArray.forEach((artworkURI) => {
                if (artworkURI.includes('http')) {
                    fetch(artworkURI).then(response => response.json())
                        .then((data) => {
                            const imageURL = data?.image;
                            if (imageURL.includes('http')) {
                                setArtworksImagesArray((prevState) => [...prevState, imageURL])
                            }
                        })
                }
            })
        }
        return () => {
            setArtworksImagesArray([]);
        }

    }, [artworksArray]);
    console.log("artworksImagesArray::", artworksImagesArray)

    if (artworksImagesArray) {
        return (
            <div className="artist-page-images-wrapper">
                <div className="left-media-box">
                    <MediaViewer mediaUrl={artworksImagesArray && artworksImagesArray[0]}/>
                </div>
                <div className="right-media-box">
                    <div className="top-right-media-section">
                        <MediaViewer
                            mediaUrl={artworksImagesArray[1] ? artworksImagesArray[1] : artworksImagesArray[0]}/>
                        <MediaViewer
                            mediaUrl={artworksImagesArray[2] ? artworksImagesArray[2] : artworksImagesArray[0]}/>
                    </div>
                    <div className="bottom-right-media-section">
                        <MediaViewer
                            mediaUrl={artworksImagesArray[3] ? artworksImagesArray[3] : artworksImagesArray[0]}/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="artist-page-images-wrapper">
            <div className="left-media-box">
                <img src={cardItem1} alt="Artwork Image"/>
            </div>
            <div className="right-media-box">
                <div className="top-right-media-section">
                    <img src={cardItem1} alt="Artwork Image"/>
                    <img src={cardItem1} alt="Artwork Image"/>
                </div>
                <div className="bottom-right-media-section">
                    <img src={cardItem1} alt="Artwork Image"/>
                </div>
            </div>
        </div>
    );
};

export default ArtistPageMediaViewer;
