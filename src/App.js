// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Common/PrivateRoute';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TravelRequestForm from './components/TravelRequest/TravelRequestForm';
import TravelRequestList from './components/TravelRequest/TravelRequestList';
import TravelRequestDetail from './components/TravelRequest/TravelRequestDetail';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminTravelRequestDetail from './components/Admin/AdminTravelRequestDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1 py-4">
            <div className="container">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/travel-requests" element={
                  <PrivateRoute>
                    <TravelRequestList />
                  </PrivateRoute>
                } />
                <Route path="/travel-requests/new" element={
                  <PrivateRoute>
                    <TravelRequestForm />
                  </PrivateRoute>
                } />
                <Route path="/travel-requests/:id" element={
                  <PrivateRoute>
                    <TravelRequestDetail />
                  </PrivateRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <PrivateRoute >
                    <AdminDashboard />
                  </PrivateRoute>
                } />
                <Route path="/admin/travel-requests/:id" element={
                  <PrivateRoute >
                    <AdminTravelRequestDetail />
                  </PrivateRoute>
                } />
                <Route path="/" element={<Navigate to="/travel-requests" />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;