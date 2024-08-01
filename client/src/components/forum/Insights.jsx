import { lazy, useState } from "react";
import { Container, Dropdown, Row, Spinner } from "react-bootstrap";
import useWhoAmI from "../../hooks/user/useWhoAmI";
const BalanceChart = lazy(() => import("../../pages/payment/micro/BalanceChart"));

const Insights = () => {
  const { userId, loading: userLoading, error: userError } = useWhoAmI();
  const [range, setRange] = useState(7);
  const insightLoading = false;

  const handleRangeChange = (number) => {
    setRange(Number(number));
  };

  if (userLoading || insightLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />;
      </div>
    );
  } else if (userError) {
    return <h1 className="text-center">Can not connect to the server.</h1>;
  } else
    return (
      <>
        {/* Selector */}
        <Row className="mb-5 m-auto border rounded border-info p-3">
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="mb-2"
            >
              Last {range} days
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleRangeChange(7)}>7 days</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRangeChange(30)}>30 days</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRangeChange(90)}>90 days</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Container className="border">
            <BalanceChart />
          </Container>
        </Row>

        {/* Most interacted posts */}
        <Row className="mb-5 m-auto border rounded border-success p-3">
          <h2>Most interacted posts</h2>
          <h3>#1</h3>
          <Container className="border" />

          <h3>#2</h3>
          <Container className="border" />

          <h3>#3</h3>
          <Container className="border" />
        </Row>

        {/* Reports */}
        <Row className="mb-5 m-auto border rounded border-danger p-3">
          <h2 className="text-danger">Reports</h2>
          <h5 className="text-success">Congratulations, no reports! 🎉</h5>
        </Row>
      </>
    );
};

export default Insights;
