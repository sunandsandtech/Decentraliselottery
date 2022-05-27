import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import FooterStrip from "../../../../App/Components/FooterStrip";
import { Path } from "../../../../static/Constants";
import { ReactComponent as Coin } from "../../../../static/Images/polygon-coin.svg";
import CustomButton from "../../../Components/custom-button/CustomButton";
import AdminNavBar from "../../../Components/navbar/AdminNavBar";
import cinstance from "../../../Service/randomcinstance";
import web3 from "../../../Service/web3";
import "./AdminHomeStyle.css";
class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Totallottery: 0,
      TotalOrganisation: 0,
      loading: false,
      show: true,

      lotterylist: [],
    };
  }

  async componentDidMount() {
    var lotterylist = [];
    if (window.ethereum) {
      window.web3 = web3;

      cinstance.methods
        .admin()
        .call()
        .then(async (p) => {
          let account = await web3.eth.getAccounts();
          if (p == account[0]) this.setState({ show: true });

          cinstance.methods
            .organisationbyaddr(p)
            .call()
            .then((response) => {
              this.setState({ commissionEarned: response });
            })
            .catch((err) => console.log("pepep", err));

          cinstance.methods
            .lotteryId()
            .call()
            .then((res) => {
              this.setState({ Totallottery: res - 1 });
            })
            .catch((err) => console.log("res", err));
          cinstance.methods
            .ownerId()
            .call()
            .then((res) => {
              this.setState({ TotalOrganisation: res - 1 });
            })
            .catch((err) => console.log("res", err));
        });
    } else {
      alert("Connect to wallet");
    }
  }

  render() {
    const {
      show,
      lotterylist,
      Totallottery,
      TotalOrganisation,
      commissionEarned,
    } = this.state;

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
        {show && (
          <div className="admin">
            <Container className="bgImage  p-o " fluid>
              <Row>
              <Col lg={9}>
                <div className="addr textalign mt-5">
                  Platform Earned :{" "}
                  {commissionEarned && commissionEarned.commissionEarned
                    ? Number(
                        commissionEarned.commissionEarned / 10 ** 18
                      ).toFixed(5)
                    : 0}{" "}
                  Matic
                </div>
              </Col>
              <Col lg={3}>
                <div className="btn-div">
                  <CustomButton
                    className="admin-btn"
                    title="Withdraw"
                    onClick={async () => {
                      let account = await web3.eth.getAccounts();
                      cinstance.methods
                        .withdrawcommission()
                        .send({ from: account[0] })
                        .then((response) => {
                          window.location.reload();
                        })
                        .catch((err) => console.log("pepep", err));
                    }}
                  />
                </div>
              </Col>
              </Row>
              <div className="">
                <Row className="mx-auto">
                  <Col lg="12">
                    <Row>
                      <Col lg={5} md={12} sm={12} xs={12} xl={4}>
                        <Card border="p-3 mt-5">
                          <a href={Path.alllottery}>
                            <div className="admincard">
                              <div className="card-heading">
                                Total Lotteries
                              </div>
                              <div className="card-content">
                                <div className="content-text">
                                  {Totallottery}
                                </div>
                              </div>
                            </div>
                          </a>
                        </Card>
                      </Col>

                      <Col lg={5} md={12} sm={12} xs={12} xl={4}>
                        <Card border="p-3 mt-5">
                          <div className="admincard">
                            <div className="card-heading">
                            Total Bookies
                            </div>
                            <div className="card-content">
                              <div className="content-text">
                                {TotalOrganisation}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Container>
            <FooterStrip />
          </div>
        )}
      </>
    );
  }
}

export default AdminHome;
