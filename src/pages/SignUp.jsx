import React, { useRef, useState, useCallback } from 'react';
import { Link, useNavigate , withRouter } from 'react-router-dom';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import db from "../firebase"
import {ref, onValue, get, update, set, child} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import * as Routes from '../index';

import bcrypt from 'bcryptjs'


const SignUp = () => {
    
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const FacebookProvider = new FacebookAuthProvider();
    const userRef = ref(db, 'users/'); 
    const errors = [];

    const form = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const nav = useNavigate();

    const isEmpty = (s) => {
        if((s !== "") && (s !== " ") && (s !== null)) return false;
        else return true;
    }

    const isEmail = (email) => {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(regEx)) return true;
        else return false;
    }

    const matchConfirm = (p, c) => {
        if(p === c) return true;
        else return false;
    }

    const SignUpWithEmailAndPassword = async () => {
        document.getElementById("errors").innerText = "";
        const errors = [];
        if(isEmpty(name)) errors.push("**The name should not be empty !\n");
        if(isEmpty(email)) errors.push("**The email shousd not be empty !\n");
        if(isEmpty(password)) errors.push("**The password should not be empty !\n");
        if(!isEmail(email)) errors.push("**The email must be in a valid format !\n");
        if(!matchConfirm(password, confirm)) errors.push("**The password and the confirmation have to match !\n");

        
        if(errors.length > 0) {
            console.error("errors: \n");
            
            errors.forEach(e => {
                document.getElementById("errors").innerText += e.toString();
            });
        }else if(errors.length == 0){

            //firebase signup starts here : 
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const displayName = user.displayName;
                const newUserKey = user.uid;
                const hasehdPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u');
                await set(ref(db, 'users/'+newUserKey), {
                    'name': name,
                    'displayName': name,
                    'email': email,
                    'password': hasehdPassword,
                    'bio': "",
                    'pdpLink': "https://www.fairdocument.com/STATIC/img/user.jpg",
                    'cover_link': "",
                    'Twitter': "",
                    'Facebook': "",
                    'Discord': "",
                    'followers': "",
                    'following': "",
                    'notifications': {
                        'text': "Welcome to Artise",
                        'link': "",
                        'img': "",
                        'seen': false
                    },
                    'verified': false,
                    'status': "not verified",
                    'walletType' : "none",
                    'walletAddress': "No wallet connected." 
                }).then(()=>{
                    
                    document.getElementById('success').classList.add('signup-success');
                    document.getElementById('success').classList.remove('hidden');
                })
            } catch (error) {
                document.getElementById("errors").innerText = "This email is already in use.";
            }
            
        }
    }

    const SignUpWithGoogle = async () => {
        signInWithPopup(auth, googleProvider).then( async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const ThisUserRef = ref(db, 'users/'+user.uid);
            var dt;
            await get(ThisUserRef).then( async (snapshot)=>{
                if(snapshot.exists && (snapshot.val() !== null))
                {
                    // User exists already :
                    dt = snapshot.val();
                    let key = snapshot.key;
                    localStorage.setItem('name', snapshot.val().name);
                    localStorage.setItem('UserKey', snapshot.key);
                    nav('/');
                }else{
                    // New user to create : 
                    await set(ref(db, 'users/'+user.uid), {
                        'name': user.displayName,
                        'displayName': user.displayName,
                        'email': user.email,
                        'password': "",
                        'bio': "",
                        'pdpLink': user.photoURL,
                        'cover_link': "",
                        'Twitter': "",
                        'Facebook': "",
                        'Discord': "",
                        'followers': "",
                        'following': "",
                        'notifications': {
                            'text': "Welcome to Artise",
                            'link': "",
                            'img': "",
                            'seen': false
                        },
                        'verified': false,
                        'status': "not verified",
                        'walletType' : "none",
                        'walletAddress': "No wallet connected." 
                    }).then(()=>{
                        
                        document.getElementById('success').classList.add('signup-success');
                        document.getElementById('success').classList.remove('hidden');
                    })
                }
            })
        }).catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.error(err)
        })
    }

    const SignUpWithFacebook = async () => {
        signInWithPopup(auth, FacebookProvider).then(async (result) => {
            const credential = FacebookProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const ThisUserRef = ref(db, `users/${user.uid}`)
            var dt;

            await get(ThisUserRef).then( async (snapshot) =>{
                if(snapshot.exists && (snapshot.val() !== null))
                {
                    // Users exsits :
                    dt = snapshot.val();
                    let key = snapshot.key;
                    localStorage.setItem('name', snapshot.val().name);
                    localStorage.setItem('UserKey', snapshot.key);
                    nav('/');
                }else{
                    // A new User :
                }
            })
        }).catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.error(err)
        })
    }

    return (
        <div>
            <HeaderStyle2 />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Signup</h1>
                            </div>
                            
                        </div>
                    </div>
                </div>                    
            </section>
            <section className="tf-login tf-section">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="tf-title-heading ct style-1">
                                Sigup To NFTs
                            </h2>

                            <div className="flat-form box-login-social">
                                <div className="box-title-login">
                                    <h5>Signup with social accounts</h5>
                                </div>
                                <ul>
                                    <li>
                                        <button type="button" onClick={SignUpWithGoogle} className="sc-button style-2 fl-button pri-3 googleBtn">
                                            <i className="icon-fl-google-2"></i>
                                            <span>Google</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={SignUpWithFacebook} className="sc-button style-2 fl-button pri-3 facebookBtn">
                                            <i className="icon-fl-facebook"></i>
                                            <span>Facebook</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="flat-form box-login-email">
                                <div className="box-title-login">
                                    <h5>Or Signup with email</h5>
                                </div>
                                <p id="errors" className='signup-errors'>
                                    
                                </p>
                                <div id="success" className='hidden row'>
                                    <div className='col-8'>
                                    <p>
                                        You have been sign up succefully!<br/>Head back to the Login page to start your journey with Artrise.
                                    </p>
                                    </div>
                                    <div className='col-4'>
                                        <a href="/login">
                                            <p className='login-redirect-btn'>
                                            Login
                                            </p>
                                        </a>
                                    </div>
                                </div>
                                <div className="form-inner">
                                    <form action="#" ref={form} id="contactform">
                                        <input id="name" name="name" tabIndex="1" aria-required="true" required type="text" placeholder="Your Full Name" onChange={e => setName(e.target.value)} value={name} />
                                        <input id="email" name="email" tabIndex="2"  aria-required="true" type="email" placeholder="Your Email Address" onChange={e => setEmail(e.target.value)} value={email} required />
                                        <input id="pass" name="pass" tabIndex="3"  aria-required="true" type="password" placeholder="Set Your Password" onChange={e => setPassword(e.target.value)} value={password} required />
                                        <input id="confirm" name="confirm" tabIndex="3"  aria-required="true" type="password" placeholder="Confirm Your Password" onChange={e => setConfirm(e.target.value)} value={confirm} required />
                                        

                                        <button type='button' className="submit" onClick={SignUpWithEmailAndPassword}>Sign up</button>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default SignUp;
