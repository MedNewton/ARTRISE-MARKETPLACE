import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    handleTwitterIconClick,
    handleInstagramIconClick,
    handleFacebookIconClick
} from '../../../services/DisplayProfileServices/SocialMediaIconsClickServices';
import {
    FollowButtonTextProvider,
    FollowersArrayProvider
} from '../../../services/DisplayProfileServices/FollowFollowersServices';
import {ref, update} from "firebase/database";
import db from "../../../firebase";
import Modal from "react-bootstrap/Modal";

const DisplayProfileInfo = ({artistData, allMemberArtists, currentUserData, currentUserKey}) => {
    console.log("artistDataartistData", artistData)
    const navigate = useNavigate();
    const [followButtonText, setFollowButtonText] = useState("");
    const [followersArray, setFollowersArray] = useState([]);
    const [followingArray, setFollowingArray] = useState([]);

    const [show, setShow] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const updatedFollowersList = FollowersArrayProvider(artistData.followers, allMemberArtists);
        setFollowersArray(updatedFollowersList);
        const updatedFollowingList = FollowersArrayProvider(artistData.following, allMemberArtists);
        setFollowingArray(updatedFollowingList);
        const updatedFollowButtonText = FollowButtonTextProvider(artistData, currentUserData, currentUserKey);
        setFollowButtonText(updatedFollowButtonText);
    }, [artistData, allMemberArtists, currentUserData, currentUserKey]);

    async function followUnfollow() {
        if (followButtonText === "Follow") {
            const tempFollowersArray = [...artistData.followers, currentUserKey]
            await update(ref(db, "users/" + artistData.userId), {
                followers: tempFollowersArray
            }).catch(error => {
                console.error("error", error);
            });
            const tempFollowingArray = [...currentUserData.following, artistData.userId]
            await update(ref(db, "users/" + currentUserKey), {
                following: tempFollowingArray
            }).catch(error => {
                console.error("error", error);
            });
            setFollowButtonText("Unfollow");
        } else if (followButtonText === "Unfollow") {
            const tempFollowersArray = artistData.followers.filter(e => e !== currentUserKey)
            await update(ref(db, "users/" + artistData.userId), {
                followers: tempFollowersArray
            }).catch(error => {
                console.error("error", error);
            });
            const tempFollowingArray = currentUserData?.following.filter(e => e !== artistData.userId)
            await update(ref(db, "users/" + currentUserKey), {
                following: tempFollowingArray
            }).catch(error => {
                console.error("error", error);
            });
            setFollowButtonText("Follow");
        } else if (followButtonText === "Login") {
            navigate(`/`);
        } else if (followButtonText === "Edit") {
            navigate(`/edit-profile`);
        }
    }

    function handleFollowersClick() {
        setShowFollowers(!showFollowers);
        handleShow();
    }

    function handleFollowingClick() {
        handleShow();
    }

    return (
        <>
            <div className="userCoverSection" id="userCover"
                 style={{backgroundImage: `url(${artistData.cover_link})`}}></div>
            <div>
                <div className="pdpContainer">
                    <div className={`pdpSpace ${artistData.verified ? "artistpdpSpace" : "memberpdpSpace"} `} id="pdp">
                        <img src={artistData.pdpLink} alt=""/>
                    </div>
                </div>
            </div>
            <div className="userDataContainer" style={{marginBottom: "2%"}}>
                <h5 className="userName">{artistData.name}</h5>
                <p className="userAttribution">
                    {(artistData.verified === "yes" || artistData.verified === true) ? (artistData.artistType ? artistData.artistType : "Artist") : "Member"}
                </p>
                <div className="userSocialsContainer">
                    <i onClick={() => handleFacebookIconClick(artistData.Facebook)}
                       style={{fontSize: "1.8em"}}
                       className="fab fa-facebook"
                    ></i>
                    <i onClick={() => handleTwitterIconClick(artistData.Twitter)}
                       style={{fontSize: "1.8em"}}
                       className="fab fa-twitter"
                    ></i>
                    <i onClick={() => handleInstagramIconClick(artistData.Instagram)}
                       style={{fontSize: "1.8em"}}
                       className="fab fa-instagram"
                    ></i>
                </div>
                <div className="folContainer">
                    <div className="ContainerofFollowers" onClick={() => {
                        handleFollowersClick()
                    }}>
                        <h5 className="dataOfFollowers">{followersArray.length}</h5>
                        <h5 className="titleOfFollowers">followers</h5>
                    </div>
                    <div className="ContainerofFollowing" onClick={() => {
                        handleFollowingClick()
                    }}>
                        <h5 className="dataOfFollowing">{followingArray.length}</h5>
                        <h5 className="titleOfFollowing">following</h5>
                    </div>
                </div>
                <div className="userButtonsContainer">
                    <div className="followUserBtn" onClick={followUnfollow}>
                        <i class="fa fa-user-plus"></i>
                        <h5>{followButtonText}</h5>
                    </div>
                    <div className="shareUserBtn">
                        <i className="fa fa-share-alt"></i>
                    </div>
                    <div className="shareUserBtn">
                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <>
                <Modal show={show} onHide={() => {
                    setShowFollowers(false);
                    handleClose()
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{showFollowers ? <h3>Followers</h3> : <h4>Following</h4>}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{paddingTop: '0px'}}>
                        {showFollowers ? (
                            followersArray?.map((item, index) => (
                                <div className="search-item" key={index}
                                     onClick={() => {
                                         setShowFollowers(false);
                                         handleClose()
                                         navigate(`/displayProfile?${item?.verified ? 'artist' : 'member'}=${item?.userId}`)
                                     }
                                     }
                                >
                                    <h5>{item.name}</h5>
                                    <p className="search-item-detail">{item.verified ? "Artist" : "Member"}</p>
                                </div>
                            ))
                        ) : (
                            followingArray?.map((item, index) => (
                                <div className="search-item" key={index}
                                     onClick={() => {
                                         setShowFollowers(false);
                                         handleClose()
                                         navigate(`/displayProfile?${item?.verified ? 'artist' : 'member'}=${item?.userId}`)
                                     }
                                     }
                                >
                                    <h5>{item.name}</h5>
                                    <p className="search-item-detail">{item.verified ? "Artist" : "Member"}</p>
                                </div>
                            ))
                        )}
                    </Modal.Body>
                </Modal>
            </>
        </>
    );
}
export default DisplayProfileInfo;