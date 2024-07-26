import React from 'react';
import { Navbar, Container, NavItem } from 'react-bootstrap';
import '../../assets/css/HomeUser.css';
import HomeNavbar from '../../components/home/HomeNavbar';
import JobsStatistic from '../../components/home/JobsStatistic';
import PostStatistic from '../../components/home/PostStatistic';
import useWhoAmI from '../../hooks/user/useWhoAmI';
import { useNavigate } from 'react-router';
function HomeUser() {
    const { fetchMe, userId, username, role } = useWhoAmI();
    const navigate = useNavigate();
    if (!username) {
        navigate('/login');
    }
    return (
        <>
            <JobsStatistic />
            <PostStatistic />
        </>
    )
}

export default HomeUser