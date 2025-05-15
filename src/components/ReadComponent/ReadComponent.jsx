import css from "../ReadComponent/ReadComponent.module.css"

export default function ReadComponent({children}) {

    return (
        <>
        <div className={css.main}>
            {children}
        </div>
        </>
    )
}