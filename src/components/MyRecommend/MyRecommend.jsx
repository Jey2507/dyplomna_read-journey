import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { recommend } from "../../redux/books/operations";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import css from "../../components/MyRecommend/MyRecommend.module.css";
import { NavLink } from "react-router-dom";
import AddBookModal from "../AddBookModal/AddBookModal";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function MyRecommend({buble}) {
  const dispatch = useDispatch();
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const result = await dispatch(recommend()).unwrap();
        setRecommendedBooks(result);
      } catch (error) {
        console.error("Failed to fetch recommended books:", error);
      }
    };

    fetchRecommended();
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
            768: { 
              slidesPerView: 3, 
              spaceBetween: 20, 
              width: 254
            },

          }}
          className={css.swiper}
        >
          {recommendedBooks.map((book) => (
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
        <ArrowRightIcon className={css.arrow}/>
      </NavLink>

      {selectedBook && (
        <AddBookModal
          id={selectedBook.id}
          title={selectedBook.title}
          author={selectedBook.author}
          pages={selectedBook.pages}
          image={selectedBook.image}
          onClose={() => setSelectedBook(null)}
          setter={buble}
        />
      )}
    </div>
  );
}
