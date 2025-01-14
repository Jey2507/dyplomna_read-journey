import css from "../PreviewPhone/PreviewPhone.module.css"
import image from "../../assets/images/phone.png"

export default function PreviewPhone() {
    return (
        <div className={css.box}>            
            <img className={css.image} src={image} alt="phone_book" />
        </div>
    )
}