/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import HeaderStyle2 from '../../components/header/HeaderStyle2';
import Footer from '../../components/footer/Footer';

import { FaArrowRightLong } from 'react-icons/fa6';
import './TableSent.css';
import {
  ref, set, get, update,
} from 'firebase/database';
import { useAccount } from 'wagmi';
import { Table } from 'react-bootstrap';
import { useNavigate, useNavigation } from 'react-router-dom';
import db from '../../firebase';

function OfferSent() {
  const navigate = useNavigate();
  const [data, setOfferData] = useState([]);
  const [PastOffer, setPastOffer] = useState([]);
  const { address, isConnected } = useAccount();
  const [NoData, setNoData] = useState(false);
  const [Reload, setReload] = useState(false);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedata = data?.slice(startIndex, endIndex);
  const totalPageCount = Math.ceil(data.length / itemsPerPage);

  const LoadData = async () => {
    const OffersRef = ref(db, 'offers/');
    await get(OffersRef).then((snapshot) => {
      const dataUser = [];
      const dataOld = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const i in data) {
          if (data[i].buyersid == address) {
            if (data[i].status == 'Rejected') {
              // console.log(i)
              data[i].offerid = i;
              dataOld.push(data[i]);
            } else if (data[i].status == 'Canceled') {
              // console.log(i)
              data[i].offerid = i;
              dataOld.push(data[i]);
            } else {
              data[i].offerid = i;
              dataUser.push(data[i]);
            }
          }
        }
        setOfferData(dataUser);
        setPastOffer(dataOld);
        // console.log(OfferData);
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  const AcceptOffer = async (offerid) => {
    // console
    const OfferRef = ref(db, `offers/${offerid}`);
    await update(OfferRef, {
      status: 'Accepted',
    });
  };
  const RejectOffer = async (offerid) => {
    // console
    const OfferRef = ref(db, `offers/${offerid}`);
    await update(OfferRef, {
      status: 'Rejected',
    });
  };

  const CancelOffer = async (offerid) => {
    const OfferRef = ref(db, `offers/${offerid}`);
    await update(OfferRef, {
      status: 'Canceled',
    });
  };

  useEffect(() => {
    LoadData();
    if (data.length == 0) {
      setNoData(true);
    }
    setReload(false);
  }, [Reload]);

  return (
    <div>
      <HeaderStyle2 />

      <div className=" container">
        <h1 style={{ paddingTop: '100px', paddingBottom: '20px' }}> Pending Offers</h1>
        <button onClick={() => {
          setReload(true);
        }}
        >
          {' '}
          Reload
        </button>
        <div className="table">
          <div className="table_head">
            <p>Artwork ID</p>
            <p style={{ marginLeft: '20px' }}>Icon</p>
            <p>Offered Price</p>
            <p>Price</p>
            <p>Status</p>
            <p>Action</p>
            <p>Details</p>
          </div>

          <div className="table_body">
            {slicedata?.map((item, index) => (
              <div
                className="table_row"
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? 'white' : 'rgba(0,0,0,0.6)',
                  color: index % 2 === 0 ? 'black' : 'white',
                }}
              >
                <p><p><a href={`/artwork-dettails?id=${item.artworkid}`}>{item.artworkid}</a></p></p>
                <p>
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      marginLeft: '20px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '20%',
                    }}
                  />
                </p>
                {/* <p className='row_title'>{item.title}</p> */}
                <p>
                  {item.offeredprice}
                  {' '}
                  Eth
                </p>
                <p>
                  {item.price}
                  {' '}
                  Eth
                </p>
                <p>{item.status}</p>
                <button
                  className={item.status === 'Accepted' ? 'accept_button-ofr' : 'reject_button-ofr'}
                  onClick={async () => {
                    if (item.status === 'Accepted') {
                      // AcceptOffer(item.offerid);
                      console.log('Buy Now');

                      const url = `/artwork-dettails?id=${item.artworkid}`;
                      //    console.log(url);
                      navigate(url, { state: { data: item } });
                    } else {
                      console.log('Cancel');
                      CancelOffer(item.offerid);
                    }
                    setReload(true);
                  }}
                >
                  {item.status === 'Accepted' ? 'Buy' : 'Canel'}
                </button>

                <p>
                  <FaArrowRightLong />
                </p>
              </div>
            ))}
            <div className="pagination_buttons">
              <button
                className="pagination_button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              <p>
                Page
                {' '}
                {currentPage}
                {' '}
                of
                {' '}
                {totalPageCount}
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
        <h1>Rejected Offers</h1>
        <table className="table-striped past-table">
          <thead>
            <td>Offer Date</td>
            <td>Artwork ID</td>
            <td>Price</td>
            <td>Offer</td>
            <td>Status</td>
          </thead>
          .
          <tbody>
            {/* {PastOffer} */}
            {PastOffer.map((item, index) => (
              <tr>
                <td>{Date(item.offerdate)}</td>
                <td>{item.artworkid}</td>
                <td>{item.price}</td>
                <td>{item.offeredprice}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default OfferSent;
