import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./static/css/Footer.css";
import "./static/css/result.css";
import "./static/css/responsive.css";
import "./static/css/buypage.css";
import "./static/css/Main.css";
import "../src/App/Components/banner/banner.css";
import Homepage from "./App/Pages/User/home-page/Homepage";
import Register from "./App/Pages/User/Register";
import Login from "./App/Pages/User/Login";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import RegisterAsorganisation from "./App/Pages/Organisation/register-bookie/RegisterAsOrganisation";
import OrganisationList from "./App/Pages/Admin/Organisationlist";
import Createlottery from "./App/Pages/Organisation/create-lottery/Createlottery";
import Mylottery from "./App/Pages/Organisation/my-lottery/Mylottery";
import LotteryList from "./App/Pages/Admin/LotteryList";
import Buylottery from "./App/Pages/User/single-lottery/Buylottery";
import { Path } from "./static/Constants";
import Alllottery from "./App/Pages/User/Alllottery";
import Results from "./App/Pages/User/Results";
import AdminHome from "./App/Pages/Admin/admin-home/AdminHome";
import LotteryDetails from "./App/Pages/Admin/LotteryDetails";
import OrgHome from "./App/Pages/Organisation/OrgHome";
import Profile from "./App/Pages/User/Profile";
import ScrollToTop from "./App/Components/ScrollToTop";
import OrgLotteryDetails from "./App/Pages/Organisation/LotteryDetails";
import Warnings from "./App/Components/Warning";
import web3 from "./App/Service/web3";

function App() {
  const [warn, setwarn] = useState(false);
  const [net, setnet] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname !== "/help" &&
      window.location.pathname !== "/aboutus"
    ) {
      //   setTimeout(() => {
      //   if (window.ethereum) {
      //     if (window.ethereum.networkVersion == 137) {
      //     } else {
      //       setIsModalOpen(true);
      //       setnet(true);
      //     }
      //   } else {
      //     setIsModalOpen(true);
      //   }
      // }, 5000);
    }
  }, []);
  return (
    <>
      <Router>
        {/* {warn && <Warnings net={net} />} */}
        <Modal
          show={isModalOpen}
          centered
          // style={{ width: "60%", margin: "0px auto" }}
          onClose={() => setIsModalOpen(false)}
        >
          <Modal.Body>
            {net
              ? "Please Connect to Polygon main net (Network Id 137)"
              : "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"}{" "}
            <p>
              <a href="/help" style={{ color: "blue" }}>
                Get Help
              </a>
            </p>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "flex-start" }}>
            <Button
              color="green"
              onClick={() => {
                setIsModalOpen(false);
              }}
              //inverted
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <ScrollToTop>
          <Switch>
            <Route path={Path.root} exact component={Homepage} />
            <Route path={Path.login} component={Login} />
            <Route path={Path.register} component={Register} />
            <Route
              path={Path.registerasorg}
              component={RegisterAsorganisation}
            />
            <Route path={Path.singlelottery} component={Buylottery} />
            <Route path={Path.admin} component={AdminHome} />
            <Route path={Path.adminorglist} component={OrganisationList} />
            <Route path={Path.adminlotterylist} component={LotteryList} />
            <Route path={Path.adminlotterydetail} component={LotteryDetails} />
            <Route path={Path.org} component={OrgHome} />
            <Route path={Path.orgcreatelottery} component={Createlottery} />
            <Route path={Path.orgmylottery} component={Mylottery} />
            <Route path={Path.orglotterydetail} component={OrgLotteryDetails} />
            <Route path={Path.alllottery} component={Alllottery} />
            <Route path={Path.result} component={Results} />
            <Route path={Path.profile} component={Profile} />
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App;
