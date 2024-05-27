import React, { useEffect, useState } from "react"
import { AppDispatch } from "@/tookit/store"
import { useDispatch } from "react-redux"
import "@/index.css"
import useCategoriesState from "@/hooks/useCategoriesState"
import { fetchCategories } from "@/tookit/slices/CategorySlice"
import { SubmitHandler, Controller, useForm } from "react-hook-form"
import {  CreateProductFormData, Product } from "@/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons"
import useProductState from "@/hooks/useProductState"
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct
} from "@/tookit/slices/ProductSlice"
import { uploadImageToCloudinary } from "@/utils/cloudinary"
import AdminSidebar from "./layout/sidebars/AdminSidebar"

export const ProductsManagement = () => {
  const { categories, isLoading, error, totalPages } = useCategoriesState()
  const { products } = useProductState()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors }
  } = useForm<CreateProductFormData>()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<CreateProductFormData | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<string>("")
  const [productCategoryId, setProductCategoryId] = useState<string>("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize, searchTerm, sortBy }))
    }
    fetchData()
  }, [dispatch])

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
  }, [pageNumber, searchTerm, sortBy, dispatch])

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

  const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
    try {
      let imageUrl = ""
      if (data.image && data.image.length > 0) {
        const file = data.image[0]
        imageUrl = await uploadImageToCloudinary(file)
      }
      const productData = {
        ...data,
        image: imageUrl
      }
      await dispatch(createProduct(productData))
      reset() 
      setImagePreview(null)
    } catch (error) {
      console.log("Product creation failed", error)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProduct(id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (product: Product) => {
    setIsEdit(true)
    setSelectedProductId(product.productId)
    setImagePreview(product.image)
    setProductCategoryId(product.categoryId)
    setValue("name", product.name)
    setValue("description", product.description)
    setValue("price", product.price)
    setValue("stock", product.stock)
    setValue("categoryId", product.categoryId)
  }

  const handleEditSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
    try {
      let imageUrl = selectedProduct?.image ?? ""
      if (data.image && data.image.length > 0) {
        const file = data.image[0]
        imageUrl = await uploadImageToCloudinary(file)
      }
      const updatedProductData = {
        ...data,
        image: imageUrl,
        categoryId: productCategoryId
      }
      await dispatch(
        updateProduct({ updateProductData: updatedProductData, productId: selectedProductId }) 
      ) 
      setIsEdit(false)
      reset() 
      setImagePreview(null)
    } catch (error) {
      console.log("Product update failed", error)
    }
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
    setSelectedProduct(null)
    setSelectedProductId("")
    setImagePreview(null)
    setProductCategoryId("")
    reset() 
  }

  return (
    <div className="products-management">
      <AdminSidebar />
      <div className="products-container">
        {!isEdit && (
          <div className="form-box">
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="product-form">
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" }
                  })}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" {...register("description")} />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  {...register("price", {
                    required: "Price is required"
                  })}
                />
                {errors.price && <p>{errors.price.message}</p>}
              </div>
              <div>
                <label htmlFor="stock">Stock:</label>
                <input
                  type="number"
                  step="0.01"
                  id="stock"
                  {...register("stock", {
                    required: "Stock is required"
                  })}
                />
                {errors.stock && <p>{errors.stock.message}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="image">Image: </label>
                <input type="file" accept="image/*" {...register("image")} />
                {imagePreview && (
                  <img src={imagePreview} alt="image preview" className="image-preview" />
                )}
                <div>
                  <label htmlFor="categoryId">Category:</label>
                  <div className="select-wrapper">
                    <Controller
                      name="categoryId"
                      control={control}
                      render={({ field }) => (
                        <select {...field}>
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                </div>
                <br />
              </div>
              <div className="form-buttons">
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        )}

        {isEdit && (
          <div className="edit-product form-box">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit(handleEditSubmit)} className="product-form">
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" }
                  })}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" {...register("description")} />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  {...register("price", {
                    required: "Price is required"
                  })}
                />
                {errors.price && <p>{errors.price.message}</p>}
              </div>
              <div>
                <label htmlFor="stock">Stock:</label>
                <input
                  type="number"
                  step="0.01"
                  id="stock"
                  {...register("stock", {
                    required: "Stock is required"
                  })}
                />
                {errors.stock && <p>{errors.stock.message}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="image">Image: </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="image preview" className="image-preview" />
                )}
              </div>
              <div>
                <label htmlFor="categoryId">Category:</label>
                <div className="select-wrapper">
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <select {...field}>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.categoryId} value={category.categoryId}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              </div>
              <div className="form-buttons">
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancelEdit} className="cancel-button">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="category-list">
          <h2>Products</h2>
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
              <option value="description">Description</option>
              <option value="price">Price</option>
            </select>
          </div>
          <table className="category-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.length > 0 &&
                products.map((product) => (
                  <tr key={product.productId}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.slug}
                        className="product-management-img"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category ? product.category.name : "No Category"}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button onClick={() => handleEdit(product)} className="category-edit-button">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.productId)}
                        className="category-delete-button"
                      >
                        <FontAwesomeIcon icon={faTrash} />
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

export default ProductsManagement
