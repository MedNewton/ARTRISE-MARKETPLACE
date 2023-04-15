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

let liveAuctionData = [];

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

    liveAuctionData.push(artwork);
});


export default liveAuctionData;