import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import http from "../../functions/httpService";

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
  background-color: lavender;
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

const EditButton = styled.button`
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

const ApplyButton = styled.button`
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

const DeleteButton = styled.button`
  padding: 10px 20px;
  color: #ff0000;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;

const CreatedJobs = ({ searchQuery }) => {
  const [createdJobs, setCreatedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreatedJobs = async () => {
      try {
        const response = await http.get('/jobs/created-jobs');
        setCreatedJobs(response.data);
      } catch (error) {
        console.error('Error fetching created jobs:', error);
      }
    };

    fetchCreatedJobs();
  }, []);

  const handlePayClick = (jobId) => {
    // Payment handling logic
  };

  const handleViewClick = (id) => {
    navigate(`/jobs/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      await http.delete(`/jobs/${id}`);
      setCreatedJobs(createdJobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const getStatusStyle = (status) => {
    switch (formatStatus(status)) {
      case 'Ongoing':
        return { color: 'orange' };
      case 'Completed':
        return { color: 'green' };
      case 'Rejected':
        return { color: 'red' };
      case 'Pending':
        return { color: 'blue' };
      case 'Accepted':
        return { color: 'darkgreen' };
      default:
        return {};
    }
  };

  const formatStatus = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
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
            <Th>Status</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {createdJobs
            .filter(job => job.title && searchQuery ? job.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
            .map((job, index) => (
              <tr key={job.id}>
                <Td>{index + 1}</Td>
                <Td>{job.title}</Td>
                <Td>{renderCurrency(job.salaryCurrency, job.salary)}</Td>
                <Td>{job.nextPaymentDate}</Td>
                <Td>
                  {job.Applications.length > 0 ? (
                    job.Applications.map((application, appIndex) => (
                      <div key={appIndex} style={getStatusStyle(application.status)}>
                        {application.status}
                      </div>
                    ))
                  ) : (
                    <div>No applications</div>
                  )}
                </Td>
                <Td>
                  <ViewButton onClick={() => handleViewClick(job.id)}>View</ViewButton>
                  <EditButton onClick={() => navigate(`/jobs/edit/${job.id}`)}>Edit</EditButton>
                  <PayButton onClick={() => handlePayClick(job.id)}>Pay</PayButton>
                  <ApplyButton onClick={() => navigate(`/apply/${job.id}`)}>Apply</ApplyButton>
                  <DeleteButton onClick={() => handleDeleteClick(job.id)}>Delete</DeleteButton>
                </Td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CreatedJobs;
