import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import PropTypes from 'prop-types';
import Footer from '../components/footer/Footer';
import db from '../firebase';
import img1 from '../assets/images/blog/thumb-1.jpg';
import imga1 from '../assets/images/avatar/avt-2.jpg';

function Blog() {
  const [data, setData] = useState({});

  const [visible, setVisible] = useState(6);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  const getBlogsData = useCallback(async () => {
    const blogsRef = ref(db, 'blogs/');
    let dt;
    await get(blogsRef)
      .then((snapshot) => {
        if (snapshot.exists) {
          dt = snapshot.val();
        } else {
          console.error('No data available');
        }
      })
      .then(() => {
        setData(dt);
      });
  }, []);

  useEffect(() => {
    getBlogsData();
  }, [getBlogsData]);

  const doNotNavigateHandlerFunction = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className="margin-Left-Right-Top"
      >
        <h2 className=" ourArtists" style={{ margin: '25px 0px' }}>
          Blog
        </h2>
        <div className="row">

          <div className=" fl-blog fl-item2 col-lg-4 col-md-6">
            <article className="sc-card-article">
              <div className="card-media">
                <Link to="/blog-details/Hybrid-NFTs">
                  <img src="https://miro.medium.com/max/1400/1*4NDULE6Ww72yr60pZRXFOw.png" alt="medium" />
                </Link>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                    <img src={imga1} alt="medium" />
                  </div>
                  <div className="info">
                    <span>Post owner</span>

                    <h6>
                      {' '}
                      <Link to="/">MEHDI LOUIJAB</Link>
                      {' '}
                    </h6>
                  </div>
                </div>
                <div className="date">11.01.2023</div>
              </div>
              <div className="text-article">
                <h3><Link to="/blog-details/Hybrid-NFTs">What is &quot;Hybrid NFT&quot;</Link></h3>
                <p>
                  {'An NFT, or non-fungible token, is a digital asset that represents ownership of a '
                                    + 'unique item or piece of content. '}
                </p>
              </div>
              <Link
                to="/blog-details/Hybrid-NFTs"
                className="sc-button fl-button pri-3"
              >
                <span>Read More</span>
              </Link>
            </article>
          </div>
          {
                    Object.keys(data)
                      .map((id) => (
                        <BlogItem key={id} item={data[id]} />
                      ))
                }
          {
                    visible < data.length
                    && (
                    <div className="col-md-12 wrap-inner load-more text-center">
                      <Link
                        to={doNotNavigateHandlerFunction}
                        id="load-more"
                        className="sc-button loadmore fl-button pri-3 mt-6"
                        onClick={showMoreItems}
                      >
                        <span>Load More</span>
                      </Link>
                    </div>
                    )
                }
        </div>
      </div>
      <Footer />
    </div>
  );
}

function BlogItem({ item }) {
  return (
    <div className="fl-blog fl-item2 col-lg-4 col-md-6">
      <article className="sc-card-article">
        <div className="card-media">
          <Link to="/blog-details"><img src={img1} alt="medium" /></Link>
        </div>
        <div className="meta-info">
          <div className="author">
            <div className="avatar">
              <img src={imga1} alt="medium" />
            </div>
            <div className="info">
              <span>Post owner</span>

              <h6>
                {' '}
                <Link to="/author-02">{item.author ? item.author : 'Author Name'}</Link>
                {' '}
              </h6>
            </div>
          </div>
          <div className="date">{item?.date ? item?.date : 'mm/dd/yyyy'}</div>
        </div>
        <div className="text-article">
          <h3><Link to="/blog-details">{item?.title}</Link></h3>
          <p>
            {item?.abv ? item?.abv : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do '
                            + 'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'}
          </p>
        </div>
        <Link to="/blog-details" className="sc-button fl-button pri-3"><span>Read More</span></Link>
      </article>
    </div>
  );
}
BlogItem.propTypes = {
  item: PropTypes.shape({
    author: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    abv: PropTypes.string,
  }).isRequired,
};

export default Blog;
