import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';

function Terms() {
  return (
    <div>
      <section className="flat-title-page inner">
        <div className="overlay" />
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Terms of service</h1>
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
        <h3>What are the rules for using Artrise?</h3>
        <p className="textPara">
          You guarantee that any artwork exhibited on ArtRise is your original creation, or that
          you are its exclusive and exclusive owner, or that you are the creator&apos;s authorized
          consignor.Additionally, you guarantee that you have secured all relevant clearances and
          agree to bear complete responsibility for any fees and costs associated with third-party
          rights required for the display and sale of artwork on the Platform.

        </p>
        <p className="textPara">
          All artworks listed for sale on ArtRise must be original, one-of-a-kind, or limited
          edition. All artwork must either be signed by the artist who created it or comes with a
          certificate of authenticity that is also signed by the artist.

        </p>

        <p className="textPara">
          A limited edition print run requires that each impression sold be given a number that
          corresponds to the sequence in which it was created. Each impression&apos;s number must be
          prominently shown on the artwork itself or on the certificate of authenticity that
          comes with it.

        </p>

        <p className="textPara">
          You accept and agree that all artwork that you publish to ArtRise is strictly your
          responsibility. You are not permitted to post any Artwork content or materials that
          ArtRise logically judges to be:

        </p>

        <ol type="1">
          <li>
            <p className="textPara point">
              &#10022;offensive, including content that fosters
              discrimination or incites racial hatred.
            </p>
            <p className="textPara point">
              &#10022;obscene or pornographic.
            </p>
            <p className="textPara point">
              &#10022;content that violates another party&apos;s patent,
              copyright, trademark, trade secret,
              moral rights, other intellectual property rights,
              right of publicity, or right of privacy, or
              infringes, misappropriates, or otherwise infringes any applicable law or regulation.

            </p>

          </li>
        </ol>
        <p className="textPara">
          ArtRise retains the right, at any time, and at its sole discretion, to remove any
          content or Artwork Listings from the platform.

        </p>
      </section>
      <Footer />
    </div>
  );
}

export default Terms;
