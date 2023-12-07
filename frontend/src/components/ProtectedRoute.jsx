import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContextProvider'

export const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext)
    if (!token) {
        return <Navigate to="/login" />
    }
    return children
}
