import React, { Component } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import cinstance from "../../Service/randomcinstance";
import web3 from "../../Service/web3";
import AdminNavBar from "../../Components/navbar/AdminNavBar";
import moment from "moment";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { ReactComponent as Coin } from "../../../static/Images/polygon-coin.svg";
import { ReactComponent as Data } from "../../../static/Images/nodata.svg";
import "./LotteryListStyle.css";
import FooterStrip from "../../../App/Components/FooterStrip";
class LotteryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      loading: false,
      Randomresult: "",
      winner: "",
      lotterylist: [],
      dropdownOpen: false,
      show: true,
      Lotteriestypes: "Open Lotteries",
      lotteryType: false,
      lotteryTypeText: 1,
      lotteryTypeMapper: {
        0: "Spinner",
        1: "Pick Number",
      },
      resultStatusTypeMapper: {
        0: "Open",
        1: "Closed",
        2: "Result Done",
      },
    };
  }

  async componentDidMount() {
    var lotterylist = [];
    if (window.ethereum) {
      window.web3 = web3;
      cinstance.methods
        .admin()
        .call()
        .then(async (p) => {
          let account = await web3.eth.getAccounts();
          if (p == account[0]) this.setState({ show: true });
          cinstance.methods
            .lotteryId()
            .call()
            .then((res) => {
              for (var i = res - 1; i > 0; i--) {
                cinstance.methods
                  .lottery(i)
                  .call()
                  .then((response) => {
                    lotterylist.push(response);
                    this.setState({ lotterylist });
                  })
                  .catch((err) => console.log("pepep", err));
              }
            })
            .catch((err) => console.log("res", err));
        });
    } else {
      alert("Connect to wallet");
    }
  }
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  toggle2 = () => {
    this.setState({ lotteryType: !this.state.lotteryType });
  };
  render() {
    const {
      lotterylist,
      show,
      dropdownOpen,
      Lotteriestypes,
      lotteryType,
      lotteryTypeText,
    } = this.state;
    return (
      <>
        <AdminNavBar />
        {!show && (
          <Container className="bgImage  p-o">
            <div className="mspace mt-5">
              <h2>Not an admin</h2>
            </div>
          </Container>
        )}
        {show && (
          <Container className="bgImage  p-o ">
            <div className="lotterylist">
              <Row>
                <Col>
                  <div className="text-left ">
                    <div className="content">
                    {lotterylist.length == 0 && (
                      <tr>
                        <td colspan={8} style={{ textAlign: "center" }}>
                          {" "}
                          <Data className="dataimg" />{" "}
                        </td>
                      </tr>
                      )}
                      {lotterylist.length != 0 && (
                        <Row className="mx-auto ml-5  dp">
                          {/* <Dropdown isOpen={lotteryType} toggle={this.toggle2}>
                            <DropdownToggle caret>
                              <span className="dp-text">
                                {(lotteryTypeText == 1 && "Pick a Number") ||
                                  "Spinner Lottery"}
                              </span>
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  this.setState({
                                    lotteryTypeText: 1,
                                  });
                                }}
                              >
                                Pick a Number
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.setState({
                                    lotteryTypeText: 0,
                                  });
                                }}
                              >
                                Spinner Lotteries
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown> */}

                          <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                              <span className="dp-text">{Lotteriestypes}</span>
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => {
                                  this.setState({
                                    Lotteriestypes: "Open Lotteries",
                                  });
                                }}
                              >
                                Open Lotteries
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  this.setState({
                                    Lotteriestypes: "Closed Lotteries",
                                  });
                                }}
                              >
                                Closed Lotteries
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </Row>
                      )}
                      <Row className=" mt-5">
                        {lotterylist.map((item) => {
                          if (
                            item.status == 0 &&
                            item?.lotteryType == lotteryTypeText &&
                            Lotteriestypes == "Open Lotteries"
                          ) {
                            return (
                              <Col lg="4" md="6">
                                <Card
                                  onClick={() =>
                                    this.props.history.push(
                                      `/admin/lotterydetails/${item.lotteryId}`
                                    )
                                  }
                                  key={item.lotteryId}
                                >
                                  <div className="outer-div">
                                    <div className="inner-div">
                                      <div className="left-div">
                                        <div className="inner-content">
                                          <div className="lottery-text">
                                            ID:{item.lotteryId}
                                          </div>
                                          <div className="lottery-text">
                                            Entry Fee:{" "}
                                            {web3.utils.fromWei(
                                              `${item.entryFee}`,
                                              "ether"
                                            )}{" "}
                                            MATIC
                                          </div>
                                          <div className="sub-text">
                                            Prize Amount
                                          </div>
                                          <div className="value">
                                            <Coin />
                                            <span className="amount">
                                              {web3.utils.fromWei(
                                                `${item.totalPrize}`,
                                                "ether"
                                              )}{" "}
                                              MATIC
                                            </span>
                                          </div>
                                          <div className="dates-div">
                                            <div className="starting">
                                              <div className="sub-text">
                                                Start Date:
                                              </div>
                                              <div className="date-text">
                                                {moment
                                                  .unix(item.startTime)
                                                  .format("MM/DD/YYYY  hh:mma")}
                                              </div>
                                            </div>
                                            <div className="ending">
                                              <div className="sub-text">
                                                End Date:
                                              </div>
                                              <div className="date-text">
                                                {moment
                                                  .unix(item.endTime)
                                                  .format("MM/DD/YYYY hh:mma")}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="right-div">
                                        <div className="count">
                                          <div className="count-1">
                                            <div className="count-text count2">
                                              {item.capacity}
                                            </div>
                                          </div>
                                          <div className="count-2">
                                            <div className="count-text">
                                              {item.pickNumbers}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </Col>
                            );
                          }
                          if (
                            item.status == 2 &&
                            item.lotteryType == lotteryTypeText &&
                            Lotteriestypes == "Closed Lotteries"
                          ) {
                            return (
                              <Col lg="4" md="6">
                                <Card
                                  onClick={() =>
                                    this.props.history.push(
                                      `/admin/lotterydetails/${item.lotteryId}`
                                    )
                                  }
                                  key={item.lotteryId}
                                >
                                  <div className="outer-div">
                                    <div className="inner-div">
                                      <div className="left-div">
                                        <div className="inner-content">
                                          <div className="lottery-text">
                                            ID:{item.lotteryId}
                                          </div>
                                          <div className="lottery-text">
                                            Entry Fee:{" "}
                                            {web3.utils.fromWei(
                                              `${item.entryFee}`,
                                              "ether"
                                            )}{" "}
                                            MATIC
                                          </div>
                                          <div className="sub-text">
                                            Prize Amount
                                          </div>
                                          <div className="value">
                                            <Coin />
                                            <span className="amount">
                                              {web3.utils.fromWei(
                                                `${item.totalPrize}`,
                                                "ether"
                                              )}{" "}
                                              MATIC
                                            </span>
                                          </div>
                                          <div className="dates-div">
                                            <div className="starting">
                                              <div className="sub-text">
                                                Start Date:
                                              </div>
                                              <div className="date-text">
                                                {moment
                                                  .unix(item.startTime)
                                                  .format("MM/DD/YYYY  hh:mma")}
                                              </div>
                                            </div>
                                            <div className="ending">
                                              <div className="sub-text">
                                                End Date:
                                              </div>
                                              <div className="date-text">
                                                {moment
                                                  .unix(item.endTime)
                                                  .format("MM/DD/YYYY hh:mma")}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="right-div">
                                        <div className="count">
                                          <div className="count-1">
                                            <div className="count-text count2">
                                              {item.capacity}
                                            </div>
                                          </div>
                                          <div className="count-2">
                                            <div className="count-text">
                                              {item.pickNumbers}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </Col>
                            );
                          }
                        })}{" "}
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        )}
        <FooterStrip />
      </>
    );
  }
}
export default LotteryList;
