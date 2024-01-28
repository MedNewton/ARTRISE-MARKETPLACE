import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';

function Privacy() {
  return (
    <div>
      <section className="flat-title-page inner">
        <div className="overlay" />
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Privacy policy</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/">Explore</Link></li>
                  <li>Explore 1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="terms">
        <h3>1 &#10022;  Gathering of Personal Data:</h3>
        <p className="textPara">
          You provide us with the following types of information that we collect:

          Name, email address, digital wallet address, and any other information you
          voluntarily disclose to us on or through the services are all considered identification
          information.

        </p>
        <h3>2 &#10022;  Communication Information: </h3>
        <p className="textPara">
          When you contact us with issues or concerns, as
          well as when you voluntarily complete questionnaires, surveys, or requests for
          market research that ask for your opinion and input, we may collect information
          about you.

        </p>
        <h3>3 &#10022;  Commercial Data: </h3>
        <p className="textPara">
          We might keep a record of the Digital Art or Art Content you
          peruse, buy, sell, or otherwise acquire through the Service.

        </p>
        <h3>4 &#10022;  Social media: </h3>
        <p className="textPara">
          We are active on sites like Instagram, Twitter, and LinkedIn. When
          you engage with us on social media, we might get access to personal data that you
          give us or make available to us based on your preferences, like details about your
          profile. Additionally, we keep track of any social network profile details you
          voluntarily give us.

        </p>

        <h3>5 &#10022;  Internet Activity Information: </h3>
        <p className="textPara">
          We may automatically record the following data
          when you access, utilize, and engage with the Service: device information, usage
          information, location information, email open/click information, cookies, local
          storage technologies, web beacons.
        </p>

        <h3>6 &#10022;  Personal Information we gather from Publicly Available Sources: </h3>
        <p className="textPara">
          We might gather
          identity data about you through blockchain networks that are accessible to the
          general public, such the Ethereum blockchain.

        </p>
        <p className="textPara">
          We use your personal information in order to improve our services, communicate
          with you, and for marketing and advertising purposes.

        </p>
        <p className="textPara">
          Both the Service and how we do business could occasionally change. We reserve the
          right to modify this Privacy Policy at any time. Unless the law specifically requires
          another kind of notice, we will update this page when we do so. You agree to the
          revised Privacy Policy and the practices outlined in it by continuing to use our Service
          or giving us personal information after we posted an updated Privacy Policy or, as
          appropriate, notified you by another method.

        </p>
      </section>
      <Footer />
    </div>
  );
}

export default Privacy;
