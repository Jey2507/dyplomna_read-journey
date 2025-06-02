import { useLocation } from "react-router-dom";
import Container from "../../components/Container/Container.jsx";
import Header from "../../components/Header/Header.jsx";
import MyReadingStart from "../../components/MyReadingStart/MyReadingStart.jsx";
import css from "../MyReading/MyReading.module.css"

export default function MyReading() {
  const location = useLocation();
  const book = location.state; 

  return (
    <Container>
      <Header />
      <MyReadingStart bookId={book.id} />
      {book ? (
        <div className={css.readbox}>
          <h2 className={css.titleread}>My reading</h2>
          <div className={css.flex}>
              <img className={css.imgread} src={book.image} alt={book.title} />
              <h3 className={css.namebook}>{book.title}</h3>
              <p className={css.author}>{book.author}</p>
          </div>
          
          <button className={css.buttonrecording}><div></div></button>
        </div>
      ) : (
        <p>No book data provided.</p>
      )}
    </Container>
  );
}
