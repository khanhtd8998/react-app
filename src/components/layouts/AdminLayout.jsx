import React from 'react'
import AdminHeader from '../admin/AdminHeader'
import { Link, Outlet } from 'react-router-dom'
const AdminLayout = () => {
    return (
        <>
            <section>
                <div className="grid grid-cols-6">
                    <div className="relative">
                        <div className="fixed top-0 left-0 right-0 w-[15%]">
                            <AdminHeader ></AdminHeader>
                        </div>
                    </div>
                    <div className="col-span-5 p-4 lg:w-full relative">
                        <div className="text-end fixed top-0 left-0 right-0 bg-white pr-5 pt-5 z-10">
                            <Link to={"/"}>
                                <i className="fa-solid fa-house me-1" style={{ color: "#6c737f" }} />
                            </Link>
                        </div>
                        <div className="mt-3">
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminLayout