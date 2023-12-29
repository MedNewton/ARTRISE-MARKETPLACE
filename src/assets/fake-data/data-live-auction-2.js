import imga1 from '../images/avatar/avt-1.jpg'
import imgCollection1 from '../images/avatar/avt-1.jpg'



// importing recent artworks

function importAll(r) {
    return r.keys().map(r);
  }
  
const images = importAll(require.context('../images/\liveAuctions', false, /\.(JPG|png|jpe?g|svg)$/));

let liveAuctionData2 = [];

images.forEach(element => {
    
    let artworkImage = element;
    let artworkName = "Coming soon";
    let authorImg = imga1;
    let authorName = "Yann Faisant";
    let artworkPrice = "4.89 ETH";
    let artworkPriceChange = "$12.246";
    let artworkWhitelist = "100";
    let artworkCollectionImage = imgCollection1;
    let artworkCollectionName = "Carré";
    
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

    liveAuctionData2.push(artwork);
});


export default liveAuctionData2;