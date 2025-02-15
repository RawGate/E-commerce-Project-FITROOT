import React, { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
import { AppDispatch } from "@/tookit/store"
import { fetchProducts } from "@/tookit/slices/ProductSlice"
import { useDispatch } from "react-redux"
import "@/index.css"
import useProductState from "@/hooks/useProductState"
import useCategoriesState from "@/hooks/useCategoriesState"
import { fetchCategories } from "@/tookit/slices/CategorySlice"

const Products = () => {
  const { products, isLoading, error } = useProductState()
  const { categories } = useCategoriesState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchProducts({
          pageNumber,
          pageSize,
          searchTerm,
          sortBy,
          selectedCategories,
          minPrice: priceRange[0],
          maxPrice: priceRange[1]
        })
      )
    }
    fetchData()
  }, [pageNumber, searchTerm, sortBy, selectedCategories, priceRange])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize, searchTerm, sortBy }))
    }
    fetchData()
  }, [])

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

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "all") {
      setSelectedCategories([])
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.includes(categoryId)
          ? prevSelected.filter((id) => id !== categoryId)
          : [...prevSelected, categoryId]
      )
    }
  }

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    const name = e.target.name
    setPriceRange((prevRange) => {
      return name === "min" ? [value, prevRange[1]] : [prevRange[0], value]
    })
  }

  return (
    <div className="product-page-container">
      <aside className="sidebar">
        <div className="filter-category">
          <h2>Choose category</h2>
          <div className="category all-categories">
            <span
              className={`category ${selectedCategories.length === 0 ? "selected" : ""}`}
              onClick={() => handleCategoryChange("all")}
            >
              All Categories
            </span>
          </div>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <div key={category.categoryId} className="category">
                <span
                  className={`category ${
                    selectedCategories.includes(category.categoryId) ? "selected" : ""
                  }`}
                  onClick={() => handleCategoryChange(category.categoryId)}
                >
                  {category.name}
                </span>
              </div>
            ))}
        </div>
        <div className="filter-price">
          <h2>Filter By Price</h2>
          <div className="price-range">
            <p>Use slider or enter min and max price</p>
            <label>
              Min Price:
              <input
                type="number"
                name="min"
                min="0"
                max="2000"
                value={priceRange[0]}
                onChange={handlePriceRangeChange}
              />
            </label>
            <label>
              Max Price:
              <input
                type="number"
                name="max"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={handlePriceRangeChange}
              />
            </label>
            <input
              type="range"
              name="min"
              min="0"
              max="2000"
              value={priceRange[0]}
              onChange={handlePriceRangeChange}
            />
            <input
              type="range"
              name="max"
              min="0"
              max="2000"
              value={priceRange[1]}
              onChange={handlePriceRangeChange}
            />
          </div>
        </div>
      </aside>
      <div className="product-list-container">
        <h2 className="title">Products</h2>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div>
            <select onChange={handleSortChange}>
              <option value="">Select Sorting</option>
              <option value="name">A-Z</option>
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
            ‹
          </button>
          <button onClick={handleNextPage}>›</button>
        </div>
      </div>
    </div>
  )
}

export default Products
