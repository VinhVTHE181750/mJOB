import { Container, Table } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { useEffect, useState } from "react";
import http from "../../functions/httpService";

const PaymentHistory = () => {
  // data: id, amount, status, action, from, to,
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await http.get("/payment/balance/history");
      setData(res.data);
    };
    fetchData();
  }, []);

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
