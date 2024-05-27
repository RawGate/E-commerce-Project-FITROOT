import React, { useEffect, useState } from "react"
import { AppDispatch } from "@/tookit/store"
import { useDispatch } from "react-redux"
import "@/index.css"
import { deleteOrder, fetchOrders, updateOrderStatus } from "@/tookit/slices/OrdersSlice"
import useOrderState from "@/hooks/useOrderState"
import AdminSidebar from "./layout/sidebars/AdminSidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faShippingFast, faCheckCircle } from "@fortawesome/free-solid-svg-icons"

export const OrdersManagement = () => {
  const { orders, isLoading, error } = useOrderState()
  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchOrders())
    }
    fetchData()
  }, [dispatch])

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  const handleDelete = async (orderId: string) => {
    try {
      await dispatch(deleteOrder(orderId))
    } catch (error) {
      console.error("Failed to cancel order:", error)
    }
  }

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status }))
    } catch (error) {
      console.error("Failed to update order status:", error)
    }
  }

  return (
    <div className="orders-management">
      <AdminSidebar />
      <div className="orders-container">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select onChange={handleSortChange}>
            <option value="">Select Sorting</option>
            <option value="date">Date</option>
            <option value="total">Total</option>
          </select>
        </div>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.length > 0 &&
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{order.userName}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.orderStatus}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(order.orderId)}
                      className="order-delete-button"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.orderId, "shipped")}
                      className="order-update-button shipped"
                    >
                      <FontAwesomeIcon icon={faShippingFast} />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.orderId, "delivered")}
                      className="order-update-button"
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination-buttons">
          <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
            ‹
          </button>
          <button onClick={handleNextPage}>›</button>
        </div>
      </div>
    </div>
  )
}

export default OrdersManagement
