import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import useUserJobHistory from '../../hooks/job/dashboard/useUserJobHistory';
import '../../assets/css/JobHistory.css';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function History() {
  const { jobList, loading, error} = useUserJobHistory(1);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(jobList);

  const trimStatus = (status) => status.trim().toLowerCase();

  const countCompleted = jobList.filter((job) => trimStatus(job.job_status) === 'done').length;
  const countApplied = jobList.filter((job) => trimStatus(job.job_status) === 'pending').length;
  const countOngoing = jobList.filter((job) => trimStatus(job.job_status) === 'ongoing').length;
  const countCancelled = jobList.filter((job) => trimStatus(job.job_status) === 'cancelled').length;

  // const countCompleted = jobList.filter((job) => job.status.contains('done')).length;
  // const countApplied = jobList.filter((job) => job.status.contains('pending')).length;
  // const countOngoing = jobList.filter((job) => job.status.contains('ongoing')).length;
  // const countCancelled = jobList.filter((job) => job.status.contains('cancelled')).length;

  const dataChart = [countCompleted, countApplied, countOngoing, countCancelled];
  console.log(dataChart);
  const data = {
    labels: ['Completed', 'Applied', 'Ongoing', 'Cancelled'],
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

  // const options = {
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  // };

  // const renderLegend = () => (
  //   <div className="custom-legend">
  //     {data.labels.map((label, index) => (
  //       <div key={index} className="legend-item">
  //         <span
  //           className="legend-color"
  //           style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
  //         ></span>
  //         <span className="legend-label">{label}</span>
  //         <span className="legend-value">{data.datasets[0].data[index]}</span>
  //       </div>
  //     ))}
  //   </div>
  // );

  const getStatusStyle = (status) => {
    const trimmedStatus = trimStatus(status);
    switch (trimmedStatus) {
      case 'ongoing':
        return { color: 'orange' };
      case 'done':
        return { color: 'green' };
      case 'cancelled':
        return { color: 'red'};
      case 'pending':
        return { color: 'blue'};
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
              <h3>{jobList.length}</h3>
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
            {/* <div className='history-statistic-chart'>
                <Doughnut data={data} />
            </div> */} 
        </div>
        <div className='history-table'>
        <Table border hover className="table-box" style={{marginTop: '20px' }}>
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
                {jobList.map((job,index) => (
                <tr key={job.job_id}> 
                <td>{index+1}</td>
                <td>{job.job_title}</td>            
                <td>{job.job_tags}</td>
                <td>{job.job_work_location}</td>
                <td>{job.username}</td>
                <td style={getStatusStyle(job.job_status)}>{trimStatus(job.job_status)}</td>
                <td>                
                    <Button as={Link} to={`/jobs/${job.job_id}`} variant="info" size="sm">Detail</Button>
                </td>
                </tr>
                ))}
            </tbody>
  
        </Table>   
        </div>  
    </div>
  )
}

export default History