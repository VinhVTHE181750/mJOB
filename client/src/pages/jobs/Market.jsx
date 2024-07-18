// Marketplace.js
import { useState } from "react";
import HelpCenter from "../../components/HelpCenter.jsx";
import Footer from "../../components/HomeFooter.jsx";
import JobList from "../../components/job/JobList.jsx";
import useJobList from "../../hooks/useJobList";

// import './Marketplace.css'; // Custom styles (optional)

function JobMarket() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceStart, setPriceStart] = useState("");
  const [priceEnd, setPriceEnd] = useState("");

  const { contents, loading, error } = useJobList();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // console.log(contents);
  const filteredContents = contents.filter((content) => content.job_title.toLowerCase().includes(searchQuery.toLowerCase()));

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
