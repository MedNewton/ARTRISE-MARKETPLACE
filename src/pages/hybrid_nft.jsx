import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap-accordion';
import Footer from '../components/footer/Footer';

function HybridNFT() {
  const [data] = useState(
    [
      {
        key: '0',
        show: 'show',
        title: 'What do we mean by NFTs?',
        text: 'An NFT, or non-fungible token, is a digital asset that represents ownership of a unique item or '
            + 'piece of content. Unlike traditional digital assets, such as music or video files, which can be '
            + 'freely copied and distributed, NFTs are designed to be unique and cannot be replicated or replaced. '
            + 'This makes them valuable as collectibles and allows them to be used to represent ownership of a '
            + 'wide range of digital and physical items, including art, music, videos, and even physical objects. '
            + 'NFTs are created using blockchain technology, which allows them to be bought and sold on '
            + 'online marketplaces. They can also be stored in digital wallets, similar to how traditional '
            + 'cryptocurrencies like Bitcoin are stored. Many people are interested in buying and selling NFTs '
            + 'as a way to invest in the digital art market or to own unique digital items that have '
            + 'value beyond their intrinsic worth.',
      },
      {
        key: '1',
        title: 'What are hybrid NFTs?',
        text: 'Hybrid NFTs, also known as "hybrid assets," are a type of non-fungible token (NFT) '
            + 'that combines elements of both digital and physical assets. They are designed to represent '
            + 'ownership of a unique item or piece of content that has both a digital and a physical component. '
            + 'For example, a hybrid NFT might represent ownership of a physical artwork that has been digitized '
            + 'and stored on the blockchain. The NFT could be used to verify the authenticity and ownership of '
            + 'the physical artwork while providing access to the digital version of the artwork. Other examples '
            + 'of hybrid NFTs include limited edition physical merchandise (such as t-shirts or sneakers) that '
            + 'are paired with a digital version of the item or physical events (such as concerts or festivals) '
            + 'that are paired with a digital ticket or pass. Hybrid NFTs offer a unique combination of both '
            + 'physical and digital ownership and can be used to represent a wide range of items and experiences. '
            + 'The Hybrid Finance Blockchain (HYFI) introduces Hybrid NFTs - a very special type of '
            + 'NFT that comes with a lifetime copyright license to utilize the NFT for business purposes. '
            + 'Hybrid corresponds each physical asset to its equivalent in the Metaverse. In this manner, the project '
            + 'aims to attract a part of the mass audience into the world of blockchain. NFTs will '
            + 'be made compatible with the main virtual platforms, to ensure the best possible exploitation. '
            + 'The HYBD token will enable users to trade their virtual assets on the marketplace, '
            + 'a feature that brings significant added value to the real asset. In addition, HYBD holders '
            + 'will benefit from numerous advantages, such as access to exclusive content, rewards, and the '
            + 'ability to engage with their favorite brands. Through the content channel, artists and special '
            + 'guests will be able to promote their creations in a way that further ensures authenticity and '
            + 'traceability. Hybrid NFTs are carefully verified and as a result, the risk of plagiarism, bogus '
            + 'collections, spam, cheats, and fraud is practically nil.',
      },
      {
        key: '2',
        title: 'What are the types of Hybrid NFTs?',
        text: 'Many types of hybrid NFTs can be collected, as they can represent a wide range of '
            + 'unique items and experiences. Some common examples of hybrid NFTs include •'
            + ' Digital art paired with a physical version of the artwork: These NFTs can represent '
            + 'ownership of a digital version of an artwork, as well as the physical version of the '
            + 'artwork, and also include • Physical assets paired with a digital version of the item: These NFTs '
            + 'can represent ownership of a limited edition physical item, such as fashion items, real estate, '
            + 'or fine art. For physical art assets, there are two types of investments: the first is the purchase '
            + 'of a portion of the artwork, i.e. the purchase of a fractional token, which leads to partial ownership. '
            + 'The second is the purchase of an undivided token, which means that a single buyer can acquire '
            + 'the artwork, resulting in complete and exclusive ownership. Physical events paired with a digital '
            + 'ticket or pass: These NFTs can represent ownership of a physical event, such as a concert or '
            + 'festival, as well as a digital ticket or pass that grants access to the event. The owner of the '
            + 'NFT can access and display the digital ticket online, while still retaining '
            + 'ownership of the physical event.',
      },
      {
        key: '3',
        title: 'Every hybrid NFT includes the following items:',
        text: `-A copy of the Sale and Purchase Agreement (SPA) for the master license.
                \n-Evidence or warranty of ownership of the relevant IP.
                -Sublicense ownership detailing the rights of the holder of the H-NFT.
                -Image, video, music, or other file depending on the nature of the asset.

                Hybrid NFTs are ideal for artists, authors, filmmakers, musicians, and other content creators.
                `,
      },
      {
        key: '4',
        title: 'How are they functioning and what is the issue with HNFTs?',
        text: 'A frequent misconception is assuming that an NFT can exist and be traded at the same time as a '
            + 'physical asset. In practice, unless the physical asset is retained, it will be very difficult to '
            + 'track both the physical artwork and the digital NFT. For example, I might purchase an '
            + 'NFT online, but in the meantime, the holder of the physical asset might have sold it for '
            + 'cash without updating the digital record. Presumably, without a trusted custodian of the '
            + 'physical asset, it is impossible to ensure that the physical artwork and the digital NFT '
            + 'remain in sync. Another potential problem is that, in most cases, the buyer cannot display '
            + 'the NFT to the public because he or she owns the artwork, but not the copyright. '
            + 'Unless the copyright is incorporated into the terms of the NFT, the buyer does not have '
            + 'the right to share or distribute the work. It is important to be aware of these '
            + 'difficulties, but they are not prohibitive. At ArtRise, we have found the solution '
            + 'to these issues through NFC tags. After tokenizing the physical asset both the physical '
            + 'version and the digital one are linked through NFC Tags to synchronize them and make them '
            + 'act as one. Our lab experts are also working on developing a new tagging technology '
            + 'that will not ruin or degrade the physical artwork and which cannot be removed.',
      },
      {
        key: '5',
        title: 'Where to collect hybrid NFTs?',
        text: 'There are still a few online marketplaces where you can buy and sell hybrid NFTs. These '
            + 'marketplaces typically use blockchain technology to securely track ownership of NFTs and allow '
            + 'users to buy and sell them using cryptocurrencies like Ethereum. In addition to these online '
            + 'marketplaces, you may also be able to find hybrid NFTs through galleries, auction houses, '
            + 'and other physical locations that specialize in the sale of digital art and other unique items. '
            + 'Some artists and creators may also offer hybrid NFTs directly through their websites or social'
            + ' media channels. ArtRise offers a marketplace to all its users so that aesthetes and art '
            + 'collectors alike can discover and purchase artworks from their preferred creators. In addition, '
            + 'artists and galleries can sell art and hold auctions in the same marketplace.',
      },
      {
        key: '6',
        title: 'What are the benefits of Hybrid NFTs?',
        text: `According to the NFT marketplace, Hybrid NFT has quite a bit of advantages. As defined below: 
                -They do not lose value and do not depend on external circumstances as much as NFT.
                -They can be used to receive loans in cryptocurrency in DeFi banks.
                -The collection is replenished with real rare things, not just their digital encryptions.

                Here is a list of a few advertised H-NFTs : 

                - Golden ball’s 2022 Equipe, H-NFTs identical to the 
                gleaming trophies of the top individual footballers.
                -Kobe Bryant autographed Los Angeles Lakers jersey
                -Autographed magazine of Neil Armstrong
                -Cristiano Ronald autographed FC Juventus jersey
                -DAVID PROWSE (Darth Vader) autographed Mantle
                -Time Magazine autographed by Muhammad Ali and Joe Frazier 
                -Daniel Radcliffe (Harry Potter) autographed magic wand

                At this point, people have different views on the phenomenal growth of NFT. 
                While some artists see it as a great way to earn money, some are almost certain that it is a trap/scam. 
                We believe that Hybrid NFT (H-NFT) is going to make a huge difference in the NFT industry.
                `,
      },
    ],
  );
  return (
    <>
      <div className="container">
        <div className="row mrgTopSection">
          <div className="col-md-12">
            <h2 className="tf-title style2 fs-30 mg-bt-60">
              What is a hybrid NFT?
            </h2>
          </div>
          <div className="col-md-12">

            <h5 className="sub-title help-center mg-bt-32 ">
              “From fine art to blockchain”
            </h5>

          </div>
          <div className="col-md-12">
            <div className="flat-accordion2">
              {
                                    data?.map((item) => (
                                      <Accordion key={item?.key} title={item?.title}>
                                        <p>{item?.text}</p>
                                      </Accordion>
                                    ))
                                }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HybridNFT;
