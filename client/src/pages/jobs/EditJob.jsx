import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../../assets/css/EditJob.css';
import useJobUpdate from '../../hooks/useJobUpdate.js';


const compensationTypes = ["One-Time", "Periodcally", "Other"];
const currencies = ["USD", "EUR", "POUND", "VND"];
const compensationPeriods = ["Year", "Month", "Week", "Day", "Hour"];

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {  job, loading, error, success, handleInputChange, handleSubmit } = useJobUpdate(id);
  

  if (loading) {
    return <div className="loading-spinner" />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="background-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      <div className="job-edit-container">
        <h1 className="title">Edit Job</h1>
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(navigate);
        }}>
          <div className="section">
            <h2 className="label">Job Title:</h2>
            <input className="input" name="job_title" value={job.job_title} onChange={handleInputChange} />
          </div>
          <div className="section">
            <h2 className="label">Location:</h2>
            <input className="input" name="job_work_location" value={job.job_work_location} onChange={handleInputChange} />
          </div>
          <div className="section">
            <h2 className="label">Max Applications:</h2>
            <input className="input" name="job_max_applications" type="number" value={job.job_max_applications} onChange={handleInputChange} />
          </div>
          <div className="section">
            <h2 className="label">Number of Recruits:</h2>
            <input className="input" name="job_number_of_recruits" type="number" value={job.job_number_of_recruits} onChange={handleInputChange} />
          </div>
          <div className="section">
            <h2 className="label">Start Date:</h2>
            <input className="input" name="job_start_date" type="date" value={job.job_start_date} onChange={handleInputChange} />
          </div>
          <div className="section">
            <h2 className="label">End Date:</h2>
            <input className="input" name="job_end_date" type="date" value={job.job_end_date} onChange={handleInputChange} />
          </div>
          <div className="section">
            <h2 className="label">Requirements:</h2>
            <textarea rows={4} className="textarea" name="job_requirements" value={job.job_requirements} onChange={handleInputChange} />
          </div>
          <div className="section">
            <h2 className="label">Compensation Type:</h2>
            <select className="input" name="job_compensation_types" value={job.job_compensation_types} onChange={handleInputChange}>
              {compensationTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="section">
            <h2 className="label">Compensation Amount:</h2>
            <input className="input" name="job_compensation_amounts" value={job.job_compensation_amounts} onChange={handleInputChange} />
          </div>
          <div className="section">
            <h2 className="label">Currency:</h2>
            <select className="input" name="job_compensation_currencies" value={job.job_compensation_currencies} onChange={handleInputChange}>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div className="section">
            <h2 className="label">Compensation Period:</h2>
            <select className="input" name="job_compensation_periods" value={job.job_compensation_periods} onChange={handleInputChange}>
              {compensationPeriods.map((period) => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
          <div className="section">
            <h2 className="label">Custom Iterations:</h2>
            <textarea className="textarea" name="job_custom_iterations" value={job.job_custom_iterations} onChange={handleInputChange} />
          </div>
          <div className="section">
            <h2 className="label">Description:</h2>
            <textarea rows={5} className="textarea" name="job_description" value={job.job_description} onChange={handleInputChange} />
          </div>
          <div className="section">
            <h2 className="label">Contact Info:</h2>
            <textarea className="textarea" name="job_contact_info" value={job.job_contact_info} onChange={handleInputChange} />
          </div>
          <button className="save-button" type="submit" onClick={handleSubmit}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;