import React, {useCallback, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import db from "../firebase";
import storage from "../storage";
import {get, ref, update} from "firebase/database";
import {useAccount} from "wagmi";
import Swal from "sweetalert2";
import {getDownloadURL, ref as SRef, uploadBytesResumable,} from "firebase/storage";
import Toggle from "react-styled-toggle";
import {InstagramLoginButton, TwitterLoginButton} from "react-social-login-buttons";

import {FaDiscord, FaFacebook, FaGlobeAfrica, FaInstagram, FaTiktok, FaTwitter, FaYoutube,} from "react-icons/fa";
import xTwitter from "../assets/images/svg/xTwitter.svg"

import auth from "../auth";
import {signInWithPopup, TwitterAuthProvider} from "firebase/auth";
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {
    setMembers,
    setAllUsers,
    setArtists} from "../redux/actions/userActions";


const EditProfile = () => {
  const nav = useNavigate();
  const consumerKey = "wle1Pu0uJSwJlGsK32U7Njdeh";
  const consmerSecret = "L5uoxeBQDW65vPuN1hxdF4xSeao5GpIbTp9CO4fT8zGrkLtxVl";
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [bio, setBio] = useState("");
    const [pdpLink, setPdpLink] = useState("");
    const [cover_link, setCover_link] = useState("");
    const [Facebook, setFacebook] = useState("");
    const [Instagram, setInstagram] = useState("");
    const [Twitter, setTwitter] = useState("");
    const [website, setWebsite] = useState("");
    const [profileType, setProfileType] = useState("");
    const [artistType, setArtistType] = useState("");
    const [socialMediaVerified, setSocialMediaVerified] = useState(false);
    const [artRiseAdminVerified, setArtRiseAdminVerified] = useState(false);
    const [accountTypeChecked, setAccountTypeChecked] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { address, isConnected } = useAccount();

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);
  const artistTypeOptions = [
      { value: 'Painter', label: 'Painter' },
      { value: 'Sculptor', label: 'Sculptor' },
      { value: 'Photographer', label: 'Photographer' },
      { value: 'Draftsman', label: 'Draftsman' },
  ];

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  async function getUserData(adr) {
    const ThisUserRef = ref(db, "users/" + adr);
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
        setName(dt?.name? dt?.name: "");
        setEmail(dt?.email ? dt?.email: "");
        setWalletAddress(dt?.walletAddress? dt?.walletAddress: "");
        setBio(dt?.bio? dt?.bio: "");
        setPdpLink(dt?.pdpLink? dt?.pdpLink: "");
        setCover_link(dt?.cover_link? dt?.cover_link: "");
        setFacebook(dt?.Facebook? dt?.Facebook: "");
        setInstagram(dt?.Instagram? dt?.Instagram: "");
        setTwitter(dt?.Twitter? dt?.Twitter: "");
        setWebsite(dt?.website? dt?.website: "");
        setProfileType(dt?.profileType? dt?.profileType: "");
        setArtistType(dt?.artistType? dt?.artistType: "");
        setSocialMediaVerified(dt?.socialMediaVerified? dt?.socialMediaVerified: false);
        setArtRiseAdminVerified(dt?.artRiseAdminVerified? dt?.artRiseAdminVerified: false);
        if (dt.profileType=== "artist") setAccountTypeChecked(true);
        else setAccountTypeChecked(false);
    });
  }

    async function updateProfile() {
        const UserKey = address ? address : localStorage.getItem("userId");
        const isArtist = profileType === 'artist';

        if (isArtist && socialMediaVerified) {
            await update(ref(db, "users/" + UserKey), {
                name: name,
                email: email,
                walletAddress: walletAddress,
                bio: bio,
                pdpLink: pdpLink,
                cover_link: cover_link,
                Facebook: Facebook,
                Instagram: Instagram,
                Twitter: Twitter,
                website: website,
                profileType: profileType,
                artistType: artistType,
                socialMediaVerified: socialMediaVerified,
                artRiseAdminVerified: artRiseAdminVerified,
            });
            await Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: "You are now part of the Artrise artists community. You can start creating your own collections and minting artworks.",
                confirmButtonText: "Let's go!",
            });
        } else if (isArtist && !socialMediaVerified) {
            await Swal.fire({
                icon: "error",
                title: "Failure!",
                text: "To switch into an artist profile, you should verify your account with Twitter or Instagram.",
                confirmButtonText: "Let's Verify!",
            });
        } else if (!isArtist) {
            await update(ref(db, "users/" + UserKey), {
                name: name,
                email: email,
                walletAddress: walletAddress,
                bio: bio,
                pdpLink: pdpLink,
                cover_link: cover_link,
                Facebook: Facebook,
                Instagram: Instagram,
                Twitter: Twitter,
                website: website,
                profileType: profileType,
                artistType: artistType,
                socialMediaVerified: socialMediaVerified,
                artRiseAdminVerified: artRiseAdminVerified,
            });
            await Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: "You have successfully updated your data.",
                confirmButtonText: "Let's go!",
            });
        }
        await localStorage.setItem("name", name);
        await localStorage.setItem("pdpLink", pdpLink);


        const ThisUserRef = ref(db, "users/" + UserKey);
        await get(ThisUserRef).then(async (snapshot) => {
            let dt = snapshot.val();
            setName(dt?.name ? dt?.name : "");
            setWalletAddress(dt?.walletAddress ? dt?.walletAddress : "");
            setPdpLink(dt?.pdpLink ? dt?.pdpLink : "");
            setCover_link(dt?.cover_link ? dt?.cover_link : "");
            setFacebook(dt?.Facebook ? dt?.Facebook : "");
            setInstagram(dt?.Instagram ? dt?.Instagram : "");
            setTwitter(dt?.Twitter ? dt?.Twitter : "");
            setProfileType(dt?.profileType ? dt?.profileType : "");
            setArtistType(dt?.artistType ? dt?.artistType : "");
            setSocialMediaVerified(dt?.socialMediaVerified ? dt?.socialMediaVerified : false);
            setArtRiseAdminVerified(dt?.artRiseAdminVerified ? dt?.artRiseAdminVerified : false);
        }).then(async () => {

            let members = [];
            let artists = [];
            let allUsers = [];
            const userRef = ref(db, 'users/');

            await get(userRef).then(async (snapshot) => {
                let dt = snapshot.val();
                for (let UserKey in dt) {
                    let a = dt[UserKey];
                    if (a?.socialMediaVerified && a?.profileType === "artist") {
                        let artistItem = {
                            userId: UserKey,
                            ...a
                        }
                        artists.push(artistItem);
                    } else if (!a?.socialMediaVerified) {
                        let memberItem = {
                            userId: UserKey,
                            ...a
                        }
                        members.push(memberItem);
                    }
                    let userItem = {
                        userId: UserKey,
                        ...a
                    }
                    allUsers.push(userItem)
                }
            })
            dispatch(setAllUsers({allUsers}));
            dispatch(setMembers({members}));
            dispatch(setArtists({artists}));
            if (profileType === "artist") {
                await nav("/displayProfile?artist=" + UserKey);
            } else if (profileType === "member") {
                await nav("/displayProfile?member=" + UserKey);
            } else {
                await nav("/");
            }
        })

        // setTimeout(function () {
        //     window.location.reload(true);
        // }, 0);
        // if (localStorage.getItem("profileType") === "artist") {
        //     await nav("/displayProfile?artist=" + UserKey);
        // }
        // else if (localStorage.getItem("profileType") === "member") {
        //     await nav("/displayProfile?member=" + UserKey);
        // }
        // else {
        //     await nav("/");
        // }
    }

    useEffect(() => {
        if (address) getUserData(address);
        else getUserData(localStorage.getItem("userId"));
    }, []);

    useEffect(() => {
        if(artistType) {
            const arrayOfTypes = artistType.split(/[,&]/).map(item => item.trim());
            const ArrayOfObjects = arrayOfTypes.map(item => ({
                value: item,
                label: item,
            }));
            setSelectedOptions(ArrayOfObjects);
        }
    }, [artistType]);

  const fileReader = new FileReader();

  async function updateProfilePicture(f) {
    const stroageRef = SRef(storage, `/users_pdp/${f.name}`);
    const uploadTask = uploadBytesResumable(stroageRef, f);
    document.getElementById("pdp").src =
      "https://cdn.dribbble.com/users/8769896/screenshots/16200531/8ee212dac057d412972e0c8cc164deee.gif";
    document.getElementById("submitBtn").disabled = true;
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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          document.getElementById("pdp").src = downloadURL;
          if(address){
              setPdpLink(downloadURL);
          }else{
              setPdpLink(downloadURL);
          }
        });
        document.getElementById("submitBtn").disabled = false;
      }
    );
  }

  async function updateCoverPicture(f) {
    const stroageRef = SRef(storage, `/coverImages/${f.name}`);
    const uploadTask = uploadBytesResumable(stroageRef, f);
    document.getElementById("cover").src =
      "https://cdn.dribbble.com/users/8769896/screenshots/16200531/8ee212dac057d412972e0c8cc164deee.gif";
    document.getElementById("submitBtn").disabled = true;
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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          document.getElementById("cover").src = downloadURL;
          if(address){
              setCover_link(downloadURL);
          }else{
              setCover_link(downloadURL);
          }
        });
        document.getElementById("submitBtn").disabled = false;
      }
    );
  }


  const authHandler = (err, data) => {};

  const handleCheckChange = (nextChecked) => {
    setAccountTypeChecked(nextChecked);
  };

    async function verifyAccount(adr,profileLink) {
        await update(ref(db, "users/" + adr), {
            verified: true,
            Twitter:`${profileLink}`
        });
    }

    const signInWithTwitter = async () => {
        const provider = new TwitterAuthProvider();
        signInWithPopup(auth, provider)
            .then((response) => {
                const rawUserInfo = response?._tokenResponse?.screenName;
                if(rawUserInfo) {
                    const profileLink = `https://twitter.com/${rawUserInfo}`;
                    setSocialMediaVerified(true);
                    setTwitter(profileLink);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const signInWithInstagram = async () => {
        const clientId = '276266121931752'; //instagram app id
        const redirectUri = encodeURIComponent('https://marketplace.artrise.io/');
        const popup = window.open(
            `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`,
            '_blank',
            'width=500,height=600'
        );
    };

    const handleSelectChange = (selectedOptionsInMultiSelect) => {
        const optionsArray = getSelectedString(selectedOptionsInMultiSelect);
        setArtistType(optionsArray);
        setSelectedOptions(selectedOptionsInMultiSelect);
    };

    const getSelectedString = (selectedOptionsInMultiSelectProps) => {
            const numSelected = selectedOptionsInMultiSelectProps.length;
            switch (numSelected) {
                case 0:
                    return 'Artist';
                case 1:
                    return selectedOptionsInMultiSelectProps[0].value;
                case 2:
                    return `${selectedOptionsInMultiSelectProps[0].value} & ${selectedOptionsInMultiSelectProps[1].value}`;
                case 3:
                    return `${selectedOptionsInMultiSelectProps[0].value}, ${selectedOptionsInMultiSelectProps[1].value} & ${selectedOptionsInMultiSelectProps[2].value}`;
                case 4:
                    return `${selectedOptionsInMultiSelectProps[0].value}, ${selectedOptionsInMultiSelectProps[1].value}, ${selectedOptionsInMultiSelectProps[2].value} & ${selectedOptionsInMultiSelectProps[3].value}`;
                default:
                    return '';
            }
        };

    return (
        <div>
            <HeaderStyle2/>
            <div className="tf-create-item tf-section">
                <div className="themesflat-container">
                    <div className="row profilePadding">
                        <div
                            className="col-xl-12 col-lg-12 col-md-12 col-12"
                            id="coverSection"
                        >
                            <div className="sc-card-profile text-center">
                                <div className="card-media">
                                    <img src={cover_link} id="cover" alt=""/>
                                </div>
                                <div id="upload-profile">
                                    <Link to="#" className="btn-upload">
                                        Upload New Photo{" "}
                                    </Link>
                                    <input
                                        id="cover-upload-img"
                                        type="file"
                                        name="profile"
                                        accept="image/*"
                                        required=""
                                        onChange={(e) => {
                                            updateCoverPicture(e.target.files[0]);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                            <div className="sc-card-profile text-center">
                                <div className="card-media">
                                    <img src={pdpLink} id="pdp" alt=""/>
                                </div>
                                <div id="upload-profile">
                                    <Link to="#" className="btn-upload">
                                        Upload New Photo{" "}
                                    </Link>
                                    <input
                                        id="tf-upload-img"
                                        type="file"
                                        name="profile"
                                        accept="image/*"
                                        required=""
                                        onChange={(e) => {
                                            updateProfilePicture(e.target.files[0]);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
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
                                                    setProfileType("artist");
                                                } else {
                                                    setAccountTypeChecked(e.target.checked);
                                                    setProfileType("member");
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
                                                    tabIndex="4"
                                                    rows="5"
                                                    defaultValue={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                ></textarea>
                                            </fieldset>
                                            {/*use the given bellow jsx code when enabling email notifiactions*/}
                                            {/*<fieldset>*/}
                                            {/*    <h5 className="emailNotifTitle">Email notifications</h5>*/}
                                            {/*    <h5 className="emailNotifText">*/}
                                            {/*        You can turn this service on to receive notifications*/}
                                            {/*        by Email about your activities on ARTRISE, last*/}
                                            {/*        upadtes, ressources & much more.*/}
                                            {/*    </h5>*/}
                                            {/*    <h5 className="emailNotifText">*/}
                                            {/*        Make sure your email address is set. Also take not*/}
                                            {/*        that, due to some Email service providers, our*/}
                                            {/*        notifications emails may end up in your Spam/Hidden*/}
                                            {/*        folder.*/}
                                            {/*    </h5>*/}
                                            {/*    <div className="emailNotifSwitchBox">*/}
                                            {/*        <Toggle*/}
                                            {/*            checked={emailNotifications}*/}
                                            {/*            onChange={(e) => {*/}
                                            {/*                setEmailNotifications(!emailNotifications);*/}
                                            {/*            }}*/}
                                            {/*            sliderHeight={30}*/}
                                            {/*            sliderWidth={30}*/}
                                            {/*            height={40}*/}
                                            {/*            width={80}*/}
                                            {/*        />*/}
                                            {/*    </div>*/}
                                            {/*</fieldset>*/}
                                        </div>
                                        <div className="info-social">
                                            {profileType === "artist" &&
                                                <>
                                                    <div style={{marginBottom: "10%"}}>
                                                        <h4 className="title-create-item">You are a</h4>
                                                        <Select className='multi-select'
                                                                options={artistTypeOptions}
                                                                isMulti
                                                                value={selectedOptions}
                                                                onChange={handleSelectChange}
                                                                placeholder="Select any..."
                                                        />
                                                    </div>
                                                    <h4 className="title-create-item">Your Social media</h4>
                                                    <div style={{maxWidth: "100%"}}>
                                                        <h4 className="title-infor-account">
                                                            Verify your account
                                                        </h4>
                                                        <div className='d-flex'>
                                                            <TwitterLoginButton
                                                                text={Twitter === "No Twitter added yet ..." || Twitter === "" || Twitter === " " ? "Verify with Twitter" : "Verified"}
                                                                icon= {() =><img src={xTwitter} alt="X" />}
                                                                activeStyle={{ background: "#2a2a2a"}}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if(Twitter === "No Twitter added yet ..." || Twitter === "" || Twitter === " "){signInWithTwitter()}
                                                                }}
                                                                style={Twitter === "No Twitter added yet ..." || Twitter === "" || Twitter === " " ?
                                                                    {cursor: "context-menu",fontSize: "16px",background: "black",
                                                                } : {background:"black",fontSize: "16px"}}
                                                            />
                                                            <InstagramLoginButton
                                                                text={Instagram === "No Instagram added yet ..." || Instagram === "" || Instagram === " " ? "Verify with Instagram" : "Verified"}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if(Instagram === "No Instagram added yet ..." || Instagram === "" || Instagram === " "){signInWithInstagram()}
                                                                }}
                                                                style={Instagram === "No Instagram added yet ..." || Instagram === "" || Instagram === " " ?
                                                                    { cursor: "context-menu",fontSize: "16px"} : {fontSize: "16px"}}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            <fieldset style={{marginTop: "5%"}}>
                                                <h4 className="title-infor-account">
                                                    <FaGlobeAfrica size={15}/> Website
                                                </h4>
                                                <input
                                                    type="text"
                                                    placeholder={website}
                                                    defaultValue={website}
                                                    onChange={(e) => setWebsite(e.target.value)}
                                                />
                                            </fieldset>

                                            <fieldset style={{marginTop: "5%"}}>
                                                <h4 className="title-infor-account">
                                                    <FaFacebook size={15}/>
                                                    Facebook
                                                </h4>
                                                <input
                                                    type="text"
                                                    placeholder={Facebook}
                                                    defaultValue={Facebook}
                                                    onChange={(e) => setFacebook(e.target.value)}
                                                />
                                            </fieldset>
                                            <fieldset style={{marginTop: "5%"}}>
                                                <h4 className="title-infor-account">
                                                    <FaInstagram size={15}/>
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
                                                    <FaTwitter size={15}/>
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
                                    <button
                                        className="tf-button-submit mg-t-15"
                                        id="submitBtn"
                                        onClick={updateProfile}
                                        type="button"
                                    >
                                        Update Profile
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
            <Footer/>
            </>
        </div>
        );
    };

export default EditProfile;
