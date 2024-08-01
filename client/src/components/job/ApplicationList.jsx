import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import useApplyList from '../../hooks/job/dashboard/useApplyList'; // Adjust the path as necessary
import useDeleteApplication from '../../hooks/job/dashboard/useDeleteApplication';
// import '../../assets/css/ApplicationList.css'; // Optional: Add any custom CSS if needed

const ApplicationList = ({ user }) => {
  const { id, username, role } = user;
  const { applyList, loading, error, fetchApplyList } = useApplyList();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchApplyList(id);
  }, [id, refresh]);
  const { deleteApplication } = useDeleteApplication();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleViewDetails = (applicationId) => {
    // Handle viewing details (e.g., navigate to a detail page)
    console.log("View details for application ID:", applicationId);
  };

  const handleDelete = async (applicationId) => {
    await deleteApplication(applicationId, id);
    setRefresh(prev => !prev); // Toggle refresh state to re-fetch the list
    console.log("Delete application with ID:", applicationId);
  };

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


  return (
    <div className="application-list">
      <h1>Current Apply List</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>CV</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applyList.length > 0 ? (
            applyList.map(application => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.User.username}</td>
                <td>{application.CV ? application.CV : 'No CV found'}</td>
                <td style={getStatusStyle(application.status)}>{formatStatus(application.status)}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleViewDetails(application.id)}
                    className="me-2">
                    View Details
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => handleDelete(application.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No applications found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicationList;
