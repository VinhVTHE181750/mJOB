import { useState, useEffect } from 'react';
import http from "../../../functions/httpService";

const useCreatorJobHistory = () => {
    const [jobHistory, setJobHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobHistory = async (userId) => {
        try {
            console.log(userId);
            const url = `/myjobs/employer/jobcreated/${userId}`;
            const response = await http.get(url);
            setJobHistory(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };


    return { jobHistory, loading, error, fetchJobHistory };
};

export default useCreatorJobHistory;
