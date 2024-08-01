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

function CreatorHistory(user) {
  // const { fetchMe, userId, username, role } = useWhoAmI();
  const userId = user.user.id;
  const { jobHistory, loading, error, fetchJobHistory } = useCreatorJobHistory();

  const [filteredJobList, setFilteredJobList] = useState([]);

  useEffect(() => {
    fetchJobHistory(userId);
  }, [userId]);

 
  const formatStatus = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };
  // const trimStatus = (status) => status.trim().toLowerCase();

//   const countJobsByStatus = (status) => initialJobList.filter((job) => formatStatus(job.status) === status).length;

//   const countCompleted = countJobsByStatus('Completed');
//   const countApplied = countJobsByStatus('Pending');
//   const countOngoing = countJobsByStatus('Ongoing');
//   const countCancelled = countJobsByStatus('Rejected');

//   const data = {
//     labels: ['Completed', 'Pending', 'Ongoing', 'Rejected'],
//     datasets: [
//       {
//         data: [countCompleted, countApplied, countOngoing, countCancelled],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

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
//   // };

//   if (initialLoading || statusLoading || jobListLoading) {
//     return <div>Loading...</div>;
//   }

//   if (initialError || statusError || jobListError) {
//     return <div>Error: {initialError?.message || statusError?.message || jobListError?.message}</div>;
//   }

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

export default CreatorHistory