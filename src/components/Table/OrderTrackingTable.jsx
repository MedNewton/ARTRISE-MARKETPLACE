import React, { useEffect } from 'react';
import "./OrderTable.css";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';
import db from '../../firebase';
import { ref, get, query, equalTo, push } from 'firebase/database';

import { useAccount } from 'wagmi';

// const OrderData = [
//     {
//         id: 210,
//         name: "Alice Johnson",
//         Address: "123 Oak Street",
//         Date: "10 October 2023",
//         Price: 789,
//         Status: "Pending"
//     },
//     {
//         id: 211,
//         name: "John Smith",
//         Address: "456 Pine Avenue",
//         Date: "5 November 2023",
//         Price: 345,
//         Status: "Complete"
//     },
//     {
//         id: 212,
//         name: "Mia Davis",
//         Address: "789 Elm Road",
//         Date: "15 December 2023",
//         Price: 999,
//         Status: "Dispatch"
//     },
//     {
//         id: 213,
//         name: "Ethan Parker",
//         Address: "321 Maple Lane",
//         Date: "20 January 2024",
//         Price: 234,
//         Status: "Reject"
//     },
//     {
//         id: 214,
//         name: "Olivia White",
//         Address: "567 Birch Street",
//         Date: "2 February 2024",
//         Price: 789,
//         Status: "Pending"
//     },
//     {
//         id: 215,
//         name: "Liam Miller",
//         Address: "101 Forest Road",
//         Date: "7 March 2024",
//         Price: 567,
//         Status: "Complete"
//     },
//     {
//         id: 216,
//         name: "Sophia Lee",
//         Address: "88 Willow Avenue",
//         Date: "15 April 2024",
//         Price: 123,
//         Status: "Dispatch"
//     },
//     {
//         id: 217,
//         name: "Noah Wilson",
//         Address: "55 Cedar Lane",
//         Date: "20 May 2024",
//         Price: 456,
//         Status: "Reject"
//     },
// ];





const OrderTrackingTable2 = () => {

  const { address, isConnected } = useAccount();
  const [OrderData, setOrderData] = useState([]);
  const [NoData, setNoData] = useState(false);
  // const [endIndex, setendIndex] = useState(0);
  // const [totalPageCount, settotalPageCount] = useState(0);
  // const [ordersForPage, setordersForPage] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const FetchData = async () => {

    console.log('func');
    console.log(address, 'i am address');
    if (address) {
      let orderRef = ref(db, "orders/");
      // let PurchaseRefByUser = query(orderRef,equalTo(".buyerid",address))
      await get(orderRef).then((snapshot) => {
        const dataUser = [];
        if (snapshot.exists()) {
          const data = snapshot.val()
          for (let i in data) {
            if (data[i].sellersid == address) {

              dataUser.push(data[i])
            }
          }
          setOrderData(dataUser);

        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

  }

  
  
  useEffect(() => {
    FetchData();
    if(OrderData.length== 0) {
        setNoData(true);
    }
  
  }, [])
  
  const itemsPerPage = 10;

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the orders for the current page
  console.log(OrderData);
  const ordersForPage = OrderData?.slice(startIndex, endIndex);

  // Calculate the total page count
  const totalPageCount = Math.ceil(OrderData.length / itemsPerPage);
  // const loopdata = async () => {
  //   FetchData();

  //   const itemsPerPage = 10;

  //   // Calculate the start and end index for the current page
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;

  //   // Get the orders for the current page
  //   console.log(OrderData);
  //   const ordersForPage = OrderData?.slice(startIndex, endIndex);

  //   // Calculate the total page count
  //   const totalPageCount = Math.ceil(OrderData.length / itemsPerPage);
  // }






  if (!NoData) {
  return (
    
      
    
    <div className='OrderTable'>
      <div className='ordertable_head'>
        <h3>Art ID</h3>
        <h3>Sellers Name</h3>
        <h3>Seller's Wallet</h3>
        <h3>Date</h3>
        <h3>Price</h3>
        <h3>Status</h3>
        <h3>Actions</h3>
      </div>
      <div className='ordertable_body'>
        {ordersForPage.map((item, index) => {
          const statusClass = item.status === "Pending Shipping" || item.status === "Reject" ? item.status.toLowerCase() : "other";
          const mainclass = item.status === "Pending Shipping" || item.status === "Reject" ? "main" + item.status.toLowerCase() : "mainother";

          return (
            <div className={` ${index % 2 === 0 ? " ordertable_body_box" : "ordertable_body_box"}`}>
              <p><a href={"/artwork-dettails?id="+item.artworkid} >{item.artworkid}</a></p>
              <p>"N/A"</p>
              <p className='fixed-item'>{item.sellersid}</p>
              <p className='fixed-item'>{Date(item.purchasedate).replace( / GMT$/, "" )}</p>
              <p>ETH {parseFloat(item.price).toFixed(5)}</p>
              <div className='order_status'>
                <p className={`main ${mainclass}`}>
                  <p className={`span ${statusClass}`}></p>
                </p>
                <p>{item.status}</p>
              </div>
              <div className='order_action'>
                <AiTwotoneSetting />
                <IoIosArrowDown />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <p>Page {currentPage} of {totalPageCount}</p>
        <button
          disabled={endIndex >= OrderData.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}else {
  return(
    <div className='OrderTable'>
      <h3>No Data Found</h3>
    </div>
  )
}
}


export default OrderTrackingTable2;
