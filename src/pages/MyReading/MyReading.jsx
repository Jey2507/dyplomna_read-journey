import { useLocation } from "react-router-dom";
import Container from "../../components/Container/Container.jsx";
import Header from "../../components/Header/Header.jsx";

export default function MyReading() {
  const location = useLocation();
  const book = location.state; 

  return (
    <Container>
      <Header />
      
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
          <img src={book.image} alt={book.title} />
          <p>Pages: {book.pages}</p>
        </div>
      ) : (
        <p>No book data provided.</p>
      )}
    </Container>
  );
}
