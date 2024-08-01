import { useState } from "react";
import http from "../../../functions/httpService";

const useDeleteApplication = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteApplication = async (jobId, userId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);


        try {
            const url = `/myjobs/deleteapplication`;
            const response = await http.delete(url, {
                data: { jobId, userId },
            });


            if (response.status === 200) {
                setSuccess(true);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, deleteApplication };
};

export default useDeleteApplication;
