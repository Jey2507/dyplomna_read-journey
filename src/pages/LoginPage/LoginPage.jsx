import Container from "../../components/Container/Container.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import PreviewPhone from "../../components/PreviewPhone/PreviewPhone.jsx";
import StartComponent from "../../components/StartComponent/StartComponent.jsx";
import css from "../LoginPage/LoginPage.module.css"

export default function LoginPage() {
    return (
        <>
        <Container>
            <div className={css.flex}>
            <StartComponent>
                <LoginForm />
            </StartComponent>
            <PreviewPhone />
            </div>

        </Container>
        </>
    )
}