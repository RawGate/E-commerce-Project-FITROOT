import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import React, { useEffect, useState } from "react"
import { AppDispatch } from "@/tookit/store"
import { useDispatch } from "react-redux"
import "@/index.css"
import useCategoriesState from "@/hooks/useCategoriesState"
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory
} from "@/tookit/slices/CategorySlice"
import { SubmitHandler, useForm } from "react-hook-form"
import { Category, CreateCategoryFormData } from "@/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons"

export const CategoriesManagement = () => {
  const { categories, isLoading, error, totalPages } = useCategoriesState()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateCategoryFormData>()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize, searchTerm, sortBy }))
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

  const onSubmit: SubmitHandler<CreateCategoryFormData> = async (data) => {
    try {
      const response = await dispatch(createCategory(data))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteCategory(id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (categoryId: string, category: Category) => {
    setIsEdit(true)
    setCategoryName(category.name)
    setSelectedCategoryId(categoryId)
    setCategoryDescription(category.description)
  }

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const updateCategoryData = {
      name: categoryName,
      description: categoryDescription
    }
    dispatch(
      updateCategory({ updateCategoryData: updateCategoryData, categoryId: selectedCategoryId })
    )
    setIsEdit(false)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCategoryDescription(event.target.value)
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
    setCategoryName("")
    setCategoryDescription("")
    setSelectedCategoryId("")
  }

  return (
    <div className="categories-management">
      <AdminSidebar />
      <div className="categories-container">
        <div className="create-category">
          <h2>Create Category</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="category-form">
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
            <button type="submit">Create</button>
          </form>
        </div>

        {isEdit && (
          <div className="edit-category">
            <div className="edit-category-header">
              <h2>Edit Category</h2>
              <button className="close-button" onClick={handleCancelEdit}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="category-edit-form">
              <div>
                <label htmlFor="categoryName">Name:</label>
                <input name="name" value={categoryName} required onChange={handleNameChange} />
              </div>
              <div>
                <label htmlFor="categoryDescription">Description:</label>
                <textarea
                  name="categoryDescription"
                  value={categoryDescription}
                  onChange={handleDescriptionChange}
                />
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
        )}

        <div className="category-list">
          <h2>Categories</h2>
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
            </select>
          </div>
          <section>
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <div className="category-item" key={category.categoryId}>
                  <div>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                    <div>
                      <button
                        onClick={() => handleEdit(category.categoryId, category)}
                        className="category-edit-button"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.categoryId)}
                        className="category-delete-button"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </section>
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

export default CategoriesManagement
