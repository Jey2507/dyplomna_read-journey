import css from "../PreviewPhone/PreviewPhone.module.css"

export default function PreviewPhone() {
    return (
        <div className={css.box}>            
            <img className={css.image} src="../../src/assets/images/phone.png" alt="phone_book" />
        </div>
    )
}