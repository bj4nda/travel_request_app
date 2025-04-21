import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTravelRequestById, updateTravelRequestStatus } from '../../services/authService';
import { Card, Alert, Button } from 'react-bootstrap';

const AdminTravelRequestDetail = () => {
    const { id } = useParams(); // Get the travel request ID from the URL
    const [travelRequest, setTravelRequest] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTravelRequest = async () => {
            try {
                console.log(`Fetching travel request with ID: ${id}`); // Debugging log
                const data = await getTravelRequestById(id);
                console.log('Travel request data:', data); // Debugging log
                setTravelRequest(data);
            } catch (error) {
                setError('Failed to load travel request details');
                console.error('Error fetching travel request:', error); // Debugging log
            } finally {
                setIsLoading(false);
            }
        };

        fetchTravelRequest();
    }, [id]);

    const handleStatusChange = async (status) => {
        try {
            console.log(`Updating status to: ${status}`); // Debugging log
            await updateTravelRequestStatus(id, status);
            setSuccessMessage(`Request ${status} successfully!`);
            setTravelRequest((prevRequest) => ({
                ...prevRequest,
                status,
            }));
        } catch (error) {
            setError('Failed to update travel request status');
            console.error('Error updating status:', error); // Debugging log
        }
    };

    if (isLoading) {
        return <div className="text-center p-5">Loading...</div>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!travelRequest) {
        return <div>Travel request not found</div>;
    }

    return (
        <Card>
            <Card.Header as="h4">Travel Request Details</Card.Header>
            <Card.Body>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <p><strong>Destination:</strong> {travelRequest.destination}</p>
                <p><strong>Status:</strong> {travelRequest.status}</p>
                {/* <p><strong>Reason:</strong> {travelRequest.reason}</p> */}
                <p><strong>Created At:</strong> {new Date(travelRequest.created_at).toLocaleDateString()}</p>
                <div className="d-flex gap-2 mt-3">
                    <Button
                        variant="success"
                        onClick={() => handleStatusChange('approved')}
                    >
                        Approve
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleStatusChange('rejected')}
                    >
                        Reject
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AdminTravelRequestDetail;