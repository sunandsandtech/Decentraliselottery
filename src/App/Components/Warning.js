import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Warnings = ({ net }) => (
  <div className="preloader" id="preloader">
    <Container fluid className="justify-content center text-center">
      <Image
        src={require("../../static/Images/warning.png").default}
        style={{ width: "100%", maxWidth: "175px" }}
      />
      <h2 className="text-center my-3 mb-5">
        {net
          ? "Please Connect to Polygon main net (Network Id 137)"
          : "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"}{" "}
      </h2>
      <div
        onClick={() => {
          window.ethereum && window.ethereum.enable();
        }}
        className="nav-link mybtn1 d-inline-block px-5 py-2"
      >
        {net ? "Switch" : "Connect"}
      </div>
    </Container>
  </div>
);

export default Warnings;
