import React, { useEffect, useMemo, useState } from 'react';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
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

function DisplayArtistTabSection(props) {
  const {
    artistData, lazyListed, collections, currentUserId,
  } = props;
  const [userArtworks, setUserArtworks] = useState([]);
  const [userCollections, setUserCollections] = useState([]);
  const { address } = useAccount();

  useEffect(() => {
    const tempArtworksList = GetArtWorks(artistData.userId, lazyListed);
    setUserArtworks(tempArtworksList);
    const tempCollectionsList = GetCollections(artistData.userId, collections);
    setUserCollections(tempCollectionsList);
  }, [artistData, lazyListed, collections]);

  function generateUniqueId() {
    return uuidv4();
  }

  const artistViewMenuTabs = useMemo(() => [
    {
      class: 'active',
      name: 'Artworks',
    },
    {
      class: '',
      name: 'Collections',
    },
    {
      class: '',
      name: 'Drops',
    },
    {
      class: '',
      name: 'About',
    },
  ], []);

  const memberViewMenuTabs = useMemo(() => [
    {
      class: 'active',
      name: 'Owned',
    },
    {
      class: '',
      name: 'Tokenized',
    },
    {
      class: '',
      name: 'Liked Items',
    },
    {
      class: '',
      name: 'Collections',
    },
  ], []);

  return (
    <Tabs>
      <TabList>
        {artistData?.socialMediaVerified
          ? artistViewMenuTabs.map((item) => (
            <Tab key={item?.userId ? item?.userId : generateUniqueId()}>
              {item.name}
            </Tab>
          ))
          : memberViewMenuTabs.map((item) => (
            <Tab key={item?.userId ? item?.userId : generateUniqueId()}>
              {item.name}
            </Tab>
          ))}

        <Tab key={4}>
          <div className="tagLink">
            <Dropdown>
              <Dropdown.Toggle id="profileTabDropdown">
                <SlOptions />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {artistData?.socialMediaVerified
                                        && (
                                        <Dropdown.Item href="/">
                                          <p className="tagLinkDropdownItemText">
                                            Owned
                                          </p>
                                        </Dropdown.Item>
                                        )}
                {artistData?.socialMediaVerified
                                        && (
                                        <Dropdown.Item href="/">
                                          <p className="tagLinkDropdownItemText">
                                            Liked Items
                                          </p>
                                        </Dropdown.Item>
                                        )}
                <Dropdown.Item href="/">
                  <p className="tagLinkDropdownItemText">
                    Offers Made
                  </p>
                </Dropdown.Item>
                <Dropdown.Item href="/">
                  <p className="tagLinkDropdownItemText">
                    Offers Received
                  </p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Tab>
      </TabList>
      {artistData.socialMediaVerified
        ? (
          <div>
            <TabPanel key={0} style={{ margin: '0% 2%', width: 'auto' }}>
              {artistData.userId === currentUserId
                ? <DisplayLazyOwnedNfts /> : <DisplayArtworks data={userArtworks} />}
            </TabPanel>
            <TabPanel key={1} style={{ margin: '25px 2%' }}>
              <DisplayCollections data={userCollections} />
            </TabPanel>
            <TabPanel key={2} style={{ margin: '25px 2%' }}>
              <div />
            </TabPanel>
            <TabPanel key={3} style={{ margin: '25px 2%' }}>
              <h5 className="bioTabText">{artistData?.bio}</h5>
            </TabPanel>
          </div>
        )
        : (
          <>
            <TabPanel key={0} style={{ margin: '25px 2%', width: 'auto' }}>
              {artistData?.userId === currentUserId
                ? <DisplayMyOwnedNfts address={address} />
                : <DisplayMemberOwnedNfts address={artistData?.userId} artistData={artistData} />}
            </TabPanel>
            <TabPanel key={1} style={{ margin: '25px 2%' }}>
              <div
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <img
                      style={{ width: '50%' }}
                      src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
                      alt=""
                    />
                  </div>
                  <div className="row sorry">
                    <div className="col-12">
                      <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                        Sorry, We Couldn’t Find Any Artworks that you have tokenized.
                      </h2>
                      <h5 className="sub-title help-center mg-bt-32 ">
                        Maybe your wallet is not connected, or you don&apos;t have any owned NFTs.
                        The content of this page will updated as soon as you
                        purchase one or more
                        {' '}
                        <br />
                        {' '}
                        of our unique and amazing
                        artworks.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel key={2} style={{ margin: '25px 2%' }}>
              <div
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
                }}
              >

                <div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <img
                      style={{ width: '50%' }}
                      src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
                      alt=""
                    />
                  </div>
                  <div className="row sorry">
                    <div className="col-12">
                      <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                        Sorry, We Couldn’t Find Any Artworks that you liked.
                      </h2>
                      <h5 className="sub-title help-center mg-bt-32 ">
                        Maybe your wallet is not connected, or you don&apos;t have any owned NFTs.
                        The content of this page will updated as soon as you
                        purchase one or more
                        {' '}
                        <br />
                        {' '}
                        of our unique and amazing
                        artworks.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel key={3} style={{ margin: '25px 2%' }}>
              <div
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
                }}
              >

                <div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <img
                      style={{ width: '50%' }}
                      src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
                      alt=""
                    />
                  </div>
                  <div className="row sorry">
                    <div className="col-12">
                      <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                        Sorry, We Couldn’t Find Any Artworks that you own.
                      </h2>
                      <h5 className="sub-title help-center mg-bt-32 ">
                        Maybe your wallet is not connected, or you don&apos;t have any
                        owned NFTs. The content of this page will updated as soon
                        as you purchase one or more
                        {' '}
                        <br />
                        {' '}
                        of our unique and
                        amazing artworks.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
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
