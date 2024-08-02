import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import http from "../../functions/httpService";
import Sidebar from '../../components/job/SideBar';
import { useAuth } from '../../context/UserContext';
import useJobApplicationList from '../../hooks/job/dashboard/useJobApplicationList';
import ModalList from '../../components/job/ModalList';
import { Button, Modal } from 'react-bootstrap';
import useWhoAmI from '../../hooks/user/useWhoAmI';
import useUpdateJobStatus from '../../hooks/job/dashboard/useUpdateJobStatus';
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
  const { userId } = useWhoAmI();
  const [createdJobs, setCreatedJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { isEmployerMode } = useAuth();
  const { data, loading, error, fetchJobApplications } = useJobApplicationList();
  const { updateJobStatus } = useUpdateJobStatus();
  if (!isEmployerMode) {
    navigate('/myjobs/applied');
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

  const handleFetch = async (jobId) => {
    if (jobId && userId) {
      try {
        await fetchJobApplications(jobId, userId); // Fetch applications before opening modal
        setShowModal(true); // Show the modal only after data is fetched
      } catch (error) {
        console.error('Error fetching job applications:', error);
      }
    }
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

  const handleStartJob = async (jobId) => {
    try {
      await updateJobStatus(jobId, 'ONGOING');
      setSelectedJobId(jobId);
      setSuccessMessage('Job has been started successfully.');
      setShowSuccessModal(true);
      // Refresh job list
      const response = await http.get('/jobs/created-jobs');
      setCreatedJobs(response.data);
    } catch (error) {
      console.error('Error starting job:', error);
    }
  };

  const handleCompleteJob = async (jobId) => {
    try {
      await updateJobStatus(jobId, 'COMPLETED');
      setSelectedJobId(jobId);
      setSuccessMessage('Job has been completed successfully.');
      setShowSuccessModal(true);
      // Refresh job list
      const response = await http.get('/jobs/created-jobs');
      setCreatedJobs(response.data);
    } catch (error) {
      console.error('Error completing job:', error);
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
      case 'Active':
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
    <>
      <div className="div">
        <div className="div-2">
          <Sidebar />
          <div className="column-2">
            <Container>
              <Table>
                <thead>
                  <tr>
                    <Th>#</Th>
                    <Th>Job</Th>
                    <Th>Next Payment</Th>
                    <Th>Status</Th>
                    <Th>View Application</Th>
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
                        <Td style={getStatusStyle(job.status)}>
                          {formatStatus(job.status)}
                        </Td>
                        <Td>
                          <ViewButton onClick={() => handleFetch(job.id)}>View</ViewButton>
                        </Td>
                        <Td>
                          <ViewButton onClick={() => handleViewClick(job.id)}>View</ViewButton>
                          <EditButton onClick={() => navigate(`/jobs/edit/${job.id}`)}>Edit</EditButton>
                          <ApplyButton onClick={() => navigate(`/apply/${job.id}`)}>Apply</ApplyButton>
                          <DeleteButton onClick={() => handleDeleteClick(job.id)}>Delete</DeleteButton>
                          {job.status === 'ONGOING' && (
                            <Button onClick={() => handleCompleteJob(job.id)}>Complete Job</Button>
                          )}
                          {job.status === 'ACTIVE' && (
                            <Button onClick={() => handleStartJob(job.id)}>Start Job</Button>
                          )}
                          
                        </Td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Container>
          </div>
          <ModalList show={showModal} onHide={() => setShowModal(false)} data={data} />
             {/* Success Modal */}
          <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>{successMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CreatedJobs;
