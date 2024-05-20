import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import React from "react"
import styles from "./admin.module.css"

export const AdminDashboard = () => {
  return (
    <div className={styles["dashboard-container"]}>
      <AdminSidebar />
      <div className={styles["main-content"]}>Main Content</div>
    </div>
  )
}
