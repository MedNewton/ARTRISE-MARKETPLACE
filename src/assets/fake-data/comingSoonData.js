import comingSoonImage1 from "../images/comingSoonImages/comingSoonImage1.jpg"
import comingSoonImage2 from "../images/comingSoonImages/comingSoonImage2.jpg"




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
        'imgAuthor': comingSoonImage1,
        'nameAuthor': "Yann Faisant",
        'price': "4.89 ETH",
        'priceChange': "$12.246",
        'wishlist': "100",
        'imgCollection': comingSoonImage2,
        'nameCollection': "Carré"

    },
    {
        'img': "https://artrise.io/drop2/OPUS-A6.gif",
        'title': "Pomme 2",
        'tags': "bsc",
        'imgAuthor': comingSoonImage1,
        'nameAuthor': "Yann Faisant",
        'price': "4.89 ETH",
        'priceChange': "$12.246",
        'wishlist': "100",
        'imgCollection': comingSoonImage2,
        'nameCollection': "Carré"

    },
    {
        'img': "https://artrise.io/drop2/d2-1.gif",
        'title': "Een vaas met rozen",
        'tags': "bsc",
        'imgAuthor': comingSoonImage1,
        'nameAuthor': "Yann Faisant",
        'price': "4.89 ETH",
        'priceChange': "$12.246",
        'wishlist': "100",
        'imgCollection': comingSoonImage2,
        'nameCollection': "Carré"

    },
    {
        'img': "https://artrise.io/drop2/d2-2.gif",
        'title': "Maria Magdalena",
        'tags': "bsc",
        'imgAuthor': comingSoonImage1,
        'nameAuthor': "Yann Faisant",
        'price': "4.89 ETH",
        'priceChange': "$12.246",
        'wishlist': "100",
        'imgCollection': comingSoonImage2,
        'nameCollection': "Carré"

    }
]

let ComingSoonData = [];


comingSoonArtworksData.forEach(el => {
    let artwork = {
        img: el.img,
        title: el.title,
        tags: "bsc",
        imgAuthor: comingSoonImage1,
        nameAuthor: "Yann Faisant",
        price: "4.89 ETH",
        priceChange: "$12.246",
        wishlist: "100",
        imgCollection: comingSoonImage2,
        nameCollection: "Carré"
    }

    ComingSoonData.push(artwork);


})




export default ComingSoonData;