import React, { useState, useEffect, useCallback } from "react";
import HeaderStyle2 from "../../components/header/HeaderStyle2";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import "./Order.css"

import OrderTrackingTable from "../../components/Table/OrderTrackingTable";
import OrderTrackingTable2 from "../../components/Table/OrderTrackingTable2";
import {
  ref,
  onValue,
  get,
  update,
  set,
  child,
  remove,
  query,
  equalTo,
} from "firebase/database";


const OrderTracking = () => {
  const [active , setActive] = useState(1);
  const [tableshow , setTableShow] = useState(0);

  return (
    <div className="item-details">
      <HeaderStyle2 />
      <div className="tf-section">
      <div className="themesflat-container">
        <div style={{display : "flex", justifyContent : "center" ,alignItems : "flex-start"}}>
       <div className="orders">
      <div className="header_order">
      <div className="heading_order">
        <h1>Order History</h1>
        <p>28 orders found</p>
      </div>
      <div className="menus">
        <p className={active === 1 ? "active-table p" : "noactive p"} onClick={()=> {setActive(1) ;setTableShow(0) }}>Sold Artwork</p>
        <p className={active === 2 ? "active-table p" : "noactive p"} onClick={()=> {setActive(2); setTableShow(1)}}>Purchased Artwork</p>
      </div>
      </div>
         <div className="order_main_container">
      <div className="order_table">
       {
        tableshow === 0 &&  <OrderTrackingTable/>
       }
       {
        tableshow === 1 && <OrderTrackingTable2/>
       }
      </div>
    </div>
   </div>
     </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderTracking;