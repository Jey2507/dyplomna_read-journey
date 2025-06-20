import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { recommend } from "../../redux/books/operations";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import css from "./Recommended.module.css";
import AddBookModal from "../AddBookModal/AddBookModal";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Recommended({ buble }) {
  const dispatch = useDispatch();
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const result = await dispatch(recommend()).unwrap();
        console.log("Fetched books:", result.length); // Відлагодження кількості слайдів
        setRecommendedBooks(result);
      } catch (error) {
        console.error("Failed to fetch recommended books:", error);
      }
    };

    fetchRecommendedBooks();
  }, [dispatch]);

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
      setIsFirstSlide(swiperRef.current.isBeginning);
      setIsLastSlide(swiperRef.current.isEnd);
    }
  }, [recommendedBooks]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Recommended</h2>

      <div className={css.swiperWrapper}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={21}
          width={280}
          autoHeight={true} 
          slidesPerColumnFill={'row'}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={(swiper) => {
            setIsFirstSlide(swiper.isBeginning);
            setIsLastSlide(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsFirstSlide(swiper.isBeginning);
            setIsLastSlide(swiper.isEnd);
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { 
              slidesPerView: 4, 
              slidesPerColumn: 2, 
              spaceBetween: 25, 
              width: 624
            },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
          className={css.swiper}
        >
          {recommendedBooks.map((book) => (
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
          <div
            className={`${css.button} ${isFirstSlide ? css.disabled : ""}`}
            ref={prevRef}
          >
            <ArrowLeftIcon className={css.arrowIcon} />
          </div>
          <div
            className={`${css.button} ${isLastSlide ? css.disabled : ""}`}
            ref={nextRef}
          >
            <ArrowRightIcon className={css.arrowIcon} />
          </div>
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
          setter={buble}
        />
      )}
    </div>
  );
}