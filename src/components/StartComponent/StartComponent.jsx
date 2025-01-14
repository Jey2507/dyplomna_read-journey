import BookIcon from "../BookIcon/BookIcon.jsx";
import css from "../StartComponent/StartComponent.module.css"

export default function StartComponent({children}) {
    return (
        <div className={css.box}>            
            <BookIcon />
            <h1 className={css.mainText}>Expand your mind, reading<span className={css.spanText}> a book</span></h1>
            {children}
        </div>
    )
}