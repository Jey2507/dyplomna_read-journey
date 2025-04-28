import Container from "../../components/Container/Container.jsx";
import PreviewPhone from "../../components/PreviewPhone/PreviewPhone.jsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import StartComponent from "../../components/StartComponent/StartComponent.jsx";

export default function RegisterPage() {
    return (
        <>
        <Container>
            <StartComponent>
                <RegisterForm />
            </StartComponent>
            <PreviewPhone />
        </Container>
        </>
    )
}