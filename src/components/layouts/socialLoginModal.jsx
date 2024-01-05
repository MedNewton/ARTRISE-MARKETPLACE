import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  ref, get,
} from 'firebase/database';
import {
  TwitterAuthProvider, signInWithPopup, GoogleAuthProvider,
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
import db from '../../firebase';
import auth from '../../auth';

function SocialLoginModal(props) {
  const { onHide: propsOnHide, show: propsShow, hideParent } = props;
  // const [provider, setProvider] = useState('');
  // const [profile, setProfile] = useState(null);
  // const [pdp, setPdp] = useState();
  // const [accountType, setAccountType] = useState('');
  // const [slug, setSlug] = useState('');
  // const [referee, setReferee] = useState('');

  // function checkForReferralCode() {
  //   const url = window.location.href;
  //
  //   if (url.toString().includes('?')) {
  //     setReferee(url.toString().split('?ref=')[1]);
  //   } else {
  //     setReferee('none');
  //   }
  // }

  // useEffect(() => {
  //   checkForReferralCode();
  // }, []);

  async function passwordlessLoginTwitter(snapshot) {
    localStorage.setItem('userId', snapshot.key);
    localStorage.setItem('name', snapshot.val().displayName);
    localStorage.setItem('pdpLink', snapshot.val().pdpLink);
    localStorage.setItem('slug', snapshot.val().slug);
    localStorage.setItem('twitter', true);
    localStorage.setItem('profileType', 'user');

    // setPdp(snapshot.val().pdpLink);
    // setAccountType(snapshot.val().accountType);
    // setSlug(snapshot.val().slug);
    propsOnHide();
    hideParent();
  }

  async function passwordlessLoginFacebook(snapshot) {
    localStorage.setItem('userId', snapshot.key);
    localStorage.setItem('name', snapshot.val().displayName);
    localStorage.setItem('pdpLink', snapshot.val().pdpLink);
    localStorage.setItem('followingYann', snapshot.val().followingYann);
    localStorage.setItem('slug', snapshot.val().slug);
    localStorage.setItem('facebook', true);
    localStorage.setItem('profileType', 'user');

    // setPdp(snapshot.val().pdpLink);
    // setAccountType(snapshot.val().accountType);
    // setSlug(snapshot.val().slug);
    propsOnHide();
    hideParent();
  }

  async function passwordlessLoginGoogle(snapshot) {
    localStorage.setItem('userId', snapshot.key);
    localStorage.setItem('name', snapshot.val().displayName);
    localStorage.setItem('pdpLink', snapshot.val().pdpLink);
    localStorage.setItem('slug', snapshot.val().slug);
    localStorage.setItem('google', true);
    localStorage.setItem('walletAddress', snapshot.val().walletAddress);
    localStorage.setItem('profileType', 'user');

    // setPdp(snapshot.val().pdpLink);
    // setAccountType(snapshot.val().accountType);
    // setSlug(snapshot.val().slug);
    propsOnHide();
    hideParent();
  }

  async function checkUserExistsTwitter(adr) {
    const ThisUserRef = ref(db, `users/${adr}`);
    await get(ThisUserRef).then(async (snapshot) => {
      const dt = snapshot.val();
      if (dt === null) {
        propsOnHide();
        hideParent();
        await Swal.fire({
          icon: 'warning',
          title: "Account doesn't exists !",
          text: 'This Twitter account is not connected to any account on ARTRISE. Try signing up.',
        });
      } else {
        await passwordlessLoginTwitter(snapshot);
      }
    });
  }

  async function checkUserExistsGoogle(adr) {
    const ThisUserRef = ref(db, `users/${adr}`);
    await get(ThisUserRef).then(async (snapshot) => {
      const dt = snapshot.val();
      if (dt === null) {
        propsOnHide();
        hideParent();
        await Swal.fire({
          icon: 'warning',
          title: "Account doesn't exists !",
          text: 'This Google account is not connected to any account on ARTRISE. Try signing up.',
        });
      } else {
        await passwordlessLoginGoogle(snapshot);
      }
    });
  }

  async function checkUserExistsFacebook(adr) {
    const ThisUserRef = ref(db, `users/${adr}`);
    await get(ThisUserRef).then(async (snapshot) => {
      const dt = snapshot.val();
      if (dt === null) {
        propsOnHide();
        hideParent();
        await Swal.fire({
          icon: 'warning',
          title: "Account doesn't exists !",
          text: 'This Facebook account is not connected to any account on ARTRISE. Try signing up.',
        });
      } else {
        await passwordlessLoginFacebook(snapshot);
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

  function signInWithFacebook(response) {
    const facebookUserData = response.data;
    const facebookUserID = facebookUserData.id;
    checkUserExistsFacebook(facebookUserID, facebookUserData);
  }

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

      <div className="modal-body space-y-20 pd-40">

        <GoogleLoginButton
          style={{ marginTop: '15vh', borderRadius: '20px' }}
          onClick={(e) => { e.preventDefault(); signInWithGoogle(); }}
        />

        <LoginSocialFacebook
          appId="775659780546554"
          onResolve={(response) => {
            signInWithFacebook(response);
          }}
          onReject={(error) => {
            console.error(error);
          }}
        >
          <FacebookLoginButton
            style={{ marginTop: '2vh', marginBottom: '2vh', borderRadius: '20px' }}
          />
        </LoginSocialFacebook>

        <TwitterLoginButton
          onClick={(e) => {
            e.preventDefault();
            signInWithTwitter();
          }}
          style={{ marginBottom: '20vh', borderRadius: '20px' }}
        />
      </div>
    </Modal>
  );
}

SocialLoginModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  hideParent: PropTypes.func,
};

SocialLoginModal.defaultProps = {
  onHide: () => {},
  show: false,
  hideParent: () => {},
};

export default SocialLoginModal;
