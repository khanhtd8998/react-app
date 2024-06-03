import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../../schema/authSchema'
import instance from '../../apis'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema)
    })
    const onSubmit = (data) => {
        (
            async () => {
                try {
                    const { confirmPassword, ...newData } = data
                    await instance.post('/register', newData)
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
            <div className="lg:py-20 md:py-20 py-20">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="w-full px-8 py-1 lg:w-1/2">
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
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-800 disabled:bg-blue-400"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 md:w-1/4" />
                            <span className="border-b w-1/5 md:w-1/4" />
                        </div>
                    </div>
                    <div
                        className="hidden lg:block lg:w-1/2 bg-cover"
                        style={{
                            backgroundImage:
                                'url("https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg")'
                        }}
                    ></div>
                </div>
            </div>

        </>
    )
}

export default Register