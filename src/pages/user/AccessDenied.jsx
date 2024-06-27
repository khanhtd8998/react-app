import React from 'react'
import { Link } from 'react-router-dom'

const AccessDenied = () => {
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl h-[100vh] lg:py-16 lg:px-6 flex items-center">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-red-500">403</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's wrong <br /> Nầu nấu nâu 😁😁😁</p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">You do not have permission to access this page</p>
                        <Link
                            to={'/'}
                            className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-green-500 hover:bg-green-700"
                        >
                            Back to homepage
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AccessDenied