import React, {useState} from 'react';
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
          href="/myjobs"
          className={`menu-item ${location.pathname === '/myjobs' ? 'selected' : ''}`}
          onClick={() => handleMenuClick('dashboard')}
        >
          Dashboard
        </a>
        <a
          href="/myjobs/history"
          className={`menu-item ${location.pathname === '/myjobs/history' ? 'selected' : ''}`}
          onClick={() => handleMenuClick('jobHistory')}
        >
          Job History
        </a>
        <a
          href="/myjobs/applied"
          className={`menu-item ${location.pathname === '/myjobs/applied' ? 'selected' : ''}`}
          onClick={() => handleMenuClick('jobApplied')}
        >
          Job Applied
        </a>
        <a
          href="/myjobs/created-jobs"
          className={`menu-item ${location.pathname === '/myjobs/created-jobs' ? 'selected' : ''}`}
          onClick={() => handleMenuClick('jobCompleted')}
        >
          Job Created
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
