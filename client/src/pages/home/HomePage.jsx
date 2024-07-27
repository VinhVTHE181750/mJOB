import React from 'react';
import '../../assets/css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeUser from './HomeUser.jsx';
import HomeGuest from './HomeGuest.jsx';
import useWhoAmI from '../../hooks/user/useWhoAmI.js';
function HomePage() {
  const { role,fetchMe } = useWhoAmI();
  fetchMe();
  if(role === "USER"){
    return (
    <div className="App">
      <HomeUser/>
    </div>
    );
  } else{
    return (
      <div className="App">
        <HomeGuest/>
      </div>
    );
  }
}

export default HomePage;