import React from "react";
import { Container, Col, Row, Card, Image } from "react-bootstrap";
import "./BannerStyle.css";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
const Banner = ({ item, history, bookies, lotteries, buytotal }) => {
  return (
    <Container fluid>
      <section className="banner-section">
        <Fade left>
          <div className="banner-content-area">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="banner-content">
                    <h1 className="title">Decentralized Lottery</h1>
                    <p>
                    Decentralized Lottery is online lottery platform fantasy of the ultimate
                      lottery platform.
                    </p>
                    <div className="counter-wrapper">
                      <div className="row no-gutters">
                        <div className="col-4">
                          <div className="single-counter counter-color-3 d-flex align-items-center justify-content-center">
                            <div className="counter-items text-center">
                              <span className="count">{bookies}</span>
                              <p className="text">Bookies</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="single-counter counter-color-2 d-flex align-items-center justify-content-center">
                            <div className="counter-items text-center">
                              <span className="count">{lotteries}</span>
                              <p className="text">Lotteries</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="single-counter counter-color-1 d-flex align-items-center justify-content-center">
                            <div className="counter-items text-center">
                              <span className="count">{buytotal}</span>
                              <p className="text">Tickets sold</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <a href="#0" className="cmn-btn">buy ticket now !</a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        <Slide right>
          <div className="bg cubeimage ">
            <img
              src={require("../../../static/Images/lotterybanner.svg").default}
              className="cubeimage"
            ></img>
          </div>
        </Slide>
      </section>
    </Container>
  );
};
export default Banner;
