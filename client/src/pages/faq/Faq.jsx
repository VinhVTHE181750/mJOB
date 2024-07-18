import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, Container } from "react-bootstrap";

function FaqPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const request = await axios.get(`/faq`);
        if (request.status === 200) {
          setData(request.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    handleFetchData();
  }, []);
  return (
    <>
      <Container>
        <h3>FAQs List</h3>
        <Card>
          <CardBody>
            <h6>
              <b>Question:</b> This is test
            </h6>
            <p>Answer From Support: This is test ABCD</p>
          </CardBody>
        </Card>
        {data?.length > 0 &&
          data.map((item, index) => {
            return (
              <Card>
                <CardBody>
                  <h6>
                    <b>Question:</b> {item.question}
                  </h6>
                  <p>Answer From Support: {item.answer}</p>
                </CardBody>
              </Card>
            );
          })}
      </Container>
    </>
  );
}

export default FaqPage;
