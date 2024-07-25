import { useState } from "react";
import "../../assets/css/JobDashboard.css";
import History from "../../components/job/History";
import SideBar from "../../components/job/SideBar";
import useWhoAmI from '../../hooks/user/useWhoAmI';
import { useNavigate } from 'react-router';
const JobHistory = () => {
  const [activeComponent, setActiveComponent] = useState("history");
  const { fetchMe, userId, username, role } = useWhoAmI();
  const navigate = useNavigate();
  if (!username) {
    navigate('/login');
  }
  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className="div">
        <div className="div-2">
          <SideBar onMenuClick={handleMenuClick} />
          <div className="column-2">
            {activeComponent === "history" && <History />}
            {activeComponent !== "history" && <div>Sorry, this service is currently unavailable.</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobHistory;
