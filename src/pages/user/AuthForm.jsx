import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginShema, registerSchema } from '../../schema/authSchema'
import swal from 'sweetalert'
import instance from '../../apis'


const AuthForm = ({ isRegister }) => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(isRegister ? registerSchema : loginShema)
    })
    const onSubmit = (data) => {
        (
            async () => {
                try {
                    if (isRegister) {
                        const { confirmPassword, ...newData } = data
                        await instance.post('/register', newData)
                        reset()
                        swal({
                            title: "Thành công!",
                            text: "Đăng ký tài khoản thành công",
                            buttons: [""],
                            icon: "success",
                            timer: 2000
                        });
                        setTimeout(() => {
                            navigate("/login")
                        }, 1000)
                    } else {
                        const res = await instance.post('/login', data)
                        localStorage.setItem('user', JSON.stringify(res.data))
                        swal({
                            title: "Thành công!",
                            text: "Đăng nhập tài khoản thành công",
                            buttons: [""],
                            icon: "success",
                            timer: 2000
                        });
                        setTimeout(() => {
                            navigate("/")
                        }, 1000)
                    }
                } catch (error) {
                    swal({
                        title: "Thất bại",
                        text: `${error.response.data}`,
                        icon: "warning",
                        buttons: [""],
                        dangerMode: true,
                        timer: 2000
                    })
                }
            }
        )()
    }
    return (
        <>
            <div className="py-24">
                <div className="flex justify-center bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div
                        className="hidden lg:block lg:w-1/2 bg-auto"
                        style={{
                            backgroundImage:
                                'url("https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg")'
                        }}
                    ></div>
                    {
                        isRegister ?
                            (<div className="w-full px-8 py-1 lg:w-1/2">
                                <h2 className="text-[32px] font-semibold text-gray-700 text-center">
                                    Register
                                </h2>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="border-b w-1/5 lg:w-1/4" />
                                    <a href="#" className="text-xs text-center text-gray-500 uppercase">
                                        sign up with email
                                    </a>
                                    <span className="border-b w-1/5 lg:w-1/4" />
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4 h-20">
                                        <label className="block text-gray-700 text-md font-bold mb-1">
                                            Username
                                        </label>
                                        <input
                                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                            type="text"
                                            {...register('username', { required: true })}
                                        />
                                        {errors.username?.message && <p className="text-red-500">{errors.username?.message}</p>}
                                    </div>
                                    <div className="mb-4 h-20">
                                        <label className="block text-gray-700 text-md font-bold mb-1">
                                            Email
                                        </label>
                                        <input
                                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                            type="email"
                                            {...register("email", { required: true })}
                                        />
                                        {errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
                                    </div>
                                    <div className="mb-4 h-20">
                                        <div className="flex justify-between">
                                            <label className="block text-gray-700 text-md font-bold mb-1">
                                                Password
                                            </label>
                                        </div>
                                        <input
                                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                            type="password"
                                            {...register("password", { required: true })}
                                        />
                                        {errors.password?.message && <p className="text-red-500">{errors.password?.message}</p>}
                                    </div>
                                    <div className="mb-4 h-20">
                                        <div className="flex justify-between">
                                            <label className="block text-gray-700 text-md font-bold mb-1">
                                                Confirm Password
                                            </label>
                                        </div>
                                        <input
                                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                            type="password"
                                            {...register("confirmPassword", { required: true })}
                                        />
                                        {errors.confirmPassword?.message && <p className="text-red-500">{errors.confirmPassword?.message}</p>}
                                    </div>
                                    <div className="">
                                        <button
                                            type="submit"
                                            className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-800 disabled:bg-blue-400"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="border-b w-1/5 md:w-1/4" />
                                        <Link to={'/login'} className="text-sm text-gray-500 uppercase">
                                            or <strong>sign in</strong>
                                        </Link>
                                        <span className="border-b w-1/5 md:w-1/4" />
                                    </div>
                                </form>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="border-b w-1/5 md:w-1/4" />
                                    <span className="border-b w-1/5 md:w-1/4" />
                                </div>
                            </div>) : (
                                <div className="w-full p-8 lg:w-1/2">
                                    <h2 className="text-2xl font-semibold text-gray-700 text-center">
                                        Hey Guy
                                    </h2>
                                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                                    <Link
                                        to={''}
                                        className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
                                    >
                                        <div className="px-4 py-3">
                                            <svg className="h-6 w-6" viewBox="0 0 40 40">
                                                <path
                                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                                    fill="#FFC107"
                                                />
                                                <path
                                                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                                    fill="#FF3D00"
                                                />
                                                <path
                                                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                                    fill="#4CAF50"
                                                />
                                                <path
                                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                                    fill="#1976D2"
                                                />
                                            </svg>
                                        </div>
                                        <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                                            Sign up with Google
                                        </h1>
                                    </Link>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="border-b w-1/5 lg:w-1/4" />
                                        <a href="#" className="text-xs text-center text-gray-500 uppercase">
                                            or sign in with email
                                        </a>
                                        <span className="border-b w-1/5 lg:w-1/4" />
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-6 h-20">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Email
                                            </label>
                                            <input
                                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                                type="email"
                                                {...register("email", { required: true })}
                                            />
                                            {errors.email?.message && <p className="text-red-500">{errors.email?.message}</p>}
                                        </div>
                                        <div className="my-6 h-20">
                                            <div className="flex justify-between">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Password
                                                </label>
                                            </div>
                                            <input
                                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                                type="password"
                                                {...register("password", { required: true })}
                                            />
                                            {errors.password?.message && <p className="text-red-500">{errors.password?.message}</p>}
                                        </div>
                                        <div className="mt-8">
                                            <button
                                                type="submit"
                                                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-800 disabled:bg-blue-400"
                                            >
                                                Sign in
                                            </button>
                                        </div>
                                    </form>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="border-b w-1/5 md:w-1/4" />
                                        <Link to={'/register'} className="text-sm text-gray-500 uppercase">
                                            or <strong>sign up</strong>
                                        </Link>
                                        <span className="border-b w-1/5 md:w-1/4" />
                                    </div>
                                </div>
                            )
                    }



                </div>
            </div>

        </>
    )
}

export default AuthForm