import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import FooterStrip from "../../../../App/Components/FooterStrip";
import { Path } from "../../../../static/Constants";
import CustomButton from "../../../Components/custom-button/CustomButton";
import Loaders from "../../../Components/Loaders";
import NavBar from "../../../Components/navbar/NavBar";
import Warnings from "../../../Components/Warning";
import cinstance from "../../../Service/randomcinstance";
import web3 from "../../../Service/web3";
import "./Createlotterystyle.css";

const Createlottery = (props) => {
  const [entryfee, setentryfee] = useState("");
  const [totalnumber, settotalnumber] = useState("");
  const [totalPrize, settotalPrize] = useState("");
  const [startTime, setstartTime] = useState(
    new Date(Date.now() + 8 * 24 * 60 * 60)
  );
  const [endtime, setendtime] = useState(
    new Date(Date.now() + 20 * 24 * 60 * 60)
  );
  const [drawdate, setdrawdate] = useState(
    new Date(Date.now() + 20 * 24 * 60 * 60)
  );
  const [capacity, setcapacity] = useState("");
  const [lotteryCreateFee, setlotteryCreateFee] = useState("");
  const [message, setMessage] = useState("");
  let history = useHistory();
  const [error, seterror] = useState(false);
  const [address, setAddress] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [Name, setName] = useState("");

  const [validated, setValidated] = useState(false);
  const [loading, setloading] = useState(false);
  const [active, setactive] = useState(false);
  const [approved, setapproved] = useState(false);

  const [lotterytype, setlotterytype] = useState(1);

  const onSendmsg = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log("Else");
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      let currentDT = moment().unix();
      //let currentNetworkID = await web3.eth.net.getId();
      let st = moment(startTime).unix();
      let et = moment(endtime).unix();
      let dt = moment(drawdate).unix();
      if (currentDT > st || currentDT > et || currentDT > dt) {
        alert("Datetime cannot be a datetime before the current date!");
        event.preventDefault();
      } else {
        // if (currentNetworkID !== 80001) {
        //   alert("You are not in the correct network!");
        //   event.preventDefault();
        //   event.stopPropagation();
        // } else {
        setloading(true);

        let entryfee1 = web3.utils.toWei(`${entryfee}`, "ether");
        let totalPrize1 = web3.utils.toWei(`${totalPrize}`, "ether");
        let tl =
          (Number(totalPrize1) * Number(lotteryCreateFee)) / 100 +
          Number(totalPrize1);
        let lotterytype1 = Number(lotterytype);
        //console.log(st, et, dt, entryfee1, totalPrize1, tl, lotterytype1);
        if (st < et) {
          setactive(true);
          event.preventDefault();
          //console.log("Entered");
          let account = await web3.eth.getAccounts();

          cinstance.methods
            .createLottery(
              Name,
              entryfee1,
              totalnumber,
              totalPrize1,
              st,
              et,
              dt,
              capacity,
              lotterytype1
            )
            .send({ from: account[0], value: tl })
            .then((res) => {
              setloading(false);

              history.push("/bookie/mylottery");
            })
            .catch(() => {
              setloading(false);
            });
        } else {
          event.preventDefault();
          setloading(false);

          seterror("End time should be greater than start time");
        }
        //}
      }
    }
  };
  useEffect(() => {
    async function fetchData() {
      if (window.ethereum) {
        window.web3 = web3;
        let account = await web3.eth.getAccounts();
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        if (account.length !== 0) {
          setAddress(account[0]);
          setloading(true);
          cinstance.methods
            .organisationbyaddr(account[0])
            .call()
            .then((res) => {
              setloading(false);
              console.log(res);
              setapproved(res);
            })
            .catch((err) => console.log("res", err));
          cinstance.methods
            .lotteryCreateFee()
            .call()
            .then((res) => {
              setloading(false);

              setlotteryCreateFee(res);
            })
            .catch((err) => console.log("res", err));
        } else {
          seterror(true);
          setloading(false);
        }
      } else {
        setloading(false);

        seterror(true);
      }
    }
    fetchData();
  }, []);

  return (
    <div id="CreateLottery">
      <NavBar />
      {error && <Warnings />}
      {loading && <Loaders />}

      <section
        className="register-section"
        style={{ alignItems: "start", paddingTop: 50 }}
      >
        <div className="container  ">
          {approved && !approved.active && !loading && (
            <h3 className="mt-5 text-left pl-5 ">Account Not Approved</h3>
          )}
          {approved && approved.active && (
            <div className="bgImage  p-o m-0" fluid>
              <div className="marginbtm">
                <a href={Path.root} className="textline">
                  {" "}
                  <span className="textline">Home</span>
                </a>
                <span>
                  {" "}
                  <img
                    src={
                      require("../../../../../src/static/Images/arrow.svg")
                        .default
                    }
                  />{" "}
                </span>
                <span className="textline">Create a new lottery</span>
              </div>
              <Row>
                <Col lg="12">
                  <div>
                    <h1 className="createheader">Create A New Lottery</h1>
                    <div className="createbox">
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={onSendmsg}
                      >
                        <Form.Row classNam="mx-auto">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label className="  createlabel">
                              Name
                            </Form.Label>
                            <Form.Control
                              className="createfield"
                              required
                              placeholder="Lottery Name"
                              value={Name}
                              onChange={(event) => setName(event.target.value)}
                            ></Form.Control>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row classNam="mx-auto">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label className="  createlabel">
                              Lottery Type
                            </Form.Label>
                            <Form.Control
                              disabled={lotterytype == "1"}
                              aria-label="Default select example"
                              as={"text"}
                              className="createfield"
                              onChange={(event) => {
                                setlotterytype(event.target.value);
                                settotalnumber(1);
                              }}
                            >
                              <option value={"1"}>Pick number</option>
                              {/* <option value={"0"}>Spinner</option> */}
                            </Form.Control>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label className="createlabel">
                              Ticket Fee
                            </Form.Label>
                            <Form.Control
                              required
                              type="number"
                              className="createfield"
                              placeholder="Fee in MATIC"
                              value={entryfee}
                              onChange={(event) =>
                                setentryfee(event.target.value)
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter Entry Fee
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label className="createlabel">
                              Winner Prize Amount
                            </Form.Label>
                            <Form.Control
                              required
                              type="number"
                              className="createfield"
                              placeholder="Enter Amount in MATIC "
                              value={totalPrize}
                              onChange={(event) =>
                                settotalPrize(event.target.value)
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter Prize Amount
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label className="createlabel">
                              Numbers to be selected
                            </Form.Label>
                            <Form.Control
                              disabled={lotterytype == "0"}
                              required
                              type="number"
                              className="createfield"
                              placeholder="Enter Number"
                              value={totalnumber}
                              onChange={(event) =>
                                settotalnumber(event.target.value)
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              Enter Numbers to be selected
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label className="createlabel">
                              Lottery size
                            </Form.Label>
                            <Form.Control
                              required
                              type="number"
                              className="createfield"
                              placeholder="Enter total Numbers"
                              defaultValue="Mark"
                              value={capacity}
                              onChange={(event) =>
                                setcapacity(event.target.value)
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter Lottery size
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label className="createlabel">
                              Start Date
                            </Form.Label>
                            <DateTimePicker
                              className="createfield dats"
                              format={"dd-MM-yy h:mma"}
                              calendarIcon={null}
                              clearIcon={null}
                              disableClock={true}
                              onChange={(value) => setstartTime(value)}
                              value={startTime}
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label className="createlabel">
                              End Date
                            </Form.Label>
                            <DateTimePicker
                              calendarIcon={null}
                              clearIcon={null}
                              className="createfield dats"
                              disableClock={true}
                              format={"dd-MM-yy h:mma"}
                              onChange={(value) => {
                                setendtime(value);
                                setdrawdate(value);
                              }}
                              value={endtime}
                            />
                          </Form.Group>
                        </Form.Row>
                        {lotterytype != "0" && (
                          <Form.Row classNam="mx-auto">
                            <Form.Group
                              as={Col}
                              md="6"
                              controlId="validationCustom01"
                            >
                              <Form.Label className="  createlabel">
                                Draw Date
                              </Form.Label>
                              <DateTimePicker
                                calendarIcon={null}
                                clearIcon={null}
                                className="createfield dats"
                                disableClock={true}
                                format={"dd-MM-yy h:mma"}
                                onChange={(value) => setdrawdate(value)}
                                value={drawdate}
                              />
                            </Form.Group>
                          </Form.Row>
                        )}
                        <h6 className="mt-3 text-center">
                          Lottery Creation Fee :
                          {(Number(totalPrize) * Number(lotteryCreateFee)) /
                            100 +
                            Number(totalPrize)}{" "}
                          MATIC
                        </h6>
                        <h6 className="text-center">
                          (Winner Prize Amount + {lotteryCreateFee}% of Winner
                          Prize Amount)
                        </h6>

                        {Number(totalPrize) >= Number(approved.minPrize) &&
                          Number(totalPrize) <= Number(approved.maxPrize) && (
                            <div
                              style={{
                                margin: "auto",
                                textAlign: "center",
                                marginTop: "20px",
                              }}
                            >
                              {/* <ButtonCommon
                                type="Submit"
                                className="signup-btn"
                                label="Create"
                              /> */}
                              <CustomButton
                                title="Create"
                                className="signupbtn"
                                type={"Submit"}
                              />
                            </div>
                          )}
                        {!(
                          Number(totalPrize) >= Number(approved.minPrize) &&
                          Number(totalPrize) <= Number(approved.maxPrize)
                        ) && (
                          <div
                            style={{
                              margin: "auto",
                              textAlign: "center",
                              marginTop: "20px",
                            }}
                          >
                            {totalPrize !== "" && (
                              <p>
                                Invalid winning prize amount should be{" "}
                                {approved && approved.minPrize} -{" "}
                                {approved && approved.maxPrize} MATIC{" "}
                              </p>
                            )}
                          </div>
                        )}
                      </Form>

                      <span className="d-inline-block mb-2 mr-2">
                        <Modal
                          open={modalOpen}
                          style={{ marginTop: "5%" }}
                          // onClose={this.handleClose}
                        >
                          <ModalBody></ModalBody>
                          <ModalFooter>
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
                          </ModalFooter>
                        </Modal>
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </section>
      <FooterStrip />
    </div>
  );
};

export default Createlottery;
