import { RootState } from "@/tookit/store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./sidebar.module.css"

const AdminSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)
  return (
    <aside className={styles.sidebar}>
      <div>
        <h2>Admin</h2>
        <p>{userData?.name}</p>
        <p>{userData?.email}</p>
      </div>
      <ul>
        <li>
          <Link to="/dashboard/admin/categories">Categories</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">Orders</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/users">Users</Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSidebar
