import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Home } from '../pages/Home';
import { Signup } from '../pages/Signup';
import { Login } from '../pages/Login';
import { ProtectedRoute } from './ProtectedRoute';

export const AllRoutes = () => {
    return (
        <div>
            <Routes>
            <Route
                    path='/'
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path='/sign-up' element={<Signup />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    )
}
