import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../../assets/img/apply.jpg';
import http from '../../functions/httpService';  // Your custom HTTP service

const PageContainer = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const RequirementsContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
  position: relative;
  z-index: 1;
`;

const RequirementTitle = styled.h2`
  color: #333;
  margin-bottom: 25px;
  font-size: 24px;
  text-align: center;
`;

const RequirementList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RequirementItem = styled.li`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FileName = styled.span`
  font-size: 18px;
  color: #555;
  padding-right: 15px;
`;

const DownloadLink = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoRequirements = styled.p`
  color: #888;
  text-align: center;
`;

const ApplyButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #218838;
  }
`;

const RejectButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #c82333;
  }
`;

const FeedbackMessage = styled.p`
  color: ${({ type }) => (type === 'reject' ? '#dc3545' : '#28a745')};
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
`;

const ApplyJob = () => {
  const { job_id } = useParams();
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await http.get(`/jobs/job-requirements/${job_id}`);
        setRequirements(response.data);
      } catch (error) {
        console.error("Error fetching requirements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [job_id]);

  const handleApply = async (applicationId) => {
    try {
      await http.post(`/jobs/apply/${applicationId}`);
      setMessage('You have applied for this job.');
      setMessageType('apply');
    } catch (error) {
      console.error("Error applying for the job:", error);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await http.post(`/jobs/reject/${applicationId}`);
      setMessage('You have rejected this job.');
      setMessageType('reject');
    } catch (error) {
      console.error("Error rejecting the application:", error);
    }
  };

  return (
    <PageContainer>
      <Overlay />
      <RequirementsContainer>
        <RequirementTitle>Pending Applications</RequirementTitle>
        {loading ? (
          <NoRequirements>Loading...</NoRequirements>
        ) : requirements.length > 0 ? (
          <RequirementList>
            {requirements.map((app) => (
              <RequirementItem key={app.id}>
                <FileName>{app.CV}</FileName>
                <DownloadLink href={`/files/${app.CV}`} download>
                  Download
                </DownloadLink>
                  
                    <ApplyButton onClick={() => handleApply(app.id)}>
                      Apply
                    </ApplyButton>
                    <RejectButton onClick={() => handleReject(app.id)}>
                      Reject
                    </RejectButton>
                  
              </RequirementItem>
            ))}
          </RequirementList>
        ) : (
          <NoRequirements>No pending applications.</NoRequirements>
        )}
        {message && <FeedbackMessage type={messageType}>{message}</FeedbackMessage>}
      </RequirementsContainer>
    </PageContainer>
  );
};

export default ApplyJob;
