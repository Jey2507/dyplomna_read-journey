import Container from "../../components/Container/Container.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import PreviewPhone from "../../components/PreviewPhone/PreviewPhone.jsx";
import StartComponent from "../../components/StartComponent/StartComponent.jsx";

export default function LoginPage() {
    return (
        <>
        <Container>
            <StartComponent>
                <LoginForm />
            </StartComponent>
            <PreviewPhone />
        </Container>
        </>
    )
}