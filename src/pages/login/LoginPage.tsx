import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/tookit/store"
import { loginUser } from "@/tookit/slices/UserSlice"
import { Alert } from "@mui/material"
import { LoginFormData } from "@/types"
import styles from "./login.module.css"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await dispatch(loginUser(data)).unwrap()

      console.log("response from login", response)

      if (response && response.data && response.data.user && response.data.user.role) {
        const isAdmin = response.data.user.role === "admin"
        navigate(isAdmin ? "/dashboard/admin" : "/dashboard/user")
        setSuccessMessage("Login successful")
        setErrorMessage("")
      } else {
        throw new Error("Invalid response from server")
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Login failed")
    }
  }

  return (
    <div className={styles.login}>
      <h2 className={styles.login__title}>Login</h2>
      <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.login__formGroup}>
          <label htmlFor="email" className={styles.login__label}>
            Email:
          </label>
          <input
            type="email"
            className={styles.login__input}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid"
              }
            })}
          />
          {errors.email && <p className={styles.login__error}>{errors.email.message}</p>}
        </div>
        <div className={styles.login__formGroup}>
          <label htmlFor="password" className={styles.login__label}>
            Password:
          </label>
          <input
            type="password"
            className={styles.login__input}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && <p className={styles.login__error}>{errors.password.message}</p>}
        </div>
        <div className={styles.login__button}>
          <button type="submit" className={styles.login__submitBtn}>
            Login
          </button>
        </div>
      </form>
      {successMessage && <p className={styles.login__success}>{successMessage}</p>}
      {errorMessage && <p className={styles.login__error}>{errorMessage}</p>}
    </div>
  )
}

export default Login
