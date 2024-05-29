import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './components/layouts/UserLayout'
import Notfound from './pages/Notfound'
import About from './pages/user/About'
import Home from './pages/user/Home'
import Contact from './pages/user/Contact'
import { useEffect, useState } from 'react'
import ProductDetail from './pages/user/ProductDetail'
import instance from './apis'

function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    (
      async () => {
        try {
          const response = await instance.get('/products');
          setProducts(response.data);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      }
    )();
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<UserLayout/>}>
          <Route index element={<Home products={products} />} />
          <Route path='/products/:id' element={<ProductDetail/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Route>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
    </>
  )
}

export default App
