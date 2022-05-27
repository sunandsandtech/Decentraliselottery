import React from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import moment from "moment";
import web3 from "../../Service/web3";
const ResultCard = ({ item }) => {
  return (
    <div>
      <div className="result-item">
        <div className="result-item-header d-flex align-items-center justify-content-between">
          <p>Lotttery {item.lotteryId}</p>
          <p>Draw on {moment.unix(item.drawTime).format("MM/DD/YYYY hh:mma")} </p>
        </div>
        <div className="result-item-body d-flex align-items-center justify-content-between">
          <div className="winner-num">
            <span className="textofresult">
              Winner {item && item.lotteryWinner}
            </span>
          </div>
          <div className="next-jack-amount"></div>
        </div>
      </div>
    </div>
  );
};
export default ResultCard;
