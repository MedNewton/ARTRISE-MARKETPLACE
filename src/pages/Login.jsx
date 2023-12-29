import React, { useRef, useState, useCallback } from 'react';
import { Link, useNavigate , withRouter } from 'react-router-dom';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import db from "../firebase"
import {ref, onValue, get, update, set, child} from "firebase/database";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import * as Routes from '../index';

import bcrypt from 'bcryptjs'


const Login = () => {

    console.log(localStorage);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const FacebookProvider = new FacebookAuthProvider();
    const userRef = ref(db, 'users/'); 

    const errors = [];

    const isEmpty = (s) => {
        if((s !== "") && (s !== " ") && (s !== null)) return false;
        else return true;
    }

    const isEmail = (email) => {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(regEx)) return true;
        else return false;
    }

    const LoginWithEmailAndPassword = async () => {
        document.getElementById("errors").innerText = "";
        let errors = [];

        if(isEmpty(email)) errors.push("**The email shousd not be empty !\n");
        if(isEmpty(password)) errors.push("**The password should not be empty !\n");
        if(!isEmail(email)) errors.push("**The email must be in a valid format !\n");

        if(errors.length > 0)
        {
            console.log("errors: \n");
            
            errors.forEach(e => {
                document.getElementById("errors").innerText += e.toString();
            });
        }else if(errors.length == 0){
            signInWithEmailAndPassword(auth, email, password).then( async (userCredential) => {
                const user = userCredential.user;
                const ThisUserRef = ref(db, 'users/'+user.uid); 
                var dt;
                await get(ThisUserRef).then( async (snapshot) => {
                    if(snapshot.exists && (snapshot.val() !== null))
                    {
                        dt = snapshot.val();
                        let key = snapshot.key;
                        localStorage.setItem('UserKey', snapshot.key);
                        localStorage.setItem('name', snapshot.val().name);
                        localStorage.setItem('pdpLink', snapshot.val().pdpLink);
                        localStorage.setItem('walletType', snapshot.val().walletType);
                        localStorage.setItem('walletAddress', snapshot.val().walletAddress);
                        nav('/');
                    }else{
                        document.getElementById("errors").innerText = "An Error has Occured ! Please try again ...";
                    }
                });
            }).catch((error) => {
                document.getElementById("errors").innerText = "Wrong Email or Password ! Please try again ...";
            })
        }
    }

    const LoginWithGoogle = async () => {
        signInWithPopup(auth, googleProvider).then((async (result) =>{
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const ThisUserRef = ref(db, 'users/'+user.uid); 
            var dt;
            await get(ThisUserRef).then(async (snapshot) => {
                if(snapshot.exists && (snapshot.val() !== null))
                {
                    dt = snapshot.val();
                    let key = snapshot.key;
                    localStorage.setItem('UserKey', snapshot.key);
                    localStorage.setItem('name', snapshot.val().name);
                    localStorage.setItem('pdpLink', snapshot.val().pdp_Link);
                    localStorage.setItem('walletType', snapshot.val().walletType);
                    localStorage.setItem('walletAddress', snapshot.val().walletAddress);
                    nav('/');
                }else{
                    document.getElementById("errors").innerText = "No user found with this email.";
                }
            })
        })).catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.log(err.message)
        })
    }

    const LoginWithFacebook = async () => {

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
                                <h1 className="heading text-center">Login</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Pages</Link></li>
                                    <li>Login</li>
                                </ul>
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
                                Login To NFTs
                            </h2>

                            <div className="flat-form box-login-social">
                                <div className="box-title-login">
                                    <h5>Login with social</h5>
                                </div>
                                <ul>
                                    <li>
                                        <button onClick={LoginWithGoogle} type="button" className="sc-button style-2 fl-button pri-3 googleBtn">
                                            <i className="icon-fl-google-2"></i>
                                            <span>Google</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={LoginWithFacebook} to="#" className="sc-button style-2 fl-button pri-3 facebookBtn">
                                            <i className="icon-fl-facebook"></i>
                                            <span>Facebook</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="flat-form box-login-email">
                                <div className="box-title-login">
                                    <h5>Or login with email</h5>
                                </div>
                                <p id="errors" className='signup-errors'>
                                    
                                </p>
                                <div className="form-inner">
                                    <form action="#" id="contactform">
                                        <input id="email" name="email" tabIndex="1" aria-required="true" required type="email" placeholder="Your Email Address" onChange={e => setEmail(e.target.value)} value={email} />
                                        <input id="password" name="password" tabIndex="2"  aria-required="true" type="password" placeholder="Your Password" required onChange={e => setPassword(e.target.value)} value={password} />
                                        <div className="row-form style-1">
                                            <label>
                                                <input type="checkbox" hidden/>
                                                <span className="btn-checkbox" hidden></span>
                                            </label>
                                            <Link to="#" className="forgot-pass"></Link>
                                        </div>

                                        <button type="button" className="submit" onClick={LoginWithEmailAndPassword}>Login</button>
                                    </form>
                                </div>

                            </div>
                            <br/><br/><br/>
                            <div className="flat-form box-login-email">
                                <div className="box-title-login">
                                    <h5>Don't have an account yet ?</h5>
                                </div>

                                <div className="form-inner">
                                    <form action="#" id="">
                                        <Link to="/sign-up"><button className="submit">Sign up</button></Link>
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

export default Login;
