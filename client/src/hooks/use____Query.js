import { useEffect, useState } from "react";

// Edit this component's name
const use____Query = (param1, param2) => {
  // Also change the params if needed. E.g: (id, name) or ()

  // Set states to store data and error, can add more states if needed
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [number1, setNumber1] = useState(0); // Example of adding more states

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/____?parameter1=${param1}&parameter2=${param2}`
        );
        // or response = http.get(`/api/____?parameter1=${param1}&parameter2=${param2}`);
        // or response = http.post(`/api/____`, { parameter1: param1, parameter2: param2 });

        // Example:
        // const response = await fetch(`/api/posts?username=${username}&password=${password}`);

        // Store data in a const variable
        const jsonData = await response.json();
        // or jsonData = response.data; if using axios

        // Assign data to state
        setData(jsonData);

        // Example of assigning data to another state:
        // setNumber1(jsonData.number1);

        // Set loading to false after fetching data
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [param1, param2]); // Recall the params here

  return { data, loading, error }; // Return the needed states, should also return error if needed
};

export default use____Query;
