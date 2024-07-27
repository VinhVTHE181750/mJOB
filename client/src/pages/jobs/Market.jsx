// Marketplace.js
import { useState } from "react";
import HelpCenter from "../../components/HelpCenter.jsx";
import Footer from "../../components/HomeFooter.jsx";
import JobList from "../../components/job/JobList.jsx";

// import './Marketplace.css'; // Custom styles (optional)

function JobMarket() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* <HomeNavbar /> */}
      <JobList />
      <HelpCenter />
      <Footer />
    </>
  );
}

export default JobMarket;
