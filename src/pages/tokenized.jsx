import React from 'react';
import { Link } from 'react-router-dom';
import {
  useContract,
  useOwnedNFTs,
} from '@thirdweb-dev/react';
import { useAccount } from 'wagmi';

function Tokenized() {
  const { address } = useAccount();

  const { contract } = useContract(
    '0xa6F0F91BF6e9bEdF044C3e989C6cB2e0376b40fC',
    'nft-collection',
  );

  const { data: ownedNFTs, isLoading } = useOwnedNFTs(contract, address);

  return (
    <div className="profile-tabPanel-item">
      {!isLoading && ownedNFTs && address
        ? ownedNFTs.map((nft) => {
          if (nft.metadata.id !== 0) {
            return (
              <div
                key={nft.metadata.id}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
              >
                <div className="sc-card-product">
                  <div className="card-media">
                    <img src={nft.metadata.image} alt="" />
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
                    <h5 className="style2">{nft.metadata.name}</h5>
                  </div>
                  <div className="card-bottom">
                    <Link to="/" className="buyNowBtn">
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
        : (
          <div>
            <div>
              <img
                src="https://cdn.dribbble.com/users/1693462/screenshots/3504905/media/e76b879fc2bb9ec2a1f92da0732eb608.gif"
                alt=""
              />
            </div>
            <div className="row sorry">
              <div className="col-12">
                <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                  Sorry, We Couldn&apos;t Find Any Artworks that you have tokenized.
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
        )}
    </div>
  );
}

export default Tokenized;
