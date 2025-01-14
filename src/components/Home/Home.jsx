import { FaArrowDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import css from "../Home/Home.module.css"

export default function Home() {
    return (
        <>
        <div className={css.icon}>
            <FaArrowDown size="30px" color="#F9F9F9"/>
        </div>
        <div className={css.navLinks}>   
            <NavLink className={css.button} to="/register">Register</NavLink>
            <NavLink className={css.button} to="/login">Login</NavLink>
        </div>
            
        </>
    )
}