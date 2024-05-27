import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import React, { useEffect, useState } from "react"
import { AppDispatch } from "@/tookit/store"
import { useDispatch } from "react-redux"
import "@/index.css"
import useUserState from "@/hooks/useUserState"
import { blockUser, fetchUsers } from "@/tookit/slices/UserSlice"

export const UsersManagement = () => {
  const { users, isLoading, error, totalPages } = useUserState()
  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers({ pageNumber, pageSize, searchTerm, sortBy }))
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy])

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

  const handleBlock = async (userId: string | undefined) => {
    try {
      const response =  userId && (await dispatch(blockUser(userId)))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="users-management">
      <AdminSidebar />
      <div className="users-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="user-list">
          <h2>Users</h2>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select onChange={handleSortChange}>
              <option value="">Select Sorting</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Is Blocked</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <tr key={user.userId} className={user.isBlocked ? "blocked" : ""}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isBlocked ? "Yes" : "No"}</td>
                    <td>
                      <button
                        onClick={() => handleBlock(user.userId)}
                        className="user-action-button"
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
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
            <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersManagement
