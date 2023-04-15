import img1 from '../images/box-item/card-item8.jpg'
import imga1 from '../images/avatar/avt-11.jpg'
import img2 from '../images/box-item/image-box-10.jpg'
import imga2 from '../images/avatar/avt-12.jpg'
import img3 from '../images/box-item/card-item-11.jpg'
import imga3 from '../images/avatar/avt-13.jpg'
import img4 from '../images/box-item/image-box-21.jpg'
import imga4 from '../images/avatar/avt-14.jpg'
import imgCollection1 from '../images/avatar/avt-18.jpg'
import imgCollection2 from '../images/avatar/avt-16.jpg'
import imgCollection3 from '../images/avatar/avt-17.jpg'



// importing recent artworks

function importAll(r) {
    return r.keys().map(r);
  }
  
const images = importAll(require.context('../images/popularCollections', false, /\.(JPG|png|jpe?g|svg)$/));

let comingSoonArtworksData = [
    {
        'img': "https://artrise.io/drop2/OPUS-A1.gif",
        'title': "Pomme 1",
        'tags': "bsc",
        'imgAuthor': imga1,
        'nameAuthor': "Yann Faisant",
        'price': "4.89 ETH",
        'priceChange': "$12.246",
        'wishlist': "100",
        'imgCollection': imgCollection1,
        'nameCollection': "Carré"

    },
    {
        'img': "https://artrise.io/drop2/OPUS-A6.gif",
        'title': "Pomme 2",
        'tags': "bsc",
        'imgAuthor': imga1,
        'nameAuthor': "Yann Faisant",
        'price': "4.89 ETH",
        'priceChange': "$12.246",
        'wishlist': "100",
        'imgCollection': imgCollection1,
        'nameCollection': "Carré"

    },
    {
        'img': "https://artrise.io/drop2/d2-1.gif",
        'title': "Een vaas met rozen",
        'tags': "bsc",
        'imgAuthor': imga1,
        'nameAuthor': "Yann Faisant",
        'price': "4.89 ETH",
        'priceChange': "$12.246",
        'wishlist': "100",
        'imgCollection': imgCollection1,
        'nameCollection': "Carré"

    },
    {
        'img': "https://artrise.io/drop2/d2-2.gif",
        'title': "Maria Magdalena",
        'tags': "bsc",
        'imgAuthor': imga1,
        'nameAuthor': "Yann Faisant",
        'price': "4.89 ETH",
        'priceChange': "$12.246",
        'wishlist': "100",
        'imgCollection': imgCollection1,
        'nameCollection': "Carré"

    }
]

let ComingSoonData = [];


comingSoonArtworksData.forEach(el => {
    let artwork = {
        img: el.img,
        title: el.title,
        tags: "bsc",
        imgAuthor: imga1,
        nameAuthor: "Yann Faisant",
        price: "4.89 ETH",
        priceChange: "$12.246",
        wishlist: "100",
        imgCollection: imgCollection1,
        nameCollection: "Carré"
    }

    ComingSoonData.push(artwork);


})




export default ComingSoonData;