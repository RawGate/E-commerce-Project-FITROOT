import {BrowserRouter, Routes, Route} from "react-router-dom"

import { Contact, HomePage, Error, Register, Login, AboutUs } from '@/pages'
import Navbar from "@/components/layout/navbar/Navbar"
import Footer from "@/components/layout/footer/Footer"
import { ProductDetails } from "@/pages/productDetails/ProductDetails"



const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Index