import imga1 from '../images/avatar/avt-1.jpg'
import imgCollection1 from '../images/avatar/avt-1.jpg'


// importing recent artworks

function importAll(r) {
    return r.keys().map(r);
  }
  
const images = importAll(require.context('../images/popularCollections', false, /\.(JPG|png|jpe?g|svg)$/));

let liveAuctionData = [];

images.forEach(element => {
    
    let artworkImage = element;
    let artworkName = "Coming soon";

    let artwork = {
        img: artworkImage,
        title: artworkName,
        tags: "bsc",
        imgAuthor: imga1,
        nameAuthor: "Yann Faisant",
        price: "4.89 ETH",
        priceChange: "$12.246",
        wishlist: "100",
        imgCollection: imgCollection1,
        nameCollection: "Carré"
    }

    liveAuctionData.push(artwork);
});


export default liveAuctionData;