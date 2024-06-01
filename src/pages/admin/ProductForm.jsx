import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import productSchema from '../../schema/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import instance from '../../apis'

const ProductForm = ({ onProduct }) => {
    const { id } = useParams()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
    })
    if(id) {
        useEffect(() => {
            (
                async () => {
                    try {
                        const { data } = await instance.get(`/products/${id}`)
                        reset(data)
                    } catch (error) {
                        console.log(error)
                    }
                }
            )()
        }, [])
    }
    const onSubmit = (data) => {
        onProduct({...data, id})
    }
    return (
        <>
            <div className="rounded-lg border border-gray-200 shadow-md p-5 mt-9">
                <div className="mb-10 text-xl font-semibold ">{id ? 'Edit Product' : 'Add Product'}</div>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w mx-auto">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="mb-5">
                            <label
                                htmlFor="Title"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Title
                            </label>
                            <input
                                id='title'
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("title", { required: true })}
                            />
                            {errors.title?.message && <span className='text-red-500'>{errors.title?.message}</span>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Price
                            </label>
                            <input
                                id='price'
                                type="number"
                                step='any'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("price", { required: true, valueAsNumber: true })}
                            />
                            {errors.price?.message && <span className='text-red-500'>{errors.price?.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="mb-5">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Description
                            </label>
                            <input
                                id='description'
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("description", { required: true })}
                            />
                            {errors.description?.message && <span className='text-red-500'>{errors.description?.message}</span>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Category
                            </label>
                            <select
                                id='category'
                                {...register("category", { required: true })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option defaultChecked value={"Mobile"}>Mobile</option>
                                <option value={"Laptop"}>Laptop</option>
                                <option value={"Watch"}>Watch</option>
                            </select>
                            {errors.category?.message && <span className='text-red-500'>{errors.category?.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="mb-5">
                            <label
                                htmlFor="image"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Image
                            </label>
                            <input
                                id='images'
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("images", { required: true })}
                            />
                            {errors.images?.message && <span className='text-red-500'>{errors.images?.message}</span>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="brand"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Brand
                            </label>
                            <input
                                id='brand'
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("brand", { required: true })}
                            />
                            {errors.brand?.message && <span className='text-red-500'>{errors.brand?.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="mb-5">
                            <label
                                htmlFor="stock"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Stock
                            </label>
                            <input
                                id='stock'
                                type="number"
                                defaultValue={0}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("stock", { valueAsNumber: true })}
                            />
                            {errors.stock?.message && <span className='text-red-500'>{errors.stock?.message}</span>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="rating"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Rating
                            </label>
                            <input
                                id='rating'
                                type="number"
                                defaultValue={0}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("rating", { valueAsNumber: true })}
                            />
                            {errors.rating?.message && <span className='text-red-500'>{errors.rating?.message}</span>}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="discountPercentage"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Discount
                            </label>
                            <input
                                id='discountPercentage'
                                type="number"
                                defaultValue={0}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("discountPercentage", { valueAsNumber: true })}
                            />
                            {errors.discountPercentage?.message && <span className='text-red-500'>{errors.discountPercentage?.message}</span>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>

        </>
    )
}

export default ProductForm