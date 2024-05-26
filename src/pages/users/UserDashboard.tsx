import React, { useEffect } from "react"
import UserSidebar from "@/components/layout/sidebars/UserSidebar"
import InitialsAvatar from "@/components/ui/InitialsAvatar"
import useUserState from "@/hooks/useUserState"
import useOrderState from "@/hooks/useOrderState"
import { fetchUserOrders } from "@/tookit/slices/OrdersSlice"
import { AppDispatch } from "@/tookit/store"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styles from "./user.module.css"

export const UserDashboard = () => {
  const { userData } = useUserState()
  const { orders, isLoading, error } = useOrderState()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userData?.userId) {
      dispatch(fetchUserOrders())
    }
  }, [dispatch, userData])

  const handleSeeMoreClick = () => {
    navigate("/dashboard/user/orders")
  }

  return (
    <div className={styles["dashboard-container"]}>
      <UserSidebar />
      <div className={styles["main-content"]}>
        {userData ? (
          <>
            <div className={styles["user-info"]}>
              <div className={styles["avatar-container"]}>
                <InitialsAvatar name={userData.name} className="h-16 w-16" />
              </div>
              <div className={styles["user-details"]}>
                <h2>Welcome, {userData.name}!</h2>
                <p>Email: {userData.email}</p>
              </div>
            </div>
            <div className={styles["order-history"]}>
              <h3>Your Recent Orders</h3>
              {isLoading ? (
                <p>Loading orders...</p>
              ) : error ? (
                <p>Error loading orders: {error}</p>
              ) : Array.isArray(orders) && orders.length > 0 ? (
  <>
    <table className={styles["orders-table"]}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {orders.slice(0, 2).map((order) => (
          <React.Fragment key={order.orderId}>
            {order.orderProducts?.map((product, index) => (
              <tr key={product.orderProductId}>
                {index === 0 && (
                  <>
                    <td rowSpan={order.orderProducts.length}>
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td rowSpan={order.orderProducts.length}>
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td rowSpan={order.orderProducts.length}>{order.orderStatus}</td>
                  </>
                )}
                <td>{product.product.name}</td>
                <td>{product.productQuantity}</td>
                <td>${product.product.price.toFixed(2)}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    <button className={styles["see-more-button"]} onClick={handleSeeMoreClick}>
      See More
    </button>
  </>
) : (
  <p>No recent orders found.</p>
)}
            </div>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
