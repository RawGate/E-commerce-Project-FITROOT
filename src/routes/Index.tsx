import { BrowserRouter, Routes, Route } from "react-router-dom"

import {
  HomePage,
  Error,
  Register,
  Login,
  AboutUs,
  AdminDashboard,
  UserDashboard,
  UserProfile,
  UserOrders,
  Products,
  Orders,
  Users,
  Categories,
  Contact
} from "@/pages"
import Navbar from "@/components/layout/navbar/Navbar"
import Footer from "@/components/layout/footer/Footer"
import { ProductDetails } from "@/pages/productDetails/ProductDetails"
import Protected from "./Protected"
import AdminRoute from "./AdminRoute"

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

        <Route path="/dashboard" element={<Protected />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/categories" element={<Categories />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
