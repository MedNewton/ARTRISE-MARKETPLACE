import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useSDK } from "@thirdweb-dev/react";
import auth from "../../auth";
import db from "../../firebase";
import { ref, onValue, get, update, set, child } from "firebase/database";
import { TwitterAuthProvider, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
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

const SocialLoginModal = (props) => {
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

  async function passwordlessLoginTwitter(snapshot) {
    let key = snapshot.key;
    localStorage.setItem("UserKey", snapshot.key);
    localStorage.setItem("name", snapshot.val().displayName);
    localStorage.setItem("pdpLink", snapshot.val().pdpLink);
    localStorage.setItem("followingYann", snapshot.val().followingYann);
    localStorage.setItem("slug", snapshot.val().slug);
    localStorage.setItem("twitter", true)
    setPdp(snapshot.val().pdpLink);
    setAccountType(snapshot.val().accountType);
    setSlug(snapshot.val().slug)
    hide();
    hideParent();
  }

  async function passwordlessLoginFacebook(snapshot) {
    let key = snapshot.key;
    localStorage.setItem("UserKey", snapshot.key);
    localStorage.setItem("name", snapshot.val().displayName);
    localStorage.setItem("pdpLink", snapshot.val().pdpLink);
    localStorage.setItem("followingYann", snapshot.val().followingYann);
    localStorage.setItem("slug", snapshot.val().slug);
    localStorage.setItem("facebook", true)
    setPdp(snapshot.val().pdpLink);
    setAccountType(snapshot.val().accountType);
    setSlug(snapshot.val().slug)
    hide();
    hideParent();
  }

  async function passwordlessLoginGoogle(snapshot) {
    let key = snapshot.key;
    localStorage.setItem("UserKey", snapshot.key);
    localStorage.setItem("name", snapshot.val().displayName);
    localStorage.setItem("pdpLink", snapshot.val().pdpLink);
    localStorage.setItem("followingYann", snapshot.val().followingYann);
    localStorage.setItem("slug", snapshot.val().slug);
    localStorage.setItem("google", true)
    
    setPdp(snapshot.val().pdpLink);
    setAccountType(snapshot.val().accountType);
    setSlug(snapshot.val().slug)
    hide();
    hideParent();
  }


  async function checkUserExistsTwitter(adr, data) {
    const ThisUserRef = ref(db, "users/" + adr);
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
      if (dt == null) {
        hide();
        hideParent();
        Swal.fire({
          icon: "warning",
          title: "Account doesn\'t exists !",
          text: "This Twitter account is not connected to any account on ARTRISE. Try signing up.",
        });
      } else {
        passwordlessLoginTwitter(snapshot)
      }
    });
  }

  async function checkUserExistsGoogle(adr, data) {
    const ThisUserRef = ref(db, "users/" + adr);
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
      if (dt == null) {
        hide();
        hideParent();
        Swal.fire({
          icon: "warning",
          title: "Account doesn\'t exists !",
          text: "This Google account is not connected to any account on ARTRISE. Try signing up.",
        });
      } else {
        passwordlessLoginGoogle(snapshot)
      }
    });
  }

  async function checkUserExistsFacebook(adr, data) {
    const ThisUserRef = ref(db, "users/" + adr);
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
      if (dt == null) {
        hide();
        hideParent();
        Swal.fire({
          icon: "warning",
          title: "Account doesn\'t exists !",
          text: "This Facebook account is not connected to any account on ARTRISE. Try signing up.",
        });
      } else {
        passwordlessLoginFacebook(snapshot)
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
        
        let googleUserID = googleUserData.localId;
        checkUserExistsGoogle(googleUserID, googleUserData);
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  function signInWithFacebook(response){
    console.log(response)
    let facebookUserData = response.data;
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

      <div className="modal-body space-y-20 pd-40">
        
        <GoogleLoginButton style={{marginTop: "15vh", borderRadius: "20px"}} onClick={(e)=>{e.preventDefault();signInWithGoogle()}}/>

        <LoginSocialFacebook
        appId="775659780546554"
        onResolve={(response) => {
          signInWithFacebook(response)
        }}
        onReject={(error) => {
          console.log(error);
        }}
        >
          <FacebookLoginButton style={{marginTop: "2vh", marginBottom: "2vh", borderRadius: "20px"}}/>
        </LoginSocialFacebook>
        
        <TwitterLoginButton
          onClick={(e) => {
            e.preventDefault();
            signInWithTwitter();
          }}
          style={{marginBottom: "20vh", borderRadius: "20px"}}
        />
      </div>
    </Modal>
  );
};

export default SocialLoginModal;
