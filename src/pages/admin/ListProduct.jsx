import React, { useContext, useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { getAllProducts, getProductById } from '../../apis/product'
import { ProductContext } from '../../contexts/ProductContext'
import instance from '../../apis'
const ListProduct = () => {
    const { state, dispatch } = useContext(ProductContext)
    const [p, setP] = useState({})
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        (async () => {
            try {
                const res = await getAllProducts();
                dispatch({ type: 'SET_PRODUCTS', payload: res?.data });
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        })()
    }, [dispatch]);
    console.log(state);
    // const filteredData = state?.products.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    const showProductDetail = (id) => {
        (
            async () => {
                try {
                    const data = await getProductById(id)
                    setP(data.data)
                    const showDetail = document.querySelector('.show-product-detail')
                    showDetail?.classList.toggle('show-detail')
                } catch (error) {
                    console.log(error)
                }
            }
        )()
    }
    const closeProductDetail = () => {
        const showDetail = document.querySelector('.show-product-detail')
        showDetail?.classList.remove('show-detail')
    }
    const handleDelete = (id) => {
        swal({
            title: "Bạn muốn xóa sản phẩm này?",
            text: "Sau khi xóa, bạn sẽ không thể khôi phục sản phẩm này!",
            icon: "warning",
            buttons: ["Cancel", "OK"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    (
                        async () => {
                            try {
                                await instance.delete('/products/' + id);
                                dispatch({ type: "DELETE_PRODUCT", payload: id })
                                swal("Xóa sản phẩm thành công", {
                                    icon: "success",
                                    buttons: [''],
                                    timer: 2000
                                });
                            } catch (error) {
                                swal({
                                    title: `${error}`,
                                    icon: "warning",
                                    dangerMode: true,
                                })
                            }
                        }
                    )()
                } else {
                    swal("Everything is fine", {
                        icon: "success",
                        buttons: [''],
                        timer: 2000
                    });
                }
            });
    }
    return (
        <>
            <div className="max-w-2xl lg:w-full mt-8">
                <div className="flex flex-col sm:flex-row items-center sm:space-y-0 space-y-2">
                    <div className="relative w-full">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="voice-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos, Design Templates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="button"
                            className="flex absolute inset-y-0 right-0 items-center pr-3"
                        >
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="w-full sm:w-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0 ml-2">
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-3 w-full sm:w-auto text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg
                                className="mr-2 -ml-1 w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            Search
                        </button>
                        <Link to={'/admin/products-form'}
                            type="submit"
                            className="inline-flex items-center py-2.5 px-3 w-full sm:w-auto text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>
                            Product
                        </Link>
                    </div>
                </div>
            </div>
            <div className="rounded-lg border border-gray-200 shadow-md my-5">

                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                Price
                            </th>
                            <th
                                scope="col"
                                className="px-1 py-4 font-medium text-gray-900 w-[10%]"
                            >
                                Category
                            </th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {
                            Array.isArray(state.products) && state.products.length > 0 ? state.products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        <span className="text-sm">
                                            <span className="font-medium text-gray-700">{product?.name}</span>
                                        </span>
                                    </th>
                                    <td className="px-6 py-4">
                                        <img width="50px" height="50px" src={product?.images || "https://lh3.googleusercontent.com/proxy/9Nq_5pImjUn-toierHOXuGbtkBKV3ms7A6ng5bL9qGBlVg8de_lSKdI7tbau_Wk8yMq-AWoGSSuJ1A"} />
                                    </td>
                                    <td className="px-6 py-4">{product?.price}</td>
                                    <td className="px-1 py-4">
                                        <span className="flex gap-2">{product?.category?.name}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex gap-2">{product?.description}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex justify-end gap-4">
                                            <button onClick={() => handleDelete(product?._id)} x-data="{ tooltip: 'Delete' }">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                    x-tooltip="tooltip"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                            <Link to={`/admin/products-form/${product._id}`} x-data="{ tooltip: 'Edite' }">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                    x-tooltip="tooltip"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                    />
                                                </svg>
                                            </Link>
                                            <span className="">
                                                <button onClick={() => showProductDetail(product._id)} className="relative btn-show">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr className='text-center'>
                                    <td className='px-6 py-4 text-lg font-semibold' colSpan={6}>Not found</td>
                                </tr>
                            )
                        }
                    </tbody>
                    {
                        p &&
                        <div className="show-product-detail hidden fixed top-36 right-20 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-end">
                                <button
                                    onClick={closeProductDetail}
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-3.5 my-1 me-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    X
                                </button>
                            </div>
                            <Link to={`/products/${p._id}`}>
                                <img className="rounded-t-lg mx-auto w-[15rem] h-[11.5rem]" src={p.images} />
                            </Link>
                            <div className="p-3">
                                <a>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {p.title}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{p.description}</p>
                                <p className="mb-3 font-semibold text-xl text-red-700 dark:text-gray-400">$ {p.price}</p>
                                <Link to={`/products/${p._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    View Detail
                                    <svg
                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    }
                </table>

            </div>
        </>
    )
}

export default ListProduct