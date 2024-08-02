import { useState } from 'react';
import http from '../../../functions/httpService'; // Adjust the path as needed

// Custom hook for updating job status
const useUpdateJobStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const updateJobStatus = async (jobId, status) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await http.put('/myjobs/employer/updatejobstatus/', { jobId, status });
            setSuccess(response.data.message);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { updateJobStatus, loading, error, success };
};

export default useUpdateJobStatus;
