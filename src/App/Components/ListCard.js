import React from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import moment from "moment";
import web3 from "../Service/web3";
import "./ListCardStyle.css";
import { ReactComponent as Coin } from "../../static/Images/polygon-coin.svg";
const ListCard = ({ item, history }) => {
  return (
    <div id="normal-lotteries">
      <Card>
        <div className="outer-div">
          <div className="inner-div">
            <div className="left-div">
              <div className="lottery-text">Lottery {item.lotteryId}</div>
              <div className="sub-text">Chance to win</div>
              <div className="value">
                <Coin />
                <span className="amount">
                  {web3.utils.fromWei(`${item.totalPrize}`, "ether")} MATIC
                </span>
              </div>
              <button
                className="playbutton"
                onClick={() => history.push(`/lottery/${item.lotteryId}`)}
              >
                Play Now
              </button>
            </div>
            <div className="right-div">
              <div className="count">
                <div className="count-1">
                  <div className="count-text count2">{item.capacity}</div>
                </div>
                <div className="count-2">
                  <div className="count-text">{item.pickNumbers}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default ListCard;
