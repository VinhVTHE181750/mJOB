import React from 'react';
import '../../assets/css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HelpCenter from '../../components/HelpCenter.jsx';
import HomeNavbar from '../../components/HomeNavbar.jsx';
import CarouselComponent from '../../components/home/HomeCarousel.jsx';
import HotNew from '../../components/home/HotNew.jsx';
import HotJob from '../../components/home/HotJobs.jsx';
import Footer from '../../components/HomeFooter.jsx';
import TestData from '../../components/TestData.jsx';

function HomeGuest() {
    return (
      <div className="App">
        {/* <HomeNavbar /> */}
        <CarouselComponent />    
        <HotJob />    
        <HelpCenter />
        <HotNew />
        <Footer />
        
        {/* <TestData /> */}
      </div>
    );
}

export default HomeGuest