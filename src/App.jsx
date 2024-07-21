import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import instance from './apis'
import { createProduct, getAllProducts, updateProduct } from './apis/product'
import AdminLayout from './components/layouts/AdminLayout'
import UserLayout from './components/layouts/UserLayout'
import Notfound from './pages/Notfound'
import Dashboard from './pages/admin/Dashboard'
import ListProduct from './pages/admin/ListProduct'
import ProductForm from './pages/admin/ProductForm'
import About from './pages/user/About'
import Contact from './pages/user/Contact'
import Home from './pages/user/Home'
import ProductDetail from './pages/user/ProductDetail'
import swal from 'sweetalert';
import PrivateRouter from './components/admin/PrivateRouter'
import AuthForm from './pages/user/AuthForm'

function App() {

  return (
    <>
      <Routes >
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<AuthForm isRegister />} />
          <Route path='/login' element={<AuthForm />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/admin/products/list' element={<ListProduct />} />
          <Route path='/admin/products-form' element={<ProductForm />} />
          <Route path='/admin/products-form/:id' element={<ProductForm />} />
        </Route>
        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
