import React from 'react';
import Home01 from './Home01';
import Home02 from './Home02';
import Home03 from './Home03';
import Home04 from './Home04';
import Home05 from './Home05';
import Home06 from './Home06';
import Home07 from './Home07';
import Home08 from './Home08';
import Explore01 from './Explore01';
import Explore02 from './Explore02';
import Explore03 from './Explore03';
import Explore04 from './Explore04';
import LiveAuctions from './LiveAuctions';
import ItemDetails01 from './ItemDetails01';
import ItemDetails02 from './ItemDetails02';
import Activity01 from './Activity01';
import Activity02 from './Activity02';
import Blog from './Blog';
import BlogDetails from './BlogDetails';
import HelpCenter from './HelpCenter';
import Authors01 from './Authors01';
import Authors02 from './Authors02';
import WalletConnect from './WalletConnect';
import CreateItem from './CreateItem';
import EditProfile from './EditProfile';
import Ranking from './Ranking';
import Login from './Login';
import SignUp from './SignUp';
import NoResult from './NoResult';
import FAQ from './FAQ';
import Contact01 from './Contact01';
import Contact02 from './Contact02';
import Collections from './Collections';
import PixelizedMosaic from './PMcollection';
import Terms from './terms';
import Privacy from './privacy';
import MyArtworks from './myArtworks';
import ReferralHome from './referralHome';
import Drops from './Drops';
import Affiliate from './Affiliate';
import Referral from './Referral';
import HybridNFT from './hybrid_nft';
import YannFaisantProfile from './YannFaisant';
import LikedItems from './LikedItems';
import ReferralPage from './ReferralkPage';
import HybridArticle from './HybridBlogArticle';
import ArtistInfos from './artistInfos';
import CreateCollection from './createCollection';
import CreateChoices from './createChoices';
import SettingsPage from './settingsPage';
import CreatePublicCollection from './createPublicCollection';
import Tokenize from './tokenize';
import Premiers from './bidPage1';
import MyCollections from './myCollections';
import Tokenized from './tokenized';
import MyPendingArtworks from './myPendingArtworks';
import Ressources from './ressources';
import LazyDisplay from './lazyDisplay';
import ListItem from './listNFT';
import Artwork from './artwork';
import CollectionItems from './collectionItems';
import DisplayProfile from './DisplayProfile';
import Collection from '../components/layouts/Collections/Collection';
import Learn from './Learn';
import LearnResourceDetail from './LearnResourceDetail';
import OrderTracking from './OrderTracking/OrderTracking';
import OfferList from './OfferSystem/OfferList';
import OfferSent from './OfferSystem/OfferSent';
import ConfirmationPage from './confirmationpage';

