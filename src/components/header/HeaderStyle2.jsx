/*eslint-disable */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useAccount, useDisconnect } from 'wagmi';
// eslint-disable-next-line import/no-unresolved
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import DarkMode from './DarkMode';
import LoginModal from '../layouts/loginModal';
import JoinChoicesModal from '../layouts/joinChoicesModal';
import HeaderSearch from './HeaderSearch/HeaderSearch';
import RenderLogo from './RenderLogo/RenderLogo';
import RenderHomeExploreDropButtons from './RenderHomeExporeDropButtons/RenderHomeExploreDropButtons';
import RenderNotifyIcon from './RenderNotifyIcon/RenderNotifyIcon';
import RenderCartIcon from './RenderCartIcon/RenderCartIcon';
import RenderProfileIcon from './RenderProfileIcon/RenderProfileIcon';
import RenderWalletAddress from './RenderWalletAddressSection/RenderWalletAddress';
import RenderConnectWalletAddress from './RenderWalletAddressSection/RenderConnectWalletAddress';
import RenderJoinLoginButton from './RenderJoinLoginButton/RenderJoinLoginButton';
import RenderBurgerMenuIcon from './RenderBurgerMenu/RenderBurgerMenuIcon';
import MobileVersionMenuModal from './MenuModal/MobileVersionMenuModal';
import { CheckUserExists } from '../../services/AuthServices/CheckUserExists';
import RenderSearchIconForMobileView from './RenderSearchIconForMobileView/RenderSearchIconForMobileView';
import HeaderSearchForMobileView from './HeaderSearch/HeaderSearchForMobileView';

function HeaderStyle2() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.usersReducer.currentUserId);
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showSearchField, setShowSearchField] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(localStorage.getItem('walletAddress') !== null);
  const [isTwitterConnected, setIsTwitterConnected] = useState(localStorage.getItem('twitter') !== null);
  const [isGoogleConnected, setIsGoogleConnected] = useState(localStorage.getItem('google') !== null);
  const [isFacebookConnected, setIsFacebookConnected] = useState(localStorage.getItem('facebook') !== null);

  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [joinChoicesModalOpen, setJoinChoicesModalOpen] = useState(false);
  const [referee, setReferee] = useState('');
  const headerRef = useRef(null);

  const handleMenuModalClose = () => setShowMenuModal(false);
  const handleShowMenuModal = () => setShowMenuModal(true);

  const isSticky = () => {
    const header = document.querySelector('.js-header');
    const scrollTop = window.scrollY;
    if (scrollTop >= 300) {
      header.classList.add('is-fixed');
    } else {
      header.classList.remove('is-fixed');
    }
    if (scrollTop >= 400) {
      header.classList.add('is-small');
    } else {
      header.classList.remove('is-small');
    }
  };

  useEffect(() => {
    document.title = 'Artrise - Physical NFTs Marketplace';
    const handleScroll = () => {
      isSticky();
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.ire('identify', { customerId: currentUserId });
  }, [currentUserId]);

  useEffect(() => {
    if (address) {
      CheckUserExists(address, referee, disconnect, dispatch)
        .then(() => {
          const walletConnectedState = localStorage.getItem('walletAddress');
          if (walletConnectedState) {
            setIsWalletConnected(true);
          } else {
            setIsWalletConnected(false);
          }
          const twitterState = localStorage.getItem('twitter');
          if (twitterState) {
            setIsTwitterConnected(true);
          } else {
            setIsTwitterConnected(false);
          }
          const googleState = localStorage.getItem('google');
          if (googleState) {
            setIsGoogleConnected(true);
          } else {
            setIsGoogleConnected(false);
          }
          const facebookState = localStorage.getItem('facebook');
          if (facebookState) {
            setIsFacebookConnected(true);
          } else {
            setIsFacebookConnected(false);
          }
        });
    }
  }, [address, referee, dispatch, disconnect]);

  const checkForReferralCode = useCallback(() => {
    const url = window.location.href;
    if (url.toString()
      .includes('?')) {
      setReferee(url.toString()
        .split('?ref=')[1]);
    } else {
      setReferee('none');
    }
  }, []);

  useEffect(() => {
    checkForReferralCode();
  }, [checkForReferralCode]);

  return (
    <>
      <div
        id="header_main"
        className="header_1 header_2 style2 js-header"
        ref={headerRef}
      >
        <div className="themesflat-container">
          <div className="row">
            <div
              className={isDeviceMobile
                ? 'col-12-mobile-version white-black-color-switch'
                : 'col-md-12 white-black-color-switch'}
            >
              <div id="site-header-inner">
                <div className="wrap-box flex flex-row justify-content-between align-items-center">
                  {isDeviceMobile && !showSearchField
                    && (
                      <div className="navbar-mobile-version-wrapper">
                        <div
                          className="navbar-left-half-mobile-version-wrapper"
                        >
                          <RenderLogo />
                        </div>
                        <div className="navbar-right-half-mobile-version-wrapper">
                          <RenderSearchIconForMobileView
                            setShowSearchField={setShowSearchField}
                            showSearchField={showSearchField}
                            handleMenuModalClose={handleMenuModalClose}
                          />
                          <DarkMode />
                          <RenderBurgerMenuIcon handleShowMenuModal={handleShowMenuModal} />
                        </div>
                      </div>
                    )}
                  {isDeviceMobile && showSearchField
                    && (
                      <HeaderSearchForMobileView
                        setShowSearchField={setShowSearchField}
                      />
                    )}
                  {!isDeviceMobile
                    && (
                      <>
                        <RenderLogo />
                        <RenderHomeExploreDropButtons />
                        <HeaderSearch />

                        {
                          currentUserId
                          && isWalletConnected
                          && !isTwitterConnected
                          && !isGoogleConnected
                          && !isFacebookConnected
                            ? (
                              <>
                                {/* {()=>{CheckUserExists(address, referee)}} */}
                                <div className="flat-search-btn flex">
                                  {
                                    address
                                      ? (
                                        <RenderWalletAddress
                                          address={address}
                                          open={open}
                                        />
                                      )
                                      : <RenderConnectWalletAddress open={open} />
                                  }
                                  <div className="separator" />

                                  <div className="admin_active" id="header_admin">

                                    <div
                                      className="header_avatar flex-row-flex-start-gap1"
                                    >
                                      <RenderNotifyIcon />
                                      <RenderProfileIcon
                                        UserPdpLink={localStorage?.getItem('pdpLink')}
                                        disconnect={disconnect}
                                        dispatch={dispatch}
                                      />
                                      <RenderCartIcon />
                                      <DarkMode />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                            : !isWalletConnected && !currentUserId
                            && (isTwitterConnected
                              || isGoogleConnected
                              || isFacebookConnected)
                              ? (
                                <div className="flat-search-btn flex">
                                  <RenderConnectWalletAddress open={open} />
                                  <div className="separator" />
                                  <div className="admin_active" id="header_admin">
                                    <div
                                      className="header_avatar flex-row-flex-start-gap1"
                                    >
                                      <RenderNotifyIcon />
                                      <RenderProfileIcon
                                        UserPdpLink={localStorage.getItem('pdpLink')}
                                        disconnect={disconnect}
                                      />
                                      <RenderCartIcon />
                                      <DarkMode />
                                    </div>
                                    <div className="nonConnectedBtnBox">
                                      <div className="nonConnectedBtns" />

                                    </div>
                                  </div>
                                </div>
                              )
                              : (
                                <RenderJoinLoginButton
                                  setJoinChoicesModalOpen={setJoinChoicesModalOpen}
                                  setLoginModalOpen={setLoginModalOpen}
                                />
                              )
                        }
                      </>
                    )}
                </div>

              </div>
            </div>
          </div>
        </div>
        <JoinChoicesModal
          show={joinChoicesModalOpen}
          onHide={() => setJoinChoicesModalOpen(false)}
        />
        <LoginModal
          show={loginModalOpen}
          onHide={() => setLoginModalOpen(false)}
        />
      </div>
      <MobileVersionMenuModal
        showMenuModal={showMenuModal}
        joinChoicesModalOpen={joinChoicesModalOpen}
        loginModalOpen={loginModalOpen}
        showSearchField={showSearchField}
        handleMenuModalClose={handleMenuModalClose}
        setJoinChoicesModalOpen={setJoinChoicesModalOpen}
        setLoginModalOpen={setLoginModalOpen}
        setShowSearchField={setShowSearchField}
      />
    </>
  );
}

export default HeaderStyle2;
