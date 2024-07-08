import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


const BackgroundContainer = styled.div`
  background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const JobDetailContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  @media (max-width: 600px) {
    padding: 15px;
  }
    margin-bottom: 30px;
`;

const BackButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, transform 0.3s;
  width: fit-content;
  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  svg {
    margin-right: 5px;
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.h2`
  font-size: 1.75em;
  margin-bottom: 10px;
  color: #007bff;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1.2px;
`;

const Text = styled.p`
  font-size: 1.2em;
  line-height: 1.8;
  margin-bottom: 10px;
  color: #555;
  font-weight: bold;
`;

const ApplyButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 25px;
  cursor: pointer;
  font-size: 1.2em;
  display: block;
  margin: 0 auto;
  transition: background-color 0.3s, transform 0.3s;
  border-radius: 50px;
  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
`;

const LoadingSpinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `} 2s linear infinite;
  margin: 50px auto;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 1.2em;
`;

const JobDetail = () => {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const jobId = id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/jobs/${jobId}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching job details.');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);
  const formatDate = (dateString) => {
    if (!dateString) return '';

    // Nếu đầu vào chứa 'T' hoặc 'Z', loại bỏ phần thời gian
    let dateOnly = dateString.split('T')[0];

    // Nếu chuỗi có dạng 'YYYY-MM-DD', tách và định dạng lại
    if (dateOnly.includes('-')) {
      const [year, month, day] = dateOnly.split('-');
      return `${day}/${month}/${year}`;
    }

    // Nếu không, chuyển đổi thành đối tượng Date và định dạng lại
    const dateObj = new Date(dateOnly);
    return dateObj.toLocaleDateString('vi-VN');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }


  return (
    <BackgroundContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </BackButton>
      <JobDetailContainer>
        <Title>{job.job_title}</Title>
        <Section>
          <Label>Location:</Label>
          <Text>{job.job_work_location}</Text>
        </Section>
        <Section>
          <Label>Max Applications:</Label>
          <Text>{job.job_max_applications}</Text>
        </Section>
        <Section>
          <Label>Number of recruits:</Label>
          <Text>{job.job_number_of_recruits}</Text>
        </Section>
        <Section>
          <Label>From:</Label>
          <Text>{formatDate(job.job_start_date)}</Text>
          <Label>To:</Label>
          <Text>{formatDate(job.job_end_date)}</Text>
        </Section>
        <Section>
          <Label>Requirements:</Label>
          <Text>{job.job_requirements} </Text>
        </Section>
        <Section>
          <Label>Compensation:</Label>
          <Text>Type: {job.job_compensation_types}</Text>
          <Text>Amount: {job.job_compensation_amounts} {job.job_compensation_currencies} per {job.job_compensation_periods}</Text>
        </Section>
        <Section>
          <Label>Custom Iterations:</Label>
          <Text> {job.job_custom_iterations}</Text>
        </Section>
        <Section>
          <Label>Description:</Label>
          <Text>{job.job_description}</Text>
        </Section>
        <Section>
          <Label>Contact Info:</Label>
          <Text>{job.job_contact_info}</Text>
        </Section>
        <ApplyButton onClick={() => navigate('/confirm-job', { state: { job } })}>Apply</ApplyButton>
      </JobDetailContainer>
    </BackgroundContainer>
  );
};

export default JobDetail;