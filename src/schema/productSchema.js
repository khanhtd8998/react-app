import * as z from 'zod'

const productSchema = z.object({
    title: z.string().min(5, {message: "Tối thiểu 5 ký tự"}),
    price: z.number({message: "Không để trống thông tin"}).min(0, {message: "Giá nhập phải lớn hơn 0"}),
    description: z.string().nonempty({message: "Không để trống thông tin"}),
    category: z.string(),
    images: z.string().nonempty({message: "Không để trống thông tin"}),
    brand: z.string().min(3, {message: "Tối thiểu 3 ký tự"}).nonempty({message: "Không để trống thông tin"}),
    stock: z.number({message: "Không để trống thông tin"}).min(0, {message: "Giá trị phải lớn hơn 0"}),
    rating: z.number({message: "Không để trống thông tin"}).min(0, {message: "Giá trị phải lớn hơn 0"}).max(5, {message: "Giá trị không lớn hơn 5"}),
    discountPercentage: z.number({message: "Không để trống thông tin"}).min(0, {message: "Giá trị phải lớn hơn 0"}).max(100, {message: "Giá trị không lớn hơn 100"}),
})


export default productSchema