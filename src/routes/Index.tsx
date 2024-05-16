import {BrowserRouter, Routes, Route} from "react-router-dom"

import { Contact, HomePage, Error } from '@/pages'
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import ProductDetails from "@/pages/productDetails/ProductDetails"


const Index = () => {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}

export default Index