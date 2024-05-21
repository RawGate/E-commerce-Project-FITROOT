import UserSidebar from "@/components/layout/sidebars/UserSidebar"
import useUserState from "@/hooks/useUserState"
import { updateUser } from "@/tookit/slices/UserSlice"
import { AppDispatch } from "@/tookit/store"
import { UpdateProfileFormData } from "@/types"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import styles from "./user.module.css"

export const UserProfile = () => {
  const { userData } = useUserState()
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateProfileFormData>()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    if (!userData?.userId) {
      alert("User data is not available")
      return
    }
    try {
      const response = await dispatch(updateUser({ updateUserData: data, userId: userData.userId }))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.user__container}>
      <UserSidebar />
      <div className={styles.mainContent}>
        {userData && (
          <>
            <div className={styles.userInfo}>
              <h3>Name: {userData.name}</h3>
              <h3>Email: {userData.email}</h3>
              <h3>Address: {userData.address}</h3>
              <button className={styles.editBtn} onClick={() => setIsFormOpen(!isFormOpen)}>
                {isFormOpen ? "Close" : "Edit Info"}
              </button>
            </div>

            {isFormOpen && (
              <div className={`${styles.formContainer} ${isFormOpen ? styles.open : styles.close}`}>
                <form className={styles.updateForm} onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" }
                      })}
                    />
                    {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="address">Address:</label>
                    <textarea id="address" {...register("address")} />
                  </div>
                  <button className={styles.submitBtn} type="submit">
                    Update Info
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
