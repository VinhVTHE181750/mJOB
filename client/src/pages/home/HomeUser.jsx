import React from 'react';
import { Navbar, Container, NavItem } from 'react-bootstrap';
import '../../assets/css/HomeUser.css';
import JobsStatistic from '../../components/home/JobsStatistic';
import PostStatistic from '../../components/home/PostStatistic';
import EmployerStatistic from '../../components/home/EmployerStatistic';
import useWhoAmI from '../../hooks/user/useWhoAmI';
import { useAuth } from '../../context/UserContext';
import { useNavigate } from 'react-router';
function HomeUser() {
    const { fetchMe, userId, username, role } = useWhoAmI();
    const id = parseInt(userId);

    const user = { id: id, username: username, role: role };
    
    const { isEmployerMode} = useAuth(); // Access the employer mode context
    // console.log(isEmployerMode);

    // const navigate = useNavigate();
    // if (!username) {
    //     navigate('/login');
    // }
    return (
        <>
        {isEmployerMode ? (
            <EmployerStatistic user={user} />
        ) : (
            <JobsStatistic user={user}/>
        )}
            <PostStatistic />
        </>
    )
}

export default HomeUser