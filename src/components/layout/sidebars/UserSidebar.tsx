import { RootState } from "@/tookit/store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./sidebar.module.css"

const UserSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)
  return (
    <aside className={styles.sidebarr}>
      <div>
        <h2>Profile</h2>
        <p>{userData?.name}</p>
        <p>{userData?.email}</p>
      </div>
      <ul>
        <li>
          <Link to="/dashboard/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="/dashboard/user/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default UserSidebar
