import React from 'react';
import useApplyList from '../../hooks/job/dashboard/useApplyList'; // Adjust the path as necessary

const ApplicationList = () => {
  const { applyList, loading, error } = useApplyList(3);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Current Apply List</h1>
      <ul>
        {applyList.map(application => (
          <li key={application.id}>
            {application.User.username} - {application.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;
