import React, { useState, useEffect, Component } from "react";

import {

  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import {
    Form,
    Row,
    Col,
    Badge,
    Container,
    Button,
    Label,
    Image,
  } from "react-bootstrap";
import Api from "../../Service/Api";
import ButtonCommon from '../../Components/ButtonCommon';

import {useHistory} from 'react-router-dom'

import NavBar from "../../Components/navbar/NavBar";
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [name, setFirstname] = useState("");
    const [mobile, setMobile] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
let history= useHistory()
    const [error, seterror] = useState("");
    const [disable, setdisable] = useState(false);
    const [modalOpen, setmodalOpen] = useState(false);
    
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [active, setactive] = useState(false);
    const [edit, setEdit] = useState(false);
    const onSendmsg = (event) => {
    //   console.log(description, location, email);
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
      if (form.checkValidity() === true) {
        setactive(true);
        setEdit(false)
        let data = {
          name: name,
          mobile: mobile,
          email: email,
          password: password,
        
        };
        event.preventDefault();
        Api.post("/auth/signup", data, {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: token,
        //   },
        })
          .then((res) => {
          //  console.log(res);
            if (res.status === 201) {
              seterror("");
              setShow(true);
              history.push("/login")
              setMessage("Registered Successfully")

            }
          })
          .catch((err) => {
           seterror(err.response.data.message)
           // console.log('err.response.message',err.response);
            setactive(false);
          });
      }
    };
    useEffect(() => {
      
    }, []);

    
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
        <Card className="Card-style"  style={{ alignSelf: "center", margin: "auto", maxWidth:'500px' }}>
          <h1 style={{fontSize:'30px', FontWeight:'bold', textAlign:'center'}}>Sign Up</h1>
          <CardBody>
          <Form noValidate 
          validated={validated} 
          onSubmit={onSendmsg}
          >
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Full name"
            defaultValue="Mark"
            value={name}
            onChange={(event) => setFirstname(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">Enter Full Name</Form.Control.Feedback>
        </Form.Group>
       
        <Form.Group as={Col} md="12" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
           required
           value={email}
           onChange={(event) => setEmail(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Enter Email ID
          </Form.Control.Feedback>
        </Form.Group>
       
      </Form.Row>
      <Form.Row>
      <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            required
            type="phone"
            placeholder="Mobile"
            defaultValue="Mark"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">Enter Mobile Number </Form.Control.Feedback>
        </Form.Group>
        
       
      </Form.Row>
        <Form.Row>
        <Form.Group controlId="formGroupPassword"  as={Col} md="12" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
            Enter password
          </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>

      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>

      {/* <Button type="submit" style={{width:'100%'}}>Sign Up</Button> */}
      <div style={{margin:'auto', textAlign:'center'}}>
      <ButtonCommon className="signup-btn" label='Sign Up'  handleClick={onSendmsg} />
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
    <Row style={{  textAlign:'center', marginTop:'20px'}}>
      <label style={{ color:'green', textAlign:'center', margin:'auto'}}>{message}</label>
    </Row>
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

export default Register;
