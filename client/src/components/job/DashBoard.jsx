import React, { useEffect, useState } from 'react';
import '../../assets/css/Dashboard.css';
import useUserTotalCompletedJob from '../../hooks/useUserTotalCompletedJob';
import useUserTotalCurrentAppliedJob from '../../hooks/useUserTotalCurrentAppliedJob';
import useUserTotalCreatedJob from '../../hooks/useUserTotalCreatedJob';
import useUserCompletedJobList from '../../hooks/useUserCompletedJobList';
import useUserAppliedJobList from '../../hooks/useUserAppliedJobList';
import { Button, Table } from 'react-bootstrap';
import useUserJobHistory from '../../hooks/job/dashboard/useUserJobHistory';


const Dashboard = (user) => {
  const userId = user.user.id;
  const { count: completedCount, loading: completedLoading, error: completedError } = useUserTotalCompletedJob(userId);
  const { count: appliedCount, loading: appliedLoading, error: appliedError } = useUserTotalCurrentAppliedJob(userId);
  const { count: createdCount, loading: createdLoading, error: createdError } = useUserTotalCreatedJob(userId);
  const { jobList: initialJobList, loading: initialLoading, error: initialError, fetchJobList: fetchInitialJobList } = useUserJobHistory();


  const { jobs: completedJobs, loading: jobsLoading, error: jobsError } = useUserCompletedJobList(userId);
  const { jobList: appliedJobs, loading: appliedJobsLoading, error: appliedJobsError, fetchJobList } = useUserAppliedJobList(userId);
  const [completedJobList, setCompletedJobList] = useState([]);
  const [appliedJobList, setAppliedJobList] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    fetchJobList(userId);
    fetchInitialJobList(userId);
  }, [userId]);

  useEffect(() => {
    if (!completedLoading && !appliedLoading && !createdLoading && !jobsLoading && !appliedJobsLoading) {
      setAllLoaded(true);
    }
  }, [completedLoading, appliedLoading, createdLoading, jobsLoading, appliedJobsLoading]);

  // console.log('Data: ', appliedJobs);
  useEffect(() => {
    setCompletedJobList(completedJobs);
  }, [completedJobs]);

  useEffect(() => {
    setAppliedJobList(appliedJobs);
  }, [appliedJobs]);

  const formatStatus = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const totalAppliedJob = initialJobList.length;
  const [totalCompletedJob, setTotalCompletedJob] = useState(initialJobList.filter((job) => formatStatus(job.status) === 'Completed').length);
  const [totalProcessedJobs, setTotalProcessedJobs] = useState(initialJobList.filter((job) => formatStatus(job.status) === 'Ongoing').length);
  const [totalApplyingJobs, setTotalApplyingJobs] = useState(initialJobList.filter((job) => formatStatus(job.status) === 'Pending').length);

  console.log(totalAppliedJob, totalCompletedJob, totalProcessedJobs, totalApplyingJobs);

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
      default:
        return {};
    }
  };
  // console.log('Data: ', completedJobList);
  // console.log('Data applied: ', appliedJobs);


  if (!allLoaded) {
    return <h3>Loading...</h3>;
  }

  if (completedError || appliedError || createdError || jobsError || appliedJobsError) {
    return <h3>Error loading data.</h3>;
  }
  // // console.log(completedJobList);
  // useEffect(() => {
  //   console.table(completedJobs);
  //   // console.log(jobsLoading); 
  // }, [jobsLoading]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        {/* <button className="create-job-button" onClick={() => window.location.href = '/jobs/add'}>Create Job</button> */}
      </div>
      <div className="stats-container">
        <div className="stat-box">
          <h3 className='total'>{totalAppliedJob}</h3>
          <p>Total Applied Jobs</p>
        </div>
        <div className="stat-box">
            <h3 className='completed'>{totalCompletedJob}</h3>
          <p>Completed Jobs</p>
        </div>
        <div className="stat-box">
          <h3 className='processing'>{totalProcessedJobs}</h3>
          <p>Total Processing Jobs</p>
        </div>
        <div className="stat-box">
            <h3 className='applied'>{totalProcessedJobs}</h3>
          <p>Current Apply Job</p>
        </div>
      </div>
      <div className="job-section">
        <h4>Job Applied</h4>
        <div className="job-list">
          {appliedJobList.length == 0 ? <h1 style={{ color: 'darkgrey', textAlign: 'center' }}>No Jobs Currently Applied</h1> : (<Table striped bordered hover variant="white">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Title</th>
                <th>Tags</th>
                <th>Location</th>
                <th>Created by</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobList.map(job => (
                <tr key={job.id}>
                  <td>{job.Job.id}</td>
                  <td>{job.Job.title}</td>
                  <td>{job.Job.tags}</td>
                  <td>{job.Job.location}</td>
                  <td>{job.Job.User.username}</td>
                  <td style={getStatusStyle(job.status)}>{formatStatus(job.status)}</td>
                  <td><Button variant="primary" size="sm" href={`/jobs/${job.Job.id}`}>Detail</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>)}
        </div>
      </div>
      <div className="job-section">
        <h4>Job Completed</h4>
        <div className="job-list">
          {completedJobList.length == 0 ? <h1 style={{ color: 'darkgrey', textAlign: 'center' }}>No Jobs Completed</h1> : (<Table striped bordered hover variant="white">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Title</th>
                <th>Tags</th>
                <th>Location</th>
                <th>Created by</th>
                <th>Status</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {completedJobList.map(job => (
                <tr key={job.id}>
                  <td>{job.Job.id}</td>
                  <td>{job.Job.title}</td>
                  <td>{job.Job.tags}</td>
                  <td>{job.Job.location}</td>
                  <td>{job.Job.User.username}</td>
                  <td style={getStatusStyle(job.status)}>{formatStatus(job.status)}</td>
                  <td><Button variant="primary" size="sm" href={`/jobs/${job.Job.id}`}>Detail</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>)}

          {/* {jobsLoading ? (
            <p>Loading...</p>
          ) : jobsError ? (
            <p>Error: {jobsError.message}</p>
          // ) : completedJobs.length == 0 ? (
          //   <p>No completed jobs found.</p>
          ) : (
            <ul>
              {completedJobs.map(job => (
                <li key={job.id}>
                  <h5>{job.description}</h5>
                  <p>Date: {job.date}</p>
                  <p>Status: {job.status}</p>
                </li>
              ))}
            </ul>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
