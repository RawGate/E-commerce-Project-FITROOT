import React, { useEffect } from "react"
import UserSidebar from "@/components/layout/sidebars/UserSidebar"
import { useDispatch } from "react-redux"
import { deleteOrder, fetchUserOrders } from "@/tookit/slices/OrdersSlice"
import useOrderState from "@/hooks/useOrderState"
import useUserState from "@/hooks/useUserState"
import { AppDispatch } from "@/tookit/store"
import styles from "./user.module.css"

export const UserOrders = () => {
  const { orders, isLoading, error } = useOrderState()
  const { userData } = useUserState()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.userId) {
        console.log("Fetching orders for user ID:", userData.userId)
        await dispatch(fetchUserOrders())
      } else {
        console.error("User ID is undefined, cannot fetch orders.")
      }
    }
    fetchData()
  }, [dispatch, userData])

  const handleCancelOrder = async (orderId: string) => {
    try {
      await dispatch(deleteOrder(orderId))
    } catch (error) {
      console.error("Failed to cancel order:", error)
    }
  }

  return (
    <div className={styles["user__container"]}>
      <UserSidebar />
      <div className={styles["user__orders"]}>
        <h2>Your Orders</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : Array.isArray(orders) && orders.length > 0 ? (
          <table className={styles["orders-table"]}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order.orderId}>
                  {order.orderProducts.map((product, index) => (
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
                      {index === 0 && (
                        <td rowSpan={order.orderProducts.length}>
                          <button
                            onClick={() => handleCancelOrder(order.orderId)}
                            className={styles["cancel-button"]}
                          >
                            Cancel
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  )
}

export default UserOrders
