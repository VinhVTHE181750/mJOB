import React from 'react';
import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Report = () => {
    return (
        <Container>
            <h1 className="mb-4">Report Statics</h1>
            <div className="table-responsive">
                <Table bordered hover>
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Object</th>
                            <th>ObjectId</th>
                            <th>Content</th>
                            <th>From</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sample Data Rows */}
                        <tr>
                            <th>1</th>
                            <td>User</td>
                            <td>5</td>
                            <td className="content-cell">Full name</td>
                            <td>User5</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Job</td>
                            <td>7</td>
                            <td className="content-cell">Title name</td>
                            <td>User2</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Forum</td>
                            <td>12</td>
                            <td className="content-cell">Title name</td>
                            <td>User3</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default Report;
