import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SeperatingHeader2 = () => {

    return (
        <div>
            
            
            <section className="tf-no-result tf-section SeparatorSection">
                <div className="themesflat-container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10 SeparatorTitle">
                            Web3 is for everyone.
                        </h1>
                        <h4 className="sub-title help-center mg-bt-32 ">
                            Join the world's finest artists and collectors, and start your journey with physical NFTs.
                        </h4>
                        <Link to="/explore-01" className="SeparatorBtn sc-button header-slider style style-1 rocket fl-button pri-1"><span>Explore
                                        </span></Link>
                        
                    </div>
                    </div>                                    
                </div>
            </section>
            
            
            
        </div>
    );
}

export default SeperatingHeader2;