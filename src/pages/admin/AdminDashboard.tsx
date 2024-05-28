import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import styles from "./admin.module.css"
import useOrderState from "@/hooks/useOrderState"
import useUserState from "@/hooks/useUserState"
import useProductState from "@/hooks/useProductState"
import { AppDispatch } from "@/tookit/store"
import { fetchOrders } from "@/tookit/slices/OrdersSlice"
import { fetchUsers } from "@/tookit/slices/UserSlice"
import { fetchProducts } from "@/tookit/slices/ProductSlice"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

export const AdminDashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { orders } = useOrderState()
  const { users } = useUserState()
  const { products } = useProductState()

  useEffect(() => {
    dispatch(fetchOrders())
    dispatch(fetchUsers({ pageNumber: 1, pageSize: 20, searchTerm: "", sortBy: "" }))
    dispatch(
      fetchProducts({
        pageNumber: 1,
        pageSize: 10,
        searchTerm: "",
        sortBy: "",
        selectedCategories: [],
        minPrice: undefined,
        maxPrice: undefined
      })
    )
  }, [dispatch])

  const ordersCount = orders.length
  const usersCount = users.length
  const productsCount = products.length

  console.log("Fetched Orders:", orders)
  console.log("Fetched Users:", users)
  console.log("Fetched Products:", products)

   const orderStatusData = {
    labels: ["Pending", "Shipped", "Delivered"],
   datasets: [{
    
        label: "Order Status",
        data: [
          orders.filter((order) => order.orderStatus === "Pending").length,
          orders.filter((order) => order.orderStatus === "Shipped").length,
          orders.filter((order) => order.orderStatus === "Delivered").length,
      
        ],
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"]
      }
    ]
  } 

  const userRoleData = {
    labels: ["Admin", "Customer"],
    datasets: [
      {
        label: "User Roles",
        data: [
          users.filter((user) => user.role === "admin").length,
          users.filter((user) => user.role === "customer").length
        ],
        backgroundColor: ["#ff6384", "#36a2eb"]
      }
    ]
  }

  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category?.name || "Uncategorized"))
  )
  const productCategoryData = {
    labels: uniqueCategories,
    datasets: [
      {
        label: "Products by Category",
        data: uniqueCategories.map((category) =>
          products
            .filter((product) => (product.category?.name || "Uncategorized") === category)
            .reduce((acc, product) => acc + product.stock, 0)
        ),
        backgroundColor: uniqueCategories.map((_, i) => `hsl(${i * 30}, 70%, 50%)`)
      }
    ]
  }

  console.log("Product Category Data:", productCategoryData)

  return (
    <div className={styles["dashboard-container"]}>
      <AdminSidebar />
      <div className={styles["main-content"]}>
        <h1> Dashboard</h1>
        <div className={styles["summary"]}>
          <div className={styles["summary-item"]}>
            <h3>Users</h3>
            <p>{usersCount}</p>
          </div>
          <div className={styles["summary-item"]}>
            <h3>Products</h3>
            <p>{productsCount}</p>
          </div>
          <div className={styles["summary-item"]}>
            <h3>Orders</h3>
             <p>{ordersCount}</p> 
          </div>
        </div>
        <div className={styles["charts"]}>
          <div className={styles["chart"]}>
            <h3>Order Status</h3>
            {ordersCount > 0 ? <Bar data={orderStatusData} /> : <p>No data available</p>} 
          </div>
          <div className={styles["chart"]}>
            <h3>User Roles</h3>
            {usersCount > 0 ? <Pie data={userRoleData} /> : <p>No data available</p>}
          </div>
          <div className={styles["chart"]}>
            <h3>Products by Category</h3>
            {productsCount > 0 ? <Bar data={productCategoryData} /> : <p>No data available</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
