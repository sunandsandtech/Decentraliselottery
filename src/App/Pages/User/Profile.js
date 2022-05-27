import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import FooterStrip from "../../../App/Components/FooterStrip";
import { Path } from "../../../static/Constants";
import { ReactComponent as Coin } from "../../../static/Images/polygon-coin.svg";
import CustomButton from "../../Components/custom-button/CustomButton";
import NavBar from "../../Components/navbar/NavBar";
import cinstance from "../../Service/randomcinstance";
import web3 from "../../Service/web3";
import "./ProfileStyle.css";

import { ReactComponent as Data } from "../../../static/Images/nodata.svg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      loading: false,
      Randomresult: "",
      winner: "",
      lotterylist: [],
      referral: "",
    };
  }
  async componentDidMount() {
    var lotterylist = [];
    var counts = 0;
    if (window.ethereum) {
      window.web3 = web3;
      let account = await web3.eth.getAccounts();
      if (account.length !== 0) {
        // cinstance.getPastEvents(
        //   "LotteryBought",
        //   {
        //     filter: { useraddress: `${account[0]}` },
        //     fromBlock: 21694796,
        //     toBlock: "latest",
        //   },
        //   (errors, events) => {
        //     if (!errors) {
        //       events.forEach((i) => lotterylist.push(i.returnValues));
        //       this.setState({ lotterylist });
        //     }
        //   }
        // );
        cinstance.methods
          .getUserlotteries(account[0])
          .call()
          .then((response) => {
            this.setState({ lotterylist: response });
          })
          .catch((err) => console.log("pepep", err));
        cinstance.methods
          .refereeEarned(account[0])
          .call()
          .then((response) => {
            this.setState({ referral: response });
          })
          .catch((err) => console.log("pepep", err));

        cinstance.methods
          .tokenearned(account[0])
          .call()
          .then((response) => {
            this.setState({ winner: response });
          })
          .catch((err) => console.log("pepep", err));
      }
    } else {
      alert("Connect to wallet");
    }
  }

  render() {
    const { lotterylist } = this.state;
    return (
      <div className="profile">
        <div fluid className="bgImage p-0 m-0">
          <NavBar />
          <Container>
            <Row className="lottery-section">
              <Col>
                <div className="">
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
                  <span className="textline">Profile</span>
                </div>
              </Col>
            </Row>
            <Row className="mx-auto">
              <Col lg={5} md={12} sm={12} xs={12} xl={4}>
                <Card border="p-3 mt-5">
                  <div className="orgcard">
                    <div className="card-heading">Tokens Earned</div>
                    <div className="card-content">
                      <div className="content-text">
                        <div className="line1">
                          <Coin className="coin-icon" />
                          {Number(this.state.winner / 10 ** 18).toFixed(5)}{" "}
                          MATIC
                        </div>
                        <div>
                          <CustomButton
                            className="profile-btn"
                            title="Withdraw"
                            onPress={async () => {
                              let account = await web3.eth.getAccounts();
                              cinstance.methods
                                .redeemTokens()
                                .send({ from: account[0] })
                                .then((response) => {
                                  window.location.reload();
                                  console.log("DONE");
                                })
                                .catch((err) => console.log("pepep", err));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col lg={7} md={12} sm={12} xs={12} xl={5}>
                <Card border="p-3 mt-5">
                  <div className="orgcard">
                    <div className="card-heading">Referral Bonus Earned</div>
                    <div className="card-content">
                      <div className="content-text">
                        <div className="line1">
                          <Coin className="coin-icon" />
                          {Number(this.state.referral / 10 ** 18).toFixed(
                            5
                          )}{" "}
                          MATIC
                        </div>
                        <CustomButton
                          className="profile-btn"
                          title="Withdraw"
                          onPress={async () => {
                            let account = await web3.eth.getAccounts();
                            cinstance.methods
                              .withdrawrefereecommission()
                              .send({ from: account[0] })
                              .then((response) => {
                                window.location.reload();
                              })
                              .catch((err) => console.log("pepep", err));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row className="mx-auto mt-5">
              <Col lg="12">
                <div className="outer-div">
                  <div className="inner-div">
                    {lotterylist.length == 0 && <Data className="dataimg" />}

                    {lotterylist.map((i) => (
                      <div className="lottery-detail">
                        <div className="label-text">Lottery Number</div>{" "}
                        <span className="value-text"> #{i} </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <div className="container register">
              <div>
                <Row>
                  <Col lg="12">
                    {/* <Card
                        className="Card-style"
                        className="overview-item "
                        style={{
                          alignSelf: "left",
                          margin: "auto",
                          maxWidth: "500px",
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "30px",
                            FontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Profile Details
                        </h1>
                        <CardBody>
                          <Form>
                            <Form.Row>
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom01"
                              >
                                <Form.Label>
                                  <b>Name : </b>
                                </Form.Label>
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom03"
                              >
                                <Form.Label>
                                  <b>Email : </b>
                                </Form.Label>
                              </Form.Group>
                            </Form.Row>
                            <Form.Row>
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom01"
                              >
                                <Form.Label>
                                  <b>Mobile :</b>
                                </Form.Label>
                              </Form.Group>
                            </Form.Row>

                            {/* <Button type="submit" style={{width:'100%'}}>Sign Up</Button> 
                            <div
                              style={{ margin: "auto", textAlign: "center" }}
                            ></div>
                          </Form>
                        </CardBody>
                      </Card> */}
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
          <FooterStrip />
        </div>
      </div>
    );
  }
}

export default Profile;
