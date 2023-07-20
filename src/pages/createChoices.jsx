import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';

import CreateCollectionModal from '../components/layouts/createCollectionModal';

const CreateChoices = () => {

    const [createModalShow, setCreateModalShow] = useState(false);

    return (
        <div>
            <HeaderStyle2 />
            <div className="tf-create-item tf-section">
                <div className="themesflat-container">
                    <div className="row profilePadding ">
                    <div className="col-md-12" style={{ marginBottom: '5%' }}>
                            <h2 className="tf-title style4 mg-bt-38 ourArtists" style={{marginTop: "5%", fontWeight: "700"}}>
                                Create</h2>
                        </div>
                        <div className='createChoiceBoxesWrapper'>
                        <div className="row createChoiceBox" style={{paddingRight: "5%"}} onClick={() =>{setCreateModalShow(true)}}>
                            <div className="col-md-6 createChoiceTextBox">
                                <h5 className="createChoiceTitle">Create a collection</h5>
                                <h5 className="createChoiceLabel">Showcase your artworks ina visually stunning collection. chose a theme, add descriptions and make it uniquely yours. Your collection will be available for purchase on our marketplace.</h5>
                            </div>
                            <div className="col-md-6 createChoiceImageBox">
                                <div className="createChoiceImage"></div>
                            </div>
                        </div>
                        <div className="row createChoiceBox" onClick={() =>{window.location.href = "/create-item"}}>
                            <div className="col-md-6 createChoiceTextBox">
                                <h5 className="createChoiceTitle">Create an artwork</h5>
                                <h5 className="createChoiceLabel">Integrate your original artowrk and turn it into a hybrid NFT. Simply upload a photo of your artwork, fill out the artwork details and properties, and we'll take care of the rest.</h5>
                            </div>
                            <div className="col-md-6 createChoiceImageBox">
                                <div className="createChoiceImage"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateCollectionModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
      <Footer />
        </div>
    )
}

export default CreateChoices;