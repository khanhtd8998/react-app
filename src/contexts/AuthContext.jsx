import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const userAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider")
    }
    return context
}
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLogin, setIsLogin] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    const handleLogin = (token, user) => {
        localStorage.setItem('accessToken', token)
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        setIsLogin(true)
        nav(user?.role === 'admin' ? '/admin' : '/')
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        setUser(null)
        setIsLogin(false)
        nav('/login')
    }
    return (
        <AuthContext.Provider value={{ user, isLogin, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}