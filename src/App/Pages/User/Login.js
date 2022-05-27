import React, { useState, Component } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import NavBar from "../../Components/navbar/NavBar";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Api from "../../Service/Api";
import ButtonCommon from '../../Components/ButtonCommon';

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [disable, setdisable] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();

  const OnSubmit = async () => {
    //  await this.setState({ active: true });
    // console.log("email", email);
    // console.log("password", password);
    if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      if (password.length !== 0) {
        let data = {
          email,
          password,
        };

        Api.post("/auth/signin", data)
          .then((res) => {
            console.log("res", res);
            if (res.status === 201) {
              seterror("");
              setmodalOpen(true);
              localStorage.setItem("Auth", "true");
              localStorage.setItem("token", res.data.accessToken);
              history.push("/");
            } else {
              seterror("Try after Sometime");
            }
          })
          .catch((err) => {
            console.log(err.response);
            //  this.setState({
            //    active: false,
            //    err: err.response.data.error.message,
            //  });
            setErrorMessage("Invalid credentials");
          });
      } else {
        seterror("Please enter Password");
      }
    } else {
      seterror("Please enter correct Email");
    }
  };

  return (

    <div>

      <div>
        <NavBar />
      </div>
    
    <section className="register-section">
    <div className="container register">
      <div>
      <Row >
      <Col
        lg="12"
       
      >
        <Card className="Card-style"  style={{       margin: "auto",
                    maxWidth: "500px",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "0 0 10px 0 rgb(0 0 0 / 15%)",}}>
        <h1
                    style={{
                      marginTop: 30,
                      fontSize: "28px",
               fontWeight:600,
                      textAlign: "center",
                    }}
                  >
                  Sign In
                  </h1>
          <CardBody>
            <Form>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(event) => setemail(event.target.value)}
                  name="email"
                  placeholder="Enter Email"
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type={"password"}
                  value={password}
                  onChange={(event) => setpassword(event.target.value)}
                  name="password"
                  placeholder="Enter the password"
                />
              </FormGroup>

              <Row className="justify-content-md-center" >
                <ButtonCommon
                  //  disabled={disable}
                  label="Login"
                  className=" login-btn text-center p-2 pl-4 pr-4"
                  handleClick={OnSubmit}
                >
                  {/* Login */}
                </ButtonCommon>
              </Row>
              <Row style={{ paddingTop: "10px" }}>
                <label
                  style={{ color: "red", textAlign: "center", margin: "auto" }}
                >
                  {error}
                </label>
              </Row>
              <Row>
                <label
                  style={{ color: "red", textAlign: "center", margin: "auto" }}
                >
                  {errorMessage}
                </label>
              </Row>
              <Row style={{textAlign:'center', margin:'auto', display:'block'}}> 
              <Link to={{  pathname: "/forgot-password"}} style={{textDecoration:'none'}}>
                <Col style={{textAlign:'center', margin:'auto'}}>
                <a style={{color:'rgb(130, 134, 138)'}}>Forgot Password</a>
                </Col>
                </Link>
                </Row>
            </Form>
            <span className="d-inline-block mb-2 mr-2">
              <Modal
                open={modalOpen}
                style={{ marginTop: "5%" }}
                // onClose={this.hanred
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
          </CardBody>
        </Card>
        </Col>
      </Row>
    </div>
    </div>
    </section>
    </div>
  );
};

export default Login;
