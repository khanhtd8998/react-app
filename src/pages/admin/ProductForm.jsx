import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import { createProduct, getProductById, updateProduct } from '../../apis/product'
import { ProductContext } from '../../contexts/ProductContext'
import productSchema from '../../schema/productSchema'
import instance from '../../apis'
const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;
const ProductForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [categories, setCategories] = useState([])
    const { state, dispatch } = useContext(ProductContext)
    const [imgUrl, setImgUrl] = useState(null);
    const [imgOption, setImgOption] = useState("keep");
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
    })
    useEffect(() => {
        (async () => {
            const { data } = await instance.get("/categories");
            setCategories(data.data);
        })();

    }, []);
    if (id) {
        useEffect(() => {
            (async () => {
                const data = await getProductById(id);
                reset(data.data);
                setImgUrl(data.images)
            })();

        }, [id, reset]);
    }

    const uploadImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", VITE_UPLOAD_PRESET);
            const res = await fetch(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            })
            const data = await res.json();
            return data.secure_url;
        } catch (error) {
            console.log(error);
        }
    };
    const onSubmit = async (product) => {
        try {
            if (imgOption === "link" && !product.images) {
                return swal({
                    title: "Error",
                    text: "Không để trống thông tin",
                    icon: "warning",
                    dangerMode: true,
                });
            } else if (imgOption === "upload" && !product.images.length) {
                return swal({
                    title: "Error",
                    text: "Không để trống thông tin",
                    icon: "warning",
                    dangerMode: true,
                });
            }
            let updatedProduct = { ...product };
            switch (imgOption) {
                case "upload":
                    if (product.images && product.images[0]) {
                        const thumbnailUrl = await uploadImage(product.images[0]);
                        updatedProduct = { ...updatedProduct, images: thumbnailUrl };
                    }
                    break;
                default:

            }
            if (id) {
                const { data } = await instance.patch(`/products/${id}`, product);
                dispatch({ type: "UPDATE_PRODUCT", payload: data.data })
                swal({
                    title: "Thành công!",
                    text: "Cập nhật sản phẩm thành công",
                    buttons: [""],
                    icon: "success",
                    timer: 2000
                });
            } else {
                ///đây chưa xong
                const res = await createProduct(product);
                dispatch({ type: "ADD_PRODUCT", payload: res.data })
                swal({
                    title: "Thành công!",
                    text: "Thêm sản phẩm thành công",
                    buttons: [""],
                    icon: "success",
                    timer: 2000
                });
            }
            setTimeout(() => {
                navigate("/admin/products/list")
            }, 1000)
        } catch (error) {
            swal({
                title: `${error}`,
                icon: "warning",
                dangerMode: true,
            })
        }
    }

    return (
        <>
            <div className="rounded-lg border border-gray-200 shadow-md p-5 mt-9">
                <div className="mb-10 text-xl font-semibold ">{id ? 'Edit Product' : 'Add Product'}</div>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w mx-auto">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="mb-5">
                            <label
                                htmlFor="Title"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                id='name'
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("name", { required: true })}
                            />
                            {errors.name?.message && <span className='text-red-500'>{errors.name?.message}</span>}
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
                        <div className="mb-5 col-start-1 col-end-3">
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
                                {
                                    categories.map((item, index) => (
                                        <option key={index} value={item._id}>{item.name}</option>
                                    ))
                                }
                            </select>
                            {errors.category?.message && <span className='text-red-500'>{errors.category?.message}</span>}
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
                                step='any'
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
                                step='any'
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
                                step='any'
                                defaultValue={0}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("discountPercentage", { valueAsNumber: true })}
                            />
                            {errors.discountPercentage?.message && <span className='text-red-500'>{errors.discountPercentage?.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-9 gap-2">
                        <div className="mb-5 col-start-1 col-end-4">
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Options
                            </label>
                            <select
                                id='category'
                                value={imgOption}
                                onChange={(e) => setImgOption(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option defaultChecked value={"keep"}>Keep Current Image</option>
                                <option value={"link"}>Upload Image form URL</option>
                                <option value={"upload"}>Upload Image from Local</option>
                            </select>
                        </div>
                        <div className="flex justify-center items-center">

                            <img
                                src={imgUrl || "https://lh3.googleusercontent.com/proxy/9Nq_5pImjUn-toierHOXuGbtkBKV3ms7A6ng5bL9qGBlVg8de_lSKdI7tbau_Wk8yMq-AWoGSSuJ1A"}
                                alt="image"
                                className="max-h-20 max-w-20"
                            />

                        </div>
                        <div className="mb-5 col-start-5 col-end-10">
                            {imgOption === "link" && (
                                <>
                                    <label
                                        htmlFor="images"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Upload Image URL
                                    </label>
                                    <input
                                        id='images'
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        {...register("images", { required: true })}
                                    />
                                </>
                            )}
                            {imgOption === "upload" && (
                                <>
                                    <label
                                        htmlFor="images"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Upload Image
                                    </label>
                                    <input
                                        id='images'
                                        type="file"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        {...register("images", { required: true })}
                                    />
                                </>
                            )}
                            {errors.images?.message && <span className='text-red-500'>{errors.images?.message}</span>}
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