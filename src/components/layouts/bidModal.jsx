import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useAccount, useSignMessage } from "wagmi";
import { signMessage } from "@wagmi/core";
import { useState, useEffect } from "react";
import db from "../../firebase";
import { ref, onValue, get, update, set, child } from "firebase/database";

const BidModal1 = (props) => {
  const share_url = window.location.href;
  const title = "Artrise";

  const { address, isConnected } = useAccount();

  const [bidAmount, setBidAmount] = useState();
  const [errorDisplay, setErrorDisplay] = useState("hidden");
  const [errorText, setErrorText] = useState("");



  function checkBidAMount(v) {
    if (v > 0.27) return true;
    else return false;
  }

  const hide = props.onHide;

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>Place a bid</h3>
        <p className="text-center">
          Participate in this auction by making a bid
        </p>
        <div
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            height: "fit-content",
            padding: "2% 3%",
            border: "solid 1px #020202",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h5 style={{ marginBottom: "10px", fontWeight: "400" }}>Balance</h5>
            <h5 style={{ fontWeight: "400" }}>Min. Bid</h5>
            <h5 style={{ fontWeight: "400", marginTop: "15px" }}>
              Expert extimation
            </h5>
          </div>

          <div>
            <h5 style={{ marginBottom: "10px" }}>{props.balance} ETH</h5>
            <h5>0.27 ETH</h5>
            <h5 style={{ marginTop: "15px" }}>4.37 ETH</h5>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            height: "fit-content",
            padding: "1%",
            border: "solid 1px #020202",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <input
            type="number"
            placeholder="Bidding amount"
            onChange={(e) => {
              setBidAmount(parseFloat(e.target.value.toString()));
            }}
            step={0.1}
            style={{
              height: "4vh",
              width: "85%",
              border: "none",
              fontSize: "1.5em",
              color: "#020202",
              padding: "1% 0%",
            }}
          />
          <button
            onClick={async () => {
              if (bidAmount > 0.27) {
                setErrorDisplay("hidden");
                try {
                  const signature = await signMessage({
                    message:
                      "1 - You freely accept to place a Bid of " +
                      bidAmount.toString() +
                      " to this auction. \n2 - You acknowledge that the gas fees might differ on moment of purchase.\n3 - If you win this auction, You can not pullback your bid, and you must be aware that it will be withdrawn from your wallet either way.",
                  });
                  const bidRef = ref(
                    db,
                    "premierBids/" + Math.floor(Math.random() * 100000000)
                  );
                  await set(bidRef, {
                    "bidAmount": bidAmount.toString(),
                    "bidderAddress":
                      address.toString().slice(0, 6).toString() +
                      "..." +
                      address
                        .toString()
                        .substring(address.toString().length - 3).toString(),
                  });
                  hide()
                  Swal.fire({
                    icon: "success",
                    title: "Your bid has been succesfully placed !",
                    text: "Your bid of " + bidAmount.toString() + " ETH has been succesfully placed !",
                  });
                  window.location.href= window.location.href
                } catch (error) {
                  alert(error);
                }
              } else {
                setErrorText("The minimum bid amount is 0.27 ETH");
                setErrorDisplay("visible");
              }
            }}
            className="placeBidBtn"
          >
            Let's go
          </button>
        </div>
        <p
          style={{
            fontSize: "0.9em",
            color: "red",
            marginTop: "3px",
            visibility: errorDisplay,
          }}
        >
          {errorText}
        </p>
      </div>
    </Modal>
  );
};

export default BidModal1;
