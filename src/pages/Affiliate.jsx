import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap-accordion';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';

function Affiliate() {
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
      <HeaderStyle2 />

      <section className="tf-section wrap-accordion">
        <div className="container">
          <div className="row mrgTopSection">
            <div className="col-md-12">
              <h2 className="tf-title style2 fs-30 mg-bt-60">
                BECOME ARTRISE AFFILIATE
              </h2>

              <h5 className="sub-title help-center mg-bt-32 ">
                Earn money by promoting ArtRise, where you can buy, trade, and discover hybrid NFT artworks.

              </h5>
              <Link to="/">
                <button type="button" className="affiliateButton">Become an affiliate</button>
              </Link>
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
