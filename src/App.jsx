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
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  useEffect(() => {
    (
      async () => {
        try {
          const data = await getAllProducts();
          setProducts(data);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      }
    )();
  }, [])

  const HandleDeleteProduct = (id) => {
    swal({
      title: "Bạn muốn xóa sản phẩm này?",
      text: "Sau khi xóa, bạn sẽ không thể khôi phục sản phẩm này!",
      icon: "warning",
      buttons: ["Cancel", "OK"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          (
            async () => {
              try {
                await instance.delete('/products/' + id);
                setProducts(products.filter((product) => product.id != id));
                swal("Xóa sản phẩm thành công", {
                  icon: "success",
                  buttons: [''],
                  timer: 2000
                });
              } catch (error) {
                swal({
                  title: `${error.response.data}`,
                  icon: "warning",
                  dangerMode: true,
                })
              }
            }
          )()
        } else {
          swal("Everything is fine", {
            icon: "success",
            buttons: [''],
            timer: 2000
          });
        }
      });
  }
  const HandleSubmitForm = (p) => {
    (
      async () => {
        try {
          if (p.id) {
            await updateProduct(p);
            const newData = await getAllProducts();
            setProducts(newData)
            swal({
              title: "Thành công!",
              text: "Cập nhật sản phẩm thành công",
              buttons: [""],
              icon: "success",
              timer: 2000
            });
          } else {
            const data = await createProduct(p);
            setProducts([...products, data]);
            swal({
              title: "Thành công!",
              text: "Thêm sản phẩm thành công",
              buttons: [""],
              icon: "success",
              timer: 2000
            });
          }
          setTimeout(() => {
            navigate("/admin/products/list")
          }, 1000)
        } catch (error) {
          swal({
            title: `${error.response.data}`,
            icon: "warning",
            dangerMode: true,
          })
        }
      }
    )()
  }
  return (
    <>
        <Routes >
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home products={products} />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/register' element={<AuthForm isRegister />} />
            <Route path='/login' element={<AuthForm />} />
          </Route>
          <Route path='/admin' element={<PrivateRouter />}>
            <Route index element={<Dashboard />} />
            <Route path='/admin/products/list' element={<ListProduct onDel={HandleDeleteProduct} products={products} />} />
            <Route path='/admin/products-form' element={<ProductForm onProduct={HandleSubmitForm} />} />
            <Route path='/admin/products-form/:id' element={<ProductForm onProduct={HandleSubmitForm} />} />
          </Route>
          <Route path='*' element={<Notfound />} />
        </Routes>
    </>
  )
}

export default App
