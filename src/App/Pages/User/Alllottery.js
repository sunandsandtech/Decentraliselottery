import React, { Component } from "react";
import { Container, Col, Row, Card, Button, Modal } from "react-bootstrap";
import cinstance from "../../Service/randomcinstance";
import web3 from "../../Service/web3";
import NavBar from "../../Components/navbar/NavBar";
import ListCard from "../../Components/ListCard";
import { Path } from "../../../static/Constants";
import FooterStrip from "../../../App/Components/FooterStrip";
import { ReactComponent as Data } from "../../../static/Images/nodata.svg";

class Alllottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      loading: false,
      Randomresult: "",
      winner: "",
      lotterylist: [],
      show: false,
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
          for (var i = 1; i < res; i++) {
            cinstance.methods
              .lottery(i)
              .call()
              .then((response) => {
                if (response.status != 2) {
                  if (response.lotteryType == 1) {
                    lotterylist.push(response);
                    this.setState({ lotterylist });
                  }
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
      <div fluid className="p-0 m-0 allLottery">
        <NavBar />

        <Container>
          <div className="mx-auto mt-3 ">
            <Row className="lottery-section">
              <Col>
                <div className="marginbtm">
                  <a href={Path.root} className="textline">
                    {" "}
                    <span className="textline">Home</span>
                  </a>
                  <span>
                    {" "}
                    <img
                      src={require("../../../../src/static/Images/arrow.svg").default}
                    />{" "}
                  </span>
                  <span className="textline">Pick a Number</span>
                </div>
                {/* <h2
                  className="section-title"
                  style={{ fontWeight: "600", fontSize: "28px" }}
                  // onClick={()=>this.setState({ show: true })}
                >

                  Lotteries
                </h2> */}
              </Col>
            </Row>
            <Row className="mx-auto lottery-section2 text-center">
              {lotterylist.length == 0 && (
               <Data className="dataimg"/>
              )}
              {lotterylist.map((item, index) => (
                <Col lg={4}>
                  <ListCard
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

        {/* MODAL */}
        <Modal
          show={this.state.show}
          centered
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header closeButtonn>
            <Modal.Title className="pl-2">Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4">
            I will not close if you click outside me. Don't even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ show: false })}
            >
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Alllottery;
