import Container from "../../components/Container/Container.jsx";
import PreviewPhone from "../../components/PreviewPhone/PreviewPhone.jsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import StartComponent from "../../components/StartComponent/StartComponent.jsx";
import css from "../RegisterPage/RegisterPage.module.css"

export default function RegisterPage() {
    return (
        <>
        <Container>
            <div className={css.flex}>
            <StartComponent>
                <RegisterForm />
            </StartComponent>
            <PreviewPhone />
            </div>
        </Container>
        </>
    )
}