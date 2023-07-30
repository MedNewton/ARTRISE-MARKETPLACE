import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link, useNavigate, withRouter } from "react-router-dom";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import db from "../firebase";
import storage from "../storage";
import { ref, onValue, get, update, set, child } from "firebase/database";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
import Swal from "sweetalert2";
import {
  ref as SRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import Toggle from "react-styled-toggle";
import { LoginSocialTwitter } from "reactjs-social-login";
import {InstagramLoginButton, TwitterLoginButton} from "react-social-login-buttons";

import {
  FaGlobeAfrica,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import auth from "../auth";
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";

const EditProfile = () => {
  const nav = useNavigate();

  const consumerKey = "wle1Pu0uJSwJlGsK32U7Njdeh";
  const consmerSecret = "L5uoxeBQDW65vPuN1hxdF4xSeao5GpIbTp9CO4fT8zGrkLtxVl";

  const [displayName, setDisplayName] = useState("");
  const [facebookLink, setFacbookLink] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [pdpLink, setPdpLink] = useState("");
  const [coverLink, setCoverLink] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [youtube, setYoutube] = useState("");
  const [website, setWebsite] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [instagram, setInstagram] = useState("");
  const [userBio, setUserBio] = useState("");
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountTypeChecked, setAccountTypeChecked] = useState(false);
  const [verified, setVerified] = useState("");
  const [emailNotifications, setEmailNotifications] = useState();
    const [artistType, setArtistType] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);

  const { address, isConnected } = useAccount();

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

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
      setDisplayName(dt.displayName);
      setUserEmail(dt.email);
      setUserBio(dt.bio);
      setPdpLink(dt.pdpLink);
      setCoverLink(dt.cover_link);
      setWebsite(dt.website);
      setFacbookLink(dt.Facebook);
      setInstagram(dt.Instagram);
      setTwitterLink(dt.Twitter);
      setDiscordLink(dt.Discord);
      setTiktok(dt.Tiktok);
      setYoutube(dt.Youtube);
      setName(dt.name);
      setVerified(dt.verified);
      setAccountType(dt.accountType);
      setEmailNotifications(dt.emailNotifications);
        setArtistType(dt?.artistType);
      if (dt.accountType == "artist") setAccountTypeChecked(true);
      else setAccountTypeChecked(false);
    });
  }

  async function updateProfile() {
    if(address){
      await update(ref(db, "users/" + address), {
        displayName: displayName,
        email: userEmail,
        bio: userBio,
        name: name,
        website: website,
        Facebook: facebookLink,
        Instagram: instagram,
        Twitter: twitterLink,
        Discord: discord,
        Tiktok: tiktok,
        Youtube: youtube,
        emailNotifications: emailNotifications,
      });
    }else{
      await update(ref(db, "users/" + localStorage.getItem("UserKey")), {
        displayName: displayName,
        email: userEmail,
        bio: userBio,
        name: name,
        website: website,
        Facebook: facebookLink,
        Instagram: instagram,
        Twitter: twitterLink,
        Discord: discord,
        Tiktok: tiktok,
        Youtube: youtube,
        emailNotifications: emailNotifications,
      });
    }
    localStorage.setItem("name", displayName);
    localStorage.setItem("pdpLink", pdpLink);
    nav(-1);
  }

  useEffect(() => {
    if(address) getUserData(address);
    else getUserData(localStorage.getItem("UserKey"));
  }, [twitterLink,artistType]);

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
            await update(ref(db, "users/" + address), {
              pdpLink: downloadURL,
            });
          }else{
            await update(ref(db, "users/" + localStorage.getItem("UserKey")), {
              pdpLink: downloadURL,
            });
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
            await update(ref(db, "users/" + address), {
              cover_link: downloadURL,
            });
          }else{
            await update(ref(db, "users/" + localStorage.getItem("UserKey")), {
              cover_link: downloadURL,
            });
          }
        });
        document.getElementById("submitBtn").disabled = false;
      }
    );
  }

  async function becomeArtist() {
    if(address){
      await update(ref(db, "users/" + address), {
        accountType: "artist",
        creator: "yes",
      });
    }else{
      await update(ref(db, "users/" + localStorage.getItem("UserKey")), {
        accountType: "artist",
        creator: "yes",
      });
    }

    setAccountType("artist");
    Swal.fire({
      icon: "success",
      title: "Gongratulations !",
      text: "You are now part of the Artrise artists community. You can start creating your own collections and minting artworks.",
      confirmButtonText: "Let's go !",
    });
  }

  async function becomeUser() {

    if(address){
      await update(ref(db, "users/" + address), {
        accountType: "user",
        creator: "no",
      });
    }else{
      await update(ref(db, "users/" + localStorage.getItem("UserKey")), {
        accountType: "user",
        creator: "no",
      });
    }
    

    setAccountType("user");
    Swal.fire({
      icon: "success",
      title: "Gongratulations !",
      text: "You are back to the Artrise community as a member.",
      confirmButtonText: "Let's go !",
    });
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
                const profileLink = `https://twitter.com/${rawUserInfo}`;
                if (address) verifyAccount(address, profileLink);
                else verifyAccount(localStorage.getItem("UserKey"), profileLink);
                setVerified(true);
                setTwitterLink(profileLink);
                Swal.fire({
                    icon: "success",
                    title: "Gongratulations !",
                    text: "Your account has been verified succefully.",
                    confirmButtonText: "Let's go !",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    async function handleOptionSelect (e) {
        if (address) {
            await update(ref(db, "users/" + address), {
                artistType:`${e.target.value}`
            });
        } else {
            await update(ref(db, "users/" + localStorage.getItem("UserKey")), {
                artistType:`${e.target.value}`,
            });
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
                                        <img src={coverLink} id="cover" alt=""/>
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
                                                        console.log("ffffff 1 toggle into become artist", e.target.checked)
                                                        becomeArtist();
                                                    } else {
                                                        setAccountTypeChecked(e.target.checked);
                                                        console.log("ffffff 2 toggle into become user", e.target.checked)
                                                        becomeUser();
                                                    }
                                                }}
                                            />
                                            <h5>Artist</h5>
                                        </div>
                                            <div className='info-account accountTypeBox'>
                                                <h5>You are a</h5>
                                                <select
                                                    style={{padding:'10px',borderRadius:'inherit'}}
                                                    // value={selectedOptions}
                                                    onChange={handleOptionSelect}
                                                >
                                                    <option style={{padding:"20px"}} value="painter">Painter</option>
                                                    <option style={{padding:"20px"}} value="sculptor">Sculptor</option>
                                                    <option style={{padding:"20px"}} value="photographer">Photographer</option>
                                                    <option style={{padding:"20px"}} value="draftsman">Draftsman</option>
                                                </select>
                                            </div>
                                    </div>
                                    //above it is my
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
                        <h4 className="title-infor-account">Username</h4>
                        <input
                          type="text"
                          placeholder={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          defaultValue={displayName}
                        />
                      </fieldset>

                                                <fieldset>
                                                    <h4 className="title-infor-account">Email</h4>
                                                    <input
                                                        type="email"
                                                        placeholder={userEmail}
                                                        onChange={(e) => setUserEmail(e.target.value)}
                                                        defaultValue={userEmail}
                                                    />
                                                </fieldset>
                                                <fieldset>
                                                    <h4 className="title-infor-account">Bio</h4>
                                                    <textarea
                                                        tabIndex="4"
                                                        rows="5"
                                                        defaultValue={userBio}
                                                        onChange={(e) => setUserBio(e.target.value)}
                                                    ></textarea>
                                                </fieldset>
                                                <fieldset>
                                                    <h5 className="emailNotifTitle">Email notifications</h5>
                                                    <h5 className="emailNotifText">
                                                        You can turn this service on to receive notifications
                                                        by Email about your activities on ARTRISE, last
                                                        upadtes, ressources & much more.
                                                    </h5>
                                                    <h5 className="emailNotifText">
                                                        Make sure your email address is set. Also take not
                                                        that, due to some Email service providers, our
                                                        notifications emails may end up in your Spam/Hidden
                                                        folder.
                                                    </h5>
                                                    <div className="emailNotifSwitchBox">
                                                        <Toggle
                                                            checked={emailNotifications}
                                                            onChange={(e) => {
                                                                setEmailNotifications(!emailNotifications);
                                                            }}
                                                            sliderHeight={30}
                                                            sliderWidth={30}
                                                            height={40}
                                                            width={80}
                                                        />
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div className="info-social">
                                                <h4 className="title-create-item">Your Social media</h4>
                                                <div style={{maxWidth: "100%"}}>
                                                    <h4 className="title-infor-account">
                                                        Verify yout account
                                                    </h4>
                                                    <div style={{display: "flex"}}>
                                                        {((verified === false) && (twitterLink === "No account shared yet ...")) ?


                                                            <TwitterLoginButton style={{
                                                                maxWidth: "auto",
                                                                fontSize: "16px",
                                                                alignText: "center"
                                                            }}
                                                                                text="Verify with Twitter"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    signInWithTwitter();
                                                                                }}
                                                            /> : ""
                                                        }{instagram === "No account shared yet" ?
                                                        <InstagramLoginButton
                                                            style={{maxWidth: "auto", fontSize: "16px"}}
                                                            text="Verify with Instagram"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                signInWithTwitter();
                                                            }}
                                                        /> : ""}
                                                    </div>
                                                </div>

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
                                                        placeholder={facebookLink}
                                                        defaultValue={facebookLink}
                                                        onChange={(e) => setFacbookLink(e.target.value)}
                                                    />
                                                </fieldset>
                                                <fieldset style={{marginTop: "5%"}}>
                                                    <h4 className="title-infor-account">
                                                        <FaInstagram size={15}/>
                                                        Instagram
                                                    </h4>
                                                    <input
                                                        type="text"
                                                        placeholder={instagram}
                                                        defaultValue={instagram}
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
                                                        placeholder={twitterLink}
                                                        defaultValue={twitterLink}
                                                        onChange={(e) => setTwitterLink(e.target.value)}
                                                    />
                                                </fieldset>
                                                <fieldset>
                                                    <h4 className="title-infor-account">
                                                        <FaDiscord size={15}/>
                                                        Discord
                                                    </h4>
                                                    <input
                                                        type="text"
                                                        placeholder={discordLink}
                                                        defaultValue={discordLink}
                                                        onChange={(e) => setDiscordLink(e.target.value)}
                                                    />
                                                </fieldset>
                                                <fieldset>
                                                    <h4 className="title-infor-account">
                                                        <FaTiktok size={15}/>
                                                        Tiktok
                                                    </h4>
                                                    <input
                                                        type="text"
                                                        placeholder={tiktok}
                                                        defaultValue={tiktok}
                                                        onChange={(e) => setTiktok(e.target.value)}
                                                    />
                                                </fieldset>
                                                <fieldset>
                                                    <h4 className="title-infor-account">
                                                        <FaYoutube size={15}/>
                                                        Youtube
                                                    </h4>
                                                    <input
                                                        type="text"
                                                        placeholder={youtube}
                                                        defaultValue={youtube}
                                                        onChange={(e) => setYoutube(e.target.value)}
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
                <Footer/>
            </div>
        );
    };

export default EditProfile;
