import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion } from 'react-bootstrap-accordion';
import Footer from '../components/footer/Footer';

function Affiliate() {
  const navigate = useNavigate();
  const data = useMemo(() => [
    {
      key: '0',
      show: 'show',
      title: 'BECOME AN AFFILIATE',
      text: 'It\'s easy and free to join. After your application is approved, '
                + 'you’ll get access to promotional assets',
    },
    {
      key: '1',
      title: 'PROMOTE ARTRISE',
      text: 'Create content (videos, articles, ads, etc.) and link to your Artrise affiliate link.',
    },
    {
      key: '2',
      title: 'EARN COMMISIONS',
      text: 'Every time people come to Artrise through your affiliate link and make a purchase, '
                + 'you get up to 10% in commissions for every purchase.',
    },
  ], []);

  useEffect(() => {
    window.ire('identify', { customerId: localStorage.getItem('UserKey') });
  }, []);
  return (
    <div>
      <section className="wrap-accordion">
        <div className="container">
          <div className="row mrgTopSection">
            <div className="col-md-12">
              <h2 className="tf-title style2 fs-30 mg-bt-60">
                BECOME ARTRISE AFFILIATE
              </h2>

              <h5 className="sub-title help-center mg-bt-32 ">
                Earn money by promoting ArtRise, where you can buy, trade, and discover hybrid NFT
                artworks.

              </h5>

              <div
                className="col-md-12 wrap-inner load-more text-center mb-20"
              >
                <button
                  type="button"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  <span>Become an affiliate</span>
                </button>
              </div>
              <h4 className="tf-title-heading ct style-2 fs-30 mg-bt-30">
                How it works?

              </h4>
            </div>

            <div className="col-md-12">
              <div className="flat-accordion2">
                {data.map((item) => (
                  <Accordion key={item.key} title={item.title}>
                    <p>{item.text}</p>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Affiliate;
