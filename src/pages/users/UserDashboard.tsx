import UserSidebar from "@/components/layout/sidebars/UserSidebar"
import React from "react"
import styles from "./user.module.css"

export const UserDashboard = () => {
  return (
    <div className={styles["dashboard-container"]}>
      <UserSidebar />
      <div className={styles["main-content"]}>Main Content</div>
    </div>
  )
}
