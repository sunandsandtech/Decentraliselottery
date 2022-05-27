import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';

export const OrgSidebarData = [
  {
    title: 'Register',
    path: '/register',
    icon: <GiIcons.Gi3DStairs />,
    cName: 'nav-text'
  },
    {
      title: 'Homepage',
      path: '/bookiee',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Create Lottery',
      path: '/bookie/createlottery',
      icon: <FaIcons.FaTicketAlt />,
      cName: 'nav-text'
    },
    {
      title: 'My Lotteries',
      path: '/bookie/mylottery',
      icon: <GiIcons.GiPodiumWinner />,
      cName: 'nav-text'
    },
    
  ];
  