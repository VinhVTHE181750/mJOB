import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../../../../client/src/context/UserContext';

const BackgroundContainer = styled.div`
  background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ConfirmationContainer = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 1000px;
  max-height: 1000px;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.2em;
`;

const RequirementList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 20px;
  text-align: left;
`;

const RequirementItem = styled.li`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const ConfirmButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.3s;
  border-radius: 50px;
  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
`;

const UploadButton = styled.label`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.2em;
  border-radius: 50px;
  display: inline-block;
  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 50px;
  margin-left: 10px;
  &:hover {
    background-color: #c82333;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0 0;
  text-align: left;
`;

const FileItem = styled.li`
  font-size: 1em;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const ConfirmJob = () => {
  const { handleRedirectError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { job } = location.state || {};
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('job_id', job.job_id);

      await axios.post('http://localhost:8000/api/jobs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Application confirmed!');
      navigate('/market');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
      handleRedirectError("server error");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
  };

  const handleFileDelete = (fileToDelete) => {
    setSelectedFiles(selectedFiles.filter(file => file !== fileToDelete));
  };

  return (
    <BackgroundContainer>
      <ConfirmationContainer>
        <Title>Confirm Your Application</Title>
        <h2>Requirements:</h2>
        <RequirementList>
          {job.job_requirements.split('. ').map((req, index) => (
            <RequirementItem key={index}>{req}</RequirementItem>
          ))}
        </RequirementList>
        <Label>Upload File</Label>
        <UploadButton>
          +
          <FileInput type="file" multiple onChange={handleFileChange} />
        </UploadButton>
        {selectedFiles.length > 0 && (
          <FileList>
            {selectedFiles.map((file, index) => (
              <FileItem key={index}>
                {file.name}
                <DeleteButton onClick={() => handleFileDelete(file)}>Delete</DeleteButton>
              </FileItem>
            ))}
          </FileList>
        )}
        <br />
        <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
      </ConfirmationContainer>
    </BackgroundContainer>
  );
};

export default ConfirmJob;
