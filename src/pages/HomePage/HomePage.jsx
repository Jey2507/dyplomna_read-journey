import Container from "../../components/Container/Container.jsx";
import Home from "../../components/Home/Home.jsx";
import PreviewPhone from "../../components/PreviewPhone/PreviewPhone.jsx";
import StartComponent from "../../components/StartComponent/StartComponent.jsx";
import css from "../HomePage/HomePage.module.css"

export default function HomePage() {
    return (
        <>
        <Container>
            <div className={css.flex}>
            <StartComponent>
                <Home/>
            </StartComponent> 
            <PreviewPhone />
            </div>
        </Container>
        </>
    )
}