import React from 'react';
import {Button, Table} from 'react-bootstrap';
import useUserJobHistory from '../../hooks/job/dashboard/useUserJobHistory';
import '../../assets/css/JobHistory.css';
import {Link} from 'react-router-dom';
import {Doughnut} from 'react-chartjs-2';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function History() {
  const { jobList, loading, error} = useUserJobHistory(1);

  const data = {
    labels: ['Completed', 'Applied'],
    datasets: [
      {
        data: [7, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ]
      }
    ]
  };

  return (
    <div className="history">
        <div className="history-header">
            Job History
        </div>
        <div className='history-statistic'>
            <div className='history-statistic-box'>
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
            </div>
        </div>
        <div className='history-table'>
        <Table border hover className="table-box" style={{marginTop: '20px' }}>
            <thead>
                <tr>
                <th>Job Title</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Position</th>
                <th>Department</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {jobList.map(job => (
                <tr key={job.job_id}> 
                <td>{job.job_title}</td>            
                <td>{job.job_tags}</td>
                <td>{job.job_work_location}</td>
                <td>{job.username}</td>
                <td>{job.job_status}</td>
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