import React from 'react'
import AdminLayout from '../layouts/AdminLayout'
import { Navigate } from 'react-router-dom'

const PrivateRouter = () => {
    const accessToken = JSON.parse(localStorage.getItem('user'))?.accessToken
    return accessToken ? <AdminLayout/> : <Navigate to="/login" />
}

export default PrivateRouter