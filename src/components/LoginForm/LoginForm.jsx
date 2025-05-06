import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import css from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { login as loginUser } from '../../redux/auth/operation.js';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginForm() {
  const { reset } = useForm();
  const dispatch = useDispatch();
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
    const { email, password } = data;
    
    try {
      console.log("Logging in with:", email, password);
      const res = await dispatch(loginUser({ email, password })).unwrap();
      console.log("Login success:", res); // Тут більше немає .data
  
      reset();  
      toast.success("Welcome to ReadJourney!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
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
            onClick={togglePasswordVisibility}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className={`${css.input} ${errors.password ? css.errorInput : ''}`}
            />

          </div>
        </div>
        {errors.password && <p className={css.errorText}>{errors.password.message}</p>}
      </div>

      <div className={css.boxLogin}>
        <button disabled={!isDirty || !isValid} className={css.submitButton} type="submit">
          Log In
        </button>

        <Link className={css.signInLink} to="/register">
        Already have an account?
        </Link>
      </div>
    </form>
  );
}
