import { React, useState } from "react";
import { Link } from "react-router-dom";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Head from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import img1 from "../assets/images/box-item/image-box-6.jpg";
import avt from "../assets/images/avatar/avt-9.jpg";
import db from "../firebase";
import { ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListItem = () => {
  const [price, setPrice] = useState(0);
  const [auctionPrice, setAuctionprice] = useState(0);
  const [minBid, setMinBid] = useState(0);

  function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));


  async function listForFixedPrice(){
    if(price === 0){
        toast.error(
            "NFT listing price can't be zero !",
            {
              position: "top-left",

              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
    }
    else{
        let newListingId = getRandomInteger(30, 1000000);
        let artworkId = window.location.href.toString().split("id=")[1].toString()

        const artworksRef = ref(db, "listings/" + newListingId);
        await set(artworksRef, {
            "artwork_id": artworkId,
            "likes": 0,
            price: parseFloat(price)
        }).then(()=>{
            toast.success(
                "NFT listed succesfully !",
                {
                  position: "top-left",
    
                  autoClose: 7000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                }
              );

              delay(7000);
              window.location.href = "/"
        })
    }
    
  }


  return (
    <div className="create-item">
      <HeaderStyle2 />

      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div
              className="col-md-12"
              style={{ marginBottom: "5%", marginTop: "2%" }}
            >
              <h2 className="tf-title style4 mg-bt-38 ourArtists">
                List your NFT
              </h2>
              <h5 className="subTitleCreate">
                Show your NFT to all the users on ARTRISE and list it for sale
              </h5>
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="form-create-item">
                <div className="flat-tabs tab-create-item">
                  <h4 className="title-create-item">Select method</h4>
                  <Tabs>
                    <TabList>
                      <Tab>
                        <span className="icon-fl-tag"></span>Fixed Price
                      </Tab>
                      <Tab>
                        <span className="icon-fl-icon-22"></span>Open For Bids
                      </Tab>
                    </TabList>

                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Price</h4>
                        <input
                          type="number"
                          placeholder="Enter price for one item (ETH)"
                          onChange={(e) => {setPrice(e.target.value)}}
                        />

                        <div className="listButton" onClick={(e)=>{listForFixedPrice();}}>List this item</div>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Price</h4>
                        <input
                          type="number"
                          placeholder="Enter price for one item (ETH)"
                          onChange={(e)=>{setAuctionprice(e.target.value)}}
                        />

                        <h4 className="title-create-item">Minimum bid</h4>
                        <input type="number" placeholder="enter minimum bid" onChange={(e)=>{setMinBid(e.target.value)}}/>

                        <div className="listButton">List this item</div>
                      </form>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Footer />
    </div>
  );
};

export default ListItem;
