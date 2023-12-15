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
    window.ire("identify", { customerId: localStorage.getItem("userId") });
  }, []);

  async function passwordlessLogin(snapshot) {
    let key = snapshot.key;
    localStorage.setItem("slug", snapshot.val().slug)
    localStorage.setItem("profileType", snapshot.val().profileType)
    localStorage.setItem("userId", snapshot.key);
    localStorage.setItem("name", snapshot.val().name);
    localStorage.setItem("pdpLink", snapshot.val().pdpLink);

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
          name: data?.fullName?.toString() ? data?.fullName?.toString() : data?.screenName?.toString() ? data?.screenName?.toString() : "UNNAMED",
          email: "No Email added yet ...",
          walletAddress: "",
          bio: "No Bio added yet ...",
          pdpLink: data?.photoUrl?.toString() ? data?.photoUrl?.toString() : "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=",
          cover_link: "https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          Facebook: "No Facebook added yet ...",
          Instagram: "No Instagram added yet ...",
          Twitter: data?.federatedId?.toString(),
          website: "No Website added yet ...",
          profileType: "member",
          artistType: "member",
          followedCollections: [],
          followers: [],
          following: [],
          slug: (
              Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
          ).toString(),
          referralCode: (Math.random() + 1).toString(36).substring(2),
          referralBy: referee,
          socialMediaVerified: false,
          artRiseAdminVerified: false,
          artworks: [],
          artworkThumbNails: ["cardItem1","cardItem1","cardItem1","cardItem1"]
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
    await get(ThisUserRef).then(async (snapshot) => {
      let dt = snapshot.val();
      if (dt == null) {
        await set(ref(db, "users/" + adr), {
          name: data?.fullName?.toString() ? data?.fullName?.toString() : data?.displayName?.toString() ? data?.displayName?.toString() : "UNNAMED",
          email: data?.email ? data?.email : "No Email added yet ...",
          walletAddress: "",
          bio: "No Bio added yet ...",
          pdpLink: data?.photoUrl?.toString() ? data?.photoUrl?.toString() : "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=",
          cover_link: "https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          Facebook: "No Facebook added yet ...",
          Instagram: "No Instagram added yet ...",
          Twitter: data?.federatedId?.toString(),
          website: "No Website added yet ...",
          profileType: "member",
          artistType: "member",
          followedCollections: [],
          followers: [],
          following: [],
          slug: (
              Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
          ).toString(),
          referralCode: (Math.random() + 1).toString(36).substring(2),
          referralBy: referee,
          socialMediaVerified: false,
          artRiseAdminVerified: false,
          artworks: [],
          artworkThumbNails: ["cardItem1","cardItem1","cardItem1","cardItem1"]
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

          name: data?.name ? data?.name : "UNNAMED",
          email: data?.email ? data?.email : "No Email added yet ...",
          walletAddress: "",
          bio: "No Bio added yet ...",
          pdpLink: data?.picture?.data?.url?.toString() ? data?.picture?.data?.url?.toString() : "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=",
          cover_link: "https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          Facebook: "No Facebook added yet ...",
          Instagram: "No Instagram added yet ...",
          Twitter: "No Twitter added yet ...",
          website: "No Website added yet ...",
          profileType: "member",
          artistType: "member",
          followedCollections: [],
          followers: [],
          following: [],
          slug: (
              Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000
          ).toString(),
          referralCode: (Math.random() + 1).toString(36).substring(2),
          referralBy: referee,
          socialMediaVerified: false,
          artRiseAdminVerified: false,
          artworks: [],
          artworkThumbNails: ["cardItem1","cardItem1","cardItem1","cardItem1"]
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
        let twitterUserID = twitterUserData.localId;
        checkUserExistsTwitter(twitterUserID, twitterUserData);
      })
      .catch((error) => {
        console.error(error);
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
      .catch((error) => {
        console.error(error);
      });
  };

  /*const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        let facebookUserData = response._tokenResponse;
        let facebookUserID = facebookUserData.localId;
        checkUserExistsFacebook(facebookUserID, facebookUserData);
      })
      .catch((error) => {
        console.error(error);
      });
  };*/

  async function signInWithFacebook(){
    const provider = await new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
        .then((response)=>{
          let facebookUserData = response._tokenResponse;
          let facebookUserID = facebookUserData.localId;
          checkUserExistsFacebook(facebookUserID, facebookUserData);
        })
        .catch((error)=>{
          console.error(error);
        })

  //   <script>
  //   window.fbAsyncInit = function() {
  //     FB.init({
  //       appId      : '{your-app-id}',
  //       cookie     : true,
  //       xfbml      : true,
  //       version    : '{api-version}'
  //     });
  //
  //     FB.AppEvents.logPageView();
  //
  //   };
  //
  //   (function(d, s, id){
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {return;}
  //     js = d.createElement(s); js.id = id;
  //     js.src = "https://connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
  // </script>



    // <fb:login-button
    // scope="public_profile,email"
    // onlogin="checkLoginState();">
    //     </fb:login-button>
    //
    //
    //
    // <fb:login-button
    //     scope="public_profile,email"
    //     onlogin="checkLoginState();">
    // </fb:login-button>

  }

  //previous code
  // function signInWithFacebook(response){
  //   let facebookUserData = response;
  //   let facebookUserID = facebookUserData.id;
  //   checkUserExistsFacebook(facebookUserID, facebookUserData);
  // }

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
            console.error(error);
          }}
        >
          <FacebookLoginButton
              onClick={(e) => {
                e.preventDefault();
                signInWithFacebook();
              }}
            style={{
              marginTop: "10vh",
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
