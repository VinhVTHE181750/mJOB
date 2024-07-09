import {useState} from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8000/api";

const usePostUpdate = (id) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updatePost = async (id, title, content, userId, username, status, category, categoryId, tags) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(`${API_URL}/forum/posts`, {
                id: id,
                title: title,
                content: content,
                userId: userId,
                username: username,
                status: status,
                category: category,
                categoryId: categoryId,
                tags: tags
            });
            setLoading(false);
            return response.status === 200;
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return {updatePost, loading, error};
};

export default usePostUpdate;