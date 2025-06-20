import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBookById } from "../../redux/books/operations.js";
import css from "../MyReadingStart/MyReadingStart.module.css";

export default function MyReadingStart({
  bookId,
  onHandleClick,
  page,
  setPage,
  isReading,
  progress,
  updateReadingState,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      try {
        await dispatch(getBookById(bookId)).unwrap();
        await updateReadingState(); // Оновлення стану лише один раз
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };

    fetchBook();
  }, [bookId]);

  // Обробник зміни інпута з валідацією
  const handlePageChange = (e) => {
    const value = Number(e.target.value);
    const startPage = progress.pagesRead > 0 ? progress.pagesRead : 1; // Початкова сторінка

    if (value < 0) {
      setPage("0"); // Не дозволяємо від’ємні значення
    } else if (value < startPage) {
      setPage(startPage.toString()); // Обмежуємо мінімальну сторінку
    } else if (progress.totalPages > 0 && value > progress.totalPages) {
      setPage(progress.totalPages.toString()); // Обмежуємо максимум totalPages
    } else {
      setPage(e.target.value); // Дозволяємо введення, якщо в межах
    }
  };

  // Перевірка перед викликом onHandleClick
  const handleClickWithValidation = () => {
    const value = Number(page);
    const startPage = progress.pagesRead > 0 ? progress.pagesRead : 1;

    if (value < startPage) {
      alert(`Please start from page ${startPage}`);
      return;
    } else if (progress.totalPages > 0 && value > progress.totalPages) {
      alert(`Page cannot exceed total pages (${progress.totalPages})`);
      return;
    }
    onHandleClick(); 
  };

  return (
    <div className={css.mymain}>
      <div>
      <h2 className={css.mytitle}>
        {isReading ? "Stop Page" : "Start Page"}
      </h2>
      <div className={css.myzone}>
        <label className={css.mylabel} htmlFor="start-page">
          Page:
        </label>
        <input
          type="number"
          id="start-page"
          value={page}
          onChange={handlePageChange}
          placeholder={progress.pagesRead > 0 ? progress.pagesRead.toString() : "1"}
          className={css.myinput}
          min={progress.pagesRead > 0 ? progress.pagesRead : 1}
          max={progress.totalPages > 0 ? progress.totalPages : undefined}
        />
        {(progress.totalPages > 0 && Number(page) > progress.totalPages) && (
          <p className={css.error}>Page cannot exceed total pages ({progress.totalPages})</p>
        )}
        {(progress.pagesRead > 0 && Number(page) < progress.pagesRead) && (
          <p className={css.error}>Please start from page {progress.pagesRead}</p>
        )}
      </div>
      <button className={css.mybutton} onClick={handleClickWithValidation}>
        {isReading ? "Stop" : "To start"}
      </button>
      </div>

      {progress.pagesRead > 0 ? (
        <div className={css.statistics}>
          <h2>Statistics</h2>
          <div className={css.progressCircle}>
            <div className={css.progressBar}>
              <svg width="116" height="116" viewBox="0 0 116 116">
                <circle
                  cx="58"
                  cy="58"
                  r="52"
                  fill="none"
                  stroke="#1F1F1F"
                  strokeWidth="10"
                />
                <circle
                  cx="58"
                  cy="58"
                  r="52"
                  fill="none"
                  stroke="#30b94d"
                  strokeWidth="10"
                  strokeDasharray={326.56}
                  strokeDashoffset={
                    326.56 - ((progress.pagesRead / progress.totalPages) * 360 || 0)
                  }
                  transform="rotate(-90 58 58)"
                  strokeLinecap="round"
                />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontFamily="var(--font-family)"
                  fontWeight="700"
                  fontSize="18px"
                  fill="#f9f9f9"
                >
                  100%
                </text>
              </svg>
            </div>
            <div className={css.progressDetails}>
              <div className={css.boxpercent}>
                <div className={css.greenblock}></div>
                <div className={css.boxflex}>
                  <p className={css.percent}>
                    {((progress.pagesRead / progress.totalPages) * 100 || 0).toFixed(2)}%
                  </p>
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