import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import css from './LoginForm.module.css';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://example.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('Signup successful:', result);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputGroup}>
        <label className={css.inputLabel}>Mail:</label>
        <input
          type="email"
          placeholder="Your@email.com"
          {...register('email')}
          className={`${css.input} ${errors.email ? css.errorInput : ''}`}
        />
        {errors.email && <p className={css.errorText}>{errors.email.message}</p>}
      </div>
      <div className={css.inputGroup}>
        <label className={css.inputLabel}>Password:</label>
        <div className={css.inputWrapper}>
          <input
          onClick={togglePasswordVisibility}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password')}
            className={`${css.input} ${errors.password ? css.errorInput : ''}`}
          />

        </div>
        {errors.password && <p className={css.errorText}>{errors.password.message}</p>}
      </div>
      <button disabled={!isDirty || !isValid} className={css.submitButton} type="submit">
        Log In
      </button>
      <div className={css.signInPrompt}>
        <p>Already have an account? </p>
        <Link className={css.signInLink} to="/register">
          Register
        </Link>
      </div>
    </form>
  );
}
