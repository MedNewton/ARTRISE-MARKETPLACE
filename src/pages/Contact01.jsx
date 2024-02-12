import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';

function Contact01() {
  const navigate = useNavigate();
  return (
    <div>
      <section>
        <div className="themesflat-container">
          <div className="row mrgTopSection">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="box-feature-contact">
                <img src="//artrise.io/wp-content/uploads/2022/10/10.png" alt="Axies" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <h2 className="tf-title-heading style-2 mg-bt-12">
                Drop Up A Message
              </h2>
              <h5 className="sub-title style-1">
                We are always glad to hear from you! Contact us for any questions or suggestions and we
                will reach you back as soon as possible.
              </h5>
              <div className="form-inner">
                <form id="contactform" noValidate="novalidate" className="form-submit">
                  <input
                    id="name"
                    name="name"
                    tabIndex="0"
                    aria-required="true"
                    type="text"
                    placeholder="Your Full Name"
                    required
                  />
                  <input
                    id="email"
                    name="email"
                    tabIndex="0"
                    aria-required="true"
                    type="email"
                    placeholder="Your Email Address"
                    required
                  />
                  <div
                    className="row-form style-2"
                    id="subject"
                  >
                    <select>
                      <option value="1">Select subject</option>
                      <option value="2">Select subject</option>
                      <option value="3">Select subject</option>
                    </select>
                    <i className="icon-fl-down" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    tabIndex="0"
                    aria-required="true"
                    required
                    placeholder="Message"
                  />
                  <div className="col-md-12 wrap-inner load-more text-center mb-20">
                    <button
                      type="submit"
                      id="load-more"
                      className="sc-button loadmore fl-button pri-3"
                      onClick={() => {
                        navigate('/');
                      }}
                    >
                      <span>Send message</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact01;
