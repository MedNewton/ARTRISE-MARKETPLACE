// Table.js
import React, { useState } from "react";
import "./Table.css";
import { FaArrowRightLong } from "react-icons/fa6";


const Table = () => {

  
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedata = data?.slice(startIndex, endIndex);
  const totalPageCount = Math.ceil(data.length / itemsPerPage);


  return (
    <div className="table">
      <div className="table_head">
        <p>SerialNo</p>
        <p>Icon</p>
        <p>Title</p>
        <p>Price</p>
        <p>Accept</p>
        <p>Reject</p>
        <p>Counter</p>
        <p>Details</p>
      </div>

      <div className="table_body">
        {slicedata?.map((item, index) => {
          return (
            <div className="table_row" key={index}
             style={{
              backgroundColor : index%2 === 0 ? "white" : "rgba(0,0,0,0.6)",
              color : index%2 === 0 ? "black" : "white"
             }}
            >
              <p>#{item.id}</p>
              <p>
                <img
                  src={item.icon}
                  alt=""
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                />
              </p>
              <p>{item.title?.slice(0, 50)}...</p>
              <p>${item.price}.00</p>
              <button className="accept_button">Accept</button>
              <button className="reject_button">Reject</button>
              <button className="counter_button">Counter</button>
              <p>
                 <FaArrowRightLong />
              </p>
            </div>
          );
        })}
        <div className="pagination_buttons">
          <button
            className="pagination_button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <p>
            Page {currentPage} of {totalPageCount}
          </p>

          <button
            className="pagination_button"
            disabled={endIndex >= data?.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
