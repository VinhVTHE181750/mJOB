import { useState } from "react";
import http from "../../functions/httpService";

const useTranfer = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const tranfer = async () => {
        setLoading(true);
        try {
            const response = await http.get("/payment/tranfer");
            const data = response.data;
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };


    return { data, loading, error, tranfer };
}

export default useTranfer;