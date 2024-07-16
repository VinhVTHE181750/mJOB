import { Container, Table } from "react-bootstrap";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { BsCircleFill } from "react-icons/bs";

const PaymentHistory = () => {
  const from1 = "me";
  const from2 = "ABCDEF";
  const to1 = "MNPQ";
  const to2 = "you";
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
            <th>Transaction</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2021-01-01</td>
            <td>
              {from1} transferred to {to1}
            </td>
            <td>100</td>
            <td>{failed}</td>
            <td>
              <NavigateButton
                path="/payment/detail"
                text="Detail"
              />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>2021-01-02</td>
            <td>
              {from2} transferred to {to2}
            </td>
            <td>200</td>
            <td>{success}</td>
            <td>
              <NavigateButton
                path="/payment/detail"
                text="Detail"
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default PaymentHistory;
