import React, { useState, useEffect, useCallback } from "react";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import "react-tabs/style/react-tabs.css";
import "./styles/ConfirmationPage.css";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const ConfirmationPage = () => {

  const { address, isConnected } = useAccount();

  return (
    <div className="item-details">
        <style></style>
      <HeaderStyle2 />
      <div className="tf-section">
      <div className="themesflat-container">
        <div style={{display : "flex", justifyContent : "center" ,alignItems : "flex-start"}}>
        <div class="order_success">
            <h2>THANK YOU!</h2>
            <p class="message_order">
               Thanks for purchasing an artwork on Artrise.io Marketplace from your etherium wallet
                <strong>{address}</strong> In the meantime,
                explore the lastest artwork inspired by new trends, just head
                over to <br />
                 <span>Artrise Marketplace</span>
            </p>
           <a href="/order/tracking"> <button>Order Tracking</button></a>
        </div>
      </div>
      </div>
      <Footer />
    </div>
    </div>
  );
};

export default ConfirmationPage;
