import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import css from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { register as registerUser } from '../../redux/auth/operation.js';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function RegisterForm() {
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
    const { name, email, password } = data;
  
    try {
      await dispatch(registerUser({name, email, password })).unwrap();
      reset();  // очистка форми після успішної реєстрації
      toast.success("Welcome to ReadJourney!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };
  

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputGroup}>
        <div className={css.boxFlex}>        
          <label className={css.inputLabel}>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register('name')}
            className={`${css.input} ${errors.name ? css.errorInput : ''}`}
          />
        </div>
        {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
      </div>
      <div className={css.inputGroup}>
        <div className={css.boxFlex}> 
          <label className={css.inputLabel}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            className={`${css.input} ${errors.email ? css.errorInput : ''}`}
          />
        </div>
        {errors.email && <p className={css.errorText}>{errors.email.message}</p>}
      </div>
      <div className={css.inputGroup}>
        <div className={css.boxFlex}> 
          <label className={css.inputLabel}>Password</label>
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
          Register
        </button>

          <Link className={css.signInLink} to="/login">
          Already have an account?
          </Link>
      </div>
    </form>
  );
}
