import { useState } from "react";
import "../../assets/css/JobDashboard.css";
import CreatorHistory from "../../components/job/CreatorHistory";
import SideBar from "../../components/job/SideBar";
import useWhoAmI from '../../hooks/user/useWhoAmI';
import { useNavigate } from 'react-router';
const EmployerHistory = () => {
  const [activeComponent, setActiveComponent] = useState("history");
  const { fetchMe, userId, username, role } = useWhoAmI();
  const navigate = useNavigate();
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
            {activeComponent === "history" && <CreatorHistory user={user}/>}
            {activeComponent !== "history" && <div>Sorry, this service is currently unavailable.</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerHistory;
