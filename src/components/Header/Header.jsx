import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "../Header/Header.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/auth/operation";
import toast from "react-hot-toast";

export default function Header() {
  const dispatch = useDispatch()
  const name = useSelector(selectUser);
  const letter = name?.[0] || '';
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);


const handleLogout = async () => {
  try {
    await dispatch(logout());
    toast.success("Logout is success")
  } catch (error) {
    console.error("Log out error:", error);
  }
};

  return (
    <>
      <div className={css.header}>
        <h1>L</h1>

        <div className={css.boxFlex}>
          <div className={css.logoUser}>{letter.toUpperCase()}</div>

          <button className={css.burgerBtn} onClick={open}>
            ☰
          </button>
        </div>

        <div className={`${css.burgerMenu} ${isOpen ? css.active : ""}`}>
          <div className={css.sliceBox}>
            <div className={css.flex}>
                <NavLink
                    to="/readjourney"
                    className={({ isActive }) =>`${css.link} ${isActive ? css.isActive : ""}`} onClick={close}>
                    Home
                </NavLink>
                <NavLink
                    to="/mylibrary"
                    className={({ isActive }) =>`${css.link} ${isActive ? css.isActive : ""}`} onClick={close}>
                    My library
                </NavLink>

            </div>
            <button className={css.logout} onClick={handleLogout}>
                Log out
            </button>

            <button className={css.close} onClick={close}>
              X
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
