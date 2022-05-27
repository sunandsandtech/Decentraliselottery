import React from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import moment from "moment";
import web3 from "../Service/web3";
import "../Components/ResultCard/resultscard.css"
const ResultCard = ({ item }) => {
  return (
    <div className="lotterycontainter d-flex ">
    
    <div className="mycard">
      <div className="result-item">
        <div className="result-item-header align-items-center justify-content-between">
          <p className="lotteryid">Lotttery {item.lotteryId}</p>
          
        
        <div className="winner-num">
            <span className="textofresult">
              Winner 
            </span>
          </div>
          <div> <span className="lotterywinnerclass">{item && item.lotteryWinner}</span></div>
          <div><p className="drawclass">Draw on {moment.unix(item.drawTime).format("MM/DD/YYYY hh:mma")} </p></div>
          </div>
      </div>
    </div>
    </div>
  );
};
export default ResultCard;
