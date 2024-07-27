import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import http from "../../functions/httpService";
import { useAuth } from "../../context/UserContext";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #fff;
`;

const Th = styled.th`
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const ViewButton = styled.button`
  padding: 10px 20px;
  color: #007bff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const AppliedJobs = ({ searchQuery }) => {
  const { handleRedirectError } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await http.get("/jobs/applied-jobs");
        setAppliedJobs(response.data);
      } catch (error) {
        handleRedirectError("server error");
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs();
  }, []);

  const navigate = useNavigate();

  const handleViewClick = (job_id) => {
    navigate(`/applied-job-details/${job_id}`);
  };

  const renderCurrency = (currency, amount) => {
    switch (currency) {
      case "USD":
        return `$${amount}`;
      case "VND":
        return `${Math.floor(amount)} VND`;
      case "EUR":
        return `€${amount}`;
      case "POUND":
        return `£${amount}`;
      default:
        return `${amount} ${currency}`;
    }
  };

  const filteredJobs = appliedJobs.filter((job) =>
    job.job_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Job</Th>
            <Th>Status</Th>
            <Th>Next Payment</Th>
            <Th>Next Payment Date</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job, index) => (
            <tr key={job.job_id}>
              <Td>{index + 1}</Td>
              <Td>{job.job_title}</Td>
              <Td>{job.job_status}</Td>
              <Td>
                {renderCurrency(
                  job.job_compensation_currency,
                  job.job_compensation_amount
                )}
              </Td>
              <Td></Td>
              <Td>
                <ViewButton onClick={() => handleViewClick(job.job_id)}>
                  View
                </ViewButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AppliedJobs;
