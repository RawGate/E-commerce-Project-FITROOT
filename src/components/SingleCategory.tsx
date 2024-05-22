import { deleteCategory } from '@/tookit/slices/CategorySlice'
import { AppDispatch } from '@/tookit/store'
import { Category } from '@/types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export const SingleCategory = (props: { category: Category}) => {
  const { category } = props
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (id: string) => {
    dispatch(deleteCategory(id))
     try {
       const response = await dispatch(deleteCategory(id))
       console.log(response)
     } catch (error) {
       console.log(error)
     }
  }

   const handleEdit = async (id: string) => {
    alert(id)
     /*dispatch(deleteCategory(id))
     try {
       const response = await dispatch(deleteCategory(id))
       console.log(response)
     } catch (error) {
       console.log(error)
     }*/
   }

  return (
    <div className="product">
      <div className="product__body">
        <h2>{category.name}</h2>
        <p>{category.description}</p>
        <div>
          <button
            onClick={() => {
              handleEdit(category.categoryId)
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              handleDelete(category.categoryId)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}