import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Col, Dropdown, Spinner, Card } from 'react-bootstrap';
import useUserJobHistory from '../../hooks/job/dashboard/useUserJobHistory';
import useJobStatus from '../../hooks/job/dashboard/useJobStatus';
import useJobListByStatus from '../../hooks/job/dashboard/useJobListByStatus';
import '../../assets/css/JobHistory.css';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import useCreatorJobHistory from '../../hooks/job/jobhistory/useCreatorJobHistory';

ChartJS.register(ArcElement, Tooltip, Legend);

function History(user) {
  // const { fetchMe, userId, username, role } = useWhoAmI();
  const userId = user.user.id;

  const { jobList: initialJobList, loading: initialLoading, error: initialError, fetchJobList } = useUserJobHistory();
  const { statuses: statusList, loading: statusLoading, error: statusError } = useJobStatus(userId);
  const [selectedStatus, setSelectedStatus] = useState('');
  const { jobs: jobListByStatus, loading: jobListLoading, error: jobListError } = useJobListByStatus(userId, selectedStatus || 'ongoing')
  const { jobHistory, loading, error, fetchJobHistory } = useCreatorJobHistory();

  const [filteredJobList, setFilteredJobList] = useState([]);

  // if (loading) {
  //   return (
  //     <Container>
  //       <Row className="justify-content-center">
  //         <Col md={6} className="text-center">
  //           <Spinner animation="border" role="status">
  //             <span className="sr-only">Loading...</span>
  //           </Spinner>
  //           <p>Loading job history...</p>
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Container>
  //       <Row className="justify-content-center">
  //         <Col md={6} className="text-center">
  //           <p>Error fetching job history: {error.message}</p>
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
  // }
  // console.log(userId);
  useEffect(() => {
    fetchJobList(userId);
    fetchJobHistory(userId);
  }, [userId]);

  useEffect(() => {
    if (selectedStatus === '') {
      setFilteredJobList(initialJobList);
    } else {
      setFilteredJobList(jobListByStatus);
    }
  }, [selectedStatus, initialJobList, jobListByStatus]);

  const handleSelect = (event) => {
    setSelectedStatus(event.target.value);
  };
  const formatStatus = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };
  // const trimStatus = (status) => status.trim().toLowerCase();

  const countJobsByStatus = (status) => initialJobList.filter((job) => formatStatus(job.status) === status).length;

  const countCompleted = countJobsByStatus('Completed');
  const countApplied = countJobsByStatus('Pending');
  const countOngoing = countJobsByStatus('Ongoing');
  const countCancelled = countJobsByStatus('Rejected');

  const data = {
    labels: ['Completed', 'Pending', 'Ongoing', 'Rejected'],
    datasets: [
      {
        data: [countCompleted, countApplied, countOngoing, countCancelled],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // const getStatusStyle = (status) => {
  //   switch (trimStatus(status)) {
  //     case 'ongoing':
  //       return { color: 'orange' };
  //     case 'done':
  //       return { color: 'green' };
  //     case 'cancelled':
  //       return { color: 'red' };
  //     case 'pending':
  //       return { color: 'blue' };
  //     default:
  //       return {};
  //   }
  // };

  if (initialLoading || statusLoading || jobListLoading) {
    return <div>Loading...</div>;
  }

  if (initialError || statusError || jobListError) {
    return <div>Error: {initialError?.message || statusError?.message || jobListError?.message}</div>;
  }

  // console.log('data: ', jobListByStatus);
  // console.log('data filteredJobList: ', filteredJobList);



  const getStatusStyle = (status) => {
    switch (formatStatus(status)) {
      case 'Ongoing':
        return { color: 'orange' };
      case 'Completed':
        return { color: 'green' };
      case 'Rejected':
        return { color: 'red' };
      case 'Pending':
        return { color: 'blue' };
      case 'Active':
        return { color: 'blue' };
      default:
        return {};
    }
  };
  return (
    <div className="history">
      <div className="history-header">
        Job History
      </div>
      <div className='history-statistic'>
        <Row>
          <Col md={7} className="history-statistic-box">
            <div className="stat-box">
              <h3>{initialJobList.length}</h3>
              <p>Total Jobs</p>
            </div>
            <div className="stat-box">
              <h3>{countCompleted}</h3>
              <p>Completed Jobs</p>
            </div>
            <div className="stat-box">
              <h3>{countApplied}</h3>
              <p>Applied Jobs</p>
            </div>
            <div className="stat-box">
              <h3>{countOngoing}</h3>
              <p>Ongoing Jobs</p>
            </div>
            <div className="stat-box">
              <h3>{countCancelled}</h3>
              <p>Cancelled Jobs</p>
            </div>
          </Col>
          <Col md={5} className="history-statistic-chart">
            <Doughnut data={data} />
            {/* <Doughnut data={data} options={options} /> */}
            {/* {renderLegend()} */}
          </Col>
        </Row>

        {/* <div className='history-statistic-box'>
                <div className='history-statistic-box-left'>
                    <div className='history-statistic-box-left-title'>
                        Total Jobs
                    </div>
                    <div className='history-statistic-box-left-count'>
                        {jobList.length}
                    </div>
                </div>
                <div className='history-statistic-box-right'>
                    <div className='history-statistic-box-right-title'>
                        Completed Jobs
                    </div>
                    <div className='history-statistic-box-right-count'>
                        0
                    </div>
                </div>
            </div>
             <div className='history-statistic-chart'>
                <Doughnut data={data} />
            </div> */}

        <div>
          Status:
          <select style={{ margin: '20px' }} value={selectedStatus} onChange={handleSelect}>
            <option value="">All</option>
            {statusList.map((status, index) => (
              <option key={index} value={status}>
                {formatStatus(status)}
              </option>
            ))}
          </select>
          {/* <Dropdown>
              <Dropdown.Toggle className='' id="dropdown-basic">
                All
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setStatus('ongoing')}>Ongoing</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatus('done')}>Done</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatus('cancelled')}>Cancelled</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatus('pending')}>Pending</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown> */}
        </div>
      </div>
      <div className='history-table'>
        <Table border hover className="table-box align-text-bottom" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Job Tag</th>
              <th>Location</th>
              <th>Creator</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobList && filteredJobList.length > 0 ? (
              filteredJobList.map((job, index) => (
                <tr key={job.id}>
                  <td>{index + 1}</td>
                  <td>{job.Job.title}</td>
                  <td>{job.Job.tags}</td>
                  <td>{job.Job.location}</td>
                  <td>{job.Job.User.username}</td>
                  <td style={getStatusStyle(job.status)}>{formatStatus(job.status)}</td>
                  <td>
                    <Button as={Link} to={`/jobs/${job.id}`} variant="primary" size="sm">Detail</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Job Found</td>
              </tr>
            )}
          </tbody>

        </Table>
      </div>
      {jobHistory.length === 0 ? (
        <p className="text-center">No job history available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobHistory.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td style={getStatusStyle(job.status)}>{formatStatus(job.status)}</td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                <td>{new Date(job.updatedAt).toLocaleDateString()}</td>
                <td>
                  <Button as={Link} to={`/jobs/${job.id}`} variant="primary" size="sm">Detail</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

    </div>
  )
}

export default History