import React, { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ref, update } from 'firebase/database';
import { useAccount } from 'wagmi';
import { useSelector } from 'react-redux';
import Footer from '../components/footer/Footer';
import heroSliderData from '../assets/fake-data/data-slider';
import Slider from '../components/slider/Slider';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import liveAuctionData2 from '../assets/fake-data/data-live-auction-2';
import ComingSoonData from '../assets/fake-data/comingSoonData';
import LiveAuction from '../components/layouts/LiveAuction';
import LiveAuction2 from '../components/layouts/LiveAuction2';
import ComingSoon from '../components/layouts/ComingSoon';
import db from '../firebase';
import DisplayArtworks from '../components/layouts/ProfileDisplay/DisplayArtworks';
import profile from '../assets/images/icon/profile.png';
import Create from '../components/layouts/Create';

function HomePage() {
  const navigate = useNavigate();
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);
  const profileData = useSelector((state) => state.usersReducer.currentUser);
  const currentUserId = useSelector((state) => state.usersReducer.currentUserId);
  const UserKey = localStorage.getItem('userId');
  const { address } = useAccount();

  // function related to fetching user's instagram info 3
  const fetchUserProfileInfo = useCallback(async (accessToken) => {
    try {
      const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
      const data = await response.json();
      if (data.username) {
        const userProfileLink = `https://www.instagram.com/${data.username}`;
        const TempUserKey = address || UserKey;
        await update(ref(db, `users/${TempUserKey}`), {
          Instagram: userProfileLink,
        });
        window.close();
      }
      return null;
    } catch (error) {
      window.close();
      return null;
    }
  }, [address, UserKey]);

  // function related to fetching user's instagram info 2

  const fetchUserProfile = useCallback(async (code) => {
    const url = 'https://api.instagram.com/oauth/access_token';
    const clientId = 276266121931752; // instagram app id
    const clientSecret = 'b5bdd5a389495eb95d172aa76cdc2928';
    const redirectUri = 'https://marketplace.artrise.io/';
    const formData = new URLSearchParams();
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', redirectUri);
    formData.append('code', code);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchUserProfileInfo(data.access_token);
      })
      .catch((error) => {
        console.error('error:', error);
      });
  }, [fetchUserProfileInfo]);

  // function related to fetching user's instagram info 1
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetchUserProfile(code);
    }
  }, [fetchUserProfile]);

  useEffect(() => {
    window.ire('identify', { customerId: localStorage.getItem('UserKey') });
  }, []);

  return (
    <>
      <Slider data={heroSliderData} />
      <div
        className="margin-Left-Right-Top"
      >
        <div>
          <h2 className=" ourArtists">Artworks</h2>
        </div>
        {lazyListed && <DisplayArtworks data={lazyListed} />}
        <LiveAuction data={liveAuctionData} />
        <LiveAuction2 data={liveAuctionData2} />
        <ComingSoon data={ComingSoonData} />
      </div>
      <div style={{ marginTop: '80px' }}>
        {currentUserId
          ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              margin: '20px 0px',
            }}
            >
              <div className=" ourArtists">
                <h2>
                  Your journey with physical NFTs starts here.
                </h2>
              </div>
              <div className=" ourArtists">
                <h4>
                  Join the world&apos;s finest painters, sculptors, photographers and collectors!
                </h4>
              </div>
              {profileData?.profileType === 'artist' && (
                <Link to={`/displayProfile?artist=${currentUserId}`}>
                  <div className="pdpSpace artistButton" id="pdp">
                    <img
                      src={profileData?.pdpLink ? profileData?.pdpLink : profile}
                      alt="User Profile"
                    />
                  </div>
                </Link>
              )}
              {profileData?.profileType === 'member' && (
                <Link to={`/displayProfile?member=${currentUserId}`}>
                  <div className="pdpSpace artistButton" id="pdp">
                    <img
                      src={profileData?.pdpLink ? profileData?.pdpLink : profile}
                      alt="User Profile"
                    />
                  </div>
                </Link>
              )}
            </div>
          )
          : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              margin: '20px 0px',
            }}
            >
              <div className=" ourArtists">
                <h2>
                  Your journey with physical NFTs starts here.
                </h2>
              </div>
              <div className=" ourArtists">
                <h4>
                  Join the world&apos;s finest painters, sculptors, photographers and collectors!
                </h4>
              </div>

              <div
                className="col-md-12 wrap-inner load-more text-center mb-20"
              >
                <button
                  type="button"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={() => {
                    navigate('//forms.gle/dVamYz7mYkfz7EaW7');
                  }}
                >
                  <span>Artist Application</span>
                </button>
              </div>
            </div>
          )}
      </div>
      <Create />
      <Footer />
    </>
  );
}

export default HomePage;
