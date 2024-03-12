import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { ToastContainer } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from 'react-redux';
import Footer from '../components/footer/Footer';
import DisplayProfileInfo from '../components/layouts/ProfileDisplay/DisplayProfileInfo';
import DisplayArtistTabSection from '../components/layouts/ProfileDisplay/DisplayArtistTabSection';

function DisplayProfile() {
  const location = useLocation();

  const allUsers = useSelector((state) => state.usersReducer.allUsers);
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const currentUserId = useSelector((state) => state.usersReducer.currentUserId);
  const collections = useSelector((state) => state.usersReducer.collections);

  // const { contract } = useContract(
  //   '0x3ad7E785612f7bcA47e0d974d08f394d78B4b955',
  //   'marketplace',
  // );

  const [artistData, setArtistData] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  const getArtistData = useCallback(async (id) => {
    const artist = allUsers.find((user) => user.userId === id);

    if (artist) {
      setArtistData(artist);
      setLoading(false);
    }
  }, [allUsers, setArtistData, setLoading]);

  const getMemberData = useCallback(async (id) => {
    const member = allUsers.find((user) => user.userId === id);

    if (member) {
      setArtistData(member);
      setLoading(false);
    }
  }, [allUsers, setArtistData, setLoading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.has('artist')) {
          const userValue = queryParams.get('artist');
          await getArtistData(userValue);
          // setLoading(false); // Set loading to false when data is available
        } else if (queryParams.has('member')) {
          const userValue = queryParams.get('member');
          await getMemberData(userValue);
          // setLoading(false); // Set loading to false when data is available
        } else {
          console.error("URL doesn't contain artist or user query parameter.");
          // setLoading(false); // Set loading to false when data is available
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // You can add error handling logic here, such as displaying an error message.
        // setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchData();
  }, [location, currentUserId, allUsers, getArtistData, getMemberData]);

  return (
    <div className="authors-2">
      <LoadingOverlay
        active={loading}
        spinner
        spinnerColor="black" // Set the desired color here
        text="Loading..."
        styles={{
          overlay: (base) => ({
            ...base,
            background: 'rgba(0,0,  0, 0.5)',
          }),
        }}
      >
        <div className="profileInfoSection">
          {artistData && allUsers && (
            <DisplayProfileInfo
              currentUserId={currentUserId}
              artistData={artistData}
              currentUser={currentUser}
              allUsers={allUsers}
            />
          )}

          {artistData && allUsers && (
            <DisplayArtistTabSection
              artistData={artistData}
              lazyListed={lazyListed}
              collections={collections}
              currentUserId={currentUserId}
            />
          )}
        </div>
      </LoadingOverlay>

      <ToastContainer />
      <Footer />
    </div>
  );
}

export default DisplayProfile;
