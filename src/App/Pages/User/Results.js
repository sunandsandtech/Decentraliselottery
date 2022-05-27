import React, { Component } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import cinstance from "../../Service/randomcinstance";
import web3 from "../../Service/web3";
import NavBar from "../../Components/navbar/NavBar";
import ResultsCard from "../../Components/ResultsCard";
import { Path } from "../../../static/Constants";
import FooterStrip from "../../../App/Components/FooterStrip";
import { ReactComponent as Data } from "../../../static/Images/nodata.svg";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      loading: false,
      Randomresult: "",
      winner: "",
      lotterylist: [],
    };
  }
  async componentDidMount() {
    var lotterylist = [];
    if (window.ethereum) {
      window.web3 = web3;
      cinstance.methods
        .lotteryId()
        .call()
        .then((res) => {
          this.setState({ totallotteries: res });
          for (var i = 1; i < res; i++) {
            cinstance.methods
              .lottery(i)
              .call()
              .then((response) => {
                if (response.status == 2) {
                  // if (response.lotteryType == 1) {
                  lotterylist.push(response);
                  // } else {
                  //   lotterylist2.push(response);
                  // }
                  this.setState({ lotterylist });
                }
              })
              .catch((err) => console.log("pepep", err));
          }
        })
        .catch((err) => console.log("res", err));
    } else {
      alert("Connect to wallet");
    }
  }

  render() {
    const { lotterylist } = this.state;
    return (
      <div fluid className="p-0 m-0">
        <NavBar />
        <Container style={{ minHeight: "100vh" }}>
          <div className="mx-auto mt-3 ">
            <Row className="lottery-section">
              <Col>
                <div className="marginbtm ">
                  <a href={Path.root} className="textline">
                    {" "}
                    <span className="textline">Home</span>
                  </a>
                  <span>
                    {" "}
                    <img
                      src={require("../../../static/Images/arrow.svg").default}
                    />{" "}
                  </span>
                  <span className="textline">Results</span>
                </div>
              </Col>
            </Row>
            <Row className="lottery-section2 text-center ">
              {lotterylist.length == 0 && <Data className="dataimg" />}

              {lotterylist.map((item, index) => (
                <Col lg={4} md={6} sm={6}>
                  <ResultsCard
                    key={index}
                    history={this.props.history}
                    item={item}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
        <FooterStrip />
      </div>
    );
  }
}

export default Results;
