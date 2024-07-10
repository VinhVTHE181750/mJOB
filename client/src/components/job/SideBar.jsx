import React, { useState } from 'react';
import '../../assets/css/SideBar.css';

const Sidebar = ({ onMenuClick }) => {

  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    onMenuClick(menu);
  };


  return (
    <div className="sidebar">
      
      <div className="sidebar-profile" style={{margin: '20px 10px'}}>
        <div className="username">Personal Job </div>
        <div className="username">Management</div>
      </div>
      <hr />
      <div className="sidebar-menu">
      <a
          href="#"
          className={`menu-item ${selectedMenu === 'dashboard' ? 'selected' : ''}`}
          onClick={() => handleMenuClick('dashboard')}
        >
          Dashboard
        </a>
        <a
          href="#"
          className={`menu-item ${selectedMenu === 'jobHistory' ? 'selected' : ''}`}
          onClick={() => handleMenuClick('jobHistory')}
        >
          Job History
        </a>
        <a
          href="#"
          className={`menu-item ${selectedMenu === 'jobApplied' ? 'selected' : ''}`}
          onClick={() => handleMenuClick('jobApplied')}
        >
          Job Applied
        </a>
        <a
          href="#"
          className={`menu-item ${selectedMenu === 'jobCompleted' ? 'selected' : ''}`}
          onClick={() => handleMenuClick('jobCompleted')}
        >
          Job Completed
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
