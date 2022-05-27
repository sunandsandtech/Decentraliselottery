import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {Image } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'; 
import './NavBar.css';
import { IconContext } from 'react-icons';
import { OrgSidebarData } from './OrgSiderbarData';

function OrgNavBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
   <> 

     <IconContext.Provider value={{ color: '#fff' }}>
     {/* <div className="navbar"  style={{    backgroundColor: '#edeef0'}}>
      <Link to="#" className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar} />  
      </Link>
      
    </div> */}
     <nav  className="sidebar">
     <ul className='nav-menu-items' onClick={showSidebar}>
       <li className='navbar-toggle'>
         <Link to='/' className='menu-bars textstyle'style={{textDecoration:'none'}}>
         <Image src={require("../../static/Images/logo.png")} style={{width:50,height:50}}/>

         <span className="Logoorg">AutoBet</span>

          </Link>
       </li>
       {OrgSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} style={{textDecoration:'none'}}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="titles">{item.title}</span>
                  </Link>
                </li>
              );
            })}
       </ul>
       </nav>
     </IconContext.Provider>
   
  </>
  );
}

export default OrgNavBar
