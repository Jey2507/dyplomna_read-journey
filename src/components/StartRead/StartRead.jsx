import { NavLink } from "react-router-dom"
import css from "../StartRead/StartRead.module.css"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import bookNew from "../../assets/images/books.png";

export default function StartRead() {
    return (
        <>
        <div className={css.divRead}>  
            <h2>Start your workout</h2>
            <ul>
                <li>
                    <div className={css.divFlex}>
                        <div className={css.divCircle}>1</div>
                        <p className={css.descr}><span className={css.spanColor}>Create a personal library:</span> add the books you intend to read 
                        to it.</p>
                    </div>
                </li>
                <li>
                    <div className={css.divFlex}>
                        <div className={css.divCircle}>2</div>
                        <p className={css.descr}><span className={css.spanColor}>Create your first workout:</span> define a goal, choose a period, start training.</p>
                    </div>
                </li>
            </ul>
            <NavLink className={css.boxLink} to='/mylibrary'>
                <h3>My library</h3>
                        <ArrowRightIcon className={css.arrow}/>
            </NavLink>
            
        </div>
        <div className={css.laptopDiv}>
                <img src={bookNew} alt="books" />
                <p>"Books are <span>windows</span> to the world, and reading is a journey into the unknown."</p>
        </div>
        </>
    )
}