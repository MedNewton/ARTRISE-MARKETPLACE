/*eslint-disable*/
import React, { useEffect, useMemo, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAccount } from 'wagmi';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { SlOptions } from 'react-icons/sl';
import DisplayArtworks from './DisplayArtworks';
import DisplayCollections from './DisplayCollections';
import { GetArtWorks, GetCollections }
  from '../../../services/DisplayProfileServices/GetUserArtworksCollectionsServices';
import DisplayLazyOwnedNfts from './DisplayLazyOwnedNfts';
import DisplayMyOwnedNfts from './DisplayMyOwnedNfts';
import DisplayMemberOwnedNfts from './DisplayMemberOwnerNfts';
import { userDataStoreShape } from '../../types/user-type';
import { collectionStoreShape } from '../../types/collection-type';
import {MoreTab, Tab, TabList, TabPanel, Tabs} from "../tab/Tabs";
import {
  ArtistDesktopViewMainTabs,
  artistDesktopViewMainTabs, ArtistDesktopViewMoreTabs, ArtistMobileViewMainTabs, ArtistMobileViewMoreTabs,
  MemberDesktopViewMainTabs, MemberDesktopViewMoreTabs, MemberMobileViewMainTabs, MemberMobileViewMoreTabs
} from "../../constants/DisplayProfileTabsHeadings";
import {useMediaQuery} from "react-responsive";

function DisplayArtistTabSection(props) {
  const {
    artistData, lazyListed, collections, currentUserId,
  } = props;
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  const [userArtworks, setUserArtworks] = useState([]);
  const [userCollections, setUserCollections] = useState([]);
  const { address } = useAccount();

  const [mainTabs, setMainTabs] = useState([]);
  const [moreTabs, setMoreTabs] = useState([]);





  useEffect(() => {
    const tempArtworksList = GetArtWorks(artistData.userId, lazyListed);
    setUserArtworks(tempArtworksList);
    const tempCollectionsList = GetCollections(artistData.userId, collections);
    setUserCollections(tempCollectionsList);
  }, [artistData, lazyListed, collections]);

const getTabs = ()=>{
  setMainTabs(artistData?.socialMediaVerified ? ArtistDesktopViewMainTabs : MemberDesktopViewMainTabs)
  setMoreTabs( artistData?.socialMediaVerified ? ArtistDesktopViewMoreTabs : MemberDesktopViewMoreTabs)
  if(isDeviceMobile){
    setMainTabs(artistData?.socialMediaVerified ? ArtistMobileViewMainTabs : MemberMobileViewMainTabs)
    setMoreTabs( artistData?.socialMediaVerified ? ArtistMobileViewMoreTabs : MemberMobileViewMoreTabs)
  }
}
  useEffect(() => {
    getTabs();
  }, [isDeviceMobile, artistData]);

console.log("asdf  mainTabs::::",mainTabs);
console.log("asdf  moreTabs::::",moreTabs)


    return (
          <Tabs>
              <TabList>
                  {mainTabs.map((item) => (
                      <Tab index={item.key}>
                          {item.name}
                      </Tab>
                  ))}
                  <MoreTab baseIndex={mainTabs.length}>
                      {moreTabs.map((item) => (
                          <Tab index={item.key}>
                              {item.name}
                          </Tab>
                      ))}
                  </MoreTab>
              </TabList>
              {/*{mainTabs.concat(moreTabs).map((item, index) => (*/}
              {/*    <TabPanel index={item.key}>*/}
              {/*      {item.k}*/}
              {/*        <p>Content of {item.name} Tab</p>*/}
              {/*    </TabPanel>*/}

              {/*))}*/}

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
                  <TabPanel index={2} style={{ margin: '25px 2%' }}>
                    <div /> {/* Placeholder for any specific content if needed */}
                  </TabPanel>
                  <TabPanel index={3} style={{ margin: '25px 2%' }}>
                    <h5 className="bioTabText">{artistData?.bio}</h5>
                  </TabPanel>
                </>
            ) : (
                <>
                  <TabPanel index={0} style={{ margin: '25px 2%', width: 'auto' }}>
                    {artistData.userId === currentUserId
                        ? <DisplayMyOwnedNfts address={address} />
                        : <DisplayMemberOwnedNfts address={artistData.userId} artistData={artistData} />}
                  </TabPanel>
                  {/* Assume other TabPanels for other tabs are defined here similarly */}
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
