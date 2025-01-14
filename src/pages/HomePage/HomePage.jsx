import Container from "../../components/Container/Container.jsx";
import Home from "../../components/Home/Home.jsx";
import PreviewPhone from "../../components/PreviewPhone/PreviewPhone.jsx";
import StartComponent from "../../components/StartComponent/StartComponent.jsx";

export default function HomePage() {
    return (
        <>
        <Container>
            <StartComponent>
                <Home/>
            </StartComponent> 
            <PreviewPhone />
        </Container>
        </>
    )
}