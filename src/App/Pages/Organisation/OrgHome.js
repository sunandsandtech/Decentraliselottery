import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import FooterStrip from "../../../App/Components/FooterStrip";
import { Path } from "../../../static/Constants";
import { ReactComponent as Coin } from "../../../static/Images/polygon-coin.svg";
import CustomButton from "../../Components/custom-button/CustomButton";
import NavBar from "../../Components/navbar/NavBar";
import cinstance from "../../Service/randomcinstance";
import web3 from "../../Service/web3";
import "./OrgHomeStyle.css";
import RegisterAsorganisation from "./register-bookie/RegisterAsOrganisation";
class OrgHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approved: { active: true },
      TotalOrganisation: 0,
      loading: false,
      Totallottery: 0,
      amountearned: 0,
      lotterylist: [],
      warn: false,
      net: false,
      isNetVer: true,
      netId: "",
    };
  }

  async componentDidMount() {
    var lotterylist = [];
    this.setState({ loading: true });
    if (window.ethereum) {
      window.web3 = web3;
      window.web3.eth.net.getId().then((netId) => {
        console.log(netId);
        if (netId == 80001) {
          this.setState({ isNetVer: true });
        } else {
          // alert("Please Connect to Polygon main net (Network Id 137)")
          this.setState({ warn: true });
          this.setState({ isNetVer: false });
          this.setState({ net: true });
        }
      });
      let account = await web3.eth.getAccounts();
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      if (account.length !== 0) {
        cinstance.methods
          .getOrglotteries(account[0])
          .call()
          .then((res) => {
            this.setState({ loading: false });
            this.setState({ Totallottery: res.length });
          })
          .catch((err) => this.setState({ loading: false }));

        cinstance.methods
          .organisationbyaddr(account[0])
          .call()
          .then((res) => {
            this.setState({ approved: res, loading: false });
          })
          .catch((err) => this.setState({ loading: false }));
        cinstance.methods
          .organisationbyaddr(account[0])
          .call()
          .then((res) => {
            this.setState({
              amountearned: web3.utils.fromWei(`${res.amountEarned}`, "ether"),
              loading: false,
            });
          })
          .catch((err) => this.setState({ loading: false }));
      }
    } else {
      // this.setState({ loading: false })
      // alert("Connect to wallet");
    }

    // this.setState({ loading: false })
  }

  render() {
    const {
      lotterylist,
      approved,
      TotalOrganisation,
      Totallottery,
      loading,
      amountearned,
      warn,
      net,
      isNetVer,
    } = this.state;

    return (
      <>
        {warn == true && (
          <div>
            <NavBar />
            <Container>
              <div className="orgscreendiv">
                <p className="pt-5">
                  {net
                    ? "Please Connect to Polygon main net (Network Id 80001)"
                    : "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"}{" "}
                </p>
              </div>
            </Container>
          </div>
        )}
        {isNetVer && approved && !approved.active && !loading && (
          <RegisterAsorganisation />
        )}
        {isNetVer && approved && approved.active && !loading && (
          <div className="org">
            <NavBar />
            <Container className="bgImage  p-o " fluid>
              <div className="btn-div">
                <CustomButton
                  className="org-btn"
                  title="Withdraw Commission"
                  onClick={async () => {
                    let account = await web3.eth.getAccounts();
                    cinstance.methods
                      .withdrawcommission()
                      .send({ from: account[0] })
                      .then((response) => {
                        window.location.reload();
                      })
                      .catch((err) => console.log("pepep", err));
                  }}
                />
              </div>
              <div className="">
                {approved && !approved.active && (
                  <h3 className="mt-5 text-left pl-5 ">Account Not Approved</h3>
                )}
                <Row className="mx-auto">
                  <div className="marginbtm">
                    <a href={Path.root} className="textline">
                      {" "}
                      <span className="textline">Home</span>
                    </a>
                    <span>
                      {" "}
                      <img
                        src={
                          require("../../../../src/static/Images/arrow.svg")
                            .default
                        }
                      />{" "}
                    </span>
                    <span className="textline">Organization</span>
                  </div>
                  <Col lg="12" className="mb-5">
                    <Row>
                      <Col lg={5} md={12} sm={12} xs={12} xl={4}>
                        <Card border="p-3 mt-5">
                          <a href={Path.alllottery}>
                            <div className="orgcard">
                              <div className="card-heading">
                                Total Lotteries
                              </div>
                              <div className="card-content">
                                <div className="content-text">
                                  {Totallottery}
                                </div>
                              </div>
                            </div>
                          </a>
                        </Card>
                      </Col>

                      <Col lg={7} md={12} sm={12} xs={12} xl={5}>
                        <Card border="p-3 mt-5">
                          <div className="orgcard">
                            <div className="card-heading">
                              Total Amount Received
                            </div>
                            <div className="card-content">
                              <div className="content-text">
                                <Coin className="coin-icon" />
                                {amountearned} MATIC
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                    {/* <CardDeck> */}

                    {/* </CardDeck> */}
                  </Col>
                </Row>
              </div>
            </Container>
            <FooterStrip />
          </div>
        )}
        {!approved && (
          <div>
            <NavBar />
            <Container>
              <div className="orgscreendiv">
                <p className="pt-5">
                  {!loading &&
                    "Please Connect to Polygon main net (Network Id 80001)"}
                </p>
              </div>
            </Container>
          </div>
        )}
      </>
    );
  }
}

export default OrgHome;
