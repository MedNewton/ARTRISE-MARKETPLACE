import React, { useEffect } from "react";
import "./OrderTable.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import db from "../../firebase";
import { ref, get, update, query, equalTo, push, set } from "firebase/database";
import { Accordion, Col, Row, Form } from "react-bootstrap";
import { useAccount } from "wagmi";
import { LuMoreVertical } from "react-icons/lu";
import Modal from "react-bootstrap/Modal";

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
  const [shippingAddress, setShippinAddress] = useState("");
  console.log(shippingAddress, "Address");

  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const handleShippingMethodChange = (event) => {
    setSelectedShippingMethod(event.target.value);
  };
  console.log(selectedShippingMethod, "Check");
  // const [endIndex, setendIndex] = useState(0);
  // const [totalPageCount, settotalPageCount] = useState(0);
  // const [ordersForPage, setordersForPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const FetchData = async () => {
    console.log("func");
    console.log(address, "i am address");
    if (address) {
      let orderRef = ref(db, "orders/");
      // let PurchaseRefByUser = query(orderRef,equalTo(".buyerid",address))
      await get(orderRef)
        .then((snapshot) => {
          const dataUser = [];
          if (snapshot.exists()) {
            const data = snapshot.val();
            for (let i in data) {
              if (data[i].buyersid === address) {
                data[i].id = i;
                dataUser.push(data[i]);
              }
            }
            if (dataUser.length > 0) {
              setNoData(false);
            } else {
              setNoData(true);
            }
            setOrderData(dataUser);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    FetchData();
    // if(OrderData.length == 0) {
    //     setNoData(true);
    // }
    // else {
    //   setNoData(false);
    // }
  }, []);

  const claimArtWorkFunction = async (OrderID) => {
          // delete listing.id;
          let orderRef = ref(db, "orders/" + OrderID);
          const currentData = {};
          currentData.addedAddress = shippingAddress;
          currentData.selectedShipMethod = selectedShippingMethod;
          currentData.status = "Claimed";
          await update(orderRef, currentData).then(function () {
            setShow(false);
          });
        }
      ;

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

  // ------------- accordian
  const [accordian, setaccordian] = useState(new Array([]).fill(false));
  // --- showAccordian
  const showAccordian = (index) => {
    const newAccordian = [...accordian];
    newAccordian[index] = !newAccordian[index];
    setaccordian(newAccordian);
  };
  console.log(accordian, "accordian");
  // ----- dropdown options
  const [dropdwnoption, setdropdownOptions] = useState(
    new Array([]).fill(false)
  );
  const showDropdownOptions = (index) => {
    const newDropdwnoption = [...dropdwnoption];
    newDropdwnoption[index] = !newDropdwnoption[index];
    setdropdownOptions(newDropdwnoption);
  };

  // ------ modal
  const [showmoadl, setShowmodal] = useState(new Array([]).fill(false));
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const showmodafunc = (index) => {
    const newshowmoadl = [...showmoadl];
    newshowmoadl[index] = !newshowmoadl[index];
    setShowmodal(newshowmoadl);
  };
  // ---- updatetheShippingAddressFunc
  const updatetheShippingAddressFunc = () => {
    if (shippingAddress === "") {
      return alert("Plaese Enter Your Shipping Address");
    }
    alert("Your Shipping Address Update Soon");
  };

  if (!NoData) {
    return (
      <div className="OrderTable">
        <div className="ordertable_head">
          <h3>Art ID</h3>
          <h3>Sellers Name</h3>
          <h3>Seller's Wallet</h3>
          <h3>Date</h3>
          <h3>Price</h3>
          <h3>Status</h3>
          <h3>Actions</h3>
        </div>
        <div className="ordertable_body">
          {ordersForPage.map((item, index) => {
            const statusClass =
              item.status === "Pending Shipping" || item.status === "Reject"
                ? item.status.toLowerCase()
                : "other";
            const mainclass =
              item.status === "Pending Shipping" || item.status === "Reject"
                ? "main" + item.status.toLowerCase()
                : "mainother";
            return (
              <>
                <div
                  className={` ${
                    index % 2 === 0
                      ? " ordertable_body_box"
                      : "ordertable_body_box"
                  }`}
                >
                  <p>
                    <a href={"/artwork-dettails?id=" + item.artworkid}>
                      {item.artworkid}
                    </a>
                  </p>
                  <p>"N/A"</p>
                  <p className="fixed-item">{item.sellersid}</p>
                  <p className="fixed-item">
                    {Date(item.purchasedate).replace(/ GMT$/, "")}
                  </p>
                  <p>ETH {parseFloat(item.price).toFixed(6)}</p>
                  <div className="order_status">
                    <p className={`main ${mainclass}`}>
                      <p className={`span ${statusClass}`}></p>
                    </p>
                    <p>{item.status}</p>
                  </div>
                  <div className="order_action">
                    {/* <IoIosArrowDown onClick={() => showAccordian(index)} /> */}
                    {accordian[index] ? (
                      <IoIosArrowUp onClick={() => showAccordian(index)} />
                    ) : (
                      <IoIosArrowDown onClick={() => showAccordian(index)} />
                    )}
                    <div className="dropdownOptionparent">
                      <LuMoreVertical
                        onClick={() => showDropdownOptions(index)}
                      />
                      {dropdwnoption[index] ? (
                        <div className="dropdownOption dropdownOptionshow">
                          <p onClick={() => showmodafunc(index)}>
                            Claim Physical Artwork
                          </p>
                        </div>
                      ) : (
                        <div className="dropdownOption"></div>
                      )}
                    </div>
                  </div>
                </div>
                {accordian[index] ? (
                  <div className="accordian autoheight">
                    <Accordion>
                      <Accordion.Item>
                        <Accordion.Body>
                          <Row>
                            <Col>
                              <h4>{item.id}</h4>
                              <span>Data Shoe Here</span>
                            </Col>
                            <Col>
                              <h4>Second Data</h4>
                              <span>Data Shoe Here</span>
                            </Col>
                            <Col>
                              <h4>Third Data</h4>
                              <span>Data Shoe Here</span>
                            </Col>
                          </Row>
                          <Row>
                            <Col></Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                ) : (
                  <div className="accordian"></div>
                )}
                {/* ------ modal for each row */}
                <Modal
                  show={showmoadl[index]}
                  onHide={() => showmodafunc(index)}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="modaltitle">
                      Change Shiping Address
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal_body">
                    <label className="lable" htmlFor="">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Shipping Address"
                      value={shippingAddress}
                      onChange={(e) => setShippinAddress(e.target.value)}
                    />
                    <label className="lable pt-3" htmlFor="">
                      Select Shipping Method
                    </label>
                    <Form.Select
                      value={selectedShippingMethod}
                      onChange={handleShippingMethodChange}
                    >
                      <option>Open this select menu</option>
                      <option value="Fedex">Fedex</option>
                      <option value="DHL">DHL</option>
                      <option value="M&P">M&P</option>
                    </Form.Select>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="modal_btn"
                      onClick={()=> claimArtWorkFunction(item.id)}
                    >
                      Update
                    </button>
                  </Modal.Footer>
                </Modal>
              </>
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
          <p>
            Page {currentPage} of {totalPageCount}
          </p>
          <button
            disabled={endIndex >= OrderData.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="OrderTable">
        <h3>No Data Found</h3>
      </div>
    );
  }
};
export default OrderTrackingTable2;
