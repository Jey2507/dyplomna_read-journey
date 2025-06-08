import { useLocation } from "react-router-dom";
import { useState } from "react"; // Додано для локального стану page
import Container from "../../components/Container/Container.jsx";
import Header from "../../components/Header/Header.jsx";
import MyReadingStart from "../../components/MyReadingStart/MyReadingStart.jsx";
import css from "../MyReading/MyReading.module.css";
import { getBookById, startReading, stopReading } from "../../redux/books/operations.js";
import { useDispatch } from "react-redux";

export default function MyReading() {
  const location = useLocation();
  const book = location.state;
  const [timeleft, setTimeleft] = useState();
  const [page, setPage] = useState(""); 
  const [isButtonActive, setIsButtonActive] = useState(false); 

  const dispatch = useDispatch(); 

  const handleClick = async () => {
    if (!page || Number(page) < 1) {
      alert("Please enter a valid page number");
      return;
    }

    setIsButtonActive(!isButtonActive);

    try {
      if (!isReading) {
        await dispatch(startReading({ bookId: book.id, startPage: Number(page) }));
      } else {
        const res = await dispatch(stopReading({ bookId: book.id, endPage: Number(page) }));
        setTimeleft(res.payload.timeLeftToRead)
      }

      const result = await dispatch(getBookById(book.id)).unwrap();
      let pagesRead = 0;
      if (result.progress && result.progress.length > 0) {
        const lastProgress = result.progress[result.progress.length - 1];
        if (lastProgress.status === "inactive" && lastProgress.finishPage) {
          pagesRead = lastProgress.finishPage;
        } else if (lastProgress.status === "active" && lastProgress.startPage) {
          pagesRead = lastProgress.startPage;
        }
      }
      setProgress({
        pagesRead: pagesRead || 0,
        totalPages: result.totalPages || 0,
      });
      setIsReading(!isReading);
    } catch (error) {
      console.error("Reading action failed:", error);
      setIsButtonActive(!isButtonActive);
    }
  };

  const updateReadingState = async () => {
    if (book && book.id) {
      const result = await dispatch(getBookById(book.id)).unwrap();
      let pagesRead = 0;
      if (result.progress && result.progress.length > 0) {
        const lastProgress = result.progress[result.progress.length - 1];
        if (lastProgress.status === "inactive" && lastProgress.finishPage) {
          pagesRead = lastProgress.finishPage;
        } else if (lastProgress.status === "active" && lastProgress.startPage) {
          pagesRead = lastProgress.startPage;
        }
      }
      setProgress({
        pagesRead: pagesRead || 0,
        totalPages: result.totalPages || 0,
      });
      setIsReading(
        result.progress && result.progress.length > 0 && result.progress[result.progress.length - 1].status === "active"
      );
    }
  };
  

  const [isReading, setIsReading] = useState(false);
  const [progress, setProgress] = useState({ pagesRead: 0, totalPages: 0 });

console.log(timeleft)

  return (
    <Container>
      <Header />
      <MyReadingStart
        bookId={book.id}
        onHandleClick={handleClick}
        page={page}
        setPage={setPage}
        isReading={isReading}
        progress={progress}
        updateReadingState={updateReadingState}
      />
      {book ? (
        <div className={css.readbox}>
          <h2 className={css.titleread}>My reading</h2>
          <div className={css.flex}>
            <img className={css.imgread} src={book.image} alt={book.title} />
            <h3 className={css.namebook}>{book.title}</h3>
            <p className={css.author}>{book.author}</p>
          </div>
          <button className={css.buttonrecording} onClick={handleClick}>
            <div className={`${css.buttonInner} ${isButtonActive ? css.active : ""}`}></div>
          </button>
          {/* <p className={css.time}>{timeleft ? timeleft.hours : null}{timeleft ? timeleft.hours : null}{timeleft ? timeleft.hours : null}</p> */}
        </div>
      ) : (
        <p>No book data provided.</p>
      )}
    </Container>
  );
}