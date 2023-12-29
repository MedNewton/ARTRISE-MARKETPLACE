import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    handleTwitterIconClick,
    handleInstagramIconClick,
    handleFacebookIconClick
} from '../../../services/DisplayProfileServices/SocialMediaIconsClickServices';
import {
    ArrayIdsProvider,
    ArrayProvider,
    FollowButtonTextProvider,
} from '../../../services/DisplayProfileServices/FollowFollowersServices';
import {get, ref, update} from "firebase/database";
import db from "../../../firebase";
import Modal from "react-bootstrap/Modal";
import {setAllUsers, setArtists, setCurrentUser, setMembers} from "../../../redux/actions/userActions";
import {useDispatch} from "react-redux";

const DisplayProfileInfo = ({artistData, allUsers, currentUser, currentUserId}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedUserfollowers, setSelectedUserFollowers] = useState([]);
    const [selectedUserfollowing, setSelectedUserFollowing] = useState([]);

    const [currentUserfollowingIds, setCurrentUserFollowingIds] = useState([]);
    const [selectedUserfollowersIds, setSelectedUserFollowersIds] = useState([]);

    const [followButtonText, setFollowButtonText] = useState("");

    const [show, setShow] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (currentUser && allUsers) {

            setCurrentUserFollowingIds(ArrayIdsProvider(currentUser?.following, allUsers));
        }
        if (artistData && allUsers) {
            setSelectedUserFollowers(ArrayProvider(artistData?.followers, allUsers));
            setSelectedUserFollowing(ArrayProvider(artistData?.following, allUsers));

            setSelectedUserFollowersIds(ArrayIdsProvider(artistData?.followers, allUsers));
        }
        setFollowButtonText(FollowButtonTextProvider(artistData, currentUser, currentUserId));
        //

        return () => {
            setSelectedUserFollowers([]);
            setSelectedUserFollowing([]);
            setCurrentUserFollowingIds([]);
            setSelectedUserFollowersIds([]);
            setFollowButtonText("");
        }
    }, [artistData, allUsers, currentUser, currentUserId]);

    async function followUnfollow() {
        if (followButtonText === "Follow") {
            const tempSelectedUserFollowersIds = [...selectedUserfollowersIds, currentUserId]
            await update(ref(db, "users/" + artistData?.userId), {
                followers: tempSelectedUserFollowersIds
            }).catch(error => {
                navigate(`/`);
            });

            const tempCurrentUserFollowingIds = [...currentUserfollowingIds, artistData?.userId]
            await update(ref(db, "users/" + currentUserId), {
                following: tempCurrentUserFollowingIds
            }).catch(() => {
                navigate(`/`);
            });

            await fetchAllUsersForRedux();

            setFollowButtonText("Unfollow");

        } else if (followButtonText === "Unfollow") {
            const tempSelectedUserFollowersIds = selectedUserfollowersIds?.filter(e => e !== currentUserId)
            await update(ref(db, "users/" + artistData?.userId), {
                followers: tempSelectedUserFollowersIds
            }).catch(error => {
                navigate(`/`);
            });

            const tempCurrentUserFollowingIds = currentUserfollowingIds?.filter(e => e !== artistData?.userId)
            await update(ref(db, "users/" + currentUserId), {
                following: tempCurrentUserFollowingIds
            }).then(async () => {
                const ThisUserRef = ref(db, 'users/' + currentUserId);
                await get(ThisUserRef).then(async (snapshot) => {
                    let currentUser = snapshot.val();
                    dispatch(setCurrentUser({currentUser}));
                });
            }).catch(() => {
                navigate(`/`);
            });

            await fetchAllUsersForRedux();

            setFollowButtonText("Follow");


        } else if (followButtonText === "Login") {
            navigate(`/`);
        } else if (followButtonText === "Edit") {
            navigate(`/edit-profile`);
        }
    }

    async function fetchAllUsersForRedux() {
        const ThisUserRef = ref(db, 'users/' + currentUserId);
        await get(ThisUserRef).then((snapshot) => {
            let currentUser = snapshot.val();
            dispatch(setCurrentUser({currentUser}));
        });

        let members = [];
        let artists = [];
        let allUsers = [];

        const userRef = ref(db, 'users/');
        get(userRef).then(async (snapshot) => {
            let dt = snapshot.val();
            for (let userId in dt) {
                let a = dt[userId];
                if (a?.socialMediaVerified && a?.profileType === "artist") {
                    let artistItem = {
                        userId: userId,
                        ...a
                    }
                    artists.push(artistItem);
                } else if (!a?.socialMediaVerified) {
                    let memberItem = {
                        userId: userId,
                        ...a
                    }
                    members.push(memberItem);
                }
                let userItem = {
                    userId: userId,
                    ...a
                }
                allUsers.push(userItem)
            }
            dispatch(setAllUsers({allUsers}));
            dispatch(setMembers({members}));
            dispatch(setArtists({artists}));
        })
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
                 style={{backgroundImage: `url(${artistData?.cover_link})`}}></div>
            <div>
                <div className="pdpContainer">
                    <div
                        className={`pdpSpace ${artistData?.socialMediaVerified ? "artistpdpSpace" : "memberpdpSpace"} `}
                        id="pdp">
                        <img src={artistData?.pdpLink} alt=""/>
                    </div>
                </div>
            </div>
            <div className="userDataContainer" style={{marginBottom: "2%"}}>
                <h5 className="userName">{artistData?.name}</h5>
                <p className="userAttribution">
                    {(artistData?.socialMediaVerified === true) ? (artistData?.artistType ? artistData?.artistType : "Artist") : "Member"}
                </p>
                <div className="userSocialsContainer">
                    <i onClick={() => handleFacebookIconClick(artistData?.Facebook)}
                       style={{fontSize: "1.8em"}}
                       className="fab fa-facebook"
                    ></i>
                    <i onClick={() => handleTwitterIconClick(artistData?.Twitter)}
                       style={{fontSize: "1.8em"}}
                       className="fab fa-twitter"
                    ></i>
                    <i onClick={() => handleInstagramIconClick(artistData?.Instagram)}
                       style={{fontSize: "1.8em"}}
                       className="fab fa-instagram"
                    ></i>
                </div>
                <div className="folContainer">
                    <div className="ContainerofFollowers" onClick={() => {
                        handleFollowersClick()
                    }}>
                        <h5 className="dataOfFollowers">{selectedUserfollowers?.length}</h5>
                        <h5 className="titleOfFollowers">followers</h5>
                    </div>
                    <div className="ContainerofFollowing" onClick={() => {
                        handleFollowingClick()
                    }}>
                        <h5 className="dataOfFollowing">{selectedUserfollowing?.length}</h5>
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
                        <Modal.Title>{showFollowers ? <h3>Followers</h3> : <h3>Following</h3>}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{paddingTop: '0px'}}>
                        {showFollowers ? (
                            selectedUserfollowers?.map((item, index) => (
                                <div className="search-item" key={index}
                                     onClick={() => {
                                         setShowFollowers(false);
                                         handleClose()
                                         navigate(`/displayProfile?${item?.socialMediaVerified ? 'artist' : 'member'}=${item?.userId}`)
                                     }
                                     }
                                >
                                    <h5>{item?.name}</h5>
                                    <p className="search-item-detail">{item.socialMediaVerified ? "Artist" : "Member"}</p>
                                </div>
                            ))
                        ) : (
                            selectedUserfollowing?.map((item, index) => (
                                <div className="search-item" key={index}
                                     onClick={() => {
                                         setShowFollowers(false);
                                         handleClose()
                                         navigate(`/displayProfile?${item?.socialMediaVerified ? 'artist' : 'member'}=${item?.userId}`)
                                     }
                                     }
                                >
                                    <h5>{item?.name}</h5>
                                    <p className="search-item-detail">{item?.socialMediaVerified ? "Artist" : "Member"}</p>
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