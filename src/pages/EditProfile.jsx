import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, update } from 'firebase/database';
import { useAccount } from 'wagmi';
import Swal from 'sweetalert2';
import { getDownloadURL, ref as SRef, uploadBytesResumable } from 'firebase/storage';
import Toggle from 'react-styled-toggle';
import { InstagramLoginButton } from 'react-social-login-buttons';

import {
  FaFacebook, FaGlobeAfrica, FaInstagram, FaTwitter,
} from 'react-icons/fa';

import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../auth';
import storage from '../storage';
import db from '../firebase';
import Footer from '../components/footer/Footer';
import CoverImageSection from '../components/layouts/editProfile/CoverImageSection';
import CustomTwitterLoginButton from '../components/layouts/editProfile/CustomTwitterLoginButton';
import {
  FileInput,
  UploadButton,
  UploadSection,
} from '../components/layouts/editProfile/EditProfileStyles/CoverImageSection.styles';
import { fetchUsers } from '../utils/allUsersUtils';
import { fetchCurrentUser } from '../utils/currentUserUtils';
import { fetchLazyOwned } from '../utils/lazyOwnedUtils';

function EditProfile() {
  const nav = useNavigate();
  const currentUserId = useSelector((state) => state.usersReducer.currentUserId);
  const currentUserState = useSelector((state) => state.usersReducer.currentUser);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [bio, setBio] = useState('');
  const [pdpLink, setPdpLink] = useState('');
  const [coverLink, setCoverLink] = useState('');
  const [Facebook, setFacebook] = useState('');
  const [Instagram, setInstagram] = useState('');
  const [Twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');
  const [profileType, setProfileType] = useState('');
  const [artistType, setArtistType] = useState('');
  const [socialMediaVerified, setSocialMediaVerified] = useState(false);
  const [artRiseAdminVerified, setArtRiseAdminVerified] = useState(false);
  const [accountTypeChecked, setAccountTypeChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { address } = useAccount();

  const artistTypeOptions = useMemo(() => [
    {
      value: 'Painter',
      label: 'Painter',
    },
    {
      value: 'Sculptor',
      label: 'Sculptor',
    },
    {
      value: 'Photographer',
      label: 'Photographer',
    },
    {
      value: 'Draftsman',
      label: 'Draftsman',
    },
  ], []);

  const getUserData = useCallback(() => {
    if (currentUserState) {
      setName(currentUserState?.name ? currentUserState?.name : '');
      setEmail(currentUserState?.email ? currentUserState?.email : '');
      setWalletAddress(currentUserState?.walletAddress ? currentUserState?.walletAddress : '');
      setBio(currentUserState?.bio ? currentUserState?.bio : '');
      setPdpLink(currentUserState?.pdpLink ? currentUserState?.pdpLink : '');
      setCoverLink(currentUserState?.cover_link ? currentUserState?.cover_link : '');
      setFacebook(currentUserState?.Facebook ? currentUserState?.Facebook : '');
      setInstagram(currentUserState?.Instagram ? currentUserState?.Instagram : '');
      setTwitter(currentUserState?.Twitter ? currentUserState?.Twitter : '');
      setWebsite(currentUserState?.website ? currentUserState?.website : '');
      setProfileType(currentUserState?.profileType ? currentUserState?.profileType : '');
      setArtistType(currentUserState?.artistType ? currentUserState?.artistType : '');
      setSocialMediaVerified(currentUserState?.socialMediaVerified ? currentUserState?.socialMediaVerified : false);
      setArtRiseAdminVerified(currentUserState?.artRiseAdminVerified ? currentUserState?.artRiseAdminVerified : false);
      if (currentUserState.profileType === 'artist') {
        setAccountTypeChecked(true);
      } else {
        setAccountTypeChecked(false);
      }
    }
  }, [currentUserState]);

  const updateProfile = async () => {
    const UserKey = currentUserId || localStorage.getItem('userId');
    const isArtist = profileType === 'artist';

    if (isArtist && socialMediaVerified) {
      await update(ref(db, `users/${UserKey}`), {
        name,
        email,
        walletAddress,
        bio,
        pdpLink,
        cover_link: coverLink,
        Facebook,
        Instagram,
        Twitter,
        website,
        profileType,
        artistType,
        socialMediaVerified,
        artRiseAdminVerified,
      });
      await Swal.fire({
        icon: 'success',
        title: 'Congratulations!',
        text: 'You are now part of the Artrise artists community. You can start creating your own collections '
          + 'and minting artworks.',
        confirmButtonText: 'Let\'s go!',
      });
    } else if (isArtist && !socialMediaVerified) {
      await Swal.fire({
        icon: 'error',
        title: 'Failure!',
        text: 'To switch into an artist profile, you should verify your account with Twitter or Instagram.',
        confirmButtonText: 'Let\'s Verify!',
      });
    } else if (!isArtist) {
      await update(ref(db, `users/${UserKey}`), {
        name,
        email,
        walletAddress,
        bio,
        pdpLink,
        cover_link: coverLink,
        Facebook,
        Instagram,
        Twitter,
        website,
        profileType,
        artistType,
        socialMediaVerified,
        artRiseAdminVerified,
      });
      await Swal.fire({
        icon: 'success',
        title: 'Congratulations!',
        text: 'You have successfully updated your data.',
        confirmButtonText: 'Let\'s go!',
      });
    }
    await localStorage.setItem('name', name);
    await localStorage.setItem('pdpLink', pdpLink);

    if (currentUserId) {
      await fetchUsers(dispatch);
      await fetchCurrentUser(dispatch, currentUserId);
      await fetchLazyOwned(dispatch, currentUserId);
    }

    if (profileType === 'artist') {
      await nav(`/displayProfile?artist=${UserKey}`);
    } else if (profileType === 'member') {
      await nav(`/displayProfile?member=${UserKey}`);
    } else {
      await nav('/');
    }
  };

  useEffect(() => {
    if (currentUserState) {
      getUserData();
    } else {
      getUserData();
    }
  }, [currentUserState, getUserData]);

  useEffect(() => {
    if (artistType) {
      const arrayOfTypes = artistType.split(/[,&]/)
        .map((item) => item.trim());
      const ArrayOfObjects = arrayOfTypes.map((item) => ({
        value: item,
        label: item,
      }));
      setSelectedOptions(ArrayOfObjects);
    }
  }, [artistType]);

  const updateProfilePicture = async (f) => {
    const stroageRef = SRef(storage, `/users_pdp/${f.name}`);
    const uploadTask = uploadBytesResumable(stroageRef, f);
    document.getElementById('pdp').src = 'https://cdn.dribbble.com/users/8769896/screenshots/16200531/8ee212dac057d412972e0c8cc164deee.gif';
    document.getElementById('submitBtn').disabled = true;
    uploadTask.on(
      'state_changed',
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            document.getElementById('pdp').src = downloadURL;
            if (address) {
              setPdpLink(downloadURL);
            } else {
              setPdpLink(downloadURL);
            }
          });
        document.getElementById('submitBtn').disabled = false;
      },
    );
  };

  // const handleCoverPictureUpdate = (f) => {
  //   updateCoverPicture(f);
  // };

  const signInWithTwitter = useCallback(async () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        const { _tokenResponse: tokenResponse } = response;
        const rawUserInfo = tokenResponse?.screenName;
        if (rawUserInfo) {
          const profileLink = `https://twitter.com/${rawUserInfo}`;
          setSocialMediaVerified(true);
          setTwitter(profileLink);
        }
      })
      .catch(async (error) => {
        console.error(error);
        nav('/');
      });
  }, [nav]);

  const signInWithInstagram = async () => {
    const clientId = '276266121931752'; // instagram app id
    const redirectUri = encodeURIComponent('https://marketplace.artrise.io/');
    window.open(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`,
      '_blank',
      'width=500,height=600',
    );
  };

  const getSelectedString = (selectedOptionsInMultiSelectProps) => {
    const numSelected = selectedOptionsInMultiSelectProps.length;
    switch (numSelected) {
      case 0:
        return 'Artist';
      case 1:
        return selectedOptionsInMultiSelectProps[0].value;
      case 2:
        return `${selectedOptionsInMultiSelectProps[0].value} &
        ${selectedOptionsInMultiSelectProps[1].value}`;
      case 3:
        return `${selectedOptionsInMultiSelectProps[0].value},
        ${selectedOptionsInMultiSelectProps[1].value} &
         ${selectedOptionsInMultiSelectProps[2].value}`;
      case 4:
        return `${selectedOptionsInMultiSelectProps[0].value},
        ${selectedOptionsInMultiSelectProps[1].value},
         ${selectedOptionsInMultiSelectProps[2].value} &
          ${selectedOptionsInMultiSelectProps[3].value}`;
      default:
        return '';
    }
  };

  const handleSelectChange = (selectedOptionsInMultiSelect) => {
    const optionsArray = getSelectedString(selectedOptionsInMultiSelect);
    setArtistType(optionsArray);
    setSelectedOptions(selectedOptionsInMultiSelect);
  };

  return (
    <div>
      <div className="themesflat-container">
        <div className="row top-bottom-padding">

          <CoverImageSection
            coverLink={coverLink}
            setCoverLink={setCoverLink}
          />

          <UploadSection className="col-xl-3 col-lg-4 col-md-6 col-12">
            <div className="sc-card-profile text-center">
              <div className="card-media">
                <img src={pdpLink} id="pdp" alt="Unable to load User's Profile" />
              </div>
            </div>
            <UploadButton
              htmlFor="upload-profile"
              className="sc-button loadmore fl-button pri-3"
            >
              <span>Upload New Profile Photo</span>
            </UploadButton>

            <FileInput
              id="upload-profile"
              type="file"
              name="profile"
              accept="image/*"
              required=""
              onChange={(e) => {
                updateProfilePicture(e.target.files[0]);
              }}
            />

          </UploadSection>

          <div className="col-xl-9 col-lg-8 col-md-12 col-12">
            <div className="form-upload-profile">
              <div className="form-infor-profile">
                <div className="info-account accountTypeBox">
                  <h5>Member</h5>
                  <Toggle
                    checked={accountTypeChecked}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAccountTypeChecked(e.target.checked);
                        setProfileType('artist');
                      } else {
                        setAccountTypeChecked(e.target.checked);
                        setProfileType('member');
                      }
                    }}
                  />
                  <h5>Artist</h5>
                </div>

              </div>
              <form action="#" className="form-profile">
                <div className="form-infor-profile">
                  <div className="info-account">
                    <h4 className="title-create-item">Account info</h4>
                    <fieldset>
                      <h4 className="title-infor-account">Name</h4>
                      <input
                        type="text"
                        placeholder={name}
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={name}
                      />
                    </fieldset>
                    <fieldset>
                      <h4 className="title-infor-account">Email</h4>
                      <input
                        type="email"
                        placeholder={email}
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={email}
                      />
                    </fieldset>
                    <fieldset>
                      <h4 className="title-infor-account">Bio</h4>
                      <textarea
                        tabIndex="0"
                        rows="5"
                        defaultValue={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </fieldset>
                    <button
                      className="tf-button-submit mg-t-15"
                      id="submitBtn"
                      onClick={updateProfile}
                      type="button"
                    >
                      Update Profile
                    </button>
                    {/* use the given bellow jsx code when enabling email notifiactions */}
                    {/* <fieldset> */}
                    {/*    <h5 className="emailNotifTitle">Email notifications</h5> */}
                    {/*    <h5 className="emailNotifText"> */}
                    {/*        You can turn this service on to receive notifications */}
                    {/*        by Email about your activities on ARTRISE, last */}
                    {/*        upadtes, ressources & much more. */}
                    {/*    </h5> */}
                    {/*    <h5 className="emailNotifText"> */}
                    {/*        Make sure your email address is set. Also take not */}
                    {/*        that, due to some Email service providers, our */}
                    {/*        notifications emails may end up in your Spam/Hidden */}
                    {/*        folder. */}
                    {/*    </h5> */}
                    {/*    <div className="emailNotifSwitchBox"> */}
                    {/*        <Toggle */}
                    {/*            checked={emailNotifications} */}
                    {/*            onChange={(e) => { */}
                    {/*                setEmailNotifications(!emailNotifications); */}
                    {/*            }} */}
                    {/*            sliderHeight={30} */}
                    {/*            sliderWidth={30} */}
                    {/*            height={40} */}
                    {/*            width={80} */}
                    {/*        /> */}
                    {/*    </div> */}
                    {/* </fieldset> */}
                  </div>
                  <div className="info-social">
                    {profileType === 'artist' && (
                      <>
                        <div style={{ marginBottom: '10%' }}>
                          <h4 className="title-create-item">You are a</h4>
                          <Select
                            className="multi-select"
                            options={artistTypeOptions}
                            isMulti
                            value={selectedOptions}
                            onChange={handleSelectChange}
                            placeholder="Select any..."
                          />
                        </div>
                        <h4 className="title-create-item">Your Social media</h4>
                        <div style={{ maxWidth: '100%' }}>
                          <h4 className="title-infor-account">
                            Verify your account
                          </h4>
                          <div className="d-flex">
                            <CustomTwitterLoginButton Twitter={Twitter} signInWithTwitter={signInWithTwitter} />
                            <InstagramLoginButton
                              text={
                                Instagram === 'No Instagram added yet ...'
                                || Instagram === ''
                                || Instagram === ' '
                                  ? 'Verify with Instagram'
                                  : 'Verified'
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                if (
                                  Instagram === 'No Instagram added yet ...'
                                  || Instagram === ''
                                  || Instagram === ' '
                                ) {
                                  signInWithInstagram();
                                }
                              }}
                              style={
                                Instagram === 'No Instagram added yet ...'
                                || Instagram === ''
                                || Instagram === ' '
                                  ? {
                                    cursor: 'context-menu',
                                    fontSize: '16px',
                                  } : { fontSize: '16px' }
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <fieldset style={{ marginTop: '5%' }}>
                      <h4 className="title-infor-account">
                        <FaGlobeAfrica size={15} />
                        {' '}
                        Website
                      </h4>
                      <input
                        type="text"
                        placeholder={website}
                        defaultValue={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </fieldset>

                    <fieldset style={{ marginTop: '5%' }}>
                      <h4 className="title-infor-account">
                        <FaFacebook size={15} />
                        Facebook
                      </h4>
                      <input
                        type="text"
                        placeholder={Facebook}
                        defaultValue={Facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                      />
                    </fieldset>
                    <fieldset style={{ marginTop: '5%' }}>
                      <h4 className="title-infor-account">
                        <FaInstagram size={15} />
                        Instagram
                      </h4>
                      <input
                        type="text"
                        placeholder={Instagram}
                        defaultValue={Instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </fieldset>
                    <fieldset>
                      <h4 className="title-infor-account">
                        <FaTwitter size={15} />
                        Twitter
                      </h4>
                      <input
                        type="text"
                        placeholder={Twitter}
                        defaultValue={Twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                    </fieldset>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProfile;
