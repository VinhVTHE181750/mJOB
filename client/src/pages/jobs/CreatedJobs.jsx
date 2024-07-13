import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
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
  margin-right: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PayButton = styled.button`
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

const CreatedJobs = () => {
  const [createdJobs, setCreatedJobs] = useState([]);

  useEffect(() => {
    const fetchCreatedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jobs/created-jobs');
        setCreatedJobs(response.data);
      } catch (error) {
        console.error('Error fetching created jobs:', error);
      }
    };

    fetchCreatedJobs();
  }, []);

  const navigate = useNavigate();

  const handlePayClick = (job_id) => {
    console.log(`Payment for job_id ${job_id}`);
  };

  const handleViewClick = (job_id) => {
    navigate(`/created-job-details/${job_id}`);
  };

  const renderCurrency = (currency, amount) => {
    switch (currency) {
      case 'USD':
        return `$${amount}`;
      case 'VND':
        return `${Math.floor(amount)} VND`; 
      case 'EUR':
        return `€${amount}`;
      case 'POUND':
        return `£${amount}`;
      default:
        return `${amount} ${currency}`;
    }
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Job</Th>
            <Th>Next Payment</Th>
            <Th>Next Payment Date</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {createdJobs.map((job, index) => (
            <tr key={job.job_id}>
              <Td>{index + 1}</Td>
              <Td>{job.job_title}</Td>
              <Td>{renderCurrency(job.job_compensation_currency, job.job_compensation_amount)}</Td>
              <Td>{job.job_compensation_period}</Td>
              <Td>
                <ViewButton onClick={() => handleViewClick(job.job_id)}>View</ViewButton>
                <PayButton onClick={() => handlePayClick(job.job_id)}>Pay</PayButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CreatedJobs;
