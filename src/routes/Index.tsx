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
  Orders,
  Contact
} from "@/pages"
import Navbar from "@/components/layout/navbar/Navbar"
import Footer from "@/components/layout/footer/Footer"
import { ProductDetails } from "@/pages/productDetails/ProductDetails"
import Protected from "./Protected"
import AdminRoute from "./AdminRoute"

import { CategoriesManagement } from "@/components/CategoriesManagement"
import UsersManagement from "@/components/UsersManagement"
import { ProductsManagement } from "@/components/ProductsManagement"

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
          <Route path="admin/products" element={<ProductsManagement />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/users" element={<UsersManagement />} />
          <Route path="admin/categories" element={<CategoriesManagement />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
