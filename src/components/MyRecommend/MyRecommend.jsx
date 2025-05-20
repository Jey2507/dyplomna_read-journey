import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recommend } from "../../redux/books/operations";
import { selectBooks } from "../../redux/books/selectors";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import css from "../../components/MyRecommend/MyRecommend.module.css";
import { NavLink } from "react-router-dom";
import AddBookModal from "../AddBookModal/AddBookModal"; // імпортуємо модалку

export default function MyRecommend() {
  const dispatch = useDispatch();
  const recommendedBooks = useSelector(selectBooks);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [selectedBook, setSelectedBook] = useState(null); // стан для вибраної книги

  useEffect(() => {
    dispatch(recommend());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Recommended books</h2>

      <div className={css.swiperWrapper}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={20}
          width={253}
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
                onClick={() =>
                  setSelectedBook({
                    id: book._id,
                    title: book.title,
                    author: book.author,
                    pages: book.totalPages,
                    image: book.imageUrl,
                  })
                }
              >
                <img className={css.image} src={book.imageUrl} alt={book.title} />
                <h3 className={css.titleBook}>{book.title}</h3>
                <p className={css.descr}>{book.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <NavLink className={css.boxLink} to="/readjourney">
        <h3>Home</h3>
        <h3>→</h3>
      </NavLink>

      {selectedBook && (
        <AddBookModal
          id={selectedBook.id}
          title={selectedBook.title}
          author={selectedBook.author}
          pages={selectedBook.pages}
          image={selectedBook.image}
          onClose={() => setSelectedBook(null)} // додай можливість закрити
        />
      )}
    </div>
  );
}
