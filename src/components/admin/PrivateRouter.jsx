import React from 'react'
import { Navigate } from 'react-router-dom'
import AccessDenied from '../../pages/user/AccessDenied'
import AdminLayout from '../layouts/AdminLayout'

const PrivateRouter = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    const data = JSON.parse(localStorage.getItem('user'))
    if(!data || !accessToken) return <Navigate to="/login" />
    return (data.role === 'admin') ? <AdminLayout /> : <AccessDenied />

}
export default PrivateRouter