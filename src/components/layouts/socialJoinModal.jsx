import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import {
  ref, get, set,
} from 'firebase/database';
import {
  TwitterAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import {
  LoginSocialFacebook,
} from 'reactjs-social-login';

import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';

import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import db from '../../firebase';
import auth from '../../auth';

function SocialJoinModal(props) {
  const { onHide: propsOnHide, show: propsShow, hideParent } = props;
  // const [provider, setProvider] = useState('');
  // const [profile, setProfile] = useState(null);
  // const [pdp, setPdp] = useState();
  // const [accountType, setAccountType] = useState('');
  // const [slug, setSlug] = useState('');
  const [referee, setReferee] = useState('');

  function checkForReferralCode() {
    const url = window.location.href;

    if (url.toString().includes('?')) {
      setReferee(url.toString().split('?ref=')[1]);
    } else {
      setReferee('none');
    }
  }

  useEffect(() => {
    checkForReferralCode();
  }, []);

  useEffect(() => {
    window.ire('identify', { customerId: localStorage.getItem('userId') });
  }, []);

  // async function passwordlessLogin(snapshot) {
  //   localStorage.setItem('slug', snapshot.val().slug);
  //   localStorage.setItem('profileType', snapshot.val().profileType);
  //   localStorage.setItem('userId', snapshot.key);
  //   localStorage.setItem('name', snapshot.val().name);
  //   localStorage.setItem('pdpLink', snapshot.val().pdpLink);
  //
  //   // setPdp(snapshot.val().pdpLink);
  //   // setAccountType(snapshot.val().accountType);
  //   // setSlug(snapshot.val().slug);
  //   propsOnHide();
  //   hideParent();
  // }

  async function checkUserExistsTwitter(adr, data) {
    const ThisUserRef = ref(db, `users/${adr}`);
    await get(ThisUserRef).then(async (snapshot) => {
      const dt = snapshot.val();
      if (dt == null) {
        window.ire(
          'trackConversion',
          37268,
          {
            orderId: Math.floor(Math.random() * 10000000),
            customerId: adr,
          },
          {
            verifySiteDefinitionMatch: true,
          },
        );
        const fullNameOnTwitter = data?.fullName?.toString();
        const screenNameOnTwitter = data?.screenName?.toString();
        await set(ref(db, `users/${adr}`), {
          name:
            fullNameOnTwitter || (screenNameOnTwitter || 'UNNAMED'),
          email: 'No Email added yet ...',
          walletAddress: '',
          bio: 'No Bio added yet ...',
          pdpLink:
            data?.photoUrl?.toString()
              ? data?.photoUrl?.toString()
              : 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=',
          cover_link:
            'https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          Facebook: 'No Facebook added yet ...',
          Instagram: 'No Instagram added yet ...',
          Twitter: data?.federatedId?.toString(),
          website: 'No Website added yet ...',
          profileType: 'member',
          artistType: 'member',
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
          artworkThumbNails: ['cardItem1', 'cardItem1', 'cardItem1', 'cardItem1'],
        });
        propsOnHide();
        hideParent();
        Swal.fire({
          icon: 'success',
          title: 'Account created succesfully !',
          text: 'Your account has been created succefully! Log in to access your profile.',
        });
      } else {
        propsOnHide();
        hideParent();
        Swal.fire({
          icon: 'warning',
          title: 'Account already exists !',
          text: 'This Twitter account is already connected to an account on ARTRISE. Try logging in.',
        });
      }
    });
  }

  async function checkUserExistsGoogle(adr, data) {
    const ThisUserRef = ref(db, `users/${adr}`);
    await get(ThisUserRef).then(async (snapshot) => {
      const dt = snapshot.val();
      if (dt == null) {
        const fullNameOnGoogle = data?.fullName?.toString();
        const displayNameOnTwitter = data?.displayName?.toString();
        await set(ref(db, `users/${adr}`), {
          name:
            fullNameOnGoogle || (displayNameOnTwitter || 'UNNAMED'),
          email: data?.email ? data?.email : 'No Email added yet ...',
          walletAddress: '',
          bio: 'No Bio added yet ...',
          pdpLink:
            data?.photoUrl?.toString()
              ? data?.photoUrl?.toString()
              : 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=',
          cover_link:
            'https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          Facebook: 'No Facebook added yet ...',
          Instagram: 'No Instagram added yet ...',
          Twitter: data?.federatedId?.toString(),
          website: 'No Website added yet ...',
          profileType: 'member',
          artistType: 'member',
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
          artworkThumbNails: ['cardItem1', 'cardItem1', 'cardItem1', 'cardItem1'],
        });
        window.ire(
          'trackConversion',
          37268,
          {
            orderId: adr,
            customerId: adr,
          },
          {
            verifySiteDefinitionMatch: true,
          },
        );
        propsOnHide();
        hideParent();
        Swal.fire({
          icon: 'success',
          title: 'Account created succesfully !',
          text: 'Your account has been created succefully! Log in to access your profile.',
        });
      } else {
        propsOnHide();
        hideParent();
        Swal.fire({
          icon: 'warning',
          title: 'Account already exists !',
          text: 'This Google account is already connected to an account on ARTRISE. Try logging in.',
        });
      }
    });
  }

  async function checkUserExistsFacebook(adr, data) {
    const ThisUserRef = ref(db, `users/${adr}`);
    await get(ThisUserRef).then(async (snapshot) => {
      const dt = snapshot.val();
      if (dt == null) {
        await set(ref(db, `users/${adr}`), {

          name: data?.name ? data?.name : 'UNNAMED',
          email: data?.email ? data?.email : 'No Email added yet ...',
          walletAddress: '',
          bio: 'No Bio added yet ...',
          pdpLink:
            data?.picture?.data?.url?.toString()
              ? data?.picture?.data?.url?.toString()
              : 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=',
          cover_link: 'https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          Facebook: 'No Facebook added yet ...',
          Instagram: 'No Instagram added yet ...',
          Twitter: 'No Twitter added yet ...',
          website: 'No Website added yet ...',
          profileType: 'member',
          artistType: 'member',
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
          artworkThumbNails: ['cardItem1', 'cardItem1', 'cardItem1', 'cardItem1'],
        });
        window.ire(
          'trackConversion',
          37268,
          {
            orderId: adr,
            customerId: adr,
          },
          {
            verifySiteDefinitionMatch: true,
          },
        );
        propsOnHide();
        hideParent();
        Swal.fire({
          icon: 'success',
          title: 'Account created succesfully !',
          text: 'Your account has been created succefully! Log in to access your profile.',
        });
      } else {
        propsOnHide();
        hideParent();
        Swal.fire({
          icon: 'warning',
          title: 'Account already exists !',
          text: 'This Facebook account is already connected to an account on ARTRISE. Try logging in.',
        });
      }
    });
  }

  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        const { _tokenResponse: twitterUserData } = response;
        // const twitterUserData = response._tokenResponse;
        const twitterUserID = twitterUserData.localId;
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
        const { _tokenResponse: googleUserData } = response;
        // const googleUserData = response._tokenResponse;
        const googleUserID = googleUserData.localId;
        checkUserExistsGoogle(googleUserID, googleUserData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* const signInWithFacebook = async () => {
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
  }; */

  async function signInWithFacebook() {
    const provider = await new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then((response) => {
        const { _tokenResponse: facebookUserData } = response;
        // const facebookUserData = response._tokenResponse;
        const facebookUserID = facebookUserData.localId;
        checkUserExistsFacebook(facebookUserID, facebookUserData);
      })
      .catch((error) => {
        console.error(error);
      });

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

  // previous code
  // function signInWithFacebook(response){
  //   let facebookUserData = response;
  //   let facebookUserID = facebookUserData.id;
  //   checkUserExistsFacebook(facebookUserID, facebookUserData);
  // }

  // const onLoginStart = useCallback(() => {
  //   // alert('login start')
  // }, []);

  // const onLogoutSuccess = useCallback(() => {
  //   setProfile(null);
  //   setProvider('');
  //   // alert('logout success')
  // }, []);

  // const hide = props.onHide;
  // const { hideParent } = props;
  return (
    <Modal
      show={propsShow}
      onHide={() => {
        propsOnHide();
        hideParent();
      }}
    >
      <Modal.Header closeButton />

      <div
        className="modal-body space-y-20 pd-40"
        style={{ paddingTop: '10vh' }}
      >
        <GoogleLoginButton
          style={{ borderRadius: '20px' }}
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogle();
          }}
        />

        <LoginSocialFacebook
          appId="775659780546554"
          onResolve={({ data }) => {
            signInWithFacebook(data);
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
              marginTop: '10vh',
              marginBottom: '2vh',
              borderRadius: '20px',
            }}
          />
        </LoginSocialFacebook>

        <TwitterLoginButton
          onClick={(e) => {
            e.preventDefault();
            signInWithTwitter();
          }}
          style={{ borderRadius: '20px', marginBottom: '30%' }}
        />
      </div>
    </Modal>
  );
}

SocialJoinModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.func,
  hideParent: PropTypes.func,
};

SocialJoinModal.defaultProps = {
  onHide: () => {},
  show: () => {},
  hideParent: () => {},
};

export default SocialJoinModal;
