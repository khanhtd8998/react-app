import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
    return (
        <>
            <div className="relative flex w-72 flex-col rounded-xl border border-t bg-white bg-clip-border text-gray-700 shadow-xl sm:mx-auto md:mx-auto">
                <div className="relative mx-4 mt-4 h-40 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <Link to={`/products/${product.id}`}>
                        <img src={product.images} className="h-full w-full object-cover" />
                    </Link>
                </div>
                <Link to={`/products/${product.id}`}>
                    <div className="pt-3 px-3  mb-3">
                        <div className="mb-2 flex items-star flex-col">
                            <p className="block lg:h-12 font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                {product.title}
                            </p>
                            <p className="block lg:h-5 font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                <span className="text-red-700">$ {product.price}</span>
                            </p>
                        </div>
                        <p className="block h-[3rem] font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                            {product.description}
                        </p>
                    </div>
                </Link>
                <div className="p-3 pt-0 mt-5 flex justify-end">
                    <button
                        className="block w-full-sm select-none rounded-lg py-3 px-3 text-center align-m_iddle font-sans text-xs font-bold uppercase text-white transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        <i
                            className="fa-solid fa-cart-shopping fa-xl"
                            style={{ color: "#22c55e" }}
                        />
                    </button>
                    <button className="rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:text-red-500 hover:scale-105">
                        <svg
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke-w_idth={2}
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                    </button>
                </div>
            </div>

        </>
    )
}

export default ProductCard