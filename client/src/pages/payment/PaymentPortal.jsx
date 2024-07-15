import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Balance from "./micro/Balance";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import EmbedCard from "./micro/EmbedCard";
import { useBalance } from "../../hooks/payment/useBalance";
import Skeleton from "react-loading-skeleton";
import {
  GoArrowDown,
  GoArrowSwitch,
  GoArrowUp,
  GoLinkExternal,
} from "react-icons/go";
import { useNavigate } from "react-router-dom";

const BalanceChart = lazy(() => import("./micro/BalanceChart"));

const PaymentPortal = () => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const sampleTransactions = [
    {
      date: "2024/07/01",
      amount: "### ### ###",
      from: "XXXXXX",
      type: "Received",
    },
    {
      date: "2024/06/30",
      amount: "### ### ###",
      from: "XXXXXX",
      type: "Sent",
    },
    {
      date: "2024/06/30",
      amount: "### ### ###",
      from: "XXXXXX",
      type: "Withdrawn",
    },
    {
      date: "2024/06/30",
      amount: "### ### ###",
      from: "XXXXXX",
      type: "Deposited",
    },
  ];

  const transactions = sampleTransactions.map((transaction, index) => (
    <ListGroup.Item key={index} className="border">
      <h3>#{index + 1}</h3>
      {transaction.type} {transaction.amount}{" "}
      {transaction.type === "Deposited" || transaction.type === "Sent"
        ? "to"
        : "from"}{" "}
      {transaction.from} {transaction.date}
    </ListGroup.Item>
  ));

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
            title={
              <h1 style={{ fontSize: 60, fontWeight: "bold" }}>Balance</h1>
            }
            content={
              <div style={{ fontSize: 40 }}>
                <Balance amount={amount} currency="VND" locale="vi-VN" />
                <Col className="d-flex gap-2 gap-sm-2">
                  <Button variant="primary" onClick={() => navigate("/payment/deposit")}>
                    <GoArrowUp /> Deposit
                  </Button>
                  <Button variant="success" onClick={() => navigate("/payment/withdraw")}>
                    <GoArrowDown /> Withdraw
                  </Button>
                  <Button variant="warning" onClick={() => navigate("/payment/transfer")}>
                    <GoArrowSwitch /> Transfer
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
        <Col className="px-0 mx-0" sm={4}>
          <EmbedCard
            title={<h3>Earnings</h3>}
            content={<Balance amount={amount} currency="VND" locale="vi-VN" />}
            borderColor={"lightgreen"}
            borderWidth={4}
          />
        </Col>
        <Col className="px-0 mx-0" sm={4}>
          <EmbedCard
            title={<h3>Spent</h3>}
            content={<Balance amount={amount} currency="VND" locale="vi-VN" />}
            borderColor={"orange"}
            borderWidth={4}
          />
        </Col>
        <Col className="px-0 mx-0" sm={4}>
          <EmbedCard
            title={<h3>Transactions</h3>}
            content="27"
            borderWidth={4}
          />
        </Col>
      </Row>
      <Row className="border mt-2 mb-2">
        <Col className="border d-none d-sm-block" sm={12} lg={7}>
          <h3 className="mt-2">Overview</h3>
          <Suspense fallback={<Skeleton style={{ height: "100%" }} />}>
            <BalanceChart />
          </Suspense>
        </Col>
        <Col className="border d-sm-none">
          <h5>To display balance chart, use a bigger screen.</h5>
        </Col>
        <Col className="border" sm={12} lg={5}>
          <h2 className="mt-2">
            <span className="me-2">Recent Transactions</span>
            <Button
              variant="outline-info"
              onClick={() => navigate("/payment-history")}
            >
              <GoLinkExternal />
            </Button>
          </h2>
          <div>{transactions}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPortal;
