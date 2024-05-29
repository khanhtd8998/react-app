import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../../apis'

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };
    useEffect(() => {
        (
            async () => {
                const { data } = await instance.get(`/products/${id}`)
                setProduct(data)
            }
        )()
    }, [id])
    if (!product) {
        return <div
            class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen" >
            <div class="flex space-x-2 animate-pulse">
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
        </div >
    }
    return (
        <>
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 pt-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            src={product.images}
                            alt="ecommerce"
                            className="lg:w-1/2 p-2 w-full lg:h-[27rem] object-cover object-center rounded "
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-2 mt-4 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {product.category}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {product.title}
                            </h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-red-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-red-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-red-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-red-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-red-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">{product?.reviews?.length} Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                    <a className="text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                        </svg>
                                    </a>
                                    <a className="ml-2 text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-2 text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed">
                                {product.description}
                            </p>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full">
                                                <tbody>
                                                    <tr className="border-b">
                                                        <td className="w-[20%] text-start text-sm text-gray-900 font-medium py-4 whitespace-nowrap">
                                                            Brand
                                                        </td>
                                                        <td className="text-sm flex justify-start text-gray-900 font-light px-6 py-4 whitespace">
                                                            {product.brand}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="w-[20%] text-start text-sm text-gray-900 font-medium py-4 whitespace-nowrap">
                                                            Stock
                                                        </td>
                                                        <td className="text-sm flex justify-start text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {product.stock}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="w-[20%] text-start text-sm text-gray-900 font-medium py-4 whitespace-nowrap">
                                                            Rating
                                                        </td>
                                                        <td className="text-sm flex justify-start text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {product.rating}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="w-[20%] text-start text-sm text-gray-900 font-medium py-4 whitespace-nowrap">
                                                            Discount Percentage
                                                        </td>
                                                        <td className="text-sm flex justify-start text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {product.discountPercentage}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                                    <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none" />
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                            <option>SM</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-4 h-4"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                    $ {product.price}
                                </span>
                                <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                                    Buy now
                                </button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:text-red-500">
                                    <svg
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-6 h-6"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container pt-16 px-36 mx-auto border-t border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                Discussion (20)
                            </h2>
                        </div>
                        <form className="mb-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <textarea
                                    id="comment"
                                    rows={6}
                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    placeholder="Write a comment..."
                                    required=""
                                    defaultValue={""}
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            >
                                Post comment
                            </button>
                        </form>
                        {
                            product?.reviews?.map((review, index) => (

                                <article key={review.id || index} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                <img
                                                    className="mr-2 w-6 h-6 rounded-full"
                                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                    alt="Michael Gough"
                                                />
                                                {review.reviewerName}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <time
                                                    pubdate=""
                                                    dateTime="2022-02-08"
                                                    title="February 8th, 2022"
                                                >
                                                    {formatDate(review.date)}
                                                </time>
                                            </p>
                                        </div>
                                        <button
                                            id="dropdownCommentButton"
                                            data-dropdown-toggle="dropdownComment"
                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                            type="button"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 16 3"
                                            >
                                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                            </svg>
                                            <span className="sr-only">Comment settings</span>
                                        </button>
                                        {/* Dropdown menu */}
                                        <div
                                            id="dropdownComment"
                                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                        >
                                            <ul
                                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby="dropdownMenuIconHorizontalButton"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Edit
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Remove
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Report
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </footer>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {review.comment}
                                    </p>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <button
                                            type="button"
                                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                                        >
                                            <svg
                                                className="mr-1.5 w-3.5 h-3.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                                />
                                            </svg>
                                            Reply
                                        </button>
                                    </div>
                                </article>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>

    )
}

export default ProductDetail