import { useState } from "react";
import "../../assets/css/JobDashboard.css";
import History from "../../components/job/History";
import SideBar from "../../components/job/SideBar";
import useWhoAmI from '../../hooks/user/useWhoAmI';
import CreatorHistory from "../../components/job/CreatorHistory";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from 'react-router';
const JobHistory = () => {
  const [activeComponent, setActiveComponent] = useState("history");
  const { fetchMe, userId, username, role } = useWhoAmI();
  const navigate = useNavigate();
  const {isEmployerMode} = useAuth();
  if (role === "GUEST") {
    navigate('/login');
  }
  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };
  const user = {
    id: parseInt(userId),
    username: username,
    role: role
  }

  return (
    <>
      <div className="div">
        <div className="div-2">
          <SideBar onMenuClick={handleMenuClick} />
          <div className="column-2">
            {activeComponent === "history" && 
            isEmployerMode ? <CreatorHistory user={user}/> :<History user={user}/>}
            {activeComponent !== "history" && <div>Sorry, this service is currently unavailable.</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobHistory;
