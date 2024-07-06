//dashboard

//jobs list

import React, { useState } from 'react';
import '../../assets/css/JobDashboard.css';
import {Row,Col} from 'react-bootstrap';
import SideBar from '../../components/job/SideBar';
import Dashboard from '../../components/job/DashBoard';
import History from '../../components/job/History';

const JobHistory = () => {
  const [activeComponent, setActiveComponent] = useState('history');

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

    return (
        <>
       <div className="div">
        <div className="div-2">
          <SideBar onMenuClick={handleMenuClick} />
          <div className="column-2">
          {activeComponent === 'history' && <History />}
          {activeComponent !== 'history' && <div>Sorry, this service is currently unavailable.</div>}
          </div>
        </div>
      </div>
        </>
      );
    };
    

export default JobHistory;