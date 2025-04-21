// src/components/TravelRequest/TravelRequestList.js
import React, { useState, useEffect } from 'react';
import { Table, Card, Badge, Button, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { getTravelRequests } from '../../services/authService';

const TravelRequestList = () => {
    const [travelRequests, setTravelRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || '');

    useEffect(() => {
        const fetchTravelRequests = async () => {
            try {
                const data = await getTravelRequests();
                setTravelRequests(data);
            } catch (error) {
                setError('Failed to load travel requests');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTravelRequests();
    }, []);

    // Clear message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return <Badge bg="success">Approved</Badge>;
            case 'rejected':
                return <Badge bg="danger">Rejected</Badge>;
            default:
                return <Badge bg="warning">Pending</Badge>;
        }
    };

    if (isLoading) {
        return <div className="text-center p-5">Loading...</div>;
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-4 align-items-center">
                <h2>My Travel Requests</h2>
                <Link to="/travel-requests/new">
                    <Button variant="primary">Create New Request</Button>
                </Link>
            </div>

            {message && <Alert variant="success" onClose={() => setMessage('')} dismissible>{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {travelRequests.length === 0 ? (
                <Card className="text-center p-4">
                    <Card.Body>
                        <h4>No travel requests found</h4>
                        <p>Create your first travel request to get started.</p>
                        <Link to="/travel-requests/new">
                            <Button variant="primary">Create New Request</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ) : (
                <Card>
                    <Card.Body>
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Destination</th>
                                    <th>Departure</th>
                                    <th>Return</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {travelRequests.map((request, index) => (
                                    <tr key={request.id}>
                                        <td>{index + 1}</td>
                                        <td>{request.destination}</td>
                                        <td>{new Date(request.departure_date).toLocaleDateString()}</td>
                                        <td>{new Date(request.return_date).toLocaleDateString()}</td>
                                        <td>{getStatusBadge(request.status)}</td>
                                        <td>{new Date(request.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <Link to={`/travel-requests/${request.id}`}>
                                                <Button variant="outline-primary" size="sm">View</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default TravelRequestList;