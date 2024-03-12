import image from '../images/avatar/avt-1.jpg';

// importing recent artworks

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../images/popularCollections', false, /\.(JPG|png|jpe?g|svg)$/));

const liveAuctionData = [];

images.forEach((element) => {
  const artworkImage = element;
  const artworkName = 'Coming soon';

  const artwork = {
    img: artworkImage,
    title: artworkName,
    tags: 'bsc',
    imgAuthor: image,
    nameAuthor: 'Yann Faisant',
    price: '4.89 ETH',
    priceChange: '$12.246',
    wishlist: '100',
    imgCollection: image,
    nameCollection: 'Carré',
  };

  liveAuctionData.push(artwork);
});

export default liveAuctionData;
