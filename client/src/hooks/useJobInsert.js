import { useState } from "react";
import http from "../functions/httpService"; // Adjust the import path as necessary

const useJobInsert = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const insertJob = async (jobData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Replace the URL with your actual API endpoint
      const response = await http.post("/jobs", jobData);
      if (response.status === 201) {
        setSuccess(true);
      } else {
        setError("An error occurred while inserting the job.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { insertJob, loading, error, success };
};

export default useJobInsert;