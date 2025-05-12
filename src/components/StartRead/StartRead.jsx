import css from "../StartRead/StartRead.module.css"

export default function StartRead() {
    return (
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
            <div className={css.boxLink}>
                <h3>My library</h3>
                <h3>arrow</h3>
            </div>
        </div>
    )
}