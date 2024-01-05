import comingSoonImage1 from '../images/comingSoonImages/comingSoonImage1.jpg';
import comingSoonImage2 from '../images/comingSoonImages/comingSoonImage2.jpg';

const comingSoonArtworksData = [
  {
    id: '1',
    img: 'https://artrise.io/drop2/OPUS-A1.gif',
    title: 'Pomme 1',
    tags: 'bsc',
    imgAuthor: comingSoonImage1,
    nameAuthor: 'Yann Faisant',
    price: '4.89 ETH',
    priceChange: '$12.246',
    wishlist: '100',
    imgCollection: comingSoonImage2,
    nameCollection: 'Carré',

  },
  {
    id: '2',
    img: 'https://artrise.io/drop2/OPUS-A6.gif',
    title: 'Pomme 2',
    tags: 'bsc',
    imgAuthor: comingSoonImage1,
    nameAuthor: 'Yann Faisant',
    price: '4.89 ETH',
    priceChange: '$12.246',
    wishlist: '100',
    imgCollection: comingSoonImage2,
    nameCollection: 'Carré',

  },
  {
    id: '3',
    img: 'https://artrise.io/drop2/d2-1.gif',
    title: 'Een vaas met rozen',
    tags: 'bsc',
    imgAuthor: comingSoonImage1,
    nameAuthor: 'Yann Faisant',
    price: '4.89 ETH',
    priceChange: '$12.246',
    wishlist: '100',
    imgCollection: comingSoonImage2,
    nameCollection: 'Carré',

  },
  {
    id: '4',
    img: 'https://artrise.io/drop2/d2-2.gif',
    title: 'Maria Magdalena',
    tags: 'bsc',
    imgAuthor: comingSoonImage1,
    nameAuthor: 'Yann Faisant',
    price: '4.89 ETH',
    priceChange: '$12.246',
    wishlist: '100',
    imgCollection: comingSoonImage2,
    nameCollection: 'Carré',

  },
];

const ComingSoonData = [];

comingSoonArtworksData.forEach((el) => {
  const artwork = {
    id: el.id,
    img: el.img,
    title: el.title,
    tags: 'bsc',
    imgAuthor: comingSoonImage1,
    nameAuthor: 'Yann Faisant',
    price: '4.89 ETH',
    priceChange: '$12.246',
    wishlist: '100',
    imgCollection: comingSoonImage2,
    nameCollection: 'Carré',
  };

  ComingSoonData.push(artwork);
});

export default ComingSoonData;
