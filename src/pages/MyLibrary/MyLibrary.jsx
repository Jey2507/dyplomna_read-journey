import { useState } from "react"
import Container from "../../components/Container/Container"
import Header from "../../components/Header/Header"
import MyFilter from "../../components/MyFilter/MyFilter"
import MyLibraryBox from "../../components/MyLibraryBox/MyLibraryBox"
import MyRecommend from "../../components/MyRecommend/MyRecommend"
import ReadComponent from "../../components/ReadComponent/ReadComponent"
import ModalAddGood from "../../components/ModalAddGood/ModalAddGood"
import css from "../MyLibrary/MyLibrary.module.css"

export default function MyLibrary() {
     const [showSuccessModal, setShowSuccessModal] = useState(false);
    return (
        <>
        <Container>
            <Header />
            <div className={css.flex}> 
            <ReadComponent>
                <MyFilter />
                <MyRecommend buble={setShowSuccessModal}/>
            </ReadComponent>
            <MyLibraryBox />
            </div>
               {showSuccessModal && <ModalAddGood  onClose={() => setShowSuccessModal(false)} />}
        </Container>
        </>
    )
}