import React from 'react';
import {Pagination as BootstrapPagination} from 'react-bootstrap';

const JobPagination = ({ jobsPerPage, totalJobs, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <BootstrapPagination style={{position: 'relative', left: '80%'}}>
      {pageNumbers.map(number => (
        <BootstrapPagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
          {number}
        </BootstrapPagination.Item>
      ))}
    </BootstrapPagination>
  );
};

export default JobPagination;
