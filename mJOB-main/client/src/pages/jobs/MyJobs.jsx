//dashboard

//jobs list

import React, {useState} from 'react';
import '../../assets/css/JobDashboard.css';
import SideBar from '../../components/job/SideBar';
import Dashboard from '../../components/job/DashBoard';

const MyJobs = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

    return (
        <>
       <div className="div">
        <div className="div-2">
          <SideBar onMenuClick={handleMenuClick} />
          <div className="column-2">
          {activeComponent === 'dashboard' && <Dashboard />}
          {activeComponent !== 'dashboard' && <div>Sorry, this service is currently unavailable.</div>}
          </div>
        </div>
      </div>
        </>
      );
    };
    

export default MyJobs;