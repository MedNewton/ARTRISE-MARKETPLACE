import React from 'react';
import { Link } from 'react-router-dom';
import { useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

function DisplayMyOwnedNfts(props) {
  const { address } = props;
  const { contract } = useContract('0xa6F0F91BF6e9bEdF044C3e989C6cB2e0376b40fC', 'nft-collection');
  const { data: ownedNFTs, isLoading } = useOwnedNFTs(contract, address);

  function generateUniqueId() {
    return uuidv4();
  }

  return (
    <div className="artist-profile-wrapper">
      <div>
        {address && !isLoading && ownedNFTs?.length > 0 ? (

          ownedNFTs?.map((nft) => {
            if (nft.metadata.id !== 0) {
              return (
                <div key={generateUniqueId()} style={{ maxWidth: '300px' }}>
                  <div className="sc-card-product">
                    <div className="card-media">
                      <Link
                        to="/"
                      >
                        <img src={nft.metadata.image} alt="" />
                      </Link>

                      <Link
                        to="/"
                        className="wishlist-button heart"
                        hidden
                      >
                        <span className="number-like">10</span>
                      </Link>
                      <div className="coming-soon" hidden>
                        10
                      </div>
                    </div>

                    <div className="card-title">
                      <h5 className="style2">
                        <Link
                          to="/"
                        >
                          {nft.metadata.name}
                        </Link>
                      </h5>
                    </div>
                    <div className="card-bottom">
                      <Link
                        to="/"
                        className="buyNowBtn"
                      >
                        <button type="button" className="sc-button style bag fl-button pri-3 no-bg">
                          <span>List this NFT</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })
        ) : (
          <div className="no-item-found-message-wrapper">
            <div>
              <div className="no-item-found-message-icon">
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
                    The content of this page will updated as soon as you purchase one or
                    more
                    {' '}
                    <br />
                    {' '}
                    of our unique and amazing artworks.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}
DisplayMyOwnedNfts.propTypes = {
  address: PropTypes.string,
};

DisplayMyOwnedNfts.defaultProps = {
  address: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
};
export default DisplayMyOwnedNfts;
