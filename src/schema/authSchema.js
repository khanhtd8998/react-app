import * as z from 'zod'

export const registerSchema = z.object({
    username: z.string().nonempty({message: "Không để trống thông tin"}).min(5, {message: "Tối thiểu 5 ký tự"}),
    email: z.string().nonempty({message: "Không để trống thông tin"}).email({message: "Email không đúng định dạng"}),
    password: z.string().nonempty({message: "Không để trống thông tin"}).min(5, {message: "Tối thiểu 5 ký tự"}),
    confirmPassword:  z.string().nonempty({ message: "Không để trống thông tin" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"], // Đánh dấu lỗi vào trường confirmPassword
});

export const loginShema = z.object({
    email: z.string().nonempty({message: "Không để trống thông tin"}).email({message: "Email không đúng định dạng"}),
    password: z.string().nonempty({message: "Không để trống thông tin"}),
})
