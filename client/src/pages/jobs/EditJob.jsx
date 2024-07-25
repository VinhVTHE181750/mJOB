import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/EditJob.css";
import useJobUpdate from "../../hooks/useJobUpdate.js";

const compensationTypes = ["AGREEMENT", "ONETIME", "HOURLY", "DAILY", "WEEKLY", "MONTHLY", "PERCENTAGE"];
const currencies = ["USD", "EUR", "POUND", "VND"];

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { job, loading, error, success, handleInputChange, handleSubmit } = useJobUpdate(id);

  if (loading) {
    return <div className="loading-spinner" />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="background-container">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </button>
      <div className="job-edit-container">
        <h1 className="title">Edit Job</h1>
        {success && <p className="success-message">{success}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(navigate);
          }}
        >
          <div className="section">
            <h2 className="label">Job Title:</h2>
            <input
              className="input"
              name="title"
              value={job.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="section">
            <h2 className="label">Location:</h2>
            <input
              className="input"
              name="location"
              value={job.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="section">
            <h2 className="label">Max Applications:</h2>
            <input
              className="input"
              name="maxApplicants"
              type="number"
              value={job.maxApplicants}
              onChange={handleInputChange}
            />
          </div>
          <div className="section">
            <h2 className="label">Number of Recruits:</h2>
            <input
              className="input"
              name="recruitments"
              type="number"
              value={job.recruitments}
              onChange={handleInputChange}
            />
          </div>
          <div className="section">
            <h2 className="label">Start Date:</h2>
            <input
              className="input"
              name="startDate"
              type="date"
              value={job.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="section">
            <h2 className="label">End Date:</h2>
            <input
              className="input"
              name="endDate"
              type="date"
              value={job.endDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="section">
            <h2 className="label">Requirements:</h2>
            <textarea
              rows={4}
              className="textarea"
              name="tags"
              value={job.tags}
              onChange={handleInputChange}
            />
          </div>
          <div className="section">
            <h2 className="label">Compensation Type:</h2>
            <select
              className="input"
              name="salaryType"
              value={job.salaryType}
              onChange={handleInputChange}
            >
              {compensationTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="section">
            <h2 className="label">Compensation Amount:</h2>
            <input
              className="input"
              name="salaryAmount"
              value={job.salaryAmount}
              onChange={handleInputChange}
            />
          </div>   
          <div className="section">
            <h2 className="label">Currency:</h2>
            <select
              className="input"
              name="salaryCurrency"
              value={job.salaryCurrency}
              onChange={handleInputChange}
            >
              {currencies.map((currency) => (
                <option
                  key={currency}
                  value={currency}
                >
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="section">
            <h2 className="label">Description:</h2>
            <textarea
              rows={5}
              className="textarea"
              name="description"
              value={job.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="section">
            <h2 className="label">Contact Info:</h2>
            <textarea
              className="textarea"
              name="contact"
              value={job.contact}
              onChange={handleInputChange}
            />
          </div>
          {success && <p className="success-message">{success}</p>}
          <button
            className="save-button"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
