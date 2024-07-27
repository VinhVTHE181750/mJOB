import {useEffect, useState} from 'react';
import '../../assets/css/JobDashboard.css';
import SideBar from '../../components/job/SideBar';
import Dashboard from '../../components/job/DashBoard';
import useWhoAmI from '../../hooks/user/useWhoAmI';
const MyJobs = () => {
  const { fetchMe, userId, username, role } = useWhoAmI();
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };
  const id= parseInt(userId);
  const user = {id: id, username: username, role: role};
    return (
        <>
       <div className="div">
        <div className="div-2">
          <SideBar onMenuClick={handleMenuClick} />
          <div className="column-2">
          {activeComponent === 'dashboard' && <Dashboard user={user}/>}
          {activeComponent !== 'dashboard' && <div>Sorry, this service is currently unavailable.</div>}
          </div>
        </div>
      </div>
        </>
      );
    };
    

export default MyJobs;