import React, { useEffect } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import { Navigate, useNavigate } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'

const PrivateRouter = () => {
    const navigate = useNavigate();
    const accessToken = JSON.parse(localStorage.getItem('token'))
    const data = JSON.parse(localStorage.getItem('user'))
    if(!data || !accessToken) return <Navigate to="/login" />
    return (data.role === 'admin') ? <AdminLayout /> : <Navigate to="/" />

}
export default PrivateRouter