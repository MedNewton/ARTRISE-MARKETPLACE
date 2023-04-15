import React from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import { useState, useEffect, useCallback } from 'react';
import { useSDK } from '@thirdweb-dev/react';

import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialTwitter,
  LoginSocialApple,
} from 'reactjs-social-login'

import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from 'react-social-login-buttons'

const SocialLoginModal = (props) => {
    

  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState(null)

  const onLoginStart = useCallback(() => {
    //alert('login start')
  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
    //alert('logout success')
  }, [])

  const hide = props.onHide;
  const hideParent = props.hideParent;
return (

    <Modal
    show={props.show}
    onHide={()=>{hide(); hideParent();}}
  >
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body space-y-20 pd-40">
        
        <p className="text-center"><span className="price color-popup">Login</span>
        </p>
        <LoginSocialGoogle
            isOnlyGetToken
            client_id={'AIzaSyDfquNr9722wV3kadNCHRKnxoX3eAoQ5gI'}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
              console.log(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>

          <LoginSocialFacebook
            isOnlyGetToken
            appId={'775659780546554'}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
              console.log(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
          <TwitterLoginButton />
          <AppleLoginButton />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    </div>
    </Modal>
    
  );
};

export default SocialLoginModal;
