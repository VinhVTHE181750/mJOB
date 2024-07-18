import React, {useState} from 'react';
import '../../assets/css/EnlistJob.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Form, Row,} from 'react-bootstrap';
import useJobInsert from "../../hooks/useJobInsert.js";

const EnlistJob = () => {
  const [additionalRequirements, setAdditionalRequirements] = useState([]);
  const { insertJob, loading, error, success } = useJobInsert();

  const [formValues, setFormValues] = useState({
    job_title: '',
    job_work_location: '',
    job_tags: '',
    job_max_applications: '',
    job_approval_method: true,
    job_requirements: '',
    job_number_of_recruits: '',
    job_start_date: '',
    job_end_date: '',
    job_compensation_type: '',
    //isChecked: false,
    job_compensation_amounts: '',
    job_compensation_currencies: '',
    job_compensation_periods: '',
    job_custom_iterations: '',
    job_description: '',
    job_contact_info: ''
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
    const updatedRequirements = additionalRequirements.map((req, i) => 
      i === index ? value : req
    );
    setAdditionalRequirements(updatedRequirements);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'job_description') {
    const formattedValue = value.replace(/\n{2,}/g, '\n');
    setFormValues({
      ...formValues,
      [name]: formattedValue,
    });
  } else {
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  }
};

  const handleSubmit = () => {
    const jobRequirements = additionalRequirements.join(';'); // Join requirements with a newline as delimiter
    const jobData = {
      ...formValues,
      job_requirements: jobRequirements,
    };
    insertJob(jobData);
  };
  
 
/* 

       COL 1 | COL 2 | COL 3
ROW 1  TITLE  
ROW 2  WORK TYPE | LOCATION
ROW 3  TAGS


*/

return (
 
    <Container className='container'>
      <Form className='form' onSubmit={handleSubmit}>
        <Button href="/" className='back-button'>Back</Button>
        <Row><h1 className='header1'>Enlist a Job</h1></Row>
        <Row><h3 className='header2'>General Information</h3></Row>
        <Row className="m-auto align-self-center w-100">
          <Col md={{ span: 10, offset: 1 }}>
            <Form.Group controlId="title">
              <Form.Label>Job Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter job title" 
                className='input'
                name="job_title"
                value={formValues.job_title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="m-auto align-self-center w-100">
          <Col md={{ span: 10, offset: 1 }}>
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
        <Row className="m-auto align-self-center w-100">
          <Col md={{ span: 10, offset: 1  }}>
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
        <Row><h3 className='header2'>Recruitment Settings</h3></Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="maxApplications">
              <Form.Label>Max applications</Form.Label>
              <Form.Control 
                type="number" 
                placeholder='Max Applications'
                name="job_max_applications"
                value={formValues.job_max_applications}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="approvalMethod">
              <Form.Label>Approval method</Form.Label>
              <Form.Control 
                as="select" 
                name="job_approval_method"
                value={formValues.job_approval_method}
                onChange={handleChange}
              >
                <option>Auto</option>
                <option>Manual</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="numberOfRecruits">
              <Form.Label>Number of recruits</Form.Label>
              <Form.Control 
                type="number" 
                placeholder='Number of recruits'
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
                placeholder='Start date'
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
                placeholder='End date'
                name="job_end_date"
                value={formValues.job_end_date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row><h3 className='header4'>Requirements</h3></Row>
        <Col>
          <Row>
            <Form.Group controlId="CV">
              <Form.Label className='header3'>Document: CV</Form.Label>
            </Form.Group>
            <Col>
              <Button className="circle-button" onClick={handleAddRequirement}>+</Button>
              {additionalRequirements.map((job_requirements, index) => (
                <div key={index} className="additional-requirement-wrapper">
                  <Form.Control 
                    as="textarea"
                    rows={1}
                    className="additional-requirement-input"
                    name="job_requirements"
                    value={job_requirements}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder="Enter requirement"
                  />
                  <Button className="remove-button" onClick={() => handleRemoveRequirement(index)}>x</Button>
                </div>
              ))}
            </Col>
          </Row>
        </Col>
        <Row><h3 className='header4'>Compensation</h3></Row>
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
                <option>One-time</option>
                <option>Periodically</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="radioOptions" className="mt-3">
              <Form.Check 
                type="checkbox" 
                label="Pay with mJOB balance" 
                name="isChecked" 
                id="compensationOption1" 
                checked={formValues.isChecked}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control 
                type="number" 
                placeholder='Amount'
                name="job_compensation_amounts"
                value={formValues.job_compensation_amounts}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Form.Group controlId="currency">
              <Form.Label>*</Form.Label>
              <Form.Control 
                as="select" 
                name="job_compensation_currencies"
                value={formValues.job_compensation_currencies || 'VND'}
                onChange={handleChange}
              >
                <option>VND</option>
                <option>EUR</option>
                <option>USD</option>
                <option>POUND</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Label>per</Form.Label>
            <Form.Control 
              as="select" 
              name="job_compensation_periods"
              value={formValues.job_compensation_periods}
              onChange={handleChange}
            >
              <option>month</option>
              <option>week</option>
              <option>day</option>
              <option>hour</option>
              <option>custom</option>
            </Form.Control>
          </Col>
          <Col md={6}>
            <Form.Label>Custom Iteration</Form.Label>
            <Form.Control 
              type="text" 
              placeholder='Custom Iteration/hours per day if necessary'
              name="job_custom_iterations"
              value={formValues.job_custom_iterations}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row><h3 className='header2'>Additional Information</h3></Row>
        <Col>
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as='textarea' 
            rows={5} 
            type="text" 
            placeholder='Enter Description'
            name="job_description"
            value={formValues.job_description}
            onChange={handleChange}
          />
        </Col>
        <Row>
          <Col>
            <Form.Label className='headinfo'>Contact Info</Form.Label>
            <Form.Control 
              as='textarea' 
              rows={1} 
              type="text" 
              placeholder='Contact Info*' 
              className='contactinfo'
              name="job_contact_info"
              value={formValues.job_contact_info}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Button type="submit" className='enlistbutton' onClick={handleSubmit} disabled={loading}>
          {loading ? 'Enlisting...' : 'Enlist'}
        </Button>
        {/* {error && <p className="error-message">{error}</p>} */}
        {success && <p className="success-message">Job successfully enlisted!</p>}
      </Form>
    </Container>
  
);
};

export default EnlistJob;