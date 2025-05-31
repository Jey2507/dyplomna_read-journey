import { Toaster } from "react-hot-toast";
import Container from "../../components/Container/Container.jsx";
import Header from "../../components/Header/Header.jsx";
import ReadComponent from "../../components/ReadComponent/ReadComponent.jsx";
import Recommended from "../../components/Recommended/Recommended.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import StartRead from "../../components/StartRead/StartRead.jsx";
import { useState } from "react";
import ModalAddGood from "../../components/ModalAddGood/ModalAddGood.jsx";



export default function ReadJourney() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    
    return (
        <>
        <Container>
            <Header />
            <ReadComponent>
                <Filter  />
                <StartRead />
            </ReadComponent>
                
            <Recommended buble={setShowSuccessModal} />
            <Toaster position="top-right"/>
            {showSuccessModal && <ModalAddGood  onClose={() => setShowSuccessModal(false)} />}
        </Container>
        </>
    )
}