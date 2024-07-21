import { createContext, useEffect, useReducer } from "react";
import { getAllProducts } from "../apis/product";
import productReducer from "../reducers/productReducer";

export const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, { products: [] })
    useEffect(() => {
        (
            async () => {
                try {
                    const data = await getAllProducts();
                    dispatch({ type: "SET_PRODUCTS", payload: data.data })
                } catch (error) {
                    console.error("Failed to fetch products:", error);
                }
            }
        )();
    }, [])
    const getProduct = async (id) => {
        try {
            const product = await getProductById(id);
            dispatch({ type: "GET_PRODUCT_BY_ID", payload: id });
            return product.data; // Assuming the API response contains the product data
        } catch (error) {
            console.error("Failed to fetch product by ID:", error);
            return null;
        }
    };
    return <ProductContext.Provider value={{ state, dispatch, getProduct }}>{children}</ProductContext.Provider>;
}