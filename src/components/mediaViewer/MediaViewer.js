import React, {useState, useEffect} from 'react';
import placeHolderMainImage from "../../assets/images/box-item/collection-item-bottom-4.jpg"

const MediaViewer = ({mediaUrl}) => {
    const [isVideo, setIsVideo] = useState(false);
    const [isImage, setIsImage] = useState(false);

    useEffect(() => {
        fetch(mediaUrl)
            .then((response) => {
                const contentType = response.headers.get('Content-Type');
                if (contentType?.includes('video')) {
                    setIsVideo(true);
                    setIsImage(false);
                } else if (contentType?.includes('image')) {
                    setIsVideo(false);
                    setIsImage(true);
                }
            });
    }, [mediaUrl]);

    if (isVideo) {
        return (<video autoPlay={true} muted={true} loop={true}>
                    <source src={mediaUrl} type='video/mp4'/>
                    Your browser does not support the video tag.
                </video>
        );
    }

    if (isImage) {
        return (<img src={mediaUrl} alt="Media" style={{maxWidth: '100%'}}/>
        );
    }

    return <img src={placeHolderMainImage} alt='Artwork Image'/>;
};

export default MediaViewer;
