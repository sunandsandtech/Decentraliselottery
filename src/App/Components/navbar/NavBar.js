import React, { useState, useEffect } from "react";
import { Modal, Button, Navbar, Nav, Image } from "react-bootstrap";
import "./NavBar.css";
import { useHistory } from "react-router";
import { Path } from "../../../static/Constants";
import web3 from "../../Service/web3";

const NavBar = () => {
  const [user, setUser] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [content, setContent] = useState(false);
  const [ShowLottry, setShowLottry] = useState(false);
  const [ShowOrg, setShowOrg] = useState(false);
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
            className="gaminglogo"
            onClick={() => history.push("/")}
            src={
              require("../../../static/Images/navbar-images/logo.png").default
            }
          />
          <p className="logo_title"> Decentralized Lottery</p>
        </Nav.Link>
      </Nav>
      {(user !== "" && (
        <Image
          className="mx-2 d-block d-lg-none"
          onClick={() => history.push("/profile")}
          href={Path.profile}
          src={
            require("../../../static/Images/navbar-images/profile.22888246 (1) 1.png")
              .default
          }
          style={{ cursor: "pointer" }}
        />
      )) || (
        <div
          // onClick={() => window.ethereum.enable()}
          onClick={() => connectwalletpress()}
          className=" mybtn1 d-block d-lg-none"
        >
          {"Connect"}
        </div>
      )}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end navbarcollapse">
        <Nav>
          <div
          onClick={()=>setShowLottry(!ShowLottry)}
            className={`hovernav drpBoxHover nav-link ${
              window.location.pathname.includes(Path.alllottery)
                ? "activenav"
                : ""
            }`}
          >
            <div>
              Lotteries
              <div className={`dropPosition ${ShowLottry && 'setActive'}`}>
                <div className="dropBox">
                  <a href={Path.alllottery} class="dropBoxItem">
                    Pick a Number
                  </a>
                  {/* <a href={Path.Spinnerlottery} class="dropBoxItem">
                    Spinner Lotteries
                  </a> */}
                  <a href={Path.result} class="dropBoxItem">
                    Lottery Results
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`hovernav drpBoxHover nav-link ${
              window.location.pathname.includes(Path.org) ? "activenav" : ""
            }`}
            onClick={()=>setShowOrg(!ShowOrg)}
          >
            <div>
              Organization
              <div className={`dropPosition ${ShowOrg && 'setActive'}`}>
                <div className="dropBox">
                  <a href={Path.org} class="dropBoxItem">
                    Organization
                  </a>
                  <a href={Path.registerasorg} class="dropBoxItem">
                    Register
                  </a>
                  <a href={Path.orgcreatelottery} class="dropBoxItem">
                    Create Lottery
                  </a>
                  <a href={Path.orgmylottery} class="dropBoxItem">
                    My Lottery
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* <Nav.Link
            className={`hovernav ${
              window.location.pathname.includes(Path.about) ? "activenav" : ""
            }`}
            href={Path.about}
          >
            About Us
          </Nav.Link> */}
          {/* 
          <Nav.Link
            className={`hovernav ${
              window.location.pathname.includes(Path.help) ? "activenav" : ""
            }`}
            href={Path.help}
          >
            Help
          </Nav.Link> */}

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
              <span class="AccountAdress" style={{ color: "unset" }}>
                {`${user.substring(0, 2)}.... ${user.substring(
                  user.length - 4,
                  user.lenght
                )}`}
              </span>
              <Image
                className="mx-2 imghidden"
                onClick={() => history.push("/profile")}
                href={Path.profile}
                src={
                  require("../../../static/Images/navbar-images/profile.22888246 (1) 1.png")
                    .default
                }
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
        <Modal.Footer style={{ justifyContent:"center" }}>
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
