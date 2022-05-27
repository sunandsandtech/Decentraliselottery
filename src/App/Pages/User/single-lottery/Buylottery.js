import React, { Component } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import cinstance from "../../../Service/randomcinstance";
import web3 from "../../../Service/web3";
import NavBar from "../../../Components/navbar/NavBar";
import moment from "moment";
import Loaders from "../../../Components/Loaders";
import Warnings from "../../../Components/Warning";
import CustomButton from "../../../Components/custom-button/CustomButton";
import "./BuyLotteryStyles.css";
import "../../../../static/css/Main.css";
import { Path } from "../../../../static/Constants";
import FooterStrip from "../../../../App/Components/FooterStrip";
var md5 = require("md5");

class Buylottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      loading: true,
      Randomresult: "",
      error: false,
      winner: "",
      selectednum: [],
      lotteryboughts: [],
      lotterylist: { entryfee: 0, totalPrize: 0 },
    };
  }
  async componentDidMount() {
    if (window.ethereum) {
      window.web3 = web3;
      let lotteryboughts = [];
      let account = await web3.eth.getAccounts();
      // cinstance.getPastEvents(
      //   "lotterybought",
      //   {
      //     filter: { lotteryId: `${this.props.match.params.id}` },
      //     fromBlock: 0,
      //     toBlock: "latest",
      //   },
      //   (errors, events) => {
      //     if (!errors) {
      //       events.forEach((i) => lotteryboughts.push(i.returnValues.numbers));
      //       this.setState({ lotteryboughts });
      //     }
      //   }
      // );

      if (account.length !== 0) {
        cinstance.methods
          .lottery(this.props.match.params.id)
          .call()
          .then((response) => {
            this.setState({ lotterylist: response, loading: false });
          })
          .catch((err) => console.log("pepep", err));
      } else {
        this.setState({ error: true });
      }
    } else {
      this.setState({ error: true });
    }
  }

  buy = async () => {
    if (window.ethereum) {
      window.web3 = web3;
      this.setState({ loading: true });
      let account = await web3.eth.getAccounts();
      let selectedNUM = [];
      this.state.selectednum.map((ids) => {
        selectedNUM.push(`${ids}`);
      });

      let hash = md5(`${this.state.selectednum}${this.props.match.params.id}`);
      if (account.length != 0)
        cinstance.methods
          .buyNormalLottery(
            this.state.selectednum,
            this.props.match.params.id,
            hash
          )
          .send({ from: account[0], value: this.state.lotterylist.entryFee })
          .then((res) => {
            this.props.history.push(Path.profile);
            this.setState({ loading: false });
          })
          .catch((er) => this.setState({ loading: false }));
      else {
        window.ethereum.enable();
      }
    }
  };
  render() {
    const { loading, lotterylist, selectednum, error, lotteryboughts,item,lotteryId } =
      this.state;
    return (
      <div id="BuyLottery">
        {loading && <Loaders />}
        {error && <Warnings />}
        <NavBar />
        <Container>
          <div className="marginbtm margin-tp">
            <a href={Path.root} className="textline">
              {" "}
              <span className="textline">Home</span>
            </a>
            <span>
              {" "}
              <img
                src={
                  require("../../../../../src/static/Images/arrow.svg").default
                }
              />{" "}
            </span>
            <a href={Path.alllottery} className="textline">
              <span className="textline">Pick a Number</span>
            </a>
            <span>
              {" "}
              <img
                src={
                  require("../../../../../src/static/Images/arrow.svg").default
                }
              />{" "}
            </span>
            <span className="textline">Lottery<span className="space">{lotterylist.lotteryId}</span></span>
          </div>
          <Row className="d-flex justify-content-center my-5">
            {lotterylist.status == 2 && (
              <Col lg="4">
                <div className="outerBox">
                  <div className="innerBox emptyLottery">
                    Lottery Not Available !!
                  </div>
                </div>
              </Col>
            )}
            {lotterylist.status !== 2 && (
              <Col lg={10}>
                <div className="outerBox">
                  <div className="innerBox">
                    <p className="headText">
                      Get a chance to win{" "}
                      {web3.utils.fromWei(`${lotterylist.totalPrize}`, "ether")}{" "}
                      MATIC
                    </p>
                    <div
                      className="d-flex align-items-center justify-content-md-between justify-content-center"
                      style={{ flexWrap: "wrap" }}
                    >
                      <div className="mt-5 mx-3">
                        <p className="text-left dateTextHead ">Start Date</p>
                        <p className="text-left dateText mt-1">
                          {moment
                            .unix(lotterylist.startTime)
                            .format("MM-DD-YYYY")}{" "}
                          <span className="ml-2 dateText">
                            {moment
                              .unix(lotterylist.startTime)
                              .format("hh:mma")}{" "}
                          </span>
                        </p>
                      </div>
                      <div className="mt-5 mx-3">
                        <p className="text-left dateTextHead ">End Date</p>
                        <p className="text-left dateText mt-1">
                          {moment
                            .unix(lotterylist.endTime)
                            .format("MM-DD-YYYY")}
                          <span className="ml-2 dateText">
                            {moment.unix(lotterylist.endTime).format("hh:mma")}
                          </span>
                        </p>
                      </div>
                      <div className="mt-5 mx-3">
                        <p className="text-left dateTextHead ">Draw Date</p>
                        <p className="text-left dateText mt-1">
                          {moment
                            .unix(lotterylist.drawTime)
                            .format("MM-DD-YYYY")}
                          <span className="ml-2 dateText">
                            {moment.unix(lotterylist.drawTime).format("hh:mma")}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="bigHeading mt-5 ">
                      Pick {lotterylist.pickNumbers} Numbers
                    </p>
                    <ul className="numberlist mt-3">
                      {Array.from({ length: lotterylist.capacity }, (i, b) => (
                        <>
                          <li
                            key={i}
                            onClick={() => {
                              if (
                                selectednum.length == lotterylist.pickNumbers &&
                                !selectednum.includes(b + 1)
                              ) {
                                selectednum[lotterylist.pickNumbers - 1] =
                                  b + 1;
                                this.setState({ selectednum });
                              } else {
                                if (selectednum.includes(b + 1))
                                  this.setState({
                                    selectednum: selectednum.filter(
                                      (item) => item != b + 1
                                    ),
                                  });
                                else
                                  this.setState({
                                    selectednum: [...selectednum, b + 1],
                                  });
                              }
                            }}
                            className={`${
                              selectednum.includes(b + 1) ? "active" : " "
                            } `}
                          >
                            {b + 1}
                          </li>
                          {(b + 1) % 10 == 0 && <br />}
                        </>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-center mt-5">
                      <CustomButton
                        title={
                          lotterylist &&
                          lotterylist.entryFee && (
                            <b style={{ wordBreak: "break-all" }}>
                              {" "}
                              Buy for{" "}
                              {web3.utils.fromWei(
                                `${lotterylist.entryFee}`,
                                "ether"
                              )}{" "}
                              MATIC
                            </b>
                          )
                        }
                        onPress={this.buy}
                        className={"myCustomBtn"}
                        disabled={selectednum.length != lotterylist.pickNumbers}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Container>
        {/* <Container style={{ minHeight: "95vh" }}>
          <Row className=" mb-4 mx-auto justify-content-center">
            <Col lg="12">
              <div className=" mb-3 justify-content-center">
                <h3 className="mb-6 mt-4 font-weight-bold text-danger">
                  {" "}
                  Get Chance to win '
                  {web3.utils.fromWei(`${lotterylist.totalPrize}`, "ether")}'
                  MATIC
                </h3>
                <Col lg="6" className={"mt-4 mb-4 mx-auto"}>
                  <div class="buy-card bgcol p-0 mb-4 ">
                    <div class="card-body p-2 ">
                      <p class="text-light text-center">
                        {moment
                          .unix(lotterylist.startTime)
                          .format("MM/DD/YYYY hh:mma")}{" "}
                        -{" "}
                        {moment
                          .unix(lotterylist.endTime)
                          .format("MM/DD/YYYY hh:mma")}
                      </p>
                    </div>
                  </div>
                </Col>
                {lotterylist.status !=2 && (
                  <Col lg="6 m-5" className=" card-inner p-4 mx-auto">
                    <h4 className="mt-2 mb-2 p-2 text-danger">
                      Pick {lotterylist.pickNumbers} numbers
                    </h4>
                    <Row className="m-2 ">
                      <ul className="number-list ">
                        {Array.from(
                          { length: lotterylist.capacity },
                          (i, b) => (
                            <li
                              key={i}
                              onClick={() => {
                                if (
                                  selectednum.length ==
                                    lotterylist.pickNumbers &&
                                  !selectednum.includes(b + 1)
                                ) {
                                  selectednum[lotterylist.pickNumbers - 1] =
                                    b + 1;
                                  this.setState({ selectednum });
                                } else {
                                  if (selectednum.includes(b + 1))
                                    this.setState({
                                      selectednum: selectednum.filter(
                                        (item) => item != b + 1
                                      ),
                                    });
                                  else
                                    this.setState({
                                      selectednum: [...selectednum, b + 1],
                                    });
                                }
                              }}
                              className={`${
                                selectednum.includes(b + 1) ? "active" : " "
                              } `}
                            >
                              {b + 1}
                            </li>
                          )
                        )}
                      </ul>
                    </Row>
                  </Col>
                )}
                {lotterylist.status ==2 && (
                  <Col lg="4 mb-5" className={" mx-auto "}>
                    <div class="buy-card  " style={{ height: "100%" }}>
                      <div class="card-body text-center ">
                        <h5 class="text-danger  font-weight-bold p-4 mt-4 mb-4">
                          Lottery Not Available !!
                        </h5>
                      </div>
                    </div>
                  </Col>
                )}

                {lotterylist.status !=2&& (
                  <Col lg="6 mb-5" className={" mx-auto"}>
                    <div class="card-inner  ">
                      <div class="card-body text-center p-0 ">
                        <h5 className=" text-danger  font-weight-bold mb-4">
                          Draw on{" "}
                          {moment
                            .unix(lotterylist.drawTime)
                            .format("MM/DD/YYYY hh:mma")}
                        </h5>
                        <Button
                          // variant="danger"
                          onClick={this.buy}
                          style={{ cursor: "pointer", height: "auto",   width: "230px" }}
                          className={
                            selectednum.length != lotterylist.pickNumbers
                          }
                          disabled={
                            selectednum.length != lotterylist.pickNumbers
                          }
                        >
                          {lotterylist&&lotterylist.entryFee&&<b style={{wordBreak:"break-all"}}>
                            {" "}
                            Buy for{" "}
                            {web3.utils.fromWei(
                              `${lotterylist.entryFee}`,
                              "ether"
                            )}{" "}
                            MATIC
                          </b>}
                        </Button>
                      </div>
                    </div>
                  </Col>
                )}
              </div>
            </Col>
          </Row>
        </Container> */}
        <FooterStrip />
      </div>
    );
  }
}

export default Buylottery;
