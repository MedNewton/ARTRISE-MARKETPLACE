import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { Accordion } from 'react-bootstrap-accordion';
import { get, ref } from 'firebase/database';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import db from '../../firebase';

import Footer from '../../components/footer/Footer';
import MediaViewer from '../../components/layouts/mediaViewer/MediaViewer';
import {
  ArtworkCollectionName,
  ArtworkDescription,
  ArtworkDetailsWrapper,
  ArtworkName,
  ArtworkPageWrapper,
  AvatarWrapper, ButtonsWrapper,
  InfoWrapper,
  MainImageAttributesWrapper,
  OwnerName,
  OwnerNameHeading,
  OwnersSectionDetailsWrapper,
  OwnerWrapper,
} from '../../components/layouts/artwork/artwork.styles';
import PhysicalImagesViewer from '../../components/layouts/artwork/PhysicalImagesViewer';
import placeHolderMainImage from '../../assets/images/box-item/collection-item-bottom-4.jpg';

class LazyNFT {
  constructor(i, d, o) {
    this.id = i;
    this.data = d;
    this.owner = o;
  }
}

function LazyDisplay() {
  const [nftID, setNftID] = useState();
  const [nft, setNFT] = useState();
  const navigate = useNavigate();
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });

  // const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const theme = useSelector((state) => state.themeReducer.theme);

  const getNFTData = useCallback(async (nftIDProp) => {
    let lazyNFT;
    const artworkRef = ref(db, `artworks/${nftIDProp}`);
    await get(artworkRef).then(async (snapshot) => {
      const { key } = snapshot;
      const IPFS_URL = snapshot.val()?.ipfsURI;
      const data = await axios.get(IPFS_URL);
      const ownerID = snapshot.val().owner;
      const userRef = ref(db, `users/${ownerID}`);
      await get(userRef).then(async (ownerSnapshot) => {
        const owner = ownerSnapshot.val();
        lazyNFT = new LazyNFT(key, data.data, owner);
        document.title = `Artrise - ${lazyNFT?.data?.name}`;
        setNFT(lazyNFT);
      });
    });
    return lazyNFT;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchId = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.has('id')) {
          const id = queryParams.get('id');
          if (id) {
            await getNFTData(id);
            setNftID(id);
          }
        } else {
          console.error("URL doesn't contain the NFT id");
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchId();
  }, [getNFTData]);

  return (
    <div className="item-details">
      {nft ? (
        <ArtworkPageWrapper isDeviceMobile={isDeviceMobile}>
          <MainImageAttributesWrapper isDeviceMobile={isDeviceMobile}>
            <div className="artwork-media-wrapper">
              <MediaViewer mediaUrl={nft?.data?.image} />
            </div>
            <div className="metadataBox" style={{ marginTop: '2%' }}>
              <div className="flat-accordion2">
                <Accordion key="0" title="Properties">
                  <div className="row propertiesBox">
                    {nft?.data?.attributes?.map((attribute) => (
                      <div className="col-3 attr">
                        <p className="attributeTitle">{attribute?.trait_type}</p>
                        <p>{attribute?.trait_value}</p>
                      </div>
                    ))}
                  </div>
                </Accordion>
                <Accordion key="1" title="About the artist">
                  <p>{nft?.owner.bio}</p>
                </Accordion>
                <Accordion key="2" title="Details">
                  <div className="row">
                    <div className="col-6 detailLeft">
                      <p>Contract address</p>
                    </div>
                    <div className="col-6">
                      <p className="detailRight">
                        <Link
                          rel="external"
                          target="_blank"
                          to="http://etherscan.io/address/0x6E42262978de5233C8d5B05B128C121fBa110DA4"
                        >
                          0xa6F...0fC
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 detailLeft">
                      <p>Token ID</p>
                    </div>
                    <div className="col-6">
                      <p className="detailRight">31</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 detailLeft">
                      <p>Token Standard</p>
                    </div>
                    <div className="col-6">
                      <p className="detailRight">ERC-721</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 detailLeft">
                      <p>Chain</p>
                    </div>
                    <div className="col-6">
                      <p className="detailRight">Ethereum</p>
                    </div>
                  </div>
                </Accordion>
              </div>
            </div>
          </MainImageAttributesWrapper>

          <ArtworkDetailsWrapper isDeviceMobile={isDeviceMobile}>
            <ArtworkName theme={theme}>
              {nft?.data?.name}
            </ArtworkName>
            <ArtworkCollectionName theme={theme}>
              {nft?.collection?.name ? nft?.collection?.name : 'ARTRISE Shared Collection'}
            </ArtworkCollectionName>
            <ArtworkDescription theme={theme}>
              {nft?.data?.description}
            </ArtworkDescription>
            <OwnersSectionDetailsWrapper>
              <OwnerWrapper theme={theme}>
                <AvatarWrapper>
                  <img style={{ borderRadius: '5px' }} src={nft?.owner?.pdpLink} alt="Axies" />
                </AvatarWrapper>
                <InfoWrapper>
                  <OwnerNameHeading theme={theme}>Owned By</OwnerNameHeading>
                  <OwnerName theme={theme}>{nft?.owner?.name}</OwnerName>
                </InfoWrapper>
              </OwnerWrapper>
              <OwnerWrapper theme={theme}>
                <AvatarWrapper>
                  <img style={{ borderRadius: '5px' }} src={nft?.owner?.pdpLink} alt="Axies" />
                </AvatarWrapper>
                <InfoWrapper>
                  <OwnerNameHeading theme={theme}>Created By</OwnerNameHeading>
                  <OwnerName theme={theme}>{nft?.owner?.name}</OwnerName>
                </InfoWrapper>
              </OwnerWrapper>
            </OwnersSectionDetailsWrapper>
            <ButtonsWrapper>
              <button
                type="button"
                id="load-more"
                className="sc-button loadmore fl-button pri-3"
                onClick={async (e) => {
                  e.preventDefault();
                  // await handleMint();
                  await navigate(`/list-item?id=${nftID}`);
                }}
              >
                <span>List this NFT</span>
              </button>
            </ButtonsWrapper>
            <PhysicalImagesViewer physicalImages={nft?.data?.physical_images} />
          </ArtworkDetailsWrapper>
        </ArtworkPageWrapper>

      ) : (
        <ArtworkPageWrapper isDeviceMobile={isDeviceMobile}>
          <MainImageAttributesWrapper isDeviceMobile={isDeviceMobile}>
            <div className="artwork-media-wrapper">
              <MediaViewer />
            </div>
            <div className="metadataBox" style={{ marginTop: '2%' }}>
              <div className="flat-accordion2">
                <Accordion key="0" title="Properties" />
                <Accordion key="1" title="About the artist">
                  <p>Owner&apos;s Bio</p>
                </Accordion>
                <Accordion key="2" title="Details" />
              </div>
            </div>
          </MainImageAttributesWrapper>
          <ArtworkDetailsWrapper isDeviceMobile={isDeviceMobile}>
            <ArtworkName theme={theme}>
              Artwork&apos;s Name
            </ArtworkName>
            <ArtworkCollectionName theme={theme}>
              ARTRISE Shared Collection
            </ArtworkCollectionName>
            <ArtworkDescription theme={theme}>
              Artwork&apos;s Description
            </ArtworkDescription>
            <OwnersSectionDetailsWrapper>
              <OwnerWrapper theme={theme}>
                <AvatarWrapper>
                  <img style={{ borderRadius: '5px' }} src={placeHolderMainImage} alt="Axies" />
                </AvatarWrapper>
                <InfoWrapper>
                  <OwnerNameHeading theme={theme}>Owned By</OwnerNameHeading>
                  <OwnerName theme={theme}>Owner&apos;s Name</OwnerName>
                </InfoWrapper>
              </OwnerWrapper>
              <OwnerWrapper theme={theme}>
                <AvatarWrapper>
                  <img style={{ borderRadius: '5px' }} src={placeHolderMainImage} alt="Axies" />
                </AvatarWrapper>
                <InfoWrapper>
                  <OwnerNameHeading theme={theme}>Created By</OwnerNameHeading>
                  <OwnerName theme={theme}>Creator&apos;s Name</OwnerName>
                </InfoWrapper>
              </OwnerWrapper>
            </OwnersSectionDetailsWrapper>

            <ButtonsWrapper>
              <button
                type="button"
                id="load-more"
                className="sc-button loadmore fl-button pri-3"
                onClick={async (e) => {
                  e.preventDefault();
                }}
              >
                <span>List this NFT</span>
              </button>
            </ButtonsWrapper>
            <PhysicalImagesViewer physicalImages={nft?.data?.physical_images} />
          </ArtworkDetailsWrapper>
        </ArtworkPageWrapper>
      )}
      <Footer />
    </div>
  );
}

export default LazyDisplay;
