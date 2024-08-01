import { useState, useEffect } from 'react';
import http from "../../functions/httpService";

const useRecentProcessedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchRecentProcessedJobs = async (userId) => {
        try {
            const url = `myjobs/employer/jobprogress/${userId}`;
            const response = await http.get(url);
            setJobs(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };


    return { jobs, loading, error, fetchRecentProcessedJobs };
};

export default useRecentProcessedJobs;
