const productReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "GET_PRODUCT_BY_ID":
            return {
                ...state,
                product: state.products.find((product) => product._id === action.payload),
            };
        case "ADD_PRODUCT":
            return { ...state, products: [...state.products, action.payload] };
        case "UPDATE_PRODUCT":
            return {
                ...state,
                products: state.products.map((product) => product._id === action.payload._id ? action.payload : product),
            };
        case "DELETE_PRODUCT":
            return {
                ...state,
                products: state.products.filter((product) => product._id !== action.payload),
            }
        default:
            return state;
    }
}
export default productReducer