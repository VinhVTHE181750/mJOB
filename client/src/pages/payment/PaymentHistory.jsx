import { Container, Table } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";
import NavigateButton from "../../components/ui/buttons/NavigateButton";

const PaymentHistory = () => {
  // data: id, amount, status, action, from, to,
  const data = [
    {
      id: 1,
      amount: 100,
      status: "SUCCESS",
      action: "Send",
      from: "Me",
      to: "User 1",
    },
    {
      id: 2,
      amount: 200,
      status: "failed",
      action: "received",
      from: "User 1",
      to: "Me",
    },
    {
      id: 3,
      amount: 300,
      status: "pending",
      action: "send",
      from: "Me",
      to: "User 1",
    },
  ];
  const success = (
    <>
      <BsCircleFill color="green" /> Success
    </>
  );
  const failed = (
    <>
      <BsCircleFill color="red" /> Failed
    </>
  );
  const pending = (
    <>
      <BsCircleFill color="orange" /> Pending
    </>
  );
  return (
    <Container>
      <NavigateButton
        path="/payment"
        text="Back"
      />
      <h1>Payment History</h1>
      <Table
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Action</th>
            <th>Status</th>
            <th>From</th>
            <th>To</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{new Date().toLocaleDateString()}</td>
              <td>{d.amount}</td>
              <td>{d.action}</td>
              <td>{d.status === "success" ? success : d.status === "failed" ? failed : pending}</td>
              <td>{d.from}</td>
              <td>{d.to}</td>
              <td>Lorem ipsum donos aset tis domia</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PaymentHistory;
