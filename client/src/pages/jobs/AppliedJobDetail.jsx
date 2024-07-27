import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import http from '../../functions/httpService';

const Container = styled.div`
  max-width: 750px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
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

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AppliedJobDetail = () => {
  const { job_id } = useParams();
  const [jobDetail, setJobDetail] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await http.get(`/applied-job-detail/${job_id}`);
        setJobDetail(response.data);
      } catch (error) {
        console.error('Error fetching job detail:', error);
      }
    };

    fetchJobDetail();
  }, [job_id]);

  if (!jobDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <BackButton href="/active-job">Back</BackButton>
      <Title>Manage: {jobDetail.job_title}</Title>
      <Paragraph><strong>Created by:</strong> User {jobDetail.user_id}</Paragraph>
      <FlexContainer>
        <Paragraph><strong>Payment period:</strong> {jobDetail.job_compensation_type}</Paragraph>
        <Paragraph><strong>Amount:</strong> {jobDetail.job_compensation_amount} {jobDetail.job_compensation_currency} / {jobDetail.job_compensation_period}</Paragraph>
      </FlexContainer>
      <Paragraph><strong>Attendance:</strong> {jobDetail.job_description}</Paragraph>
      <Paragraph><strong>Today:</strong> {jobDetail.job_start_date}</Paragraph>
    </Container>
  );
};

export default AppliedJobDetail;
