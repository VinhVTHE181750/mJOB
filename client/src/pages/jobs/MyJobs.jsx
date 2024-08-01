import {useEffect, useState} from 'react';
import '../../assets/css/JobDashboard.css';
import SideBar from '../../components/job/SideBar';
import Dashboard from '../../components/job/DashBoard';
import useWhoAmI from '../../hooks/user/useWhoAmI';
import CreatorDashboard from '../../components/job/CreatorDashboard';
import { useAuth } from '../../context/UserContext';
import { useNavigate } from 'react-router';

const MyJobs = () => {
  const { fetchMe, userId, username, role } = useWhoAmI();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const {isEmployerMode} = useAuth();
  const navigate = useNavigate();
  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };
  const id= parseInt(userId);
  const user = {id: id, username: username, role: role};
    if(role === "GUEST"){
        navigate('/login');
    }
    return (
        <>
       <div className="div">
        <div className="div-2">
          <SideBar onMenuClick={handleMenuClick} />
          <div className="column-2">
          {activeComponent === 'dashboard' && 
            isEmployerMode ? <CreatorDashboard user={user}/> :<Dashboard user={user}/>}
          {activeComponent !== 'dashboard' && <div>Sorry, this service is currently unavailable.</div>}
          </div>
        </div>
      </div>
        </>
      );
    };
    

export default MyJobs;