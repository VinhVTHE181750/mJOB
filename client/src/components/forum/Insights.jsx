import { useState } from "react";
import { Dropdown, DropdownButton, Row, Spinner } from "react-bootstrap";
import useWhoAmI from "../../hooks/user/useWhoAmI";

const Insights = () => {
  const { userId, loading: userLoading, error: userError } = useWhoAmI();
  const [range, setRange] = useState(7);

  const handleRangeChange = (number) => {
    setRange(Number(number));
  };

  if (userLoading) {
    return <Spinner animation="border" />;
  } else if (userError) {
    return <h1>Can not connect to the server.</h1>;
  } else
    return (
      <>
        <Row className="d-flex">
          <Dropdown>
            
          </Dropdown>
        </Row>
      </>
    );
};

export default Insights;
