// Marketplace.js
import { useState } from "react";
import HelpCenter from "../../components/HelpCenter.jsx";
import Footer from "../../components/HomeFooter.jsx";
import JobList from "../../components/job/JobList.jsx";

// import './Marketplace.css'; // Custom styles (optional)

function JobMarket() {

  return (
    <>
      {/* <HomeNavbar /> */}
      <JobList />
      <HelpCenter />
    </>
  );
}

export default JobMarket;
