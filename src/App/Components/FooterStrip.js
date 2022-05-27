import React from "react";
import { Container, Col, Row, Card, Image } from "react-bootstrap";
import Background from "../../static/Images/bgnew.png";

const FooterStrip = () => {
  var sectionStyle = {
    backgroundImage: "url(" + { Background } + ")",
  };
  return (
    <Container fluid className="p-0" style={sectionStyle}>
      <div className="footer-bottom">
        <Container>
          <div className="row justify-content-between align-items-center">
           
            <Col lg={12}>
              <div className="copy-right-text">
                <p className="footerTextMedia">
                  @2021 - 2022 Decentralized Lottery - All Rights Reserved
                </p>
              </div>
            </Col>
          </div>
        </Container>
      </div>
    </Container>
  );
};
export default FooterStrip;
