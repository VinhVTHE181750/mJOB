import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../../components/job/SearchBar.jsx';
import FilterPrice from '../../components/job/FilterPrice.jsx';
import JobPagination from '../../components/job/JobPagination.jsx';
import useJobListbyDefault from '../../hooks/job/market/useJobListbbyDefault.js';
import useJobListbyView from '../../hooks/job/market/useJobListbyView.js';
import useJobListbyDate from '../../hooks/job/market/useJobListbyDate.js';
import LocationDropdown from './LocationDropdown.jsx';
import '../../assets/css/JobList.css';
import { useNavigate } from 'react-router';
import useWhoAmI  from '../../hooks/user/useWhoAmI';
function JobList() {
  const { fetchMe, userId} = useWhoAmI();
  useEffect(() => {
    fetchMe();
  }, [userId]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('default');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const jobsPerPage = 10;
  const navigate = useNavigate();
  const { contents: defaultContents, loading: defaultLoading, error: defaultError } = useJobListbyDefault(userId);
  const { contents: viewContents, loading: viewLoading, error: viewError } = useJobListbyView();
  const { contents: timeContents, loading: timeLoading, error: timeError } = useJobListbyDate();
  const defaultAvatarUrl = 'https://www.topcv.vn/v4/image/normal-company/logo_default.png';

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
      contents.sort((a, b) => parseFloat(a.salary) - parseFloat(b.salary));
      break;
    case 'salaryDecrease':
      contents.sort((a, b) => parseFloat(b.salary) - parseFloat(a.salary));
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

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const filteredContents = contents.filter(content => {
    const salary = parseFloat(content.salary);
    const isWithinSalaryRange = (!minSalary || salary >= parseFloat(minSalary)) && (!maxSalary || salary <= parseFloat(maxSalary));
    const isLocationMatch = !selectedLocation || selectedLocation.value === null || content.location === selectedLocation.value;

    return content.title.toLowerCase().includes(searchQuery.toLowerCase()) && isWithinSalaryRange && isLocationMatch;
  });

  const formatSalary = (type, amount, currency) => {
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

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredContents.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleJobTitleClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleEmployerNameClick = (userId) => {
    navigate(`/employer/${userId}`);
  };

  return (
    <Container>
      <Row style={{ alignItems: 'center' }}>
        <Col md={3}>
          <SearchBar onSearch={setSearchQuery} />
        </Col>
        <Col md={4}>
          <FilterPrice onStartPrice={handleStartPriceChange} onEndPrice={handleEndPriceChange} />
        </Col>
        <Col md={3}>
          <Form style={{ width: '50%' }}>
            <Form.Group controlId="filterDropdown">
              <Form.Select
                style={{ width: 'unset' }}
                value={filter}
                aria-placeholder='Filter'
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="relevance">Popular</option>
                <option value="recent">Recent</option>
                <option value="salaryIncrease">Salary (Low to High)</option>
                <option value="salaryDecrease">Salary (High to Low)</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
        <Col md={2}>
          <LocationDropdown onChange={handleLocationChange} />
        </Col>
      </Row>

      <Row>
        <Col>
          <JobPagination jobsPerPage={jobsPerPage} totalJobs={filteredContents.length} paginate={paginate} currentPage={currentPage} />
          <div>
          {currentJobs.length === 0 ? (
              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '40px', fontWeight: 'bold', height: '200px' }}>Sorry, There is no job that fulfills your requirements.</p>
            ) : (
              currentJobs.map(content => (
                <div className="job-card" key={content.id}>
                  <div className="job-card-img">
                    <img
                      src={defaultAvatarUrl}
                      alt={content.User.username}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="job-card-content">
                    <div className="job-card-header">
                      <h2 className="job-title" onClick={() => handleJobTitleClick(content.id)}>{content.title}</h2>
                      <a href={`/jobs/${content.id}`} className="job-detail-link">Detail</a>
                    </div>
                    <div className="job-card-body">
                      <div className="job-info">
                        <p style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'darkgray' }} onClick={() => handleEmployerNameClick(content.UserId)}>Creator: {content.User.EmployerProfile.name}</p>
                        <p>Job Tag: {content.tags}</p>
                        <p>Location: {content.location}</p>
                      </div>
                      <div className="job-info-right">
                        <p className='tag'>{formatSalary(content.salaryType, content.salary, content.salaryCurrency)}</p>
                        <p>{content.timeleft} days left</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            <JobPagination jobsPerPage={jobsPerPage} totalJobs={filteredContents.length} paginate={paginate} currentPage={currentPage} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default JobList;
