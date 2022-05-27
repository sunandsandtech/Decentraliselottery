import React, { Component } from "react";
import { Container, Col, Row, Button, Table } from "react-bootstrap";
import cinstance from "../../Service/randomcinstance";
import web3 from "../../Service/web3";
import "./OrganisationlistStyle.css";
import AdminNavBar from "../../Components/navbar/AdminNavBar";
import FooterStrip from "../../../App/Components/FooterStrip";

class OrganisationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "",
      loading: false,
      Randomresult: "",
      winner: "",
      orglist: [],
      show: true,
    };
  }

  async componentDidMount() {
    var orglist = [];
    if (window.ethereum) {
      window.web3 = web3;
      cinstance.methods
        .admin()
        .call()
        .then(async (p) => {
          let account = await web3.eth.getAccounts();
          if (p == account[0]) this.setState({ show: true });
          cinstance.methods
            .ownerId()
            .call()
            .then((res) => {
              for (var i = res - 1; i > 0; i--) {
                cinstance.methods
                  .organisationbyid(i)
                  .call()
                  .then((response) => {
                    orglist.push(response);
                    this.setState({ orglist });
                  })
                  .catch((err) => console.log("pepep", err));
              }
            })
            .catch((err) => console.log("res", err));
        });
    }
  }

  approve = async (id) => {
    if (window.ethereum) {
      window.web3 = web3;
      let account = await web3.eth.getAccounts();
      cinstance.methods
        .admin()
        .call()
        .then((res) => {
          if (res == account[0]) {
            cinstance.methods
              .approveOraganisation(id)
              .send({ from: account[0] })
              .then((res) => {
                window.location.reload();
              });
          } else alert("Not admin");
        });
    }
  };

  render() {
    const { orglist, show } = this.state;
    return (
      <>
        <AdminNavBar />
     
          {!show && (
            <Container className="bgImage  p-o">
              <div className="mspace mt-5">
                <h2>Not an admin</h2>
              </div>
            </Container>
          )}
             <div className="margintp" >
          {show && (
            <Container className="bgImage  p-o">
              <div className="admin-card">
                <div className="content ">
                  <Row>
                    {orglist.map((item) => (
                      <Col lg="4" md="6">
                        <div className="lotterycard">
                          <div className="card-content">
                            <div className="content">
                            <div className="detail">
                              <div className="labeltext">ID:</div>

                              <div className="valuetext">{item.id}</div>
                            </div>
                            <div className="detail">
                              <div className="labeltext">Name:</div>

                              <div className="valuetext">{item.name}</div>
                            </div>

                            <p style={{ wordBreak: "break-all" }}>
                              <div className="detail">
                                <div className="labeltext">Address:</div>

                                <div className="valuetext">
                                  {item.userAddress}
                                </div>
                              </div>
                            </p>
                            <div className="detail mb-0">
                              <div className="labeltext">Action:</div>
                              {item.active ? (
                                <div className="valuetext">Approved</div>
                              ) : (
                                <Button onClick={() => this.approve(item.id)}>
                                  Approve
                                </Button>
                              )}
                            </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Container>
          )}
        </div>
        <FooterStrip />
      </>
    );
  }
}

export default OrganisationList;
