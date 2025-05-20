import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recommend } from "../../redux/books/operations";
import { selectBooks } from "../../redux/books/selectors";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import css from "./Recommended.module.css";
import AddBookModal from "../AddBookModal/AddBookModal";

export default function Recommended() {
  const dispatch = useDispatch();
  const recommendedBooks = useSelector(selectBooks);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(recommend());
  }, [dispatch]);

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Recommended</h2>

      <div className={css.swiperWrapper}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={21}
          width={280}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
          className={css.swiper}
        >
          {recommendedBooks?.map((book) => (
            <SwiperSlide key={book._id}>
              <div
                className={css.item}
                onClick={() => handleCardClick(book)}
                role="button"
                tabIndex={0}
              >
                <img className={css.image} src={book.imageUrl} alt={book.title} />
                <h3 className={css.titleBook}>{book.title}</h3>
                <p className={css.descr}>{book.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={css.buttons}>
          <div className={css.button} ref={prevRef}>←</div>
          <div className={css.button} ref={nextRef}>→</div>
        </div>
      </div>

      {selectedBook && (
        <AddBookModal
          id={selectedBook._id}
          title={selectedBook.title}
          author={selectedBook.author}
          pages={selectedBook.totalPages}
          image={selectedBook.imageUrl}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
