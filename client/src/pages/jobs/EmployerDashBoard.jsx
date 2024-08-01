import {useEffect, useState} from 'react';
import '../../assets/css/JobDashboard.css';
import SideBar from '../../components/job/SideBar';
import CreatorDashboard from '../../components/job/CreatorDashboard';
import useWhoAmI from '../../hooks/user/useWhoAmI';
import { useNavigate } from 'react-router';

const EmployerDashBoard = () => {
  const { fetchMe, userId, username, role } = useWhoAmI();
  const [activeComponent, setActiveComponent] = useState('dashboard');
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
          {activeComponent === 'dashboard' && <CreatorDashboard user={user}/>}
          {activeComponent !== 'dashboard' && <div>Sorry, this service is currently unavailable.</div>}
          </div>
        </div>
      </div>
        </>
      );
    };
    

export default EmployerDashBoard;