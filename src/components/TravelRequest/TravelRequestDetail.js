// TravelRequestDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTravelRequestById } from '../../services/authService';
import { Card, Alert } from 'react-bootstrap';

const TravelRequestDetail = () => {
    const { id } = useParams(); // Get the travel request ID from the URL
    const [travelRequest, setTravelRequest] = useState(null); // Store travel request details
    const [error, setError] = useState(''); // Store error messages
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchTravelRequest = async () => {
            try {
                const data = await getTravelRequestById(id); // Fetch travel request by ID
                setTravelRequest(data);
            } catch (error) {
                setError('Failed to load travel request details');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTravelRequest();
    }, [id]);

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
                <p><strong>Destination:</strong> {travelRequest.destination}</p>
                <p><strong>Departure Date:</strong> {new Date(travelRequest.departure_date).toLocaleDateString()}</p>
                <p><strong>Return Date:</strong> {new Date(travelRequest.return_date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {travelRequest.status}</p>
                <p><strong>Reason:</strong> {travelRequest.reason}</p>
                <p><strong>Created At:</strong> {new Date(travelRequest.created_at).toLocaleDateString()}</p>
            </Card.Body>
        </Card>
    );
};

export default TravelRequestDetail;