import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, ref, update } from 'firebase/database';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
  FaFacebook, FaInstagram, FaShareAlt, FaTwitter, FaUserPlus,
} from 'react-icons/fa';
import { SlOptionsVertical } from 'react-icons/sl';
import {
  handleTwitterIconClick,
  handleInstagramIconClick,
  handleFacebookIconClick,
} from '../../../services/DisplayProfileServices/SocialMediaIconsClickServices';
import {
  ArrayIdsProvider,
  ArrayProvider,
  FollowButtonTextProvider,
} from '../../../services/DisplayProfileServices/FollowFollowersServices';
import db from '../../../firebase';
import {
  setAllUsers, setArtists, setCurrentUser, setMembers, setSearchingArray,
} from '../../../redux/actions/userActions';
import { userDataStoreShape } from '../../types/user-type';
import { Button } from './ProfileDisplayStyles/DisplayProfileInfo.styles';

function DisplayProfileInfo(props) {
  const {
    artistData,
    allUsers,
    currentUser,
    currentUserId,
  } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedUserfollowers, setSelectedUserFollowers] = useState([]);
  const [selectedUserfollowing, setSelectedUserFollowing] = useState([]);

  const [currentUserfollowingIds, setCurrentUserFollowingIds] = useState([]);
  const [selectedUserfollowersIds, setSelectedUserFollowersIds] = useState([]);

  const [followButtonText, setFollowButtonText] = useState('');

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
      setFollowButtonText('');
    };
  }, [artistData, allUsers, currentUser, currentUserId]);

  async function fetchAllUsersForRedux() {
    try {
      // Fetch current user
      const currentUserSnapshot = await get(ref(db, `users/${currentUserId}`));
      const currentUserVal = currentUserSnapshot.val();
      dispatch(setCurrentUser({ currentUser: currentUserVal }));

      // Fetch all users
      const userRef = ref(db, 'users/');
      const snapshot = await get(userRef);
      const dt = snapshot.val();

      const artists = Object.keys(dt)
        .filter((userId) => dt[userId]?.socialMediaVerified && dt[userId]?.profileType === 'artist')
        .map((userId) => ({ userId, ...dt[userId] }));

      const members = Object.keys(dt)
        .filter((userId) => !dt[userId]?.socialMediaVerified)
        .map((userId) => ({ userId, ...dt[userId] }));

      const allUsersArray = Object.keys(dt)
        .map((userId) => ({ userId, ...dt[userId] }));

      dispatch(setAllUsers({ allUsers: allUsersArray }));
      dispatch(setMembers({ members }));
      dispatch(setArtists({ artists }));

      if (allUsersArray && allUsersArray.length > 0) {
        const searchingArray = allUsersArray.map((userItem) => ({
          name: userItem.name,
          id: userItem.userId,
          type: userItem.profileType || 'member',
        }));
        dispatch(setSearchingArray({ searchingArray }));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function followUnfollow() {
    if (followButtonText === 'Follow') {
      const tempSelectedUserFollowersIds = [...selectedUserfollowersIds, currentUserId];
      await update(ref(db, `users/${artistData?.userId}`), {
        followers: tempSelectedUserFollowersIds,
      })
        .catch((error) => {
          console.error(error);
          navigate('/');
        });

      const tempCurrentUserFollowingIds = [...currentUserfollowingIds, artistData?.userId];
      await update(ref(db, `users/${currentUserId}`), {
        following: tempCurrentUserFollowingIds,
      })
        .catch(() => {
          navigate('/');
        });

      await fetchAllUsersForRedux();

      setFollowButtonText('Unfollow');
    } else if (followButtonText === 'Unfollow') {
      const tempSelectedUserFollowersIds = selectedUserfollowersIds?.filter((e) => e !== currentUserId);
      await update(ref(db, `users/${artistData?.userId}`), {
        followers: tempSelectedUserFollowersIds,
      })
        .catch((error) => {
          console.error(error);
          navigate('/');
        });

      const tempCurrentUserFollowingIds = currentUserfollowingIds?.filter((e) => e !== artistData?.userId);
      await update(ref(db, `users/${currentUserId}`), {
        following: tempCurrentUserFollowingIds,
      })
        .then(async () => {
          const ThisUserRef = ref(db, `users/${currentUserId}`);
          await get(ThisUserRef)
            .then(async (snapshot) => {
              const currentUserSnapshotVal = snapshot.val();
              dispatch(setCurrentUser({ currentUser: currentUserSnapshotVal }));
            });
        })
        .catch(() => {
          navigate('/');
        });

      await fetchAllUsersForRedux();

      setFollowButtonText('Follow');
    } else if (followButtonText === 'Login') {
      navigate('/');
    } else if (followButtonText === 'Edit') {
      navigate('/edit-profile');
    }
  }

  function handleFollowersClick() {
    setShowFollowers(!showFollowers);
    handleShow();
  }

  function handleFollowingClick() {
    handleShow();
  }

  function generateUniqueId() {
    return uuidv4();
  }

  return (
    <>
      <div
        className="userCoverSection"
        id="userCover"
        style={{ backgroundImage: `url(${artistData?.cover_link})` }}
      />
      <div>
        <div className="pdpContainer">
          <div
            className={`pdpSpace ${artistData?.socialMediaVerified ? 'artistpdpSpace' : 'memberpdpSpace'} `}
            id="pdp"
          >
            <img src={artistData?.pdpLink} alt="" />
          </div>
        </div>
      </div>
      <div className="userDataContainer" style={{ marginBottom: '10px' }}>
        <h5 className="userName">{artistData?.name}</h5>
        <p className="userAttribution">
          {artistData?.socialMediaVerified === true
            ? artistData?.artistType || 'Artist'
            : 'Member'}
        </p>
        <div className="userSocialsContainer">
          <Button
            onClick={() => handleFacebookIconClick(artistData?.Facebook)}
            aria-labelledby="button-label-facebook"
          >
            <FaFacebook id="button-label-facebook" style={{ fontSize: '1.8em' }} />
          </Button>

          <Button
            onClick={() => handleTwitterIconClick(artistData?.Twitter)}
            aria-labelledby="button-label-twitter"
          >
            <FaTwitter id="button-label-twitter" style={{ fontSize: '1.8em' }} />
          </Button>
          <Button
            onClick={() => handleInstagramIconClick(artistData?.Instagram)}
            aria-labelledby="button-label-instagram"
          >
            <FaInstagram id="button-label-instagram" style={{ fontSize: '1.8em' }} />
          </Button>

        </div>
        <div className="folContainer">
          <Button
            className="ContainerofFollowers"
            onClick={() => {
              handleFollowersClick();
            }}
          >
            <h5 className="dataOfFollowers">{selectedUserfollowers?.length}</h5>
            <h5 className="titleOfFollowers">followers</h5>
          </Button>
          <Button
            type="button"
            className="ContainerofFollowing"
            onClick={() => {
              handleFollowingClick();
            }}
          >
            <h5 className="dataOfFollowing">{selectedUserfollowing?.length}</h5>
            <h5 className="titleOfFollowing">following</h5>
          </Button>
        </div>
        <div className="userButtonsContainer">
          <Button
            type="button"
            className="followUserBtn"
            onClick={() => {
              followUnfollow();
            }}
          >
            <FaUserPlus id="button-label-userPlus" style={{ fontSize: '1.8em' }} />
            <h5>{followButtonText}</h5>
          </Button>
          <div className="shareUserBtn">
            <FaShareAlt id="button-label-userPlus" style={{ fontSize: '1.8em' }} />
          </div>
          <div className="shareUserBtn">
            <SlOptionsVertical id="button-label-share" style={{ fontSize: '1.8em' }} />
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShowFollowers(false);
          handleClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{showFollowers ? <h3>Followers</h3> : <h3>Following</h3>}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingTop: '0px' }}>
          {showFollowers ? (
            selectedUserfollowers?.map((item) => (
              <button
                type="button"
                className="search-item"
                key={generateUniqueId()}
                onClick={() => {
                  setShowFollowers(false);
                  handleClose();
                  navigate(`/displayProfile?${item?.socialMediaVerified
                    ? 'artist'
                    : 'member'}=${item?.userId}`);
                }}
              >
                <h5>{item?.name}</h5>
                <p className="search-item-detail">{item.socialMediaVerified ? 'Artist' : 'Member'}</p>
              </button>
            ))
          ) : (
            selectedUserfollowing?.map((item) => (
              <button
                type="button"
                className="search-item"
                key={generateUniqueId()}
                onClick={() => {
                  setShowFollowers(false);
                  handleClose();
                  navigate(`/displayProfile?${item?.socialMediaVerified
                    ? 'artist'
                    : 'member'}=${item?.userId}`);
                }}
              >
                <h5>{item?.name}</h5>
                <p className="search-item-detail">{item?.socialMediaVerified ? 'Artist' : 'Member'}</p>
              </button>
            ))
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

DisplayProfileInfo.propTypes = {
  artistData: PropTypes.shape(userDataStoreShape) || PropTypes.object,

  allUsers: PropTypes.arrayOf(
    PropTypes.shape(userDataStoreShape) || PropTypes.object,
  ),
  currentUser: PropTypes.shape(userDataStoreShape) || PropTypes.object,

  currentUserId: PropTypes.string,
};

DisplayProfileInfo.defaultProps = {
  artistData: {},
  allUsers: [],
  currentUser: {
    following: [],
  },
  currentUserId: '',
};

export default DisplayProfileInfo;
