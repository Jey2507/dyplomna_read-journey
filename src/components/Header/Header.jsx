import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "../Header/Header.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/auth/operation";
import toast from "react-hot-toast";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; 

export default function Header() {
  const dispatch = useDispatch();
  const name = useSelector(selectUser);
  const letter = name?.[0] || "";
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logout is success");
    } catch (error) {
      console.error("Log out error:", error);
    }
  };

  return (
    <>
      <div className={css.header}>
        <svg width="42" height="17" viewBox="0 0 42 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 11V0H12.8903C14.6428 0 16.3497 0.558477 17.7633 1.59437C18.6084 2.21371 19.2833 3.0366 19.7252 3.98661L21.2165 7.19231C21.7922 5.78595 22.5143 4.44406 23.3707 3.18876L23.4446 3.08053C23.6905 2.72004 23.9717 2.38484 24.2838 2.07984L24.919 1.4592C25.333 1.05464 25.8242 0.737558 26.3634 0.526835L26.4183 0.505373C27.2728 0.171398 28.1822 0 29.0996 0H42V11H0Z" fill="#F9F9F9" />
          <rect y="13" width="42" height="4" fill="#F9F9F9" />
        </svg>

        <div className={css.flexDouble}>
        <div className={css.flexLaptop}>
              <NavLink
                to="/readjourney"
                className={({ isActive }) => `${css.link} ${isActive ? css.isActive : ""}`}
                onClick={close}
              >
                Home
              </NavLink>
              <NavLink
                to="/mylibrary"
                className={({ isActive }) => `${css.link} ${isActive ? css.isActive : ""}`}
                onClick={close}
              >
                My library
              </NavLink>
            </div>

        <div className={css.boxFlex}>
          <div className={css.logoUser}>{letter.toUpperCase()}</div>
          <p className={css.nameUser}>{name}</p>
          <button className={css.logoutLaptop} onClick={handleLogout}>
              Log out
            </button>
          <button className={css.burgerBtn} onClick={open}>
            <Bars3Icon className={css.burgerIcon} /> 
          </button>
        </div>
        </div>

        <div className={`${css.burgerMenu} ${isOpen ? css.active : ""}`}>
          <div className={css.sliceBox}>
            <div className={css.flex}>
              <NavLink
                to="/readjourney"
                className={({ isActive }) => `${css.link} ${isActive ? css.isActive : ""}`}
                onClick={close}
              >
                Home
              </NavLink>
              <NavLink
                to="/mylibrary"
                className={({ isActive }) => `${css.link} ${isActive ? css.isActive : ""}`}
                onClick={close}
              >
                My library
              </NavLink>
            </div>
            <button className={css.logout} onClick={handleLogout}>
              Log out
            </button>

            <button className={css.close} onClick={close}>
              <XMarkIcon className={css.closeIcon} /> 
            </button>
          </div>
        </div>
      </div>
    </>
  );
}