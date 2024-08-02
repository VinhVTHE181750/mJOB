import React from 'react';
import '../../assets/css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HelpCenter from '../../components/HelpCenter.jsx';
import CarouselComponent from '../../components/home/HomeCarousel.jsx';
import HotNew from '../../components/home/HotNew.jsx';
import HotJob from '../../components/home/HotJobs.jsx';
import Banner from '../../components/home/Banner.jsx';
function HomeGuest() {

    return (
      <div className="App">
        {/* <Banner /> */}
        {/* <HomeNavbar /> */}
        <CarouselComponent />    
        <HotJob />    
        <HelpCenter />
        <HotNew />
        
        {/* <TestData /> */}
      </div>
    );
}

export default HomeGuest