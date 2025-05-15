import Container from "../../components/Container/Container"
import Header from "../../components/Header/Header"
import MyFilter from "../../components/MyFilter/MyFilter"
import MyLibraryBox from "../../components/MyLibraryBox/MyLibraryBox"
import MyRecommend from "../../components/MyRecommend/MyRecommend"
import ReadComponent from "../../components/ReadComponent/ReadComponent"

export default function MyLibrary() {
    return (
        <>
        <Container>
            <Header />
            <ReadComponent>
                <MyFilter />
                <MyRecommend />
            </ReadComponent>
            <MyLibraryBox />
        </Container>
        </>
    )
}