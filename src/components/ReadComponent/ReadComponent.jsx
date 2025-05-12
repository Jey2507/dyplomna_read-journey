import Filter from "../Filter/Filter"
import css from "../ReadComponent/ReadComponent.module.css"
import StartRead from "../StartRead/StartRead"

export default function ReadComponent() {

    return (
        <>
        <div className={css.main}>
            <Filter  />
            <StartRead />
        </div>
        </>
    )
}