import css from "../MyLibraryBox/MyLibraryBox.module.css"
import books from "../../assets/images/books.png"

export default function MyLibraryBox() {
    return (
        <div className={css.contrainer}>   
        <h2 className={css.title}>My library</h2>  
        <div className={css.mainBox}>
            <div className={css.boxFlex}>
                <div className={css.imageBox}>   
                    <img className={css.image} src={books} alt="books" />
                </div>
                <h3 className={css.descr}>To start training, add <span className={css.spanColor}>some of your books</span> or from the recommended ones</h3>
            </div>  
        </div>
        </div>
    )
}