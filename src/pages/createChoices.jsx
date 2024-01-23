import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';

import CreateCollectionModal from '../components/layouts/createCollectionModal';

function CreateChoices() {
  const [createModalShow, setCreateModalShow] = useState(false);
  return (
    <div className="createChoicesPageWrapper">
      <div>
        <h2
          className="tf-title style4 mg-bt-38 ourArtists"
          style={{
            marginTop: '5%',
            fontWeight: '700',
          }}
        >
          Create
        </h2>
        <div className="createChoiceBoxesWrapper">
          <button
            type="button"
            className="createChoiceBox"
            onClick={() => {
              setCreateModalShow(true);
            }}
          >
            <div>
              <h5>Create a collection</h5>
              <p>
                Showcase your artworks ina visually stunning
                collection. chose a theme, add descriptions and make it uniquely yours. Your
                collection will be available for purchase on our marketplace.
              </p>
            </div>
            <div className="col-md-6 createChoiceImageBox">
              <div className="createChoiceImage" />
            </div>
          </button>
          <Link
            to="/create-item"
            className="createChoiceBox"
          >
            <div>
              <h5>Create an artwork</h5>
              <p>
                Integrate your original artowrk and turn it into a
                hybrid NFT. Simply upload a photo of your artwork, fill out the artwork details
                and properties, and we&apos;ll take care of the rest.
              </p>
            </div>
            <div className="col-md-6 createChoiceImageBox">
              <div className="createChoiceImage" />
            </div>
          </Link>
        </div>
      </div>
      <CreateCollectionModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
      <Footer />
    </div>
  );
}

export default CreateChoices;
