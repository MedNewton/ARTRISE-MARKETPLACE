import React , { useRef , useState , useEffect } from 'react';
import { Link, useNavigate , withRouter } from 'react-router-dom';
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import avt from '../assets/images/avatar/avata_profile.jpg'
import bg1 from '../assets/images/backgroup-secsion/option1_bg_profile.jpg'
import bg2 from '../assets/images/backgroup-secsion/option2_bg_profile.jpg'
import db from '../firebase';
import storage from '../storage';
import {ref, onValue, get, update, set, child} from "firebase/database";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import { ref as SRef , getDownloadURL, uploadBytesResumable } from "firebase/storage";


const ArtistInfos = () => {

    useEffect(() => {
        window.ire('identify', { customerId: localStorage.getItem('UserKey') });
      }, []);

    const nav = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [facebookLink, setFacbookLink] = useState('');
    const [discordLink, setDiscordLink] = useState('');
    const [twitterLink, setTwitterLink] = useState('');
    const [pdpLink, setPdpLink] = useState('');
    const [coverLink, setCoverLink] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userBio, setUserBio] = useState('');

    
    const address = useAddress();
    async function getUserData(adr){
        const ThisUserRef = ref(db, 'users/'+adr); 
        await get(ThisUserRef).then(async (snapshot) => {
            let dt = snapshot.val();
            setDisplayName(dt.displayName);
            setUserEmail(dt.email);
            setUserBio(dt.bio);
            setPdpLink(dt.pdpLink);
            setCoverLink(dt.cover_link)
            setFacbookLink(dt.Facebook);
            setTwitterLink(dt.Twitter);
            setDiscordLink(dt.Discord);
        })
    }


    async function updateProfile()
    {
        await update(ref(db, 'users/'+address), {
            'displayName': displayName,
            'email': userEmail,
            'bio': userBio,
            'Twitter': twitterLink,
            'Facebook': facebookLink,
            'Discord': discordLink,
        });
        localStorage.setItem('name', displayName);
        localStorage.setItem('pdpLink', pdpLink);
        nav('/');
    }

    useEffect(() => {
        getUserData(address);
    }, [])
    

    const fileReader = new FileReader();

    async function updateProfilePicture(f)
    {
        const stroageRef = SRef(storage, `/users_pdp/${f.name}`);
        const uploadTask = uploadBytesResumable(stroageRef, f);
        document.getElementById('pdp').src = "https://cdn.dribbble.com/users/8769896/screenshots/16200531/8ee212dac057d412972e0c8cc164deee.gif"
        document.getElementById('submitBtn').disabled = true;
        uploadTask.on("state_changed", (snapshot) => {
            const progress =Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },(error) => {
            alert(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                document.getElementById('pdp').src = downloadURL;
                await update(ref(db, 'users/'+address), {
                    'pdpLink': downloadURL,
                });

            });
            document.getElementById('submitBtn').disabled = false;
        }
        
        )
        

    }
    
    async function updateCoverPicture(f){
        const stroageRef = SRef(storage, `/coverImages/${f.name}`);
        const uploadTask = uploadBytesResumable(stroageRef, f);
        document.getElementById('cover').src = "https://cdn.dribbble.com/users/8769896/screenshots/16200531/8ee212dac057d412972e0c8cc164deee.gif"
        document.getElementById('submitBtn').disabled = true;
        uploadTask.on("state_changed", (snapshot) => {
            const progress =Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },(error) => {
            alert(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                document.getElementById('cover').src = downloadURL;
                await update(ref(db, 'users/'+address), {
                    'cover_link': downloadURL,
                });

            });
            document.getElementById('submitBtn').disabled = false;
        }
        
        )

    }

    return (
        <div>
            <HeaderStyle2 />
            
            <div className="tf-create-item tf-section">
                <div className="themesflat-container">

                    <div className="row profilePadding">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12" id='coverSection'>
                            <div className="sc-card-profile text-center" >
                                <div className="card-media">
                                    <img src={coverLink} id="cover" alt=""/>                         
                                </div>
                            <div id="upload-profile">
                                <Link to="#" className="btn-upload">
                                    Upload New Photo </Link>
                                    <input id="cover-upload-img" type="file" name="profile" accept="image/*" required="" onChange={(e) => {updateCoverPicture(e.target.files[0])}}/>
                            </div>
                            
                            </div>
                         </div>
                         <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                            <div className="sc-card-profile text-center" >
                                <div className="card-media">
                                    <img src={pdpLink} id="pdp" alt=""/>                         
                                </div>
                            <div id="upload-profile">
                                <Link to="#" className="btn-upload">
                                    Upload New Photo </Link>
                                    <input id="tf-upload-img" type="file" name="profile" accept="image/*" required="" onChange={(e) => {updateProfilePicture(e.target.files[0])}}/>
                            </div>
                            
                            </div>
                         </div>
                         <div className="col-xl-9 col-lg-8 col-md-12 col-12">
                             <div className="form-upload-profile">
                                

                                <form action="#" className="form-profile">
                                    <div className="form-infor-profile">
                                        <div className="info-account">
                                            <h4 className="title-create-item">Account info</h4>                                    
                                                <fieldset>
                                                    <h4 className="title-infor-account">Display name</h4>
                                                    <input type="text" placeholder={displayName}  onChange={e => setDisplayName(e.target.value)} defaultValue={displayName}/>
                                                </fieldset>
                                                
                                                <fieldset>
                                                    <h4 className="title-infor-account">Email</h4>
                                                    <input type="email" placeholder={userEmail}  onChange={e => setUserEmail(e.target.value)} defaultValue={userEmail} />
                                                </fieldset>
                                                <fieldset>
                                                    <h4 className="title-infor-account">Bio</h4>
                                                    <textarea tabIndex="4" rows="5" defaultValue={userBio} onChange={e => setUserBio(e.target.value)}></textarea>
                                                </fieldset> 
                                        </div>
                                        <div className="info-social">
                                            <h4 className="title-create-item">Your Social media</h4>                                    
                                                <fieldset>
                                                    <h4 className="title-infor-account">Facebook</h4>
                                                    <input type="text" placeholder={facebookLink} defaultValue={facebookLink}  onChange={e => setFacbookLink(e.target.value)}/>
                                                </fieldset>
                                                <fieldset>
                                                    <h4 className="title-infor-account">Twitter</h4>
                                                    <input type="text" placeholder={twitterLink} defaultValue={twitterLink}  onChange={e => setTwitterLink(e.target.value)} />
                                                </fieldset>
                                                <fieldset>
                                                    <h4 className="title-infor-account">Discord</h4>
                                                    <input type="text" placeholder={discordLink} defaultValue={discordLink} onChange={e => setDiscordLink(e.target.value)}/>
                                                </fieldset>
                                                
                                        </div> 
                                    </div>
                                    <button className="tf-button-submit mg-t-15" id="submitBtn" onClick={updateProfile} type="button">
                                        Update Profile
                                    </button>           
                                </form>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ArtistInfos;
