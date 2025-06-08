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
      <button className={css.mybutton} onClick={onHandleClick}>
        {isReading ? "Stop" : "To start"}
      </button>

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