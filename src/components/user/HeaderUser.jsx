import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HeaderUser = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'))
    const data = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        if (token) {
            setIsLogin(true)
            setUser(data)
        }
    }, [])
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setIsLogin(!isLogin);
        setUser(null)
    }
    return (
        <>
            <header className="bg-white relative">
                <div className="bg-white mx-auto flex h-16 max-w-screen items-center gap-8 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-10">
                    <Link className="block text-teal-600" to={'/'}>
                        <span className="sr-only">Home</span>
                        <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                fill="currentColor"
                            />
                        </svg>
                    </Link>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" to={'/'}> Home </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" to={'/about'}> About </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" to={'/contact'}> Contact </Link>
                                </li>

                            </ul>
                        </nav>

                        <div className="flex items-center gap-1">
                            <div className="flex items-center md:w-[20rem] justify-end from-teal-10 bg-gradient-to-br">
                                <form className="relative flex">
                                    <input
                                        name="search"
                                        type="search"
                                        className="text- peer cursor-pointer relative z-10 h-11 w-11 rounded-lg bg-transparent  pr-10 outline-none focus:rounded-r-none focus:w-full focus:cursor-text focus:border-taupeGray focus:px-3"
                                        placeholder="Search..."
                                    />
                                    <button
                                        type="submit"
                                        className="absolute top-0 right-0 bottom-0 my-auto h-11 w-11 px-3 bg-white rounded-lg peer-focus:relative peer-focus:rounded-l-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 50 50"
                                        >
                                            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            {
                                !isLogin && (
                                    <div className="sm:flex sm:gap-1">
                                        <Link
                                            className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                            to={'/login'}
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                                            to={'/register'}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )
                            }

                            {
                                isLogin && (
                                    <div className='relative flex items-center justify-end gap-3'>
                                        <p><strong>{user?.username}</strong></p>
                                        <img
                                            src={'https://picsum.photos/200/200'}
                                            className='rounded-full cursor-pointer'
                                            width={40}
                                            height={40}
                                            alt=""
                                            onClick={toggleDropdown}
                                        />
                                        {isOpen && (
                                            <div className='absolute right-0 mt-52 w-44 bg-white border border-gray-300 rounded shadow-lg'>
                                                <ul className=''>
                                                    <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'><a className='w-full block' href="">Thông tin cá nhân</a></li>
                                                    <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'><a className='w-full block' href="">Lịch sử đặt hàng</a></li>
                                                    <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'><Link to={'/admin'} className='w-full block' href="">Quản trị</Link></li>
                                                    <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'><button onClick={handleLogout} className='mx-auto'>Đăng xuất</button></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )
                            }


                            <div className="block md:hidden">
                                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </header>
        </>
    )
}

export default HeaderUser