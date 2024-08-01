import React from 'react';
import '../../assets/css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployerStatistic from '../../components/home/EmployerStatistic';
import PostStatistic from '../../components/home/PostStatistic';
import useWhoAmI from '../../hooks/user/useWhoAmI';

function EmployerHome() {
    const { fetchMe, userId, username, role } = useWhoAmI();
    const id = parseInt(userId);
    const user = { id: id, username: username, role: role };
    return (
        <div>
            <EmployerStatistic user={user} />
            <PostStatistic />
        </div>
    )

}

export default EmployerHome;