import React, { Component } from "react";
import { Container, Row, Col, Button, Table, Card } from "react-bootstrap";
import cinstance from "../../../Service/randomcinstance";
import web3 from "../../../Service/web3";
import OrgNavBar from "../../../Components/OrgNavBar";
import NavBar from "../../../Components/navbar/NavBar";
import moment from "moment";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./MylotteryStyle.css";
import { Path } from "../../../../static/Constants";
import FooterStrip from "../../../../App/Components/FooterStrip";
import { ReactComponent as Coin } from "../../../../static/Images/polygon-coin.svg";
import { ReactComponent as Data } from "../../../../static/Images/nodata.svg"
class Mylottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      loading: false,
      Randomresult: "",
      winner: "",
      lotterylist: [],
      Lotteriestypes: "Open Lotteries",
      dropdownOpen: false,
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
      let account = await web3.eth.getAccounts();
      if (account.length == 0) {
        await window.ethereum.enable();
        //account = await web3.eth.getAccounts();
        window.location.reload();
      }
      cinstance.methods
        .getOrglotteries(account[0])
        .call()
        .then((res) => {
          res.forEach((i) => {
            cinstance.methods
              .lottery(i)
              .call()
              .then((response) => {
                lotterylist.push(response);

                this.setState({ lotterylist });
                console.log(lotterylist);
              })
              .catch((err) => console.log("pepep", err));
          });
        })
        .catch((err) => console.log("res", err));
    } else {
      alert("Connect to wallet");
    }
  }

  approve = async (id) => {
    if (window.ethereum) {
      window.web3 = web3;
      let account = await web3.eth.getAccounts();
      cinstance.methods
        .admin()
        .call()
        .then((res) => {
          if (res == account[0]) {
            cinstance.methods
              .approveOraganisation(id)
              .send({ from: account[0] })
              .then((res) => {
                console.log(res);
              });
          } else
            alert(
              "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
            );
        });
    }
  };

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  toggle2 = () => {
    this.setState({ lotteryType: !this.state.lotteryType });
  };

  render() {
    const {
      lotterylist,
      dropdownOpen,
      Lotteriestypes,
      lotteryType,
      lotteryTypeText,
    } = this.state;
    return (
      <div>
        <NavBar />
        <Container className="bgImage mt-4">
          <Row>
            <Col lg="12">
              <div className="marginbtm marginspace">
                <a href={Path.root} className="textline">
                  {" "}
                  <span className="textline">Home</span>
                </a>
                <span>
                  {" "}
                  <img
                    src={require("../../../../static/Images/arrow.svg").default}
                  />{" "}
                </span>
                <span className="textline">My Lottery</span>
              </div>
            </Col>
          </Row>
          <div className="">
            <div className=" text-left">
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

                <Row className="mx-auto mt-5 my-lottery">
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
                                `/bookie/lotterydetails/${item.lotteryId}`
                              )
                            }
                            key={item.lotteryId}
                          >
                            <div className="outer-div">
                              <div className="inner-div">
                                <div className="left-div">
                                  <div className="lottery-text">
                                    ID: {item.lotteryId}
                                  </div>
                                  <div className="lottery-text">
                                    Entry Fee:{" "}
                                    {web3.utils.fromWei(
                                      `${item.entryFee}`,
                                      "ether"
                                    )}{" "}MATIC
                                  </div>
                                  <div className="sub-text">Prize Amount</div>
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
                                      <div className="sub-text">End Date:</div>
                                      <div className="date-text">
                                        {moment
                                          .unix(item.endTime)
                                          .format("MM/DD/YYYY  hh:mma")}
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
                                `/bookie/lotterydetails/${item.lotteryId}`
                              )
                            }
                            key={item.lotteryId}
                          >
                            <div className="outer-div">
                              <div className="inner-div">
                                <div className="left-div">
                                  <div className="lottery-text">
                                    ID: {item.lotteryId}
                                  </div>
                                  <div className="lottery-text">
                                    Entry Fee:{" "}
                                    {web3.utils.fromWei(
                                    `${item.entryFee}`,
                                    "ether"
                                  )}{" "}MATIC
                                  </div>
                                  <div className="sub-text">Prize Amount</div>
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
                                      <div className="sub-text">End Date:</div>
                                      <div className="date-text">
                                        {moment
                                          .unix(item.endTime)
                                          .format("MM/DD/YYYY  hh:mma")}
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
          </div>
        </Container>
        <FooterStrip />
      </div>
    );
  }
}

export default Mylottery;
