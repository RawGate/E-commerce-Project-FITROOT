import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/tookit/store';
import { loginUser } from '@/tookit/slices/UserSlice';
import { Alert } from '@mui/material';
import { LoginFormData } from '@/types';
import styles from './login.module.css';

export const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await dispatch(loginUser(data));
      console.log('response from register' + response);
      setSuccessMessage(response.payload.message);
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage(error.message || 'registration failed');
    }
  };

  return (
    <div className={styles.login}>
      <h2 className={styles.login__title}>Login</h2>
      <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.login__formGroup}>
          <label htmlFor="email" className={styles.login__label}>Email:</label>
          <input
            type="email"
            className={styles.login__input}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Email is not valid',
              },
            })}
          />
          {errors.email && <p className={styles.login__error}>{errors.email.message}</p>}
        </div>
        <div className={styles.login__formGroup}>
          <label htmlFor="password" className={styles.login__label}>Password:</label>
          <input
            type="password"
            className={styles.login__input}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <p className={styles.login__error}>{errors.password.message}</p>}
        </div>
        <div className={styles.login__button}>
          <button type="submit" className={styles.login__submitBtn}>Login</button>
        </div>
      </form>
      {successMessage && <p className={styles.login__success}>{successMessage}</p>}
    </div>
  );
};

export default Login;