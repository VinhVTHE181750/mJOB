import {useState} from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const usePostInsert = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const insertPost = async (title, content, userId, username, status, category, categoryId, tags) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/forum/posts`, {
                title, content, userId, username, status, category, categoryId, tags
            });
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.message || "Error occurred");
            setLoading(false);
        }
    };

    return {insertPost, loading, error};
};

export default usePostInsert;