import React, { useState } from "react"
import UserSidebar from "@/components/layout/sidebars/UserSidebar"
import useUserState from "@/hooks/useUserState"
import { updateUser } from "@/tookit/slices/UserSlice"
import { AppDispatch } from "@/tookit/store"
import { UpdateProfileFormData } from "@/types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import styles from "./user.module.css"
import InitialsAvatar from "@/components/ui/InitialsAvatar"

export const UserProfile: React.FC = () => {
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
              <div className={styles.userInfoAvatar}>
                <InitialsAvatar name={userData.name} className="h-16 w-16" />
              </div>
              <div className={styles.userInfoText}>
                <h3>{userData.name}</h3>
                <h3>{userData.email}</h3>
              </div>
            </div>
            <button className={styles.editBtn} onClick={() => setIsFormOpen(!isFormOpen)}>
              {isFormOpen ? "Close" : "Edit Info"}
            </button>
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
                    <input
                      type="text"
                      id="address"
                      {...register("address", {
                        required: "Address is required"
                      })}
                    />
                    {errors.address && (
                      <p className={styles.errorMessage}>{errors.address.message}</p>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\d{9,}$/,
                          message: "Phone number must be at least 9 digits"
                        }
                      })}
                    />
                    {errors.phone && <p className={styles.errorMessage}>{errors.phone.message}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                      })}
                    />
                    {errors.password && (
                      <p className={styles.errorMessage}>{errors.password.message}</p>
                    )}
                  </div>
                  <button className={styles.submitBtn} type="submit">
                    Save
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

export default UserProfile
