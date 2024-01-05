import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';

import img1 from '../assets/images/box-item/icon1-recont-post.jpg';
import img2 from '../assets/images/box-item/icon2-recont-post.jpg';
import img3 from '../assets/images/box-item/icon3-recont-post.jpg';
import img4 from '../assets/images/box-item/icon4-recont-post.jpg';

function HybridArticle() {
  const [dataRecent] = useState(
    [
      {
        id: '1',
        img: img1,
        title: 'Lorem Ipsum Dolor Sit Amet',
        text: 'Lorem ipsum dolor sit amer....',
        time: 'August 10, 2021',
      },
      {
        id: '2',
        img: img2,
        title: 'Lorem Ipsum Dolor Sit Amet',
        text: 'Lorem ipsum dolor sit amer....',
        time: 'August 10, 2021',
      },
      {
        id: '3',
        img: img3,
        title: 'Lorem Ipsum Dolor Sit Amet',
        text: 'Lorem ipsum dolor sit amer....',
        time: 'August 10, 2021',
      },
      {
        id: '4',
        img: img4,
        title: 'Lorem Ipsum Dolor Sit Amet',
        text: 'Lorem ipsum dolor sit amer....',
        time: 'August 10, 2021',
      },

    ],
  );
  const [dataTags] = useState(
    [
      {
        id: '1',
        name: 'Bitcoin',
      },
      {
        id: '2',
        name: 'NFT',
      },
      {
        id: '3',
        name: 'Bids',
      },
      {
        id: '4',
        name: 'Digital',
      },
      {
        id: '5',
        name: 'Arts',
      },
      {
        id: '6',
        name: 'Marketplace',
      },
      {
        id: '7',
        name: 'Token',
      },
      {
        id: '8',
        name: 'Wallet',
      },
      {
        id: '9',
        name: 'Crypto',
      },
    ],
  );
  const doNotNavigateHandlerFunction = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <HeaderStyle2 />
      <div className="tf-section post-details">
        <div className="themesflat-container">
          <div className="wrap-flex-box style mrgTopSection">
            <div className="post">
              <div className="inner-content">
                <h2 className="title-post">What is &quot;Hybrid NFT&quot;?</h2>
                <div className="divider" />
                <div className="meta-post flex mg-bt-31">
                  <div className="box">
                    <div className="inner">
                      <h6 className="desc">“From fine art to blockchain”</h6>

                    </div>
                  </div>
                  <div className="box left">
                    <div className="inner boder pad-r-50">
                      <h6 className="desc">WRITER</h6>
                      <p>MEHDI LOUIJAB</p>
                    </div>
                    <div className="inner mg-l-39 mg-r-1">
                      <h6 className="desc">DATE</h6>
                      <p>JANUARY 11, 2023</p>
                    </div>
                  </div>
                </div>
                <div className="image">
                  <img src="//miro.medium.com/max/1400/1*4NDULE6Ww72yr60pZRXFOw.png" alt="Axies" />
                </div>
                <div className="inner-post mg-t-40">
                  <h3 className="heading mg-bt-16">What do we mean by NFTs?</h3>
                  <p className="mg-bt-24">
                    An NFT, or non-fungible token, is a digital asset that represents ownership of a unique item or
                    piece of content. Unlike traditional digital assets, such as music or video files, which can
                    be freely copied and distributed, NFTs are designed to be unique and cannot be
                    replicated or replaced. This makes them valuable as collectibles and allows them to be used
                    to represent ownership of a wide range of digital and physical items, including art, music,
                    videos, and even physical objects.
                  </p>
                  <p className="mg-bt-24">
                    NFTs are created using blockchain technology, which allows them to be
                    bought and sold on online marketplaces. They can also be stored in digital wallets, similar
                    to how traditional cryptocurrencies like Bitcoin are stored. Many people are interested in
                    buying and selling NFTs as a way to invest in the digital art market or to own unique digital
                    items that have value beyond their intrinsic worth.
                  </p>

                </div>
                <div className="inner-post mg-t-22">
                  <h3 className="heading mg-bt-16">What are hybrid NFTs?</h3>
                  <p className="mg-bt-24">
                    Hybrid NFTs, also known as &quot;hybrid assets,&quot; are a type of non-fungible
                    token (NFT) that combines elements of both digital and physical assets. They are designed to
                    represent ownership of a unique item or piece of content that has both a
                    digital and a physical component.
                  </p>
                  <p className="mg-bt-24">
                    For example, a hybrid NFT might represent ownership of a physical artwork that has been
                    digitized and stored on the blockchain. The NFT could be used to verify the authenticity
                    and ownership of the physical artwork while providing access to the digital version of the artwork.
                    Other examples of hybrid NFTs include limited edition physical
                    merchandise (such as t-shirts or sneakers) that are paired with a digital version of
                    the item or physical events (such as concerts or festivals) that are paired with a digital
                    ticket or pass. Hybrid NFTs offer a unique combination of both physical and digital
                    ownership and can be used to represent a wide range of items and experiences.
                  </p>
                  <p className="mg-bt-24">
                    The Hybrid Finance Blockchain (HYFI) introduces Hybrid NFTs - a very
                    special type of NFT that comes with a lifetime copyright license to utilize the
                    NFT for business purposes.
                  </p>
                  <p className="mg-bt-24">
                    Hybrid corresponds each physical asset to its equivalent in the Metaverse.
                    In this manner, the project aims to attract a part of the mass audience
                    into the world of blockchain. NFTs will be made compatible with the main virtual platforms,
                    to ensure the best possible exploitation. The HYBD token will enable users to trade their virtual
                    assets on the marketplace, a feature that brings significant added value to the real asset.
                    In addition, HYBD holders will benefit from numerous advantages, such as access to exclusive
                    content, rewards, and the ability to engage with their favorite brands. Through the content
                    channel, artists and special guests will be able to promote their creations in a way
                    that further ensures authenticity and traceability. Hybrid NFTs are carefully verified
                    and as a result, the risk of plagiarism, bogus collections, spam, cheats, and
                    fraud is practically nil.
                  </p>

                </div>
                <div className="inner-post mg-t-24">
                  <h3 className="heading mg-bt-16">What are the types of Hybrid NFTs?</h3>

                  <p>
                    {' '}
                    Many types of hybrid NFTs can be collected, as they can represent a wide range of unique
                    items and experiences. Some common examples of hybrid NFTs include:
                  </p>
                  <br />
                  <p className="mg-bt-22">
                    • Digital art paired with a physical version of the artwork: These NFTs
                    can represent ownership of a digital version of an artwork, as well as the physical
                    version of the artwork.
                    {' '}
                  </p>
                  <div className="image">
                    <img
                      src="https://nftplazas.com/wp-content/uploads/2022/03/DC-Warner-Brothers-NFT-Trading-Card.jpg"
                      alt="Axies"
                    />
                  </div>
                  <p className="mg-bt-22">
                    • Physical assets paired with a digital version of the item: These
                    NFTs can represent ownership of a limited edition physical item, such as fashion items,
                    real estate, or fine art.
                    {' '}
                  </p>
                  <div className="image">
                    <img
                      src="https://www.hanhart.com/wp-content/uploads/2021/10/NFT_TEASER-1-1200x675.jpg"
                      alt="Axies"
                    />
                  </div>
                  <p className="mg-bt-22">
                    For physical art assets, there are two types of investments: the first
                    is the purchase of a portion of the artwork, i.e. the purchase of a fractional token, which
                    leads to partial ownership. The second is the purchase of an undivided token, which means
                    that a single buyer can acquire the artwork, resulting in complete and exclusive ownership.
                  </p>
                  <p className="mg-bt-22">
                    Physical events paired with a digital ticket or pass: These NFTs can
                    represent ownership of a physical event, such as a concert or festival, as well as a digital
                    ticket or pass that grants access to the event. The owner of the NFT can access and display
                    the digital ticket online, while still retaining ownership of the physical event.
                  </p>

                </div>
                <div className="inner-post mg-t-22">
                  <h3 className="heading mg-bt-16">Every hybrid NFT includes the following items:</h3>
                  <p className="mg-bt-24">-A copy of the Sale and Purchase Agreement (SPA) for the master license.</p>
                  <p className="mg-bt-24">-Evidence or warranty of ownership of the relevant IP.</p>
                  <p className="mg-bt-24">-Sublicense ownership detailing the rights of the holder of the H-NFT.</p>
                  <p className="mg-bt-24">-Image, video, music, or other file depending on the nature of the asset.</p>
                  <p className="mg-bt-24">
                    Hybrid NFTs are ideal for artists, authors, filmmakers, musicians,
                    and other content creators.
                  </p>

                </div>
                <div className="inner-post mg-t-22">
                  <h3 className="heading mg-bt-16">How are they functioning and what is the issue with HNFTs? </h3>
                  <p className="mg-bt-24">
                    A frequent misconception is assuming that an NFT can exist and be traded
                    at the same time as a physical asset. In practice, unless the physical asset is retained,
                    it will be very difficult to track both the physical artwork and the digital NFT.
                    {' '}
                  </p>
                  <p className="mg-bt-24">
                    For example, I might purchase an NFT online, but in the meantime,
                    the holder of the physical asset might have sold it for cash without updating the digital record.
                    Presumably, without a trusted custodian of the physical asset, it is impossible to
                    ensure that the physical artwork and the digital NFT remain in sync.
                    {' '}
                  </p>
                  <p className="mg-bt-24">
                    Another potential problem is that, in most cases, the buyer cannot
                    display the NFT to the public because he or she owns the artwork, but not the copyright.
                    Unless the copyright is incorporated into the terms of the NFT, the buyer does not have the
                    right to share or distribute the work.
                    {' '}
                  </p>
                  <p className="mg-bt-24">
                    It is important to be aware of these difficulties, but they are not
                    prohibitive. At ArtRise, we have found the solution to these issues through NFC tags.
                    After tokenizing the physical asset both the physical version and the digital one are
                    linked through NFC Tags to synchronize them and make them act as one. Our lab experts are
                    also working on developing a new tagging technology that will not ruin or degrade the physical
                    artwork and which cannot be removed.
                  </p>
                </div>
                <div className="inner-post mg-t-22">
                  <h3 className="heading mg-bt-16">Where to collect hybrid NFTs?</h3>

                  <p className="mg-bt-24">
                    There are still a few online marketplaces where you can buy and sell
                    hybrid NFTs. These marketplaces typically use blockchain technology to securely track ownership
                    of NFTs and allow users to buy and sell them using cryptocurrencies like Ethereum.
                  </p>
                  <p className="mg-bt-24">
                    In addition to these online marketplaces, you may also be able to find
                    hybrid NFTs through galleries, auction houses, and other physical locations that specialize in
                    the sale of digital art and other unique items. Some artists and creators may also offer hybrid
                    NFTs directly through their websites or social media channels.
                  </p>
                  <p className="mg-bt-24">
                    ArtRise offers a marketplace to all its users so that aesthetes and art
                    collectors alike can discover and purchase artworks from their preferred creators. In addition,
                    artists and galleries can sell art and hold auctions in the same marketplace.
                  </p>
                </div>
                <div className="inner-post mg-t-22">
                  <h3 className="heading mg-bt-16">What are the benefits of Hybrid NFTs?</h3>
                  <p className="mg-bt-24">
                    According to the NFT marketplace, Hybrid NFT has quite a bit of advantages.
                    As defined below:
                  </p>
                  <br />
                  <p className="mg-bt-24">
                    -They do not lose value and do not depend on external
                    circumstances as much as NFT.
                  </p>
                  <p className="mg-bt-24">-They can be used to receive loans in cryptocurrency in DeFi banks.</p>
                  <p className="mg-bt-24">
                    -The collection is replenished with real rare things, not
                    just their digital encryptions.
                  </p>
                  <br />
                  <p className="mg-bt-24">Here is a list of a few advertised H-NFTs : </p>
                  <br />
                  <p className="mg-bt-24">
                    - Golden ball’s 2022 Equipe, H-NFTs identical to the gleaming trophies
                    of the top individual footballers.
                  </p>
                  <p className="mg-bt-24">-Kobe Bryant autographed Los Angeles Lakers jersey</p>
                  <p className="mg-bt-24">-Autographed magazine of Neil Armstrong</p>
                  <p className="mg-bt-24">-Cristiano Ronald autographed FC Juventus jersey</p>
                  <p className="mg-bt-24">-DAVID PROWSE (Darth Vader) autographed Mantle</p>
                  <p className="mg-bt-24">-Time Magazine autographed by Muhammad Ali and Joe Frazier </p>
                  <p className="mg-bt-24">-Daniel Radcliffe (Harry Potter) autographed magic wand</p>
                  <br />
                  {' '}
                  <br />
                  <p className="mg-bt-24">
                    At this point, people have different views on the phenomenal growth of NFT.
                    While some artists see it as a great way to earn money, some are almost certain
                    that it is a trap/scam.
                  </p>
                  <p className="mg-bt-24">
                    We believe that Hybrid NFT (H-NFT) is going to make a huge difference
                    in the NFT industry.
                  </p>

                </div>
                <div className="sc-widget style-1">
                  <div className="widget widget-tag style-2">
                    <h4 className="title-widget">Tags</h4>
                    <ul>
                      <li><Link to={doNotNavigateHandlerFunction}>Bitcoin</Link></li>
                      <li><Link to={doNotNavigateHandlerFunction}>Token</Link></li>
                      <li><Link to={doNotNavigateHandlerFunction}>Wallet</Link></li>
                    </ul>
                  </div>

                </div>
                <div className="divider d2" />
                <div id="comments">
                  <h3 className="heading mg-bt-23">
                    Leave A Comment
                  </h3>
                  <form action="#" method="post" id="commentform" className="comment-form">
                    <fieldset className="name">
                      <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        className="tb-my-input"
                        name="name"
                        tabIndex="0"
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <fieldset className="email">
                      <input
                        type="email"
                        id="email"
                        placeholder="Email *"
                        className="tb-my-input"
                        name="email"
                        tabIndex="0"
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <fieldset className="message">
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Message"
                        tabIndex="0"
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <div className="btn-submit mg-t-36">
                      <button className="tf-button-submit" type="submit">
                        Send comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="side-bar details">
              <div className="widget widget-recent-post mg-bt-43">
                <h3 className="title-widget mg-bt-23">Recent Post</h3>
                <ul>
                  {
                                        dataRecent.map((item) => (
                                          <li key={item.id} className="box-recent-post">
                                            <div
                                              className="box-feature"
                                            >
                                              <Link
                                                to="/blog-details"
                                              >

                                                <img
                                                  src={item.img}
                                                  alt="Axies here"
                                                />
                                              </Link>
                                            </div>
                                            <div className="box-content">
                                              <Link
                                                to="/blog-details"
                                                className="title-recent-post"
                                              >
                                                {item.title}
                                              </Link>
                                              <span>
                                                <span className="sub-recent-post">{item.text}</span>
                                                <Link to="/blog" className="day-recent-post">{item.time}</Link>
                                              </span>
                                            </div>
                                          </li>
                                        ))
                                    }
                </ul>
              </div>
              <div className="widget widget-tag style-1">
                <h3 className="title-widget mg-bt-23">Popular Tag</h3>
                <ul>
                  {
                                        dataTags.map((item) => (
                                          <li key={item.id}>
                                            <Link
                                              to="/blog"
                                              className="box-widget-tag"
                                            >
                                              {item.name}
                                            </Link>
                                          </li>
                                        ))
                                    }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default HybridArticle;