const routes = [
  { id: '1', path: '/', component: <Home01 /> },
  { id: '2', path: '/artist-info', component: <ArtistInfos /> },
  { id: '3', path: '/private-display', component: <LazyDisplay /> },
  { id: '4', path: '/collection-items', component: <CollectionItems /> },
  { id: '5', path: '/artwork-details', component: <Artwork /> },
  { id: '6', path: '/list-item', component: <ListItem /> },
  { id: '7', path: '/ressources', component: <Ressources /> },
  { id: '8', path: '/home-02', component: <Home02 /> },
  { id: '9', path: '/home-03', component: <Home03 /> },
  { id: '10', path: '/home-04', component: <Home04 /> },
  { id: '11', path: '/home-05', component: <Home05 /> },
  { id: '12', path: '/home-06', component: <Home06 /> },
  { id: '13', path: '/home-07', component: <Home07 /> },
  { id: '14', path: '/home-08', component: <Home08 /> },
  { id: '15', path: '/explore-01', component: <Explore01 /> },
  { id: '16', path: '/terms-of-service', component: <Terms /> },
  { id: '17', path: '/privacy-policy', component: <Privacy /> },
  { id: '18', path: '/my-artworks', component: <MyArtworks /> },
  { id: '19', path: '/likedItems', component: <LikedItems /> },
  { id: '20', path: '/referral', component: <Referral /> },
  { id: '21', path: '/hybrid_nft', component: <HybridNFT /> },
  { id: '22', path: '/affiliate_program', component: <Affiliate /> },
  { id: '23', path: '/referral-program', component: <ReferralHome /> },
  { id: '24', path: '/Referral', component: <ReferralPage /> },
  { id: '25', path: '/pixelizd-mosaic-collection', component: <PixelizedMosaic /> },
  { id: '26', path: '/explore-02', component: <Explore02 /> },
  { id: '27', path: '/explore-03', component: <Explore03 /> },
  { id: '28', path: '/explore-04', component: <Explore04 /> },
  { id: '29', path: '/live-auctions', component: <LiveAuctions /> },
  { id: '30', path: '/item-details-01', component: <ItemDetails01 /> },
  { id: '31', path: '/item-details-02', component: <ItemDetails02 /> },
  { id: '32', path: '/activity-01', component: <Activity01 /> },
  { id: '33', path: '/activity-02', component: <Activity02 /> },
  { id: '34', path: '/drops', component: <Drops /> },
  { id: '35', path: '/blog', component: <Blog /> },
  { id: '36', path: '/blog-details/Hybrid-NFTs', component: <HybridArticle /> },
  { id: '37', path: '/blog-details', component: <BlogDetails /> },
  { id: '38', path: '/help-center', component: <HelpCenter /> },
  { id: '39', path: '/collections', component: <Collections /> },
  { id: '40', path: '/authors-01', component: <Authors01 /> },
  { id: '41', path: '/authors-02', component: <Authors02 /> },
  { id: '42', path: '/Artists/Yann_Faisant', component: <YannFaisantProfile /> },
  { id: '43', path: '/wallet-connect', component: <WalletConnect /> },
  { id: '44', path: '/create-item', component: <CreateItem /> },
  { id: '45', path: '/create-collection', component: <CreateCollection /> },
  { id: '46', path: '/create-public-collection', component: <CreatePublicCollection /> },
  { id: '47', path: '/edit-profile', component: <EditProfile /> },
  { id: '48', path: '/ranking', component: <Ranking /> },
  { id: '49', path: '/login', component: <Login /> },
  { id: '50', path: '/sign-up', component: <SignUp /> },
  { id: '51', path: '/no-result', component: <NoResult /> },
  { id: '52', path: '/faq', component: <FAQ /> },
  { id: '53', path: '/contact-01', component: <Contact01 /> },
  { id: '54', path: '/contact-02', component: <Contact02 /> },
  { id: '55', path: '/creator-choice', component: <CreateChoices /> },
  { id: '56', path: '/settings', component: <SettingsPage /> },
  { id: '57', path: '/tokenize', component: <Tokenize /> },
  { id: '58', path: '/à_jamais_les_premiers', component: <Premiers /> },
  { id: '59', path: '/tokenized', component: <Tokenized /> },
  { id: '60', path: '/myCollections', component: <MyCollections /> },
  { id: '61', path: '/pending-tokenizations', component: <MyPendingArtworks /> },
  { id: '62', path: '/displayProfile', component: <DisplayProfile /> },
  { id: '63', path: '/collection', component: <Collection /> },
  { id: '64', path: '/learn', component: <Learn /> },
  { id: '65', path: '/learn/*', component: <LearnResourceDetail /> },
  { id: '66', path: '/order/tracking', component: <OrderTracking /> },
  { id: '67', path: '/page/offer/received', component: <OfferList /> },
  { id: '68', path: '/page/offer/sent', component: <OfferSent /> },
  { id: '69', path: '/order/tracking', component: <OrderTracking /> },
  { id: '70', path: '/page/confirmation', component: <ConfirmationPage /> },
];

export default routes;
