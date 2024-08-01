import { lazy, Suspense } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { BsArrowDown, BsArrowUp, BsClockHistory, BsCurrencyExchange, BsLink45Deg } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useBalance } from "../../hooks/payment/useBalance";
import Balance from "./micro/Balance";
import EmbedCard from "./micro/EmbedCard";
import useStats from "../../hooks/payment/useStats";
import NavigateButton from "../../components/ui/buttons/NavigateButton";

const BalanceChart = lazy(() => import("./micro/BalanceChart"));

const PaymentPortal = () => {
  const navigate = useNavigate();
  const { stats, loading, error } = useStats();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const amount = useBalance().balance;

  return (
    <Container className="">
      <h1>Payment Portal</h1>
      <Row className="">
        {/* <Col className="d-flex justify-content-end">
          <Button variant="success">Export</Button>
        </Col> */}
      </Row>
      <Row className="border mt-5">
        <Col className="px-0 mx-0">
          <EmbedCard
            title={<h1 style={{ fontSize: 60, fontWeight: "bold" }}>Balance</h1>}
            content={
              <div style={{ fontSize: 40 }}>
                <Balance
                  amount={amount}
                  currency="USD"
                  locale="en-US"
                />
                <Col className="d-flex gap-2 gap-sm-2">
                  <Button
                    variant="primary"
                    onClick={() => navigate("/payment/deposit")}
                  >
                    <BsArrowUp /> Deposit
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => navigate("/payment/withdraw")}
                  >
                    <BsArrowDown /> Withdraw
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => navigate("/payment/transfer")}
                  >
                    <BsCurrencyExchange /> Transfer
                  </Button>
                </Col>
              </div>
            }
            borderColor={"blue"}
            borderWidth={4}
          />
        </Col>

        <Row className="px-0 mx-0"></Row>
      </Row>
      <Row className="border mt-2">
        <Col
          className="px-0 mx-0"
          sm={4}
        >
          <EmbedCard
            title={<h3>Earnings</h3>}
            content={
              <Balance
                amount={amount}
                currency="USD"
                locale="en-US"
              />
            }
            borderColor={"lightgreen"}
            borderWidth={4}
          />
        </Col>
        <Col
          className="px-0 mx-0"
          sm={4}
        >
          <EmbedCard
            title={<h3>Spent</h3>}
            content={
              <Balance
                amount={amount}
                currency="USD"
                locale="en-US"
              />
            }
            borderColor={"orange"}
            borderWidth={4}
          />
        </Col>
        <Col
          className="px-0 mx-0"
          sm={4}
        >
          <EmbedCard
            title={<h3>Transactions</h3>}
            content="0"
            borderWidth={4}
          />
        </Col>
      </Row>
      <Row className="border mt-2 mb-2">
        <Col
          className="border d-none d-sm-block"
          sm={12}
          lg={7}
        >
          <h3 className="mt-2">Overview</h3>
          <Suspense fallback={<Skeleton style={{ height: "100%" }} />}>
            <BalanceChart />
          </Suspense>
        </Col>
        <Col className="border d-sm-none">
          <h5>To display balance chart, use a bigger screen.</h5>
        </Col>
        <Col
          className="border"
          sm={12}
          lg={5}
        >
          <h2 className="mt-2">Recent Transactions</h2>
          <div>
            {loading ? (
              <Skeleton count={5} />
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <ListGroup>
                {stats.recent.map((t, index) => (
                  <ListGroup.Item key={index}>
                    <span className="fs-5 me-3 border bg-warning bg-opacity-10 border-warning p-1">📜 {capitalizeFirstLetter(t.action)}</span>
                    <span className="fs-5 me-3 border bg-primary bg-opacity-10 border-info rounded p-1">
                      <Balance amount={t.amount} />
                    </span>
                    <span className="fs-5 border bg-secondary border-secondary bg-opacity-10 rounded p-1">
                      {t.createdAt.split("T")[0]} {t.createdAt.split("T")[1].split(".")[0]}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <NavigateButton
            path="/payment/history"
            variant="outline-info"
            className="mt-2"
          >
            <BsClockHistory /> View All Transactions
          </NavigateButton>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPortal;
