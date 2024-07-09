import {useState} from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const usePostInsert = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const insertPost = async (title, content, userId, status, category, tags) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/forum/posts`, {
                title, content, userId, status, category, tags
            });
            setLoading(false);
            return response.data;
        } catch (err) {
            // on 404, API return { message: "abc"}, use message as error message
            setError(err.response.data.message || err.message);
            setLoading(false);
        }
    };

    return {insertPost, loading, error};
};

export default usePostInsert;