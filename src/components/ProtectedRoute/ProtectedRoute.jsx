import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token')

    if (!token) {
        console.log('No token found');
        return <Navigate to='/login' replace />
    }

    try {
        const { exp } = jwtDecode(token);

        console.log('Token expiration:', new Date(exp * 1000), 'Current time:', new Date(Date.now()));

        if (exp * 1000 < Date.now()) {
            localStorage.removeItem('token'); // Optionally remove the token (and refresh token if applicable)
            console.log('Token expired');
            return <Navigate to="/login" replace />;
        }
    } catch (error) {
        // If token decoding fails, consider it invalid and remove it
        localStorage.removeItem('token');
        console.log('Invalid token');
        return <Navigate to="/login" replace />;
    }

    return children;
}
