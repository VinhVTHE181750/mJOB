import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../../assets/img/apply.jpg';
import http from '../../functions/httpService';

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
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #218838;
  }
`;

const ApplyJob = () => {
  const [requirements, setRequirements] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await http.get(`/jobs/job-requirements/${id}`);
        setRequirements(response.data);
      } catch (error) {
        console.error('Error fetching job requirements:', error);
      }
    };

    fetchRequirements();
  }, [id]);

  const handleApply = async () => {
    try {
      const job_requirement_data = JSON.stringify(requirements);
      await http.post('/jobs/apply-job', {
        job_id,
        user_id, // Make sure `user_id` is defined or fetched from a proper source
        job_requirement_data,
      });
      alert('Applied to job successfully!');
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Failed to apply for the job.');
    }
  };

  return (
    <PageContainer>
      <Overlay />
      <RequirementsContainer>
        <RequirementTitle>Job Requirements</RequirementTitle>
        {requirements.length > 0 ? (
          <RequirementList>
            {requirements.map((req) => {
              const fileDetails = JSON.parse(req.data); // Assuming `req.data` contains the JSON string
              const downloadUrl = `/download/${fileDetails.file_name}`;
              return (
                <RequirementItem key={req.RequirementId}>
                  <FileName>{fileDetails.file_name}</FileName>
                  <DownloadLink href={downloadUrl} download={fileDetails.file_name}>
                    Download
                  </DownloadLink>
                </RequirementItem>
              );
            })}
          </RequirementList>
        ) : (
          <NoRequirements>No requirements found for this job.</NoRequirements>
        )}
        <ApplyButton onClick={handleApply}>Apply for Job</ApplyButton>
      </RequirementsContainer>
    </PageContainer>
  );
};

export default ApplyJob;
