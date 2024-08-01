import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import http from "../../functions/httpService";
import Sidebar from '../../components/job/SideBar';
import { useAuth } from '../../context/UserContext';

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
const CreatedJobs = ({ searchQuery }) => {
  const [createdJobs, setCreatedJobs] = useState([]);
  const navigate = useNavigate();
  const {isEmployerMode} = useAuth();

  if(!isEmployerMode){
    navigate('/myjobs/created-jobs');
  }

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
    navigate(`/jobs/${id}`); // Navigate to the job detail page
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
  
  const formatJobType = (type) => {
    if (!type) return '';
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
<div className="div">
<div className="div-2">
    <Sidebar className="ml-1"/>
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Job</Th>
            <Th>Type</Th>
            <Th>Next Payment</Th>
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
                <Td>{formatJobType(job.type)}</Td>
                <Td>{renderCurrency(job.salaryCurrency, job.salary)}</Td>
                <Td>
                  {formatStatus(job.status)}
                </Td> 
                <Td>
                  <ViewButton onClick={() => handleViewClick(job.id)}>View</ViewButton>
                  <PayButton onClick={() => handlePayClick(job.id)}>Pay</PayButton>
                  <EditButton onClick={() => navigate(`/jobs/edit/${job.id}`)}>Edit</EditButton>
                  <ApplyButton onClick={() => navigate(`/apply/${job.id}`)}>Apply</ApplyButton>
                </Td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
    </div>
    </div>
  );
};

export default CreatedJobs;
