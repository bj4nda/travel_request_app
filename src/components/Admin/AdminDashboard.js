// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTravelRequests } from '../../services/authService';

const AdminDashboard = () => {
    const [travelRequests, setTravelRequests] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTravelRequests = async () => {
            try {
                const data = await getTravelRequests(); // Fetch all travel requests
                setTravelRequests(data);
            } catch (error) {
                setError('Failed to load travel requests');
                console.error(error);
            }
        };

        fetchTravelRequests();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Destination</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {travelRequests.map((request, index) => (
                        <tr key={request.id}>
                            <td>{index + 1}</td>
                            <td>{request.user_username}</td>
                            <td>{request.destination}</td>
                            <td>{request.status}</td>
                            <td>
                                <Link to={`/admin/travel-requests/${request.id}`} className="btn btn-primary btn-sm">
                                    View & Manage
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminDashboard;