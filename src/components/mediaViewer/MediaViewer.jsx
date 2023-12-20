import React, {useState, useEffect} from 'react';
import placeHolderMainImage from '../../assets/images/box-item/collection-item-bottom-4.jpg';
import PropTypes from "prop-types";

function MediaViewer({mediaUrl}) {
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
        return (
            <video autoPlay muted loop>
                <source src={mediaUrl} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        );
    }

    if (isImage) {
        return (<img src={mediaUrl} alt="Artwork data not available" style={{maxWidth: '100%'}}/>
        );
    }

    return <img src={placeHolderMainImage} alt="Artwork data not available"/>;
}

MediaViewer.propTypes = {
    mediaUrl: PropTypes.string,
};

export default MediaViewer;
