import React, { useContext } from 'react'
import Banner from '../../components/user/Banner'
import ProductCard from '../../components/user/ProductCard'
import { ProductContext } from '../../contexts/ProductContext'

const Home = () => {
    const { state } = useContext(ProductContext)
    return (
        <>
            <Banner></Banner>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <header>
                        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                            Product Collection
                        </h2>
                        <p className="mt-4 max-w-md text-gray-500">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                            praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
                            natus?
                        </p>
                    </header>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        {
                            Array.isArray(state.products) && state.products.length > 0
                                ? state.products.map((product) => (<ProductCard key={product.id} product={product} />))
                                : <p>No products available.</p>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home