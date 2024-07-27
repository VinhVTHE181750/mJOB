import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import http from "../../functions/httpService";
import { useAuth } from "../../context/UserContext";

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
`;

const Heading = styled.h2`
  margin-bottom: 10px;
  font-type: bold;
  font-size: 40px;
  text-align: center;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const BackButton = styled.a`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin-bottom: 20px;
  text-decoration: none;
  border-radius: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CreatedJobDetail = () => {
  const { handleRedirectError } = useAuth();
  const { job_id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await http.get(`/created-job-detail/${job_id}`);
        setJobDetails(response.data);
      } catch (error) {
        handleRedirectError("server error");
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <BackButton href="/active-job">Back</BackButton>
      <Heading>Manage: {jobDetails.job_title}</Heading>
      <div>
        <Label>Created by:</Label>{" "}
        {jobDetails.user_id === 1 ? "You" : jobDetails.creator_name}
      </div>
      <div>
        <Label>Payment period:</Label> {jobDetails.job_compensation_type}
      </div>
      <div>
        <Label>Amount:</Label> {jobDetails.job_compensation_amount}{" "}
        {jobDetails.job_compensation_currency} /{" "}
        {jobDetails.job_compensation_period}
      </div>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Status</th>
            <th>Payment status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.users && jobDetails.users.length > 0 ? (
            jobDetails.users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.status}</td>
                <td>{user.payment_status}</td>
                <td>
                  <button>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default CreatedJobDetail;
