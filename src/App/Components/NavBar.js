import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Modal,
  Button,
  Navbar,
  Nav,
  Image,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { Path } from "../../static/Constants";
import web3 from "../Service/web3";

const NavBar = () => {
  const [user, setUser] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [content, setContent] = useState(false);
  let history = useHistory();
  useEffect(() => {
    if (window.ethereum) {
      window.web3 = web3;
      window.ethereum.on("accountsChanged", () => {
        getuser();
      });
      getuser();
    }
  }, []);
  const getuser = async () => {
    let account = await web3.eth.getAccounts();
    if (account.length !== 0) {
      setUser(account[0]);
    }
  };

  const connectwalletpress = () => {
    if (window.ethereum) {
      window.ethereum.enable();

      web3.eth.net.getId().then((netId) => {
        if (netId == 80001) {
        } else {
          setmodalOpen(true);
          setContent("Please Connect to Polygon main net (Network Id 80001)");
        }
      });
    } else {
      setmodalOpen(true);
      setContent(
        "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
      );
    }
  };

  return (
    <Navbar className="navbar" collapseOnSelect expand="lg">
      <Nav className="mr-auto row">
        <Nav.Link href={Path.root} className="Logo ml-sm-3 ml-0">
          <Image
            onClick={() => history.push("/")}
            src={require("../../static/Images/navbar-images/logo.png")}
            style={{
              width: 32,
              height: 32,
              cursor: "pointer",
              marginRight: "5px",
             
            }}
          />
          <p className="logo_title"> Lottery Platform</p>
        
        </Nav.Link>
      </Nav>
      {(user !== "" && (
        <Image
          className="mx-2 d-block d-lg-none"
          onClick={() => history.push("/profile")}
          href={Path.profile}
          src={require("../../static/Images/profile.svg")}
          style={{ cursor: "pointer" }}
        />
      )) || (
        <div
          onClick={() => connectwalletpress()}
          className=" mybtn1 d-block d-lg-none"
        >
          {"Connect"}
        </div>
      )}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end navbarcollapse">
        <Nav>
          <Nav.Link
            className={`hovernav drpBoxHover ${
              window.location.pathname.includes(Path.alllottery)
                ? "activenav"
                : ""
            }`}
          >
           <div>
             Lotteries
             <div class="dropPosition" >
                <div className="dropBox" >
                  <a class="dropBoxItem" >Pick a Number</a>
                  <a class="dropBoxItem" >Spinner Lotteries</a>
                  <a class="dropBoxItem" >Lottery Results</a>
                </div>
             </div>
            
           </div>
            
          </Nav.Link>

          <Nav.Link
            className={`hovernav drpBoxHover ${
              window.location.pathname.includes(Path.org) ? "activenav" : ""
            }`}
          >
            <div>
             Organization
             <div className="dropBox" >
              <a class="dropBoxItem" >Organization</a>
              <a class="dropBoxItem" >Register</a>
              <a class="dropBoxItem" >Create Lottery</a>
              <a class="dropBoxItem" >My Lottery</a>
             </div>
            </div>
          </Nav.Link>

           <Nav.Link
            className={`hovernav ${
              window.location.pathname.includes(Path.about) ? "activenav" : ""
            }`}
            href={Path.about}
          >
            About Us
          </Nav.Link>

           <Nav.Link
            className={`hovernav ${
              window.location.pathname.includes(Path.help) ? "activenav" : ""
            }`}
            href={Path.help}
          >
            Help
          </Nav.Link>

          {/* <Nav.Link
            className={`hovernav ${
              window.location.pathname.includes(Path.Spinnerlottery)
                ? "activenav"
                : ""
            }`}
            href={Path.Spinnerlottery}
          >
          Spinner Lotteries
          </Nav.Link>
          <Nav.Link
            className={`hovernav ${
              window.location.pathname.includes(Path.result) ? "activenav" : ""
            }`}
            href={Path.result}
          >
            Results
          </Nav.Link> */}
          
         
         
          {user === "" && (
            <Nav.Link>
              <div
                // onClick={() => window.ethereum.enable()}
                onClick={() => connectwalletpress()}
                className=" mybtn1 d-none d-lg-block"
              >
                {"Connect"}
              </div>
            </Nav.Link>
          )}
          {user !== "" && (
            <Nav.Link href={Path.profile} className="d-none d-lg-block">
              <span class="AccountAdress" style={{color : 'unset'}} >
                {`${user.substring(0, 2)}.... ${user.substring(
                user.length - 4,
                user.lenght
              )}`}
              </span>
              <Image
                className="mx-2"
                onClick={() => history.push("/profile")}
                href={Path.profile}
                src={require("../../static/Images/navbar-images/profile.22888246 (1) 1.png")}
                style={{ cursor: "pointer" }}
              />
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
      <Modal
        show={modalOpen}
        centered
        // style={{ width: "60%", margin: "0px auto" }}
        onClose={() => setmodalOpen(false)}
      >
        <Modal.Body>
          {content}
      
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "flex-start" }}>
          <Button
            color="green"
            onClick={() => {
              setmodalOpen(false);
            }}
            //inverted
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default NavBar;
