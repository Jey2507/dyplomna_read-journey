import { Toaster } from "react-hot-toast";
import Container from "../../components/Container/Container.jsx";
import Header from "../../components/Header/Header.jsx";
import ReadComponent from "../../components/ReadComponent/ReadComponent.jsx";
import Recommended from "../../components/Recommended/Recommended.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import StartRead from "../../components/StartRead/StartRead.jsx";
import { useState } from "react";
import ModalAddGood from "../../components/ModalAddGood/ModalAddGood.jsx";
import css from "../ReadJourney/ReadJourney.module.css"

export default function ReadJourney() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    
    return (
        <>
        <Container>
            <Header />
            <div className={css.flex}> 
                <ReadComponent>
                    <Filter  />
                    <StartRead />
                </ReadComponent>
                    
                <Recommended buble={setShowSuccessModal} />
            </div>
            <Toaster position="top-center"/>
            {showSuccessModal && <ModalAddGood  onClose={() => setShowSuccessModal(false)} />}
        </Container>
        </>
    )
}