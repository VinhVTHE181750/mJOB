import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import useApplyList from '../../hooks/job/dashboard/useApplyList'; // Adjust the path as necessary
import useDeleteApplication from '../../hooks/job/dashboard/useDeleteApplication';
import useUserJobHistory from '../../hooks/job/dashboard/useUserJobHistory';

const ApplicationList = ({ user }) => {
  const { id } = user;
  const { applyList, loading, error, fetchApplyList } = useApplyList();
  const [refresh, setRefresh] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [filteredApplyList, setFilteredApplyList] = useState([]);
  const { jobList: initialJobList, loading: initialLoading, error: initialError, fetchJobList } = useUserJobHistory();
  const { deleteApplication } = useDeleteApplication();

  useEffect(() => {
    const fetchData = async () => {
      await fetchApplyList(id);
      await fetchJobList(id);
    };
    fetchData();
  }, [id, refresh]);

  useEffect(() => {
    // Update filteredApplyList when applyList changes or selectedStatus changes
    filterApplications(selectedStatus);
  }, [applyList, selectedStatus]);

  const formatStatus = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const filterApplications = (status) => {
    if (status === 'All') {
      setFilteredApplyList(applyList);
    } else {
      setFilteredApplyList(applyList.filter(application => formatStatus(application.status) === status));
    }
  };

  const handleViewDetails = (applicationId) => {
    // Handle viewing details (e.g., navigate to a detail page)
    console.log("View details for application ID:", applicationId);
  };

  const handleDelete = async (applicationId) => {
    await deleteApplication(applicationId, id);
    setRefresh(prev => !prev); // Toggle refresh state to re-fetch the list
    console.log("Delete application with ID:", applicationId);
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
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

  if (loading || initialLoading) return <div>Loading...</div>;
  if (error || initialError) return <div>Error: {error?.message || initialError?.message}</div>;

  return (
    <div className="application-list">
      <h1>Current Apply List</h1>
      <div className='jobs-statistic-components mb-3'>
        <div
          className={`status-filter ${selectedStatus === 'All' ? 'selected-type' : ''}`}
          onClick={() => handleStatusClick('All')}
        >
          All
        </div>
        <div
          className={`status-filter ${selectedStatus === 'Completed' ? 'selected-type' : ''}`}
          onClick={() => handleStatusClick('Completed')}
        >
          Completed
        </div>
        <div
          className={`status-filter ${selectedStatus === 'Progress' ? 'selected-type' : ''}`}
          onClick={() => handleStatusClick('Ongoing')}
        >
          Progress
        </div>
        <div
          className={`status-filter ${selectedStatus === 'Applied' ? 'selected-type' : ''}`}
          onClick={() => handleStatusClick('Pending')}
        >
          Applied
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job</th>
            <th>Creator</th>
            <th>CV</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplyList.length > 0 ? (
            filteredApplyList.map(application => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.Job.title}</td>
                <td>{application.Job.User.EmployerProfile.name}</td>
                <td>{application.CV ? application.CV : 'No CV found'}</td>
                <td style={getStatusStyle(application.status)}>{formatStatus(application.status)}</td>
                <td>
                  {formatStatus(application.status) === 'Pending' ? (
                    <Button
                      variant="warning"
                      onClick={() => handleDelete(application.id)}>
                      Delete
                    </Button>
                  ) : null}
                  <Button
                    variant="success"
                    onClick={() => handleViewDetails(application.id)}
                    className="me-2">
                    View Details
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No applications found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicationList;
