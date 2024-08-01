import React, {useEffect, useState} from 'react';
import '../../assets/css/Dashboard.css';
import useUserTotalCompletedJob from '../../hooks/useUserTotalCompletedJob';
import useUserTotalCurrentAppliedJob from '../../hooks/useUserTotalCurrentAppliedJob';
import useUserTotalCreatedJob from '../../hooks/useUserTotalCreatedJob';
import useUserCompletedJobList from '../../hooks/useUserCompletedJobList';
import useUserAppliedJobList from '../../hooks/useUserAppliedJobList';
import {Button, Table} from 'react-bootstrap';


const CreatorDashboard = (user) => {
  const userId = user.user.id;
  const { count: completedCount, loading: completedLoading, error: completedError } = useUserTotalCompletedJob(userId);
  const { count: appliedCount, loading: appliedLoading, error: appliedError } = useUserTotalCurrentAppliedJob(userId);
  const { count: createdCount, loading: createdLoading, error: createdError } = useUserTotalCreatedJob(userId);

  const { jobs: completedJobs, loading: jobsLoading, error: jobsError } = useUserCompletedJobList(userId);
  const { jobList: appliedJobs, loading: appliedJobsLoading, error: appliedJobsError, fetchJobList } = useUserAppliedJobList(userId);
  const [completedJobList, setCompletedJobList] = useState([]);
  const [appliedJobList, setAppliedJobList] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    fetchJobList(userId);
    console.log("Data effect: ", appliedJobs);
  }, [userId]);

  useEffect(() => {
    if (!completedLoading && !appliedLoading && !createdLoading && !jobsLoading  && !appliedJobsLoading) {
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
        <button className="create-job-button" onClick={() => window.location.href = '/jobs/add'}>Create Job</button>
      </div>
      

    </div>
  );
};

export default CreatorDashboard;
