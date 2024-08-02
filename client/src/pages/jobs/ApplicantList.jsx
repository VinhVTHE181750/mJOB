import { useState } from "react";
import "../../assets/css/JobDashboard.css";
import SideBar from "../../components/job/SideBar";
import useWhoAmI from '../../hooks/user/useWhoAmI';
import { useNavigate } from 'react-router';
import ApplicationList from "../../components/job/ApplicationList";
import { useAuth } from '../../context/UserContext';

const ApplicantList = () => {
  const [activeComponent, setActiveComponent] = useState("history");
  const { fetchMe, userId, username, role } = useWhoAmI();
  const { isEmployerMode } = useAuth();



  const navigate = useNavigate();

  if (role === "GUEST") {
    navigate('/login');
  }
  if (isEmployerMode) {
    navigate('/myjobs/created-jobs');
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
            {activeComponent === "history" && <ApplicationList user={user} />}
            {activeComponent !== "history" && <div>Sorry, this service is currently unavailable.</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantList;
