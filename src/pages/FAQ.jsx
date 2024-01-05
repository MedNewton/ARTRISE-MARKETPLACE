import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap-accordion';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';

function FAQ() {
  const [innovationData] = useState(
    [
      {
        key: '0',
        show: 'show',
        title: 'What is Blockchain?',
        text: 'Blockchain is an immutable shared data structure. The information is stored in "blocks" linked '
          + 'together in chronological order. The registered data is secured by cryptography.',

      },
      {
        key: '1',
        title: 'What are the types of assets? ',
        text: 'In the market today, there are four types of assets; First, assets are split into tangibles and'
          + ' intangibles: A tangible asset refers to the fact that it is physical, that you can physically feel it,'
          + ' whereas an intangible asset is only digital and cannot be physically felt. Next, they are further '
          + 'categorized as Fungible and Non-Fungible. Fungible tokens or assets are divisible and non-unique. '
          + 'Non- fungible assets, on the other hand, are unique and non-divisible. They should be considered as '
          + 'a type of deed or title of ownership of a unique, non-replicable item. An NFT is considered to be'
          + ' an intangible and non-fungible asset.',
      },
      {
        key: '2',
        title: 'What is an NFT?',
        text: 'An NFT, or non-fungible token, is a digital asset that represents ownership of a unique item or'
          + ' piece of content. Unlike traditional digital assets, such as music or video files, which can be '
          + 'freely copied and distributed, NFTs are designed to be unique and cannot be replicated or replaced. '
          + 'This makes them valuable as collectibles and allows them to be used to represent ownership of a wide'
          + ' range of digital and physical items, including art, music, videos, and even physical objects. NFTs'
          + ' are created using blockchain technology, which allows them to be bought and sold on online marketplaces.'
          + ' They can also be stored in digital wallets, similar to how traditional cryptocurrencies '
          + 'like Bitcoin are stored. Many people are interested in buying and selling NFTs as a way to '
          + 'invest in the digital art market or to own unique digital items that have value beyond their '
          + 'intrinsic worth.',
      },
      {
        key: '3',
        title: 'What is a hybrid NFT?',
        text: 'A hybrid NFT is a token that connects and represents an asset\'s physical and digital form: an NFT '
          + 'for physical masterpieces.',
      },
      {
        key: '4',
        title: 'What is asset tokenization? ',
        text: 'The asset tokens are digital ownership certificates of actual assets. The bearer of the asset'
          + ' tokens acquires ownership of a percentage of the underlying asset. Such digital certificates are'
          + ' issued as compliant tokens on the network. Each work of art that is tokenized by Artrise is '
          + 'represented by a different type of asset token and has a unique code.',
      },
      {
        key: '5',
        title: 'On which blockchain are the hybrid NFTs created?',
        text: 'The NFTs present on the ArtRise marketplace are created on the Ethereum blockchain.',
      },
      {
        key: '6',
        title: 'How can I be sure that my purchases are safe?',
        text: 'The ownership of your assets is protected by cryptographic keys that are virtually impossible to '
          + 'crack. In the unlikely event that your cryptographic keys are lost or stolen, provided you have '
          + 'registered on our platform, it is technically possible to recover and/or reissue your asset tokens '
          + 'after properly ascertaining and verifying your identity and proof of purchase.',
      },
    ],
  );

  const [artriseData] = useState(
    [
      {
        key: '0',
        title: 'What is ArtRise?',
        text: 'ArtRise is your ideal interface for the physical and digital world. At Artrise we strongly '
          + 'believe that every great piece of art deserves to be found and properly compensated. We allow '
          + 'creators of fine physical art from all over the world to rapidly and effortlessly transform their'
          + ' assets into digital tokens (TaaS), exhibit their artworks, access potential new collectors, '
          + 'and expand their communities by incorporating the NFT space and utilizing blockchain technology.',
      },
      {
        key: '1',
        title: 'How can we invest in tokenized fine art?',
        text: 'Register through our platform to set up an account, complete your profile, search art categories '
          + 'and artists and have a look at our unique display of phygital fine art.',
      },
      {
        key: '2',
        title: 'What are the payments methods available on the platform?',
        text: 'ArtRise supports several methods of payment that offer safety including: Cryptocurrency, '
          + 'Paypal, credit and debit cards... By selecting a credit card or Paypal as the method of payment,'
          + ' the collector will get the purchased work along with a hardware wallet holding the NFT version '
          + 'of the work. ArtRise holds money to help assure that the platform is secure for buyers '
          + 'and sellers to utilize and the funds are freed up when the buyer acknowledges that they have '
          + 'received the artwork they ordered in the state that was posted.',
      },
      {
        key: '3',
        title: 'What are the fees charged by ArtRise for collectors?',
        text: 'The investment in artwork through ArtRise will only cost the gas fees.',
      },
    ],
  );

  const [artworksData] = useState(
    [
      {
        key: '0',
        title: 'What kind of artworks will be displayed on the platform? ',
        text: 'We concentrate on physical works of art by real-world artists, particularly prime works of art'
          + ' with significant market value. We identify artworks that have strong fundamentals and potential '
          + 'for capital appreciation but are also of interest to investors who appreciate fine art.',
      },
      {
        key: '1',
        title: 'How can we ensure the authenticity of the artwork?',
        text: 'Each piece of original fine art created by real artists or belonging to collectors is verified '
          + 'for authenticity by our experts before being tokenized and displayed on our platform. Upon completion '
          + 'of the above steps, your artwork is finally ready to be digitized. Each piece of original fine art '
          + 'created by real artists or belonging to collectors is verified for authenticity by our experts before '
          + 'being tokenized and displayed on our platform. Upon completion of the above steps, your artwork is'
          + ' finally ready to be digitized. Each piece of original fine art created by real artists or belonging'
          + ' to collectors is verified for authenticity by our experts before being tokenized and displayed on '
          + 'our platform. Upon completion of the above steps, your artwork is finally ready to be digitized.',
      },
      {
        key: '2',
        title: 'How the physical art pieces are digitalized? ',
        text: 'After verifying the authenticity of the artwork, a digital version is generated either by a member'
          + ' of our team or by a digital artist available on the platform. ArtRise guarantees that the digital '
          + 'version is 100% similar to the physical artwork and provides the possibility to present it as a 3D'
          + ' animation. In case the physical artist collaborates with a digital artist on the platform, he/she'
          + ' needs to discuss and negotiate the percentage of commission on sales before releasing the work on '
          + 'the platform.',
      },
      {
        key: '3',
        title: 'Can I physically hold the piece of art I have bought? ',
        text: 'Of course, the collectors get to keep the physical asset. The vendor guarantees the shipping of'
          + ' the physical artwork. ArtRise can oversee tracking until the delivery is finished and the purchaser '
          + 'has acknowledged that the artwork was received in good condition. ArtRise can help vendors along the '
          + 'shipping process by referring them to the very best suppliers with whom it is in close communication'
          + ' and by providing them with guidelines to ensure successful delivery. If the purchaser chooses not to, '
          + 'the piece of art will remain detained by ArtRise.',
      },
      {
        key: '4',
        title: 'Can I take only the digital form without receiving the physical one?',
        text: 'The answer is no, both the digital and physical versions of the artwork are not separately '
          + 'purchasable. When you buy the material artwork, you also get a digitized form, so the assets are '
          + 'HNFTs, indicating that the material and digitized formats are one and the same.',
      },
      {
        key: '5',
        title: 'Where are the artworks held? ',
        text: 'ArtRise aims to be a professional art custodian. Every physical masterpiece is kept by the artist '
          + 'on the first market sale and is handled in partnership with specialized art logistics companies on'
          + ' the secondary sales market to ensure the highest standards of care and security.',
      },
      {
        key: '6',
        title: 'Is there a guarantee on the artwork? If damaged can I be compensated? ',
        text: 'This situation is highly improbable. Should it occur, however, the insurance policy payment would'
          + 'be initiated and all investors would be compensated accordingly.',
      },
      {
        key: '7',
        title: 'As an art creator, how can you join our community?',
        text: 'Artists of various disciplines such as painters, sculptors, photographers, and cartoonists are'
          + ' welcome to join ArtRise by applying through the platform directly or by being referred by other'
          + ' artists. The artists need to complete an application form that will be examined by the ArtRise '
          + 'team. This form enables artists to easily input their data (name, biography, work examples, '
          + 'photographs of the artist, etc.) It is assessed by the ArtRise team and upon approval, an online '
          + 'appointment will be arranged to learn more about the artist.',
      },
    ],
  );

  return (
    <div>
      <HeaderStyle2 />

      <section className="tf-section wrap-accordion">
        <div className="container">

          <div className="row mrgTopSection">
            <div className="col-md-12">
              <h2 className="tf-title style2 fs-30 mg-bt-38">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="col-md-12">

              <br />
              <br />
              <h5 className="sub-title help-center mg-bt-32 ">
                About the innovation
              </h5>
            </div>
            <div className="col-md-12">
              <div className="flat-accordion2">
                {
                                    innovationData.map((item) => (
                                      <Accordion key={item.key} title={item.title}>
                                        <p>{item.text}</p>
                                      </Accordion>
                                    ))
                                }
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">

              <br />
              <br />
              <h5 className="sub-title help-center mg-bt-32 ">
                About Artrise
              </h5>
            </div>
            <div className="col-md-12">
              <div className="flat-accordion2">
                {
                                    artriseData.map((item) => (
                                      <Accordion key={item.key} title={item.title}>
                                        <p>{item.text}</p>
                                      </Accordion>
                                    ))
                                }
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">

              <br />
              <br />
              <h5 className="sub-title help-center mg-bt-32 ">
                About the artworks
              </h5>
            </div>
            <div className="col-md-12">
              <div className="flat-accordion2">
                {
                                    artworksData.map((item) => (
                                      <Accordion key={item.key} title={item.title}>
                                        <p>{item.text}</p>
                                      </Accordion>
                                    ))
                                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default FAQ;
