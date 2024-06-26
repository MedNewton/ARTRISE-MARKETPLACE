import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import DisplayArtworks from './DisplayArtworks';
import DisplayCollections from './DisplayCollections';
import { GetArtWorks, GetCollections }
  from '../../../services/DisplayProfileServices/GetUserArtworksCollectionsServices';
import DisplayLazyOwnedNfts from './DisplayLazyOwnedNfts';
import DisplayMyOwnedNfts from './DisplayMyOwnedNfts';
import DisplayMemberOwnedNfts from './DisplayMemberOwnerNfts';
import { userDataStoreShape } from '../../types/user-type';
import { collectionStoreShape } from '../../types/collection-type';
import {
  MoreTab, Tab, TabList, TabPanel, Tabs,
} from '../tab/Tabs';
import {
  ArtistDesktopViewMainTabs,
  ArtistDesktopViewMoreTabs,
  ArtistProfilePageTabs,
  MemberDesktopViewMainTabs,
  MemberDesktopViewMoreTabs,
  MemberProfilePageTabs,
} from '../../constants/en';
import DisplayDefaultTab from './DisplayDefaultTab';

function DisplayArtistTabSection(props) {
  const {
    artistData, lazyListed, collections, currentUserId,
  } = props;
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  const theme = useSelector((state) => state.themeReducer.theme);

  const [userArtworks, setUserArtworks] = useState([]);
  const [userCollections, setUserCollections] = useState([]);
  const { address } = useAccount();

  const [mainTabs, setMainTabs] = useState([]);
  const [moreTabs, setMoreTabs] = useState([]);
  // const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const tempArtworksList = GetArtWorks(artistData.userId, lazyListed);
    setUserArtworks(tempArtworksList);
    const tempCollectionsList = GetCollections(artistData.userId, collections);
    setUserCollections(tempCollectionsList);
  }, [artistData, lazyListed, collections]);

  useEffect(() => {
    const getTabs = () => {
      if (artistData?.socialMediaVerified) {
        setMainTabs(isDeviceMobile ? ArtistProfilePageTabs : ArtistDesktopViewMainTabs);
        setMoreTabs(isDeviceMobile ? [] : ArtistDesktopViewMoreTabs);
      } else {
        setMainTabs(isDeviceMobile ? MemberProfilePageTabs : MemberDesktopViewMainTabs);
        setMoreTabs(isDeviceMobile ? [] : MemberDesktopViewMoreTabs);
      }
    };

    getTabs();
  }, [isDeviceMobile, artistData]);

  return (
    <Tabs>
      <TabList theme={theme} isDeviceMobile={isDeviceMobile}>
        {mainTabs.map((item) => (
          <Tab index={item.key} theme={theme}>
            {item.name}
          </Tab>
        ))}
        {moreTabs?.length > 0
          ? (
            <MoreTab baseIndex={mainTabs.length} theme={theme}>
              {moreTabs.map((item) => (
                <Tab index={item.key} theme={theme}>
                  {item.name}
                </Tab>
              ))}
            </MoreTab>
          )
          : null}

      </TabList>

      {artistData.socialMediaVerified ? (
        <>
          <TabPanel index={0}>
            {artistData.userId === currentUserId
              ? <DisplayLazyOwnedNfts />
              : <DisplayArtworks data={userArtworks} />}
          </TabPanel>
          <TabPanel index={1}>
            <DisplayCollections data={userCollections} />
          </TabPanel>
          <TabPanel index={2}>
            <DisplayDefaultTab />
          </TabPanel>
          <TabPanel index={3}>
            <h5 className="bioTabText">{artistData?.bio}</h5>
          </TabPanel>
          <TabPanel index={4}>
            <DisplayDefaultTab />
          </TabPanel>
          <TabPanel index={5}>
            <DisplayDefaultTab />
          </TabPanel>
          <TabPanel index={6}>
            <DisplayDefaultTab />
          </TabPanel>
        </>
      ) : (
        <>
          <TabPanel index={0}>
            {artistData.userId === currentUserId
              ? <DisplayMyOwnedNfts address={address} />
              : <DisplayMemberOwnedNfts address={artistData.userId} artistData={artistData} />}
          </TabPanel>
          <TabPanel index={1}>
            <DisplayDefaultTab />
          </TabPanel>
          <TabPanel index={2}>
            <DisplayDefaultTab />
          </TabPanel>
          <TabPanel index={3}>
            <DisplayDefaultTab />
          </TabPanel>
          <TabPanel index={4}>
            <DisplayDefaultTab />
          </TabPanel>
          <TabPanel index={5}>
            <DisplayDefaultTab />
          </TabPanel>
        </>
      )}
    </Tabs>
  );
}

DisplayArtistTabSection.propTypes = {
  artistData: PropTypes.shape(userDataStoreShape) || PropTypes.object,

  lazyListed: PropTypes.arrayOf(
    PropTypes.shape(userDataStoreShape) || PropTypes.object,
  ),

  collections: PropTypes.arrayOf(
    PropTypes.shape(collectionStoreShape) || PropTypes.object,
  ),

  currentUserId: PropTypes.string,
};

DisplayArtistTabSection.defaultProps = {
  artistData: {},

  lazyListed: [],

  collections: [],

  currentUserId: '',
};

export default DisplayArtistTabSection;
