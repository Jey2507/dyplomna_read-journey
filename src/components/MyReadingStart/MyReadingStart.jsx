import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  startReading,
  stopReading,
  getBookById,
} from "../../redux/books/operations.js";
import css from "../MyReadingStart/MyReadingStart.module.css";

export default function MyReadingStart({ bookId }) {
  const dispatch = useDispatch();
  const [isReading, setIsReading] = useState(false);
  const [page, setPage] = useState("");
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ pagesRead: 0, totalPages: 0 });

  useEffect(() => {
    if (!bookId) {
      setError("Book ID is missing");
      return;
    }

    const fetchBook = async () => {
      try {
        const result = await dispatch(getBookById(bookId)).unwrap();
        setBook(result);
        setError(null);

        let pagesRead = 0;
        if (result.progress && result.progress.length > 0) {
          const lastProgress = result.progress[result.progress.length - 1];
          if (lastProgress.status === "inactive" && lastProgress.finishPage) {
            pagesRead = lastProgress.finishPage;
          } else if (lastProgress.status === "active" && lastProgress.startPage) {
            pagesRead = lastProgress.startPage; // Використовуємо startPage для активної сесії
          }
        }
        setProgress({
          pagesRead: pagesRead || 0,
          totalPages: result.totalPages || 0,
        });
        // Оновлюємо isReading на основі статусу останньої сесії
        setIsReading(
          result.progress && result.progress.length > 0 && result.progress[result.progress.length - 1].status === "active"
        );
      } catch (err) {
        setError("Failed to load book details");
        console.error("Error fetching book:", err);
      }
    };

    fetchBook();
  }, [bookId, dispatch]);

  const handleClick = async () => {
    if (!page || Number(page) < 1) {
      alert("Please enter a valid page number");
      return;
    }

    try {
      if (!isReading) {
        await dispatch(startReading({ bookId, startPage: Number(page) }));
      } else {
        await dispatch(stopReading({ bookId, endPage: Number(page) }));
      }

      // Оновлення прогресу після дії
      const result = await dispatch(getBookById(bookId)).unwrap();
      let pagesRead = 0;
      if (result.progress && result.progress.length > 0) {
        const lastProgress = result.progress[result.progress.length - 1];
        if (lastProgress.status === "inactive" && lastProgress.finishPage) {
          pagesRead = lastProgress.finishPage;
        } else if (lastProgress.status === "active" && lastProgress.startPage) {
          pagesRead = lastProgress.startPage; // Використовуємо startPage для активної сесії
        }
      }
      setProgress({
        pagesRead: pagesRead || 0,
        totalPages: result.totalPages || 0,
      });
      setIsReading(!isReading);
    } catch (error) {
      console.error("Reading action failed:", error);
    }
  };

  const percentage =
    progress.totalPages > 0
      ? ((progress.pagesRead / progress.totalPages) * 100).toFixed(2)
      : 0;

  console.log(percentage);

  return (
    <div className={css.mymain}>
      <h2 className={css.mytitle}>
        {isReading ? "Stop Reading" : "Start Reading"}
      </h2>
      <div className={css.myzone}>
        <label className={css.mylabel} htmlFor="start-page">
          Page:
        </label>
        <input
          type="number"
          id="start-page"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          placeholder="0"
          className={css.myinput}
        />
      </div>
      <button className={css.mybutton} onClick={handleClick}>
        {isReading ? "Stop" : "To start"}
      </button>

      {progress.pagesRead > 0 ? (
        <div className={css.statistics}>
          <h2>Statistics</h2>
          <div className={css.progressCircle}>
            <div className={css.progressBar}>100%</div>
            <div className={css.progressDetails}>
              <div className={css.boxpercent}>
                <div className={css.greenblock}></div>
                <div className={css.boxflex}>
                  <p className={css.percent}>{percentage}%</p>
                  <p className={css.lastpage}>
                    {progress.pagesRead} pages read
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={css.progresDiv}>
          <h2 className={css.titleprogres}>Progress</h2>
          <p className={css.descrprogres}>
            Here you will see when and how much you read. To record, click on
            the red button above.
          </p>
          <div className={css.emoji}>🌟</div>
        </div>
      )}
    </div>
  );
}