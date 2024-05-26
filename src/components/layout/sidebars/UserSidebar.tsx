import { RootState } from "@/tookit/store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./sidebar.module.css"

const UserSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)
  return (
    <aside className={styles.sidebar}>
      <div>
        <h2>Quick Links</h2>
      </div>
      <ul>
        <li>
          <Link to="/dashboard/user">Profile</Link>
        </li>
        <li>
          <Link to="/dashboard/user/profile">Edit Info</Link>
        </li>
        <li>
          <Link to="/dashboard/user/orders">Orders History</Link>
        </li>
      </ul>
    </aside>
  )
}

export default UserSidebar
