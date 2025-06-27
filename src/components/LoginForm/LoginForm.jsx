import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import css from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { login as loginUser } from '../../redux/auth/operation.js';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    setServerError('');

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      reset();
      toast.success('Welcome to ReadJourney!');
    } catch (error) {
      console.error('Login error:', error);
      setServerError('Incorrect email or password');
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputGroup}>
        <div className={css.boxFlex}>
          <label className={css.inputLabel}>Mail:</label>
          <input
            type="email"
            placeholder="Your@email.com"
            {...register('email')}
            className={`${css.input} ${errors.email ? css.errorInput : ''}`}
          />
        </div>
        {errors.email && <p className={css.errorText}>{errors.email.message}</p>}
      </div>

      <div className={css.inputGroup}>
        <div className={css.boxFlex}>
          <label className={css.inputLabel}>Password:</label>
          <div className={css.inputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className={`${css.input} ${errors.password ? css.errorInput : ''}`}
            />
            <button
              type="button"
              className={css.togglePassword}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>
        {errors.password && <p className={css.errorText}>{errors.password.message}</p>}
      </div>

      <div className={css.boxLogin}>
        <button className={css.submitButton} type="submit">
          Log In
        </button>
        <Link className={css.signInLink} to="/register">
          Don't have an account?
        </Link>
      </div>

      {serverError && <p className={css.errorText}>{serverError}</p>}
    </form>
  );
}