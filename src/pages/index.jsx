import React from 'react';
import HomePage from './HomePage';
import Browse from './Browse';
import LiveAuctions from './LiveAuctions';
import Blog from './Blog';
import BlogDetails from './BlogDetails';
import HelpCenter from './HelpCenter';
import Craftsmen from './Craftsmen';
import CreateItem from './CreateItem';
import EditProfile from './EditProfile';
import Ranking from './Ranking';
import NoResult from './NoResult';
import FAQ from './FAQ';
import Contact01 from './Contact01';
import Contact02 from './Contact02';
import Collections from './Collections';
import Terms from './terms';
import Privacy from './privacy';
import Drops from './Drops';
import Affiliate from './Affiliate';
import HybridNFT from './hybrid_nft';
import HybridArticle from './HybridBlogArticle';
import CreateCollection from './createCollection';
import CreateChoices from './createChoices';
import SettingsPage from './settingsPage';
import CreatePublicCollection from './createPublicCollection';
import Tokenize from './tokenize';
import Tokenized from './tokenized';
import LazyDisplay from './lazyDisplay/lazyDisplay';
import ListItem from './listNFT';
import Artwork from './artwork';
import DisplayProfile from './DisplayProfile';
import Collection from '../components/layouts/Collections/Collection';
import Learn from './Learn';
import LearnResourceDetail from './LearnResourceDetail';
import OrderTracking from './OrderTracking/OrderTracking';
import OfferList from './OfferSystem/OfferList';
import OfferSent from './OfferSystem/OfferSent';
import ConfirmationPage from './confirmationpage';
import ReferralProgram from './referralProgram';
import Masterpieces from './Masterpieces';

const routes = [
  { id: '1', path: '/', component: <HomePage /> },
  { id: '1', path: '/masterpieces', component: <Masterpieces /> },
  { id: '3', path: '/private-display', component: <LazyDisplay /> },
  { id: '5', path: '/artwork-details', component: <Artwork /> },
  { id: '6', path: '/list-item', component: <ListItem /> },
  { id: '14', path: '/explore', component: <Browse /> },
  { id: '16', path: '/terms-of-service', component: <Terms /> },
  { id: '17', path: '/privacy-policy', component: <Privacy /> },
  { id: '21', path: '/hybrid_nft', component: <HybridNFT /> },
  { id: '22', path: '/affiliate_program', component: <Affiliate /> },
  { id: '23', path: '/referral-program', component: <ReferralProgram /> },
  { id: '29', path: '/live-auctions', component: <LiveAuctions /> },
  { id: '34', path: '/drops', component: <Drops /> },
  { id: '35', path: '/blog', component: <Blog /> },
  { id: '36', path: '/blog-details/Hybrid-NFTs', component: <HybridArticle /> },
  { id: '37', path: '/blog-details', component: <BlogDetails /> },
  { id: '38', path: '/help-center', component: <HelpCenter /> },
  { id: '39', path: '/collections', component: <Collections /> },
  { id: '40', path: '/craftsmen', component: <Craftsmen /> },
  { id: '44', path: '/create-item', component: <CreateItem /> },
  { id: '45', path: '/create-collection', component: <CreateCollection /> },
  { id: '46', path: '/create-public-collection', component: <CreatePublicCollection /> },
  { id: '47', path: '/edit-profile', component: <EditProfile /> },
  { id: '48', path: '/ranking', component: <Ranking /> },
  { id: '51', path: '/no-result', component: <NoResult /> },
  { id: '52', path: '/faq', component: <FAQ /> },
  { id: '53', path: '/contact-01', component: <Contact01 /> },
  { id: '54', path: '/contact-02', component: <Contact02 /> },
  { id: '55', path: '/creator-choice', component: <CreateChoices /> },
  { id: '56', path: '/settings', component: <SettingsPage /> },
  { id: '57', path: '/tokenize', component: <Tokenize /> },
  { id: '59', path: '/tokenized', component: <Tokenized /> },
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
