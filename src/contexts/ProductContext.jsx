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
                    const  data  = await getAllProducts();
                    dispatch({ type: "SET_PRODUCTS", payload: data })
                } catch (error) {
                    console.error("Failed to fetch products:", error);
                }
            }
        )();
    }, [])
    return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
}