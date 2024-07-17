import React from 'react';
import { Navbar, Container, NavItem } from 'react-bootstrap';
import '../../assets/css/HomeUser.css';
import HomeNavbar from '../../components/home/HomeNavbar';
import JobsStatistic from '../../components/home/JobsStatistic';
import PostStatistic from '../../components/home/PostStatistic';

function HomeUser() {
    
    return (
        <>
            <HomeNavbar />
            <JobsStatistic />
            <PostStatistic />
        </>
    )
}

export default HomeUser