import { useState, useEffect } from 'react';
import http from "../../../functions/httpService";


const useJobApplicationList = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchJobApplications = async (jobId, userId) => {
        try {
            setLoading(true);
            const url = `/myjobs/employer/jobapplication`;
            const response = await http.get(url, {
                params: {
                  jobId, 
                  userId 
                }
            });
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchJobApplications };
};

export default useJobApplicationList;
