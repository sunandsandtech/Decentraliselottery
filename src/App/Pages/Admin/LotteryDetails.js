import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import cinstance from "../../Service/randomcinstance";
import web3 from "../../Service/web3";
import AdminNavBar from "../../Components/navbar/AdminNavBar";
import moment from "moment";
import Loaders from "../../Components/Loaders";
import "./LotteryDetailsStyle.css";
import ButtonCommon from "../../Components/ButtonCommon";
import { ReactComponent as Data } from "../../../static/Images/nodata.svg";
import FooterStrip from "../../../App/Components/FooterStrip";

class LotteryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      loading: true,
      Randomresult: "",
      winner: "",
      lotterylist: [],
      lotterywinner: [],
    };
  }

  async componentDidMount() {
    var lotterylist = [];
    if (window.ethereum) {
      window.web3 = web3;
      cinstance.methods
        .lottery(this.props.match.params.id)
        .call()
        .then((response) => {
          cinstance.methods
            .getLotteryNumbers(this.props.match.params.id)
            .call()
            .then((res) => {
              let sizes = response.pickNumbers;
              let ticketbought = res.tickets;
              let useraddress = res.useraddress;
              useraddress.forEach((i, index) => {
                lotterylist.push({
                  useraddress: i,
                  ticketbought: ticketbought.slice(
                    index * sizes,
                    (index + 1) * sizes
                  ),
                });
              });
              this.setState({ lotterylist });
            });

          this.setState({ lottery: response, loading: false });
          // if(response.status>1){
          //   cinstance.getPastEvents(
          //     "LotteryResult",
          //     {
          //       filter: { lotteryId: `${this.props.match.params.id}` },
          //       fromBlock: 0 ,
          //       toBlock: "latest"
          //     }, (errors, events) => {
          //          if (!errors) {
          //           this.setState({lotterywinner:events[0].returnValues.useraddressdata})
          //          }
          //      })
          // }
        })
        .catch((err) => console.log("pepep", err));
      // cinstance.getPastEvents(
      //   "LotteryBought",
      //   {
      //     filter: { lotteryId: `${this.props.match.params.id}` },
      //     fromBlock: 0,
      //     toBlock: "latest",
      //   },
      //   (errors, events) => {
      //     if (!errors) {
      //       events.forEach((i) => lotterylist.push(i.returnValues));
      //       this.setState({ lotterylist });
      //     }
      //   }
      // );
    } else {
      alert("Connect to wallet");
    }
  }
  getDraw = async () => {
    if (window.ethereum) {
      window.web3 = web3;
      let account = await web3.eth.getAccounts();
      cinstance.methods
        .getWinnerNumbers("202020", this.props.match.params.id)
        .send({ from: account[0] })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log("pepep", err));
    } else {
      alert("Connect to wallet");
    }
  };
  render() {
    const { lottery, lotterylist, loading, lotterywinner } = this.state;
    console.log(lotterylist);
    return (
      <div>
        {loading && <Loaders />}
        <AdminNavBar />
        <Container className="lotterydetails mb-5 mt-5">
          <div className="outer-div">
            <div className="inner-div">
              <Row className=" mx-auto justify-content-between">
                <Col lg="7">
                  {/* <div className="detail">
                    <div className="labeltext">Minimum Players:</div>

                    <div className="valuetext">
                      {lottery && lottery.minPlayers}
                    </div>
                  </div> */}
                  <div className="detail">
                    <div className="labeltext">Created By:</div>

                    <div className="valuetext">
                    {lottery && lottery.ownerAddress}
                    </div>
                  </div>
                  <div className="detail">
                    <div className="labeltext"> Id :</div>

                    <div className="valuetext">
                      {lottery && lottery.lotteryId}
                    </div>
                  </div>
                  <div className="detail">
                    <div className="labeltext"> Minimum Players: </div>

                    <div className="valuetext">
                      {lottery && lottery.minPlayers}
                    </div>
                  </div>
                  <div className="detail">
                    <div className="labeltext"> Total Numbers : </div>

                    <div className="valuetext">
                      {lottery && lottery.capacity}
                    </div>
                  </div>
                  <div className="detail">
                    <div className="labeltext"> Total Numbers to Pick: </div>

                    <div className="valuetext">
                      {lottery && lottery.pickNumbers}
                    </div>
                  </div>
                  {lottery && lottery.entryFee && (
                    <div className="detail">
                      <div className="labeltext">Entry Fee:</div>

                      <div className="valuetext">
                        {web3.utils.fromWei(`${lottery.entryFee}`, "ether")}{" "}
                        MATIC
                      </div>
                    </div>
                  )}
                </Col>
                <Col lg="4">
                  <div className="detail">
                    <div className="labeltext"> Start Date:</div>

                    <div className="valuetext">
                      {moment
                        .unix(lottery && lottery.startTime)
                        .format("MM/DD/YYYY hh:mma")}
                    </div>
                  </div>

                  <div className="detail">
                    <div className="labeltext">End Date:</div>

                    <div className="valuetext">
                      {moment
                        .unix(lottery && lottery.endTime)
                        .format("MM/DD/YYYY hh:mma")}
                    </div>
                  </div>

                  <div className="detail">
                    <div className="labeltext">Draw Date:</div>

                    <div className="valuetext">
                      {moment
                        .unix(lottery && lottery.drawTime)
                        .format("MM/DD/YYYY hh:mma")}
                    </div>
                  </div>

                  <div className="detail">
                    <div className="labeltext">Status:</div>

                    <div className="valuetext">
                      {lottery && lottery.status == 0
                        ? "Open"
                        : lottery && lottery.status == 1
                        ? "Closed"
                        : lottery && lottery.status == 4
                        ? "Rollover Needed"
                        : lottery && lottery.status == 5
                        ? "Rollover Done"
                        : "Result Done"}
                    </div>
                  </div>
                  {lottery && lottery.totalPrize && (
                    <div className="detail">
                      <div className="labeltext">Winner Amount:</div>

                      <div className="valuetext">
                        {web3.utils.fromWei(`${lottery.totalPrize}`, "ether")}{" "}
                        MATIC
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </div>
          <Row className="mx-auto mb-3 justify-content-center">
            <Col lg="12">
              {
                <Row>
                  <div className="detail1 winner1">
                    <div className="labeltext">Winner: </div>

                    <div className="addresstext">
                      {lottery && lottery.lotteryWinner}
                    </div>
                  </div>
                </Row>
              }
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <div className="outer-div">
                <div className="inner-div">
                  <Table borderless responsive>
                    <thead className="heading-border">
                      <tr>
                        <th className="labeltext">Bought By</th>
                        <th className="labeltext">Numbers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lotterylist.length == 0 && (
                        <tr>
                          <td colspan={8} style={{ textAlign: "center" }}>
                            {" "}
                            <Data className="dataimg" />
                          </td>
                        </tr>
                      )}
                      {lotterylist &&
                        lotterylist.map((item) => (
                          <tr key={item.lotteryId}>
                            <td className="valuetext1">{item.useraddress}</td>
                            <td className="row m-0 ">
                              {" "}
                              {item.ticketbought.map((i) => (
                                <p className="valuetext1 number">{i}</p>
                              ))}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <FooterStrip />
      </div>
    );
  }
}

export default LotteryDetails;
