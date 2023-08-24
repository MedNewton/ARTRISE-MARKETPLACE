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
import { ref, set, update } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const ListItem = () => {
  const [price, setPrice] = useState(0);
  const [auctionPrice, setAuctionprice] = useState(0);
  const [minBid, setMinBid] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [shippingOption, setShippingOption] = useState("free");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

    const shippingOptions = [
        { value: "free", label: "Free Shipping" },
        { value: "fees", label: "Add Shipping Fees" },
    ];
    const durationOptions = [
        { value: "custom", label: "Custom" },
        { value: "1_hour", label: "1 Hour" },
        { value: "6_hours", label: "6 Hours" },
        { value: "1_day", label: "1 Day" },
        { value: "3_days", label: "3 Days" },
        { value: "7_days", label: "7 Days" },
        { value: "1_Month", label: "1 Month" },
        { value: "3_Months", label: "3 Months" },
        { value: "7_Months", label: "7 Months" }
    ];


    const handleDurationChange = (selectedOption) => {
        setSelectedDuration(selectedOption.value);
    };

    const handleCustomStartDateChange = (e) => {
        setCustomStartDate(e.target.value);
    };

    const handleCustomEndDateChange = (e) => {
        setCustomEndDate(e.target.value);
    };

    const calculateDuration = () => {
        if (selectedDuration === "custom" && customStartDate && customEndDate) {
            const startDate = new Date(customStartDate);
            const endDate = new Date(customEndDate);
            const diffInMillis = endDate - startDate;

            const durationDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
            const durationHours = Math.floor((diffInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const durationMinutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60));

            return `Duration: ${durationDays} days, ${durationHours} hours, ${durationMinutes} minutes`;
        }

        const predefinedDuration = durationOptions.find(option => option.value === selectedDuration);
        if (predefinedDuration) {
            return `Duration: ${predefinedDuration.label}`;
        }

        return "Duration: N/A";
    };

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
        const artworkRef = ref(db, "artworks/" + artworkId);
        await update(artworkRef, {
          "listed": "yes"
        })
        const listingRef = ref(db, "listings/" + newListingId);
        await set(listingRef, {
            "artwork_id": artworkId,
            "likes": 0,
            "price": parseFloat(price),
            "shipping": parseFloat(shippingPrice)
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
        <div className="themesflat-container" style={{display: "flex",flexDirection: "column", alignItems: "center"}}>
          <div className="row" style={{maxWidth: "60%"}}>
            <div
              className="col-md-12"
              style={{ marginBottom: "5%", marginTop: "2%" }}
            >
              <h2 className=" style4 mg-bt-38 ourArtists">
                List your NFT
              </h2>
              <h5 className="subTitleCreate">
                Show your NFT to all the users on ARTRISE and list it for sale
              </h5>
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="form-create-item">
                <div className="flat-tabs tab-create-item">
                    <div>
                    <h4 className="title-create-item">Select method</h4>
                    <div class="radio-container">
                        <label className="radio-button">
                            <div style={{display:'flex',gap:'10px'}}>
                                <span class="icon-fl-tag"></span>
                                <span>Fixed Price</span>
                            </div>
                            <input type="radio" name="pricing" value="fixed" checked={selectedMethod === "fixed"} onChange={()=>setSelectedMethod("fixed")}/>

                        </label>
                        <label className="radio-button">
                            <div style={{display:'flex',gap:'10px'}}>
                                <span class="icon-fl-icon-22"></span>
                                <span>Timed Auction</span>
                            </div>
                            <input type="radio" name="pricing" value="bids" checked={selectedMethod === "bids"} onChange={()=>setSelectedMethod("bids")}/>
                        </label>
                    </div>
                    </div>
                    {selectedMethod === "fixed" && (
                        <form action="#">
                            <div className='mt-4 '>
                            <h4 className="title-create-item">Price</h4>
                            <input
                                type="number"
                                placeholder="Enter price for one item (ETH)"
                                onChange={(e) => {setPrice(e.target.value)}}
                            />
                            </div>
                            <div>
                                <h4 className="mb-4">Shipping Price:</h4>
                                <Select
                                    className='multi-select'
                                    options={shippingOptions}
                                    value={shippingOptions.find(option => option.value === shippingOption)}
                                    onChange={(selectedOption) => setShippingOption(selectedOption.value)}
                                />
                                {shippingOption === "fees" && (
                                    <input
                                        className='mt-4'
                                        type="number"
                                        placeholder="Enter price for shipping cost"
                                        value={shippingPrice}
                                        onChange={(e) => setShippingPrice(e.target.value)}
                                    />
                                )}
                            </div>
                            <div className="summary-main">
                                <h4  className="mb-4">Summary</h4>
                                <div className="summary-details">
                                <h5 className="subTitleCreate">Price</h5>
                                <h5 className="subTitleCreate">{price}</h5>
                                </div>
                                <div className="summary-details">
                                    <h5 className="subTitleCreate">Shipping Price</h5>
                                    <h5 className="subTitleCreate">{shippingOption === "free" ? "Free Shipping" : shippingPrice}</h5>
                                </div>
                                <div className="summary-details">
                                    <h5 className="subTitleCreate">ArtRise fees after sale</h5>
                                    <h5 className="subTitleCreate">15%</h5>
                                </div>

                            </div>

                            <div className="listButton" onClick={(e)=>{listForFixedPrice()}}>List this item</div>
                        </form>
                    )}
                    {selectedMethod === "bids" && (
                        <form action="#">
                            <div className='mt-4'>
                                <h4 className="mb-4">Duration:</h4>
                                <Select
                                    className='multi-select'
                                    options={durationOptions}
                                    value={durationOptions.find(option => option.value === selectedDuration)}
                                    onChange={handleDurationChange}
                                />

                                {selectedDuration === "custom" && (
                                    <div className="selected-Duration">
                                        <input type="datetime-local" style={{ marginBottom: "0px" }} onChange={handleCustomStartDateChange} />
                                        <p> - </p>
                                        <input type="datetime-local" style={{ marginBottom: "0px" }} onChange={handleCustomEndDateChange} />
                                    </div>
                                )}
                                {selectedDuration === "custom" && customStartDate && customEndDate && (
                                    <div style={{ padding: "20px 0px" }}>
                                        <p>{calculateDuration()}</p>
                                    </div>
                                )}
                            </div>

                            <div className='mt-4 '>
                                <h4 className="mb-4">Starting Price</h4>
                                <input
                                    className="mb-0"
                                    type="number"
                                    placeholder="Enter price for one item (ETH)"
                                    onChange={(e)=>{setAuctionprice(e.target.value)}}
                                />
                            </div>

                            <div className="summary-main">
                                <h4  className="mb-4">Summary</h4>
                                <div className="summary-details">
                                    <h5 className="subTitleCreate">Duration</h5>
                                    <h5 className="subTitleCreate">{selectedDuration === "custom" ? calculateDuration(): selectedDuration}</h5>
                                </div>
                                <div className="summary-details">
                                    <h5 className="subTitleCreate">Starting Price</h5>
                                    <h5 className="subTitleCreate">{auctionPrice}</h5>
                                </div>
                                <div className="summary-details">
                                    <h5 className="subTitleCreate">ArtRise fees after sale</h5>
                                    <h5 className="subTitleCreate">15%</h5>
                                </div>
                            </div>

                            <div className="listButton">List this item</div>
                        </form>
                    )}

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
