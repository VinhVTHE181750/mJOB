import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Dropdown, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../../components/job/SearchBar.jsx';
import FilterPrice from '../../components/job/FilterPrice.jsx';
import JobPagination from '../../components/job/JobPagination.jsx';
import  useJobList  from "../../hooks/useJobList";
import  useJobListbyview  from "../../hooks/useJobListbyView.js";
import  useJobListbytime  from "../../hooks/useJobListbyTime.js";
import '../../assets/css/JobList.css'

function JobList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('default');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;
  
    const { contents: defaultContents, loading: defaultLoading, error: defaultError } = useJobList();
    const { contents: viewContents, loading: viewLoading, error: viewError } = useJobListbyview();
    const { contents: timeContents, loading: timeLoading, error: timeError } = useJobListbytime();
  
    let contents = defaultContents;
    let loading = defaultLoading;
    let error = defaultError;


    switch (filter) {
      case 'relevance':
        contents = viewContents;
        loading = viewLoading;
        error = viewError;
        break;
      case 'recent':
        contents = timeContents;
        loading = timeLoading;
        error = timeError;
        break;
      case 'salaryIncrease':
        contents.sort((a, b) => parseFloat(a.job_compensation_amount) - parseFloat(b.job_compensation_amount));
        break;
      case 'salaryDecrease':
        contents.sort((a, b) => parseFloat(b.job_compensation_amount) - parseFloat(a.job_compensation_amount));
        break;
      default:
        contents = defaultContents;
        loading = defaultLoading;
        error = defaultError;
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    const handleStartPriceChange = (value) => {
      setMinSalary(value);
    };
  
    const handleEndPriceChange = (value) => {
      setMaxSalary(value);
    };
  
    const filteredContents = contents.filter(content => {
      const salary = parseFloat(content.job_compensation_amount);
      const isWithinSalaryRange = (!minSalary || salary >= parseFloat(minSalary)) && (!maxSalary || salary <= parseFloat(maxSalary));
      return content.job_title.toLowerCase().includes(searchQuery.toLowerCase()) && isWithinSalaryRange;
    });


    

    const formatSalary = (type, amount,currency) => {
      switch (type.toUpperCase()) {
        case 'ONETIME':
          return `${amount} ${currency}`;
        case 'HOURLY':
          return `${amount} ${currency}/hour`;
        case 'MONTHLY':
          return `${amount} ${currency}/month`;
        default:
          return amount;
      }
    };

      // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredContents.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  
    return (
      <Container>
        <Row style={{alignItems: 'center'}}>
          <Col md={3}>
            <SearchBar onSearch={setSearchQuery} />
          </Col>
          <Col md={5}>
          <FilterPrice onStartPrice={handleStartPriceChange} onEndPrice={handleEndPriceChange} />
          </Col>
          <Col md={4}>
            <Form style={{width: '50%'}}>
            <Form.Group controlId="filterDropdown">
              <Form.Select
                value={filter}
                aria-placeholder='Filter'
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="relevance">Relevance</option>
                <option value="recent">Recent</option>
                <option value="salaryIncrease">Salary (Low to High)</option>
                <option value="salaryDecrease">Salary (High to Low)</option>
              </Form.Select>
            </Form.Group>
          </Form>
          </Col>
        </Row>

        <Row>
          <Col>
          <JobPagination jobsPerPage={jobsPerPage} totalJobs={filteredContents.length} paginate={paginate} currentPage={currentPage} />
            <div>
              {currentJobs.length === 0 ? (
                 <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '40px', fontWeight: 'bold', height: '200px' }}>Sorry, There is no job that fulfills your requirements.</p>
              ): (
                
                currentJobs.map(content => (
              <div className="job-card" key={content.job_id}>
                <div className="job-card-img">IMG Background</div>
                <div className="job-card-content">
                  <div className="job-card-header">
                    <h2 className="job-title">{content.job_title}</h2>
                    <a href={`/jobs/${content.job_id}`} className="job-detail-link">Detail</a>
                  </div>
                  <div className="job-card-body">
                    <div className="job-info">
                      <p>Creator: {content.username}</p>
                      <p>Job Tag: {content.job_tags}</p>
                      <p>Location: {content.job_work_location}</p>
                    </div>
                     <div className="job-info-right">
                      <p  className='tag'>{formatSalary(content.job_compensation_type, content.job_compensation_amount,content.job_compensation_currency)}</p>
                      <p>{content.timeleft} days left</p>
                    </div> 
                  </div>
                </div>
            </div>
              )
            ))}
            <JobPagination jobsPerPage={jobsPerPage} totalJobs={filteredContents.length} paginate={paginate} currentPage={currentPage}/>
            </div>
          </Col>
        </Row>
      </Container>
    );
}

export default JobList