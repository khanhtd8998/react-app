import instance from ".";
import swal from "sweetalert";
export const getAllProducts = async () => {
    try {
        const { data } = await instance.get('/products');
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (id) => {
    try {
        const { data } = await instance.get(`/products/${id}`);
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (p) => {
    try {
        const { data } = await instance.put(`/products/${p.id}`, p);
        return data
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (p) => {
    try {
        const { data } = await instance.post(`/products`, p);
        return data
    } catch (error) {
        console.log(error)
    }
}