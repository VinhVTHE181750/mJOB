// ModalList.js
import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import useUpdateApplicationStatus from '../../hooks/job/dashboard/useUpdateApplicationStatus';

const ModalList = ({ show, onHide, data }) => {
    const { loading: updateLoading, error: updateError, success: updateSuccess, updateApplicationStatus } = useUpdateApplicationStatus();
    const handleUpdateStatus = async (jobId, userId, status) => {
        await updateApplicationStatus(jobId, userId, status);
    };
    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="modal-title">
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">Job Applications</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data && data.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Job Title</th>
                                <th>Applicant Username</th>
                                <th>CV</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.id}</td>
                                    <td>{application.Job.title}</td>
                                    <td>{application.User.username}</td>
                                    <td>No CV found</td>
                                    <td>
                                        <Button variant="success" onClick={() => handleUpdateStatus(application.id, application.UserId, 'ACCEPTED')}>Approve</Button>
                                        <Button variant="danger" onClick={() => handleUpdateStatus(application.id, application.UserId,'REJECTED')}>Rejected</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No data available</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalList;
