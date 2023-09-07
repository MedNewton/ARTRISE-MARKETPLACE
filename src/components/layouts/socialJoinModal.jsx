import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useSDK } from "@thirdweb-dev/react";
import auth from "../../auth";
import db from "../../firebase";
import { ref, onValue, get, update, set, child } from "firebase/database";
import {
  TwitterAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialTwitter,
  LoginSocialApple,
} from "reactjs-social-login";

import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";

import Swal from "sweetalert2";

const SocialJoinModal = (props) => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);
  const [pdp, setPdp] = useState();
  const [accountType, setAccountType] = useState("");
  const [slug, setSlug] = useState("");
  const [referee, setReferee] = useState("");

  function checkForReferralCode() {
    let url = window.location.href;

    if (url.toString().includes("?")) {
      setReferee(url.toString().split("?ref=")[1]);
    } else {
      setReferee("none");
    }
  }

  useEffect(() => {
    checkForReferralCode();
  }, []);

  useEffect(() => {
    window.ire("identify", { customerId: localStorage.getItem("UserKey") });
  }, []);

  async function passwordlessLogin(snapshot) {
    let key = snapshot.key;
    localStorage.setItem("UserKey", snapshot.key);
    localStorage.setItem("name", snapshot.val().displayName);
    localStorage.setItem("pdpLink", snapshot.val().pdpLink);
    localStorage.setItem("followingYann", snapshot.val().followingYann);
    localStorage.setItem("slug", snapshot.val().slug);

    setPdp(snapshot.val().pdpLink);
    setAccountType(snapshot.val().accountType);
    setSlug(snapshot.val().slug);
    hide();
    hideParent();
  }

  async function checkUserExistsTwitter(adr, data) {
    const ThisUserRef = ref(db, "users/" + adr);
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
      if (dt == null) {
        console.log(window.ire);
        window.ire(
          "trackConversion",
          37268,
          {
            orderId: Math.floor(Math.random() * 10000000),
            customerId: adr,
          },
          {
            verifySiteDefinitionMatch: true,
          }
        );
        await set(ref(db, "users/" + adr), {
          name: data.fullName.toString(),
          displayName: data.screenName.toString(),
          referralCode: (Math.random() + 1).toString(36).substring(2),
          referrefBy: referee,
          accountType: localStorage.getItem("accountTypeChoice").toString(),
          creator: localStorage.getItem("creator").toString(),
          email: "No email yet ...",
          bio: "No Bio added yet ...",
          verified: "no",
          slug: (
            Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
          ).toString(),
          pdpLink: data.photoUrl.toString(),
          cover_link:
            "https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          website: "No url shared yet ...",
          Facebook: "No account shared yet ...",
          Instagram: "No account shared yet",
          Twitter: data.federatedId.toString(),
          Discord: "No account shared yet ...",
          Tiktok: "No account shared yet ...",
          Youtube: "No account shared yet ...",
          emailNotifications: false,
          followedArtists: {
            0: "res",
          },
          followedCollections: {
            0: "res",
          },
          likedListings: {
            0: "res",
          },
          following: {
            0: "res",
          },
          followers: {
            0: "res",
          },
          followingYann: false,
          notifications: {
            text: "Welcome to Artise",
            link: "",
            img: "",
            seen: false,
          },
        });
        hide();
        hideParent();
        Swal.fire({
          icon: "success",
          title: "Account created succesfully !",
          text: "Your account has been created succefully! Log in to access your profile.",
        });
      } else {
        hide();
        hideParent();
        Swal.fire({
          icon: "warning",
          title: "Account already exists !",
          text: "This Twitter account is already connected to an account on ARTRISE. Try logging in.",
        });
      }
    });
  }

  async function checkUserExistsGoogle(adr, data) {
    const ThisUserRef = ref(db, "users/" + adr);
    console.log(adr)
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
      if (dt == null) {
        await set(ref(db, "users/" + adr), {
          name: data.fullName.toString(),
          displayName: data.displayName.toString(),
          referralCode: (Math.random() + 1).toString(36).substring(2),
          referrefBy: referee,
          accountType: localStorage.getItem("accountTypeChoice").toString(),
          creator: localStorage.getItem("creator").toString(),
          email: data.email,
          bio: "No Bio added yet ...",
          verified: "no",
          slug: (
            Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
          ).toString(),
          pdpLink: data.photoUrl.toString(),
          cover_link:
            "https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          website: "No url shared yet ...",
          Facebook: "No account shared yet ...",
          Instagram: "No account shared yet",
          Twitter: "No account shared yet ...",
          Discord: "No account shared yet ...",
          Tiktok: "No account shared yet ...",
          Youtube: "No account shared yet ...",
          emailNotifications: false,
          followedArtists: {
            0: "res",
          },
          followedCollections: {
            0: "res",
          },
          likedListings: {
            0: "res",
          },
          following: {
            0: "res",
          },
          followers: {
            0: "res",
          },
          followingYann: false,
          notifications: {
            text: "Welcome to Artise",
            link: "",
            img: "",
            seen: false,
          },
        });
        window.ire(
          "trackConversion",
          37268,
          {
            orderId: adr,
            customerId: adr,
          },
          {
            verifySiteDefinitionMatch: true,
          }
        );
        hide();
        hideParent();
        Swal.fire({
          icon: "success",
          title: "Account created succesfully !",
          text: "Your account has been created succefully! Log in to access your profile.",
        });
      } else {
        hide();
        hideParent();
        Swal.fire({
          icon: "warning",
          title: "Account already exists !",
          text: "This Google account is already connected to an account on ARTRISE. Try logging in.",
        });
      }
    });
  }

  async function checkUserExistsFacebook(adr, data) {
    const ThisUserRef = ref(db, "users/" + adr);
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
      if (dt == null) {
        await set(ref(db, "users/" + adr), {
          name: data.name,
          displayName: data.name,
          referralCode: (Math.random() + 1).toString(36).substring(2),
          referrefBy: referee,
          accountType: localStorage.getItem("accountTypeChoice").toString(),
          creator: localStorage.getItem("creator").toString(),
          email: data.email,
          bio: "No Bio added yet ...",
          verified: "no",
          slug: (
            Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
          ).toString(),
          pdpLink: data.picture.data.url.toString(),
          cover_link:
            "https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          website: "No url shared yet ...",
          Facebook: "No account shared yet ...",
          Instagram: "No account shared yet",
          Twitter: "No account shared yet ...",
          Discord: "No account shared yet ...",
          Tiktok: "No account shared yet ...",
          Youtube: "No account shared yet ...",
          emailNotifications: false,
          followedArtists: {
            0: "res",
          },
          followedCollections: {
            0: "res",
          },
          likedListings: {
            0: "res",
          },
          following: {
            0: "res",
          },
          followers: {
            0: "res",
          },
          followingYann: false,
          notifications: {
            text: "Welcome to Artise",
            link: "",
            img: "",
            seen: false,
          },
        });
        window.ire(
          "trackConversion",
          37268,
          {
            orderId: adr,
            customerId: adr,
          },
          {
            verifySiteDefinitionMatch: true,
          }
        );
        hide();
        hideParent();
        Swal.fire({
          icon: "success",
          title: "Account created succesfully !",
          text: "Your account has been created succefully! Log in to access your profile.",
        });
      } else {
        hide();
        hideParent();
        Swal.fire({
          icon: "warning",
          title: "Account already exists !",
          text: "This Facebook account is already connected to an account on ARTRISE. Try logging in.",
        });
      }
    });
  }

  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        let twitterUserData = response._tokenResponse;
        console.log(twitterUserData);
        let twitterUserID = twitterUserData.localId;
        checkUserExistsTwitter(twitterUserID, twitterUserData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        let googleUserData = response._tokenResponse;
        console.log(googleUserData)
        let googleUserID = googleUserData.localId;
        checkUserExistsGoogle(googleUserID, googleUserData);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  /*const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        let facebookUserData = response._tokenResponse;
        console.log(facebookUserData);
        let facebookUserID = facebookUserData.localId;
        checkUserExistsFacebook(facebookUserID, facebookUserData);
      })
      .catch((error) => {
        console.log(error);
      });
  };*/

  function signInWithFacebook(response){
    console.log(response)
    let facebookUserData = response;
    let facebookUserID = facebookUserData.id;
    checkUserExistsFacebook(facebookUserID, facebookUserData);
  }


  const onLoginStart = useCallback(() => {
    //alert('login start')
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    //alert('logout success')
  }, []);

  const hide = props.onHide;
  const hideParent = props.hideParent;
  return (
    <Modal
      show={props.show}
      onHide={() => {
        hide();
        hideParent();
      }}
    >
      <Modal.Header closeButton></Modal.Header>

      <div
        className="modal-body space-y-20 pd-40"
        style={{ paddingTop: "10vh" }}
      >
        <GoogleLoginButton
          style={{ borderRadius: "20px" }}
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogle();
          }}
        />

        <LoginSocialFacebook
          appId="775659780546554"
          onResolve={({provider, data}) => {
            signInWithFacebook(data)
          }}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <FacebookLoginButton
            style={{
              marginTop: "2vh",
              marginBottom: "2vh",
              borderRadius: "20px",
            }}
          />
        </LoginSocialFacebook>

        <TwitterLoginButton
          onClick={(e) => {
            e.preventDefault();
            signInWithTwitter();
          }}
          style={{ borderRadius: "20px", marginBottom: "30%" }}
        />
      </div>
    </Modal>
  );
};

export default SocialJoinModal;
