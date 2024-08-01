import { useState, useEffect } from 'react';
import http from "../../functions/httpService";

const useRecentCreatedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecentCreatedJobs = async (userId) => {
        try {
            const url = `/myjobs/employer/jobcreated/${userId}`;
            const response = await http.get(url);
            setJobs(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { jobs, loading, error, fetchRecentCreatedJobs };
};

export default useRecentCreatedJobs;
