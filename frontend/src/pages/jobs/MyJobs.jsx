//dashboard

//jobs list

import React, { useState } from 'react';
import '../../assets/css/JobDashboard.css';
import {Row,Col} from 'react-bootstrap';
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
          {/* <div className="column">
            <div className="div-3">
              <div className="div-4">
                <div className="div-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1126459f2943e66ef02fb2b69aef364aa14297ec6d3a8d5c3351d9b168c4281f?"
                    className="img"
                  />
                  <div className="div-6">
                    Back
                    <br />
                  </div>
                </div>
                <div className="div-7" />
                <div className="div-8">
                  Username
                  <br />
                </div>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/288a79d5c98818a1ae53fc63b183ae2bd95120d772f6be789ae928d1397f2462?"
                className="img-2"
              />
              <div className="div-9">
                <div className="div-10">Dashboard</div>
                <div className="div-11">Job History</div>
                <div className="div-12">Job Applied</div>
                <div className="div-13">Job Completed</div>
              </div>
            </div>
          </div> */}
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