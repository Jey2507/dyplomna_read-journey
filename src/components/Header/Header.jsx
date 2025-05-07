import { useSelector } from "react-redux"
import css from "../Header/Header.module.css"
import { selectUser } from "../../redux/auth/selectors"
// import { icons as sprite } from '../../assets/index.js';
export default function Header() {
    const name = useSelector(selectUser)
    const letter = name?.[0] || ''

    return (
        <>
        <div className={css.header}>
            {/* <svg className={css.logo} width="42" height="17">
                <use xlinkHref={`${sprite}#logo`} />
            </svg> */}
            <h1>L</h1>
            <div className={css.boxFlex}>
                <div className={css.logoUser}>
                    {letter.toUpperCase()}
                </div>
                <div>
                    <h1>B</h1>
                </div>
            </div>
        </div>
        </>
    )
}