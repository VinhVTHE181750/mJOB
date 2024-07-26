import React from "react";
import {useParams} from "react-router-dom";
import use____Query from "../../hooks/use____Query";

const ShowData = () => {
  // If passing params from URL
  const param1 = useParams().param1;
  const param2 = useParams().param2;
  // If passing static params:
  // const param1 = "value1";
  // const param2 = "value2";

  const { data, loading, error } = use____Query(param1, param2);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>Data has a number1 field: {data.number1}</p>
      <p>Data has a string1 field: {data.string1}</p>
    </div>
  );
};

export default ShowData;
