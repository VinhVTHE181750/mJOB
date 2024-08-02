import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import "../../assets/css/EnlistJob.css";
import NavigateButton from "../../components/ui/buttons/NavigateButton.jsx";
import useJobInsert from "../../hooks/useJobInsert.js";
import { useNavigate } from "react-router";

const EnlistJob = () => {
  const [additionalRequirements, setAdditionalRequirements] = useState([]);
  const { insertJob, loading, error, success } = useJobInsert();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    job_title: "",
    job_work_location: "",
    job_tags: "",
    job_max_applications: "",
    job_approval_method: "AUTO",
    job_requirements: [],
    job_number_of_recruits: "",
    job_start_date: "",
    job_end_date: "",
    job_compensation_type: "",
    //isChecked: false,
    job_compensation_amounts: "",
    // job_compensation_currencies: '',
    // job_compensation_periods: '',
    // job_custom_iterations: '',
    job_description: "",
    job_contact_info: "",
  });
  const handleAddRequirement = () => {
    setAdditionalRequirements([...additionalRequirements, ""]);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleRemoveRequirement = (indexToRemove) => {
    setAdditionalRequirements(additionalRequirements.filter((_, index) => index !== indexToRemove));
  };
  const handleRequirementChange = (index, value) => {
    const updatedRequirements = additionalRequirements.map((req, i) => (i === index ? value : req));
    setAdditionalRequirements(updatedRequirements);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "job_description") {
      const formattedValue = value.replace(/\n{2,}/g, "\n");
      setFormValues({
        ...formValues,
        [name]: formattedValue,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const jobRequirements = additionalRequirements.join(";"); // Join requirements with a newline as delimiter
    const jobData = {
      ...formValues,
      job_requirements: jobRequirements,
    };
    try {
      await insertJob(jobData);
      // Navigate only if insertion is successful
      if (success) {
        navigate("/myjobs");
      }
    } catch (error) {
      console.error("Error inserting job:", error);
      // Handle error state here, e.g., showing an error message to the user
    }
  };

  /* 
  
         COL 1 | COL 2 | COL 3
  ROW 1  TITLE  
  ROW 2  WORK TYPE | LOCATION
  ROW 3  TAGS
  
  
  */

  return (
    <Container className="border border-success rounded">
      <Form
        className="form"
        onSubmit={handleSubmit}
      >
        <NavigateButton
          path="/myjobs"
          text={"Back"}
          icon={<BsArrowLeft />}
        />
        <Row>
          <h1 className="header1">Enlist a Job</h1>
        </Row>
        <Row>
          <h3 className="header2">General Information</h3>
        </Row>
        <Row className="mx-0 align-self-center w-100">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                className="input"
                name="job_title"
                value={formValues.job_title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mx-0 align-self-center w-100">
          <Col>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="job_work_location"
                value={formValues.job_work_location}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mx-0 align-self-center w-100">
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tags"
                name="job_tags"
                value={formValues.job_tags}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h3 className="header2">Recruitment Settings</h3>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="maxApplications">
              <Form.Label>Max applications</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max Applications"
                name="job_max_applications"
                value={formValues.job_max_applications}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
          <Form.Group controlId="approvalMethod">
              <Form.Label>Approval Method</Form.Label>
              <Form.Control
                as="select"
                name="job_approval_method"
                value={formValues.job_approval_method}
                onChange={handleChange}
              >
                <option value={true}>Auto</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="numberOfRecruits">
              <Form.Label>Number of recruits</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number of recruits"
                name="job_number_of_recruits"
                value={formValues.job_number_of_recruits}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="startDate">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Start date"
                name="job_start_date"
                value={formValues.job_start_date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="endDate">
              <Form.Label>End date</Form.Label>
              <Form.Control
                type="date"
                placeholder="End date"
                name="job_end_date"
                value={formValues.job_end_date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h3 className="header4">Requirements</h3>
        </Row>
        <Col>
          <Row>
            <Form.Group controlId="CV">
              <Form.Label className="header3">Click to add a requirement</Form.Label>
            </Form.Group>
            <Col>
              <Button
                className="circle-button"
                onClick={handleAddRequirement}
              >
                +
              </Button>
              {additionalRequirements.map((job_requirements, index) => (
                <div
                  key={index}
                  className="additional-requirement-wrapper"
                >
                  <Form.Control
                    as="textarea"
                    rows={1}
                    className="additional-requirement-input"
                    name="job_requirements"
                    value={job_requirements}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder="Enter requirement"
                  />
                  <Button
                    className="remove-button"
                    onClick={() => handleRemoveRequirement(index)}
                  >
                    x
                  </Button>
                </div>
              ))}
            </Col>
          </Row>
        </Col>
        <Row>
          <h3 className="header4">Compensation</h3>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="compensationType">
              <Form.Label>Compensation type</Form.Label>
              <Form.Control
                as="select"
                name="job_compensation_type"
                value={formValues.job_compensation_type}
                onChange={handleChange}
              >
                <option value="AGREEMENT">Agreement</option>
                <option value="NONE">None</option>
                <option value="ONETIME">Once</option>
                <option value="HOURLY">Hourly</option>
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="PERCENTAGE">Percentage</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Amount"
                name="job_compensation_amounts"
                value={formValues.job_compensation_amounts}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h3 className="header2">Additional Information</h3>
        </Row>
        <Col>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            type="text"
            placeholder="Enter Description"
            name="job_description"
            value={formValues.job_description}
            onChange={handleChange}
          />
        </Col>
        <Row>
          <Col>
            <Form.Label className="headinfo">Contact Info</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              type="text"
              placeholder="Contact Info*"
              className="contactinfo"
              name="job_contact_info"
              value={formValues.job_contact_info}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-2">
          <Button
            type="submit"
            variant="success"
            className="enlistbutton"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
        {/* {error && <p className="error-message">{error}</p>} */}
        {success && <p className="success-message">Job successfully enlisted!</p>}
      </Form>
    </Container>
  );
};

export default EnlistJob;
