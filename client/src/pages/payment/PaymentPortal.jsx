import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Balance from "./micro/Balance";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import EmbedCard from "./micro/EmbedCard";
import { useBalance } from "../../hooks/payment/useBalance";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PaymentPortal = () => {
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

  const data = {
    labels: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
      "Day 9",
      "Day 10",
      "Day 11",
      "Day 12",
      "Day 13",
      "Day 14",
    ],
    datasets: [
      {
        label: "Balance",
        data: [
          4500.0, 4200.0, 3800.0, 4000.0, 3700.0, 3900.0, 4100.0, 4500.0,
          4200.0, 3800.0, 4000.0, 3700.0, 3900.0, 4100.0,
        ],
        borderColor: "blue",
        type: "line",
        fill: false,
        pointHoverBackgroundColor: "black",
        pointHoverBorderColor: "gray",
        pointHoverBorderWidth: 8,
      },
      {
        label: "Spent",
        data: [
          -439.22, -410.21, -130.17, -150.04, -140.29, -193.99, -240.0, -439.22,
          -410.21, -130.17, -150.04, -140.29, -193.99, -240.0,
        ],
        backgroundColor: "orange",
        type: "bar",
      },
      {
        label: "Withdrawn",
        data: [
          -439.22, -410.21, -130.17, -150.04, -140.29, -193.99, -240.0, -439.22,
          -410.21, -130.17, -150.04, -140.29, -193.99, -240.0,
        ],
        backgroundColor: "#cc0000",
        type: "bar",
      },
      {
        label: "Earn",
        data: [
          4739.22, 4100.21, 1300.17, 1350.04, 1400.29, 1923.99, 2400.0, 4739.22,
          4100.21, 1300.17, 1350.04, 1400.29, 1923.99, 2400.0,
        ],
        backgroundColor: "lightgreen",
        type: "bar",
      },
      {
        label: "Deposited",
        data: [
          439.22, 410.21, 130.17, 150.04, 140.29, 193.99, 240.0, 439.22, 410.21,
          130.17, 150.04, 140.29, 193.99, 240.0,
        ],
        backgroundColor: "green",
        type: "bar",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      }
    },
    animation: {
      duration: 2000, // duration of the animation in milliseconds
      easing: "easeOutQuint", // easing function to use
    },
  };

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
      <Row className="">
        <Col>
          <h1>Payment Portal</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="success">Export</Button>
        </Col>
      </Row>
      <Row className="border mt-5">
        <Col className="px-0 mx-0">
          <EmbedCard
            title="Balance"
            content={<Balance amount={amount} currency="VND" locale="vi-VN"/>}
            borderColor={"blue"}
            borderWidth={4}
          />
        </Col>
        <Col className="px-0 mx-0">
          <EmbedCard
            title="Earnings"
            content={<Balance amount={amount} currency="VND" locale="vi-VN" />}
            borderColor={"lightgreen"}
            borderWidth={4}
          />
        </Col>
        <Col className="px-0 mx-0">
          <EmbedCard
            title="Spent"
            content={<Balance amount={amount} currency="VND" locale="vi-VN" />}
            borderColor={"orange"}
            borderWidth={4}
          />
        </Col>
        <Col className="px-0 mx-0">
          <EmbedCard title="Transactions" content="27" borderWidth={4} />
        </Col>
      </Row>
      <Row className="border mt-5">
        <Col className="border" sm={7}>
          <h2>Overview</h2>
          <Bar data={data} options={options} />
        </Col>
        <Col className="border">
          <h2>Chart: Percentage of pay, gain and total</h2>
          Not implemented
        </Col>
      </Row>
      <Row className="border mt-5">
        <Col className="border">
          <h2>
            Recent Transactions
            <Button variant="success ms-2">View All</Button>
          </h2>
          <div>{transactions}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPortal;
