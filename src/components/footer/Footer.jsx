/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logodark from '../../assets/images/logo/logo_dark.png';
import logofooter from '../../assets/images/logo/logo2.png';

function Footer() {
  const doNotNavigateHandlerFunction = (e) => {
    e.preventDefault();
  };

  const accountList = [
    {
      id: 'account1',
      title: 'Home',
      link: '/',
    },
    {
      id: 'account2',
      title: 'Explore',
      link: '/explore',
    },
    {
      id: 'account3',
      title: 'Artists',
      link: '/craftsmen',
    },
    {
      id: 'account4',
      title: 'Collections',
      link: '/collections',
    },
    {
      id: 'account5',
      title: 'Artworks',
      link: '/masterpieces',
    },

  ];

  const resourcesList = [
    {
      id: 'resource1',
      title: 'What is a hybrid NFT?',
      link: '/hybrid_nft',
    },
    {
      id: 'resource2',
      title: 'How it works?',
      link: '//artrise.io/index.php/ecosystem/',
    },
    {
      id: 'resource3',
      title: 'How to use?',
      link: '//forms.gle/dVamYz7mYkfz7EaW7',
    },
    {
      id: 'resource4',
      title: 'Help & Support',
      link: '/help-center',
    },
    {
      id: 'resource5',
      title: 'FAQ',
      link: '/faq',
    },

  ];

  const companyList = [
    {
      id: 'company1',
      title: 'About Us',
      link: '/about-us',
    },
    {
      id: 'company2',
      title: 'Blog',
      link: '/blog',
    },
    {
      id: 'company3',
      title: 'َReferral program',
      link: '/referral-program',
    },
    {
      id: 'company4',
      title: 'َAffiliate program',
      link: '/affiliate_program',
    },
    {
      id: 'company5',
      title: 'Contact Us',
      link: '/contact-01',
    },
  ];

  const socialList = [
    {
      id: 'socialIcon1',
      icon: 'fab fa-twitter',
      link: '//twitter.com/ArtRise_?t=zT01bDU4nwqHjdnPbBeh5w&s=09',
    },
    {
      id: 'socialIcon2',
      icon: 'fab fa-facebook',
      link: '//www.facebook.com/Artrise.io?mibextid=ZbWKwL',
    },
    {
      id: 'socialIcon3',
      icon: 'fab fa-telegram-plane',
      link: 'doNotNavigateHandlerFunction',
    },
    {
      id: 'socialIcon4',
      icon: 'fab fa-instagram',
      link: '//instagram.com/artrise.io?igshid=YmMyMTA2M2Y=',
    },

  ];

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
      <div>
        <footer id="footer" className="footer-light-style clearfix bg-style">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-12">
                <div className="widget widget-logo">
                  <div className="logo-footer" id="logo-footer">
                    <Link to="/">
                      <img className="logo-dark" id="logo_footer" src={logodark} alt="nft-gaming" />
                      <img className="logo-light" id="logo_footer" src={logofooter} alt="nft-gaming" />

                    </Link>
                  </div>
                  <p className="sub-widget-logo">We will not rest until all fine art is tokenized.</p>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-5 col-5">
                <div className="widget widget-menu style-1">
                  <h5 className="title-widget">Marketplace</h5>
                  <ul>
                    {
                      accountList.map((item) => (
                          <li key={item.id}><Link to={item.link}>{item.title}</Link></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-7 col-7">
                <div className="widget widget-menu style-2">
                  <h5 className="title-widget">Resources</h5>
                  <ul>
                    {
                      resourcesList.map((item) => (
                          <li key={item.id}><Link to={item.link}>{item.title}</Link></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-5 col-5">
                <div className="widget widget-menu fl-st-3">
                  <h5 className="title-widget">Company</h5>
                  <ul>
                    {
                      companyList.map((item) => (
                          <li key={item.id}><Link to={item.link}>{item.title}</Link></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-7 col-12">
                <div className="widget widget-subcribe">
                  <h5 className="title-widget">Subscribe</h5>

                  <div className="form-subcribe ">
                    <form id="subscribe-form" action="#" method="GET" acceptCharset="utf-8" className="form-submit">
                      <div className='d-flex'>
                        <input name="email" className="email" type="email" placeholder="Enter your email" required />
                        <button id="submit" name="submit" type="submit"><i class="icon-fl-send"></i></button>
                      </div>
                    </form>
                  </div>

                  <div className="widget-social style-1 mg-t32">
                    <ul>
                      {
                        socialList.map((item) => (
                            <li key={item.id}><Link to={item.link}><i className={item.icon} /></Link></li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="indentedHR" />
          <div className="footer-copyrights">

           <div><p className="rights">All rights reserved ArtRise Labs LLC</p></div>
            <div><p className="rights">Version: May 13, 2024</p></div>
            <div>
              {' '}
              <p className="rights privacy">
                <Link to="/privacy-policy">Privacy policy</Link>
                &nbsp;|&nbsp;
                {' '}
                <Link to="/terms-of-service">Terms of service</Link>
              </p>
            </div>
          </div>
        </footer>

        {
            isVisible
            && <Link onClick={scrollToTop} to={doNotNavigateHandlerFunction} id="scroll-top" />
        }

        <div className="modal fade popup" id="popup_bid" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="modal-body space-y-20 pd-40">
                <h3>Place a Bid</h3>
                <p className="text-center">
                  You must bid at least
                  <span className="price color-popup">4.89 ETH</span>
                </p>
                <input
                    type="text"
                    className="form-control"
                    placeholder="00.00 ETH"
                />
                <p>
                  Enter quantity.
                  <span className="color-popup">5 available</span>
                </p>
                <input type="number" className="form-control" placeholder="1" />
                <div className="hr" />
                <div className="d-flex justify-content-between">
                  <p> You must bid at least:</p>
                  <p className="text-right price color-popup"> 4.89 ETH </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p> Service free:</p>
                  <p className="text-right price color-popup"> 0,89 ETH </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p> Total bid amount:</p>
                  <p className="text-right price color-popup"> 4 ETH </p>
                </div>
                <Link
                    to={doNotNavigateHandlerFunction}
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#popup_bid_success"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                  {' '}
                  Place a bid
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

  );
}

export default Footer;
