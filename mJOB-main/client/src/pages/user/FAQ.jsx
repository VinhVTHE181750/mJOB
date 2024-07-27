import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function FAQPage() {
  return (
    <Container>
      <h2>FAQ PAGE</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>
              <Link to={"/details/:id"}>See the details</Link>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>
              <Link to={"/details/:id"}>See the details</Link>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Thornton</td>
            <td>
              <Link to={"/details/:id"}>See the details</Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default FAQPage;
