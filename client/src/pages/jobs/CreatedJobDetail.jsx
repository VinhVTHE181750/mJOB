import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from "../../functions/httpService";
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Detail = styled.div`
  margin-bottom: 20px;
`;

const CreatedJobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await http.get(`/jobs/created-job-detail/${id}`);
        setJob(response.data);
      } catch (error) {
        setError("Error fetching job details.");
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (error) {
    return <Container>{error}</Container>;
  }

  if (!job) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h1>Job Details</h1>
      <Detail>
        <strong>Title:</strong> {job.title}
      </Detail>
      <Detail>
        <strong>Type:</strong> {job.type}
      </Detail>
      <Detail>
        <strong>Salary:</strong> {job.salary} {job.salaryCurrency}
      </Detail>
      <Detail>
        <strong>Status:</strong>
        {job.Applications.map((application, index) => (
          <div key={index}>
            <span>{application.status}</span>
          </div>
        ))}
      </Detail>
      {/* Add more job details as needed */}
    </Container>
  );
};

export default CreatedJobDetail;
