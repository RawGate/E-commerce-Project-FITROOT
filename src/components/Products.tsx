import React, { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/tookit/store"
import { fetchProducts } from "@/tookit/slices/ProductSlice"
import { useDispatch } from "react-redux"

import "@/index.css"

const Products = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productR)

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [filteringTerm, setFilteringTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, filteringTerm, sortColumn }))
    }
    fetchData()
  }, [pageNumber, filteringTerm, sortColumn])

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }
  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteringTerm(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortColumn(e.target.value)
  }

  return (
    <div className="product-list-container">
      <h2 className="title">Products</h2>

      <div className="search-input">
        <input
          type="text"
          placeholder="Search"
          value={filteringTerm}
          onChange={handleSearchChange}
        />
        <div>
          <select name="" id="" onChange={handleSortChange}>
            <option value="">Select Sorting</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
      <section className="products">
        {products &&
          products.length > 0 &&
          products.map((product) => <SingleProduct key={product.productId} product={product} />)}
      </section>
      <div className="product-list-buttons">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          {" "}
          ‹
        </button>
        <button onClick={handleNextPage}> ›</button>
      </div>
    </div>
  )
}

export default Products
