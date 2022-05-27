import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useHistory } from "react-router-dom";
import FooterStrip from "../../../../App/Components/FooterStrip";
import { Path } from "../../../../static/Constants";
import CustomButton from "../../../Components/custom-button/CustomButton";
import NavBar from "../../../Components/navbar/NavBar";
import cinstance from "../../../Service/randomcinstance";
import web3 from "../../../Service/web3";
import "./RegisterAsOrgStyles.css";
const RegisterAsorganisation = (props) => {
  const [name, setFirstname] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [resiAddress, setResiaddress] = useState("");
  const [dob, setDob] = useState(new Date(Date.now() + 8 * 24 * 60 * 60));
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  let history = useHistory();
  const [error, seterror] = useState("");
  const [address, setAddress] = useState("");
  const [refaddress, setrefAddress] = useState("");

  const [modalOpen, setmodalOpen] = useState(false);

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState("");
  const [active, setactive] = useState(false);
  const [edit, setEdit] = useState(false);
  const [fees, setFees] = useState(1.25);
  const [minfees, setminFees] = useState(10);
  const [maxfees, setmaxFees] = useState(15);

  const onSendmsg = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      setactive(true);
      event.preventDefault();
      setEdit(false);
      let account = await web3.eth.getAccounts();
      let dt = moment(dob).unix();
      let currentDT = moment().unix();
      let feeP = Number(fees * 10 ** 18).toFixed();
      let currentNetworkID = await web3.eth.net.getId();
      let tradd =
        refaddress != ""
          ? refaddress
          : "0x0000000000000000000000000000000000000000";
      if (currentDT < dt) {
        alert("Wrong birth date!");
        event.preventDefault();
      } else {
        if (currentNetworkID !== 80001) {
          alert("You are not in the correct network!");
          event.preventDefault();
        } else {
          cinstance.methods
            .addOrganisation(
              address,
              tradd,
              name,
              phoneno,
              dt,
              email,
              resiAddress,
              minfees,
              maxfees
            )
            .send({
              from: account[0],
              value: feeP,
            })
            .then((res) => {
              setmodalOpen(true);
              // history.push(Path.org);
            });
        }

        // console.log({
        //   address, name, phoneno, dt, email, resiAddress, minfees, maxfees
        // })
      }
    }
  };
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", async () => {
      let account = await web3.eth.getAccounts();
      setAddress(account[0]);
    });
  }
  useEffect(() => {
    async function fetchData() {
      cinstance.methods
        .bregisterFee()
        .call()
        .then((response) => {
          setShow(response);
        });
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", async () => {
          let account = await web3.eth.getAccounts();
          setAddress(account[0]);
        });
        window.web3 = web3;
        let account = await web3.eth.getAccounts();
        setAddress(account[0]);
      }
    }
    fetchData();
  }, []);

  return (
    <div id="RGOrg">
      <NavBar />
      <Modal
        show={modalOpen}
        centered
      >
        <Modal.Body>Account activated successfully!</Modal.Body>
        <Modal.Footer>
          <Button
            color="green"
            onClick={() => {
              window.location.reload();
              setmodalOpen(false);
            }}
            //inverted
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <section
        className="register-section"
        style={{ alignItems: "start", paddingTop: 50 }}
      >
        <div className="container  ">
          {/* {approved && approved.active && ( */}
          <div className="bgImage  p-o m-0" fluid>
            <div className="marginbtm">
              <a href={Path.root} className="textline">
                {" "}
                <span className="textline">Home</span>
              </a>
              <span>
                {" "}
                <img
                  src={require("../../../../../src/static/Images/arrow.svg").default}
                />{" "}
              </span>
              <span className="textline">Register</span>
            </div>
            <Row>
              <Col lg="12">
                <div>
                  <h1 className="createheader">Register As Bookie</h1>
                  <div className="createbox">
                    <Form noValidate validated={validated} onSubmit={onSendmsg}>
                      <Row>
                        <Col lg={6} md={6}>
                          {/* Full Name -------------------------------------------------------------- */}
                          <Form.Row classNam="mx-auto">
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom01"
                            >
                              <Form.Label className="  createlabel">
                                Full Name
                              </Form.Label>
                              <Form.Control
                                className="createfield"
                                required
                                type="text"
                                placeholder="Full name"
                                defaultValue="Mark"
                                value={name}
                                onChange={(event) =>
                                  setFirstname(event.target.value)
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                Enter Name
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form.Row>

                          {/* Residence Address ------------------------------------------------- */}
                          <Form.Row classNam="mx-auto">
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom01"
                            >
                              <Form.Label className="createlabel">
                                Resident Address
                              </Form.Label>
                              <Form.Control
                                className="createfield"
                                required
                                type="text"
                                placeholder="Address"
                                defaultValue="Mark"
                                value={resiAddress}
                                onChange={(event) =>
                                  setResiaddress(event.target.value)
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                Enter Resident Address
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form.Row>

                          {/* Refferal Address ------------------------------------------------- */}
                          <Form.Row classNam="mx-auto">
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom01"
                            >
                              <Form.Label className="  createlabel">
                              Referral Address
                              </Form.Label>
                              <Form.Control
                                className="createfield"
                                value={refaddress}
                                placeholder="Referral address"
                                onChange={(event) => {
                                  setrefAddress(event.target.value);
                                }}
                              ></Form.Control>
                            </Form.Group>
                          </Form.Row>

                          {/* Minimum winning amount ================================== */}
                          <Form.Row>
                            <Form.Group
                              as={Col}
                              md="8"
                              controlId="validationCustom01"
                            >
                              <Form.Label className="createlabel">
                                Minimum winning amount
                              </Form.Label>
                              <Form.Control
                                required
                                className="createfield"
                                type="number"
                                value={minfees}
                                min={1}
                                onChange={(event) => {
                                  let mn = Number(Math.abs(event.target.value));
                                  let mx = Math.ceil(Number(event.target.value) + Number(event.target.value / 2));

                                  setmaxFees(mx);
                                  setminFees(mn);
                                  let med = (Number(mx) + Number(mn)) / 2;
                                  let regfee = (med * show) / 100;
                                  setFees(regfee);
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                 Amount Should At least 1 or above
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form.Row>
                        </Col>
                        <Col lg={6} md={6}>
                          {/* phone number================================== */}
                          <Form.Row>
                            <Form.Group
                              as={Col}
                              md="7"
                              controlId="validationCustom01"
                            >
                              <Form.Label className="createlabel">
                                Phone Number
                              </Form.Label>
                              <Form.Control
                                required
                                className="createfield"
                                type="number"
                                placeholder="Phone no"
                                defaultValue="Mark"
                                value={phoneno}
                                onChange={(event) => setphoneno(event.target.value)}
                                maxLength={12}
                              />
                              <Form.Control.Feedback type="invalid">
                                Enter Phone no
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* Birth date================================== */}
                            <Form.Group
                              as={Col}
                              md="5"
                              controlId="validationCustom01"
                            >
                              <Form.Label className="createlabel">
                                Birth Date
                              </Form.Label>
                              <DateTimePicker
                                className="createfield dats"
                                format={"dd-MM-yy"}
                                calendarIcon={null}
                                clearIcon={null}
                                disableClock={true}
                                onChange={(value) => setDob(value)}
                                value={dob}
                              />
                            </Form.Group>
                          </Form.Row>

                          {/* email address================================== */}
                          <Form.Row>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom01"
                            >
                              <Form.Label className="  createlabel">
                                Email
                              </Form.Label>
                              <Form.Control
                                className="createfield"
                                required
                                type="email"
                                placeholder="Email"
                                defaultValue="Mark"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}

                              />
                              <Form.Control.Feedback type="invalid">
                                Enter Email
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form.Row>

                          {/* wallet address================================== */}
                          <Form.Row>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom01"
                            >
                              <Form.Label className="  createlabel">
                                Wallet Address
                              </Form.Label>
                              <Form.Control
                                className="createfield"
                                required
                                value={address}
                              ></Form.Control>
                            </Form.Group>
                          </Form.Row>

                          {/* Maximum winning amount ================================== */}
                          <Form.Row>
                            <Form.Group
                              as={Col}
                              md="8"
                              controlId="validationCustom01"
                            >
                              <Form.Label className="createlabel">
                                Maximum winning amount
                              </Form.Label>
                              <Form.Control
                                required
                                className="createfield"
                                value={maxfees}
                                type="number"
                                onChange={(event) => {
                                  let mx = event.target.value;
                                  let mn =
                                    Number(event.target.value) -
                                    Number(event.target.value / 3);
                                  setmaxFees(mx);
                                  setminFees(mn);
                                  let med = (Number(mx) + Number(mn)) / 2;
                                  let regfee = (med * show) / 100;
                                  setFees(regfee);
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Enter Maximum winning amount
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form.Row>
                        </Col>
                      </Row>
                      <div style={{ paddingBottom: 20 }}>
                        <p className="mb-2">Registration Fee {fees} MATIC</p>
                        <CustomButton
                          title="Create"
                          className="signupbtn"
                          type={"Submit"}
                        />
                        <Row>
                          {error && (
                            <label
                              style={{
                                color: "red",
                                textAlign: "center",
                                margin : 'auto',
                              }}
                            >
                              {error}
                            </label>
                          )}
                        </Row>
                        <Row style={{ textAlign: "center" }}>
                          {message && 
                          <label
                            style={{
                              color: "green",
                              textAlign: "center",
                              margin: "auto",
                            }}
                          >
                            {message}
                          </label>
                          }
                        </Row>
                      </div>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          {/* )} */}
        </div>
      </section>

      {/* ++++++++++++++++++++++ OLD CODE FOR INTEGRATION ++++++++++++++++++++++++ */}

      {/* <section
        className="register-section "
        style={{ alignItems: "start", paddingTop: 80 }}
      >
        <div className="container  ">
          <div>
            <Row>
              <Col lg="12">
                <Card
                  className="Card-style"
                  style={{
                    margin: "auto",
                    maxWidth: "500px",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "0 0 10px 0 rgb(0 0 0 / 15%)",
                  }}
                >
                  <h1
                    style={{
                      marginTop: 30,
                      fontSize: "28px",
                      fontWeight: 600,

                      textAlign: "center",
                    }}
                  >
                    Register As Bookie
                  </h1>
                  <CardBody>
                    <Form noValidate validated={validated} onSubmit={onSendmsg}>
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Full name"
                            defaultValue="Mark"
                            value={name}
                            onChange={(event) =>
                              setFirstname(event.target.value)
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Enter Name
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Phone No</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Phone no"
                            defaultValue="Mark"
                            value={phoneno}
                            onChange={(event) => setphoneno(event.target.value)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Enter Phone no
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Date Of Birth</Form.Label>
                          <DateTimePicker
                            className="customSpace"
                            format={"dd-MM-yy"}
                            calendarIcon={null}
                            clearIcon={null}
                            disableClock={true}
                            onChange={(value) => setDob(value)}
                            value={dob}
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Email"
                            defaultValue="Mark"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Enter Email
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Resident Address</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Resident address"
                            defaultValue="Mark"
                            value={resiAddress}
                            onChange={(event) =>
                              setResiaddress(event.target.value)
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Enter Resident Address
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Wallet Address</Form.Label>
                          <Form.Control required value={address} />
                          <Form.Control.Feedback type="invalid">
                            Connect to wallet
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Referral Address</Form.Label>
                          <Form.Control
                            value={refaddress}
                            placeholder="Referral address"
                            onChange={(event) => {
                              setrefAddress(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Minimum Winning Amount</Form.Label>
                          <Form.Control
                            required
                            type="number"
                            value={minfees}
                            onChange={(event) => {
                              let mn = Number(event.target.value);
                              let mx = Math.ceil(
                                Number(event.target.value) +
                                  Number(event.target.value / 2)
                              );

                              setmaxFees(mx);
                              setminFees(mn);
                              let med = (Number(mx) + Number(mn)) / 2;
                              let regfee = (med * show) / 100;
                              setFees(regfee);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Connect to wallet
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Maximum Winning Amount</Form.Label>
                          <Form.Control
                            required
                            value={maxfees}
                            type="number"
                            onChange={(event) => {
                              let mx = event.target.value;
                              let mn =
                                Number(event.target.value) -
                                Number(event.target.value / 3);
                              setmaxFees(mx);
                              setminFees(mn);
                              let med = (Number(mx) + Number(mn)) / 2;
                              let regfee = (med * show) / 100;
                              setFees(regfee);
                            }}
                          />
                        </Form.Group>
                      </Form.Row>

                      <h6 className="mt-3 text-center">
                        Registration Fee {fees}MATIC
                      </h6>
                      <div style={{ margin: "auto", textAlign: "center" }}>
                        <ButtonCommon
                          type="Submit"
                          className="signup-btn mt-2"
                          label="Sign Up"
                        />
                      </div>
                      <Row>
                        {error && (
                          <label
                            style={{
                              color: "red",
                              textAlign: "center",
                              margin: "20px",
                            }}
                          >
                            {error}
                          </label>
                        )}
                      </Row>
                      <Row style={{ textAlign: "center", marginTop: "20px" }}>
                        <label
                          style={{
                            color: "green",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        >
                          {message}
                        </label>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </section> */}
      <FooterStrip />
    </div>
  );
};

export default RegisterAsorganisation;
