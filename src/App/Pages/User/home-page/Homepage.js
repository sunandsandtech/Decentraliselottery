import React, { Component } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import cinstance from "../../../Service/randomcinstance";
import web3 from "../../../Service/web3";
import NavBar from "../../../Components/navbar/NavBar";
import ListCard from "../../../Components/ListCard";
import Background from "../../../../static/Images/bgnew.png";
import Banner from "../../../Components/banner/Banner";
import { Path } from "../../../../static/Constants";
import FooterStrip from "../../../../App/Components/FooterStrip";
import moment from "moment";
import Warnings from "../../../Components/Warning";
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      loading: false,
      Randomresult: "",
      bookiesarray: [],
      winner: "",
      lotterylist: [],
      buytotal: 0,
      totallotteries: 0,
      bookies: 0,
      net: false,
      warn: false,
    };
  }

  async componentDidMount() {
    let lotterylist = [];
    if (window.ethereum) {
      this.getglobaldata();
      web3.eth.net.getId().then((netId) => {
        if (netId == 80001) {
          window.web3 = web3;

          this.setState({ warn: false });
        } else {
          this.setState({ warn: true, net: true });
        }
      });
    } else {
      //  this.getglobaldata();
    }
  }

  getglobaldata = () => {
    var lotterylist = [];
    var lotterylist2 = [];

    var s2 = [],
      bookiesarray = [];
    var counts = 0;
    cinstance.methods
      .ownerId()
      .call()
      .then((res) => {
        this.setState({ bookies: res });
        for (var i = 1; i < res; i++) {
          cinstance.methods
            .organisationbyid(i)
            .call()
            .then((response) => {
              bookiesarray.push(response);
              this.setState({ bookiesarray });
            })
            .catch((err) => console.log("pepep", err));
        }
      })
      .catch((err) => console.log("pepep", err));

    cinstance.methods
      .lotteryId()
      .call()
      .then((res) => {
        this.setState({ totallotteries: res });
        for (var i = 1; i < res; i++) {
          if (counts == 3) break;
          cinstance.methods
            .lottery(i)
            .call()
            .then((response) => {
              if (response.status != 2) {
                if (response.lotteryType == 1) {
                  if (lotterylist.length < 4) lotterylist.push(response);
                } else {
                  if (lotterylist2.length < 4) lotterylist2.push(response);
                }
                this.setState({ lotterylist, lotterylist2 });
                counts++;
              }
            })
            .catch((err) => console.log("pepep", err));
        }
      })
      .catch((err) => console.log("res", err));
  };

  render() {
    var sectionStyle = {
      backgroundImage: "url(" + { Background } + ")",
    };
    const {
      warn,
      lotterylist,
      lotterylist2,
      bookies,
      totallotteries,
      buytotal,
      net,
    } = this.state;
    return (
      <div fluid className="p-0 m-0 " style={sectionStyle}>
        <NavBar />
        <Banner
          bookies={Math.abs(bookies - 1)}
          lotteries={Math.abs(totallotteries - 1)}
          buytotal={buytotal}
        />

        <Container>
          {lotterylist.length !== 0 && (
            <div className="mx-auto mt-3 mb-4 ">
              <Row className="mx-auto lottery-section">
                <Col>
                  <h2 className=" section-title">Lottery Jackpot</h2>
                  <div className="d-flex seeallouter">
                    {" "}
                    <p className="sectionsubtitle ">Pick a Number</p>
                    <a href={Path.alllottery}>
                      {" "}
                      <span className="seeall">See all</span>
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="mx-auto lottery-section2 text-center">
                {lotterylist.slice(0, 3).map((item, index) => (
                  <Col lg={4} key={index + "lotterylist"}>
                    <ListCard
                      key={index}
                      history={this.props.history}
                      item={item}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
          <div className="iframealign">
            {" "}
            <iframe
              width="560"
              height="315"
              className="iframesize"
              src="https://www.youtube.com/embed/J_UzrzU7eak"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div className="leftalignwhy mt-5">
            <h2 className=" section-title">Why Us</h2>
          </div>
          <Row className="mx-auto lottery-section lottery-sectionbottomspace ">
            <Col lg={4}>
              <div className="whycard">
                <div className="whyimgposition">
                  <img
                    src={
                      require("../../../../static/Images/why-us/Decentralized.svg")
                        .default
                    }
                    className="whysectionimg"
                  />
                  <h3 className="whyustitle ">Decentralized</h3>
                  <p className="whyusdescription">
                    Blockchain enabled lottery platform possessing the power of
                    decentralisation makes it possible to withdraw the lone
                    authority, making it a trustless system for all the parties
                    involved.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="whycard">
                <div className="whyimgposition">
                  <img
                    src={
                      require("../../../../static/Images/why-us/Transparent.svg")
                        .default
                    }
                    className="whysectionimg imgwidth"
                  />
                  <h3 className="whyustitle ">Transparent</h3>
                  <p className="whyusdescription">
                    Transparency in the platform helps users to take a look at
                    all the records stored on blockchain such as number of
                    participants, available numbers for the draw, genuine
                    winners and historical data.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="whycard">
                <div className="whyimgposition">
                  <img
                    src={
                      require("../../../../static/Images/why-us/Automated 2.svg")
                        .default
                    }
                    className="whysectionimg"
                  />
                  <h3 className="whyustitle ">Automated</h3>
                  <p className="whyusdescription">
                    Lottery platform involves automation to reduce human
                    involvement, which tends to make the system more secure and
                    fair.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="whycard">
                <div className="whyimgposition">
                  <img
                    src={
                      require("../../../../static/Images/why-us/Flexible.svg")
                        .default
                    }
                    className="whysectionimg"
                  />
                  <h3 className="whyustitle ">Flexible</h3>
                  <p className="whyusdescription">
                    Platforms inherit flexibility in allowing users not just to
                    participate in lottery but even allows them to become an
                    organizer for lottery to create and earn through ticket
                    sale.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="whycard">
                <div className="whyimgposition">
                  <img
                    src={
                      require("../../../../static/Images/why-us/User-friendly.svg")
                        .default
                    }
                    className="whysectionimg imgwidth"
                  />
                  <h3 className="whyustitle ">User-friendly</h3>
                  <p className="whyusdescription">
                    Elegant interface with minimal and simple design makes the
                    platform adaptable to users of traditional lottery systems.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="whycard">
                <div className="whyimgposition">
                  <img
                    src={
                      require("../../../../static/Images/why-us/Unbaised 1.svg")
                        .default
                    }
                    className="whysectionimg"
                  />
                  <h3 className="whyustitle ">Unbiased</h3>
                  <p className="whyusdescription">
                    Using a random number generator to draw the winning number,
                    without any tampering or human involvement helps to deliver
                    unbiased and fair decisions.
                  </p>
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

export default Homepage;
