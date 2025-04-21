// src/components/TravelRequest/TravelRequestForm.js
import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createTravelRequest } from '../../services/authService';

const TravelRequestForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        departure_date: '',
        return_date: '',
        destination: '',
        purpose: '',
        accommodations_required: false,
        transportation_required: false,
        estimated_cost: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await createTravelRequest(formData);
            navigate('/travel-requests', { state: { message: 'Travel request created successfully!' } });
        } catch (error) {
            setError('Failed to create travel request. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <Card>
                    <Card.Header as="h4" className="text-center">New Travel Request</Card.Header>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Destination</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="destination"
                                            value={formData.destination}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Departure Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="departure_date"
                                            value={formData.departure_date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Return Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="return_date"
                                            value={formData.return_date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <Form.Group className="mb-3">
                                <Form.Label>Purpose of Travel</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Estimated Cost ($)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="estimated_cost"
                                            value={formData.estimated_cost}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3 mt-4">
                                        <Form.Check
                                            type="checkbox"
                                            label="Accommodations Required"
                                            name="accommodations_required"
                                            checked={formData.accommodations_required}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3 mt-4">
                                        <Form.Check
                                            type="checkbox"
                                            label="Transportation Required"
                                            name="transportation_required"
                                            checked={formData.transportation_required}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Submitting...' : 'Submit Travel Request'}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default TravelRequestForm;