import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./register.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/tookit/store";
import { registerUser } from "@/tookit/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

export const Register = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await dispatch(registerUser(data));
      navigate("/login");
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message || "Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundVideo}>
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            src="https://player.vimeo.com/video/951046581?badge=0&autopause=0&autoplay=1&loop=1&muted=1&background=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}
            title="Background Video"
          ></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>
      <div className={styles.register}>
        <h2 className={styles.register__title}>Register</h2>
        <form className={styles.register__form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.register__formGroup}>
            <label htmlFor="name" className={styles.register__label}>
              Name:
            </label>
            <input
              type="text"
              className={styles.register__input}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && <p className={styles.register__error}>{errors.name.message}</p>}
          </div>
          <div className={styles.register__formGroup}>
            <label htmlFor="email" className={styles.register__label}>
              Email:
            </label>
            <input
              type="email"
              className={styles.register__input}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email is not valid",
                },
              })}
            />
            {errors.email && <p className={styles.register__error}>{errors.email.message}</p>}
          </div>
          <div className={styles.register__formGroup}>
            <label htmlFor="password" className={styles.register__label}>
              Password:
            </label>
            <input
              type="password"
              className={styles.register__input}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && <p className={styles.register__error}>{errors.password.message}</p>}
          </div>
          <div className={styles.register__formGroup}>
            <label htmlFor="phone" className={styles.register__label}>
              Phone:
            </label>
            <input
              type="phone"
              className={styles.register__input}
              {...register("phone", {
                required: "Phone is required",
                minLength: {
                  value: 9,
                  message: "Phone must be at least 9 characters",
                },
              })}
            />
            {errors.phone && <p className={styles.register__error}>{errors.phone.message}</p>}
          </div>
          <div className={styles.register__formGroup}>
            <label htmlFor="address" className={styles.register__label}>
              Address:
            </label>
            <textarea id="" className={styles.register__textarea} {...register("address")}></textarea>
          </div>
          <div className={styles.register__button}>
            <button type="submit" className={styles.register__submitBtn}>
              Register
            </button>
          </div>
        </form>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </div>
    </div>
  );
};

export default Register;
