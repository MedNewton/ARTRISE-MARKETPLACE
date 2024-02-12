import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import icon1 from '../../assets/images/icon/integrate.png';
import icon2 from '../../assets/images/icon/Category.png';
import icon3 from '../../assets/images/icon/sell.png';
import icon4 from '../../assets/images/icon/ownership.png';
import icon5 from '../../assets/images/icon/expose.png';
import icon6 from '../../assets/images/icon/collaborate.png';

function Create() {
  const data = useMemo(() => [
    {
      id: '1',
      title: 'Intergrate',
      description: 'Tokenize your physcial artwork into phygital NFTs.',
      icon: icon1,
      colorbg: 'icon-color1',
    },
    {
      id: '2',
      title: 'Claim Ownership',
      description: 'Certify and protect your art collection through blockchain.',
      icon: icon4,
      colorbg: 'icon-color2',
    },
    {
      id: '3',
      title: 'Collaborate',
      description: 'Collaborate with other artists to create digitalized versions of their physical art.',
      icon: icon6,
      colorbg: 'icon-color1',
    },
    {
      id: '4',
      title: 'List & Sell',
      description: 'List your artwork for sale and run auctions.',
      icon: icon3,
      colorbg: 'icon-color3',
    },
    {
      id: '5',
      title: 'Collect',
      description: 'Explore, find and collect artworks that inspire you.',
      icon: icon2,
      colorbg: 'icon-color2',
    },
    {
      id: '6',
      title: 'Expose',
      description: 'Expose your art in both physical and digital galleries.',
      icon: icon5,
      colorbg: 'icon-color3',
    },
  ], []);

  return (
    <div
      className="margin-Left-Right-Top"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div className=" ourArtists">
        <h2>
          The link between physical Art an Blockchain
        </h2>
      </div>
      <div className=" ourArtists">
        <h4>
          We are playing a big part in the revolution of art by creating limitless possibilities
          for all the industry actors.
        </h4>
      </div>
      <div className="row">
        {
                    data.map((item) => (
                      <CreateItem key={item.id} item={item} />
                    ))
                }
      </div>
    </div>
  );
}

function CreateItem(props) {
  const { item } = props;
  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-6 createSectionItems">
      <div className="sc-box-icon">
        <div className="image">
          <div className={`icon-create ${item.colorbg}`}>
            <img src={item.icon} alt="" />
          </div>
        </div>
        <h3 className="heading"><Link to="/">{item.title}</Link></h3>
        <p className="content">{item.description}</p>
      </div>
    </div>
  );
}

CreateItem.propTypes = {
  item: PropTypes.shape(
    {
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.string,
      colorbg: PropTypes.string,
    },
  ) || PropTypes.object,
};

CreateItem.defaultProps = {
  item:
        {
          id: '',
          title: '',
          description: '',
          icon: '',
          colorbg: '',
        },

};

export default Create;
