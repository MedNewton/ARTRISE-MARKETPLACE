import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import img1 from '../assets/images/blog/thumb-8.png'

const Contact01 = () => {
    return (
        <div>
            <HeaderStyle2 />
            
            <section className="tf-contact tf-section">
                <div className="themesflat-container">
                    <div className="row mrgTopSection">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="box-feature-contact">
                                <img src={'//artrise.io/wp-content/uploads/2022/10/10.png'} alt="Axies" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <h2 className="tf-title-heading style-2 mg-bt-12">
                                Drop Up A Message
                            </h2>
                            <h5 className="sub-title style-1">
                                We are always glad to hear from you! Contact us for any questions or suggestions and we will reach you back as soon as possible.
                            </h5>
                            <div className="form-inner">
                                <form id="contactform" noValidate="novalidate" className="form-submit" >
                                    <input id="name" name="name" tabIndex="1" aria-required="true" type="text" placeholder="Your Full Name" required />
                                    <input id="email" name="email" tabIndex="2"  aria-required="true" type="email" placeholder="Your Email Address" required />
                                    <div className="row-form style-2" id="subject">
                                        <select>
                                            <option value="1">Select subject</option>
                                            <option value="2">Select subject</option>
                                            <option value="3">Select subject</option>
                                        </select>
                                        <i className="icon-fl-down"></i>
                                    </div>
                                    <textarea id="message" name="message" tabIndex="3" aria-required="true" required placeholder="Message"></textarea>
                                    <button className="submit">Send message</button>
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
