import { useEffect, useRef, useState } from "react";
import css from "../MyLibraryBox/MyLibraryBox.module.css";
import books from "../../assets/images/books.png";
import { deleteMybook, myBooks } from "../../redux/books/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectBooks } from "../../redux/books/selectors"; // <-- новий селектор

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Toaster } from "react-hot-toast";

export default function MyLibraryBox() {
  const dispatch = useDispatch();
  const library = useSelector(selectBooks); 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    dispatch(myBooks());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const deleteBook = async (_id) => {
    try {
      await dispatch(deleteMybook(_id));
    } catch (error) {
      console.error("Delete book error:", error);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>My library</h2>

      {library.length > 0 ? (
        <div className={css.swiperWrapper}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={2}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
            className={css.swiper}
          >
            {library.map((book) => (
              <SwiperSlide className={css.newList} key={book._id}>
                <div className={css.item}>
                  <img className={css.imageMy} src={book.imageUrl} alt={book.title} />
                  <h2 className={css.myTitle}>{book.title}</h2>
                  <h3 className={css.myAuthor}>{book.author}</h3>
                  <button className={css.buttonDelete} onClick={() => deleteBook(book._id)}>X</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className={css.mainBox}>
          <div className={css.boxFlex}>
            <div className={css.imageBox}>
              <img className={css.image} src={books} alt="books" />
            </div>
            <h3 className={css.descr}>
              To start training, add <span className={css.spanColor}>some of your books</span> or from the recommended ones
            </h3>
          </div>
        </div>
      )}

      <div className={css.dropdownWrapper} ref={dropdownRef}>
        <button className={css.dropdownButton} onClick={toggleDropdown}>
          All books
          <span className={`${css.arrow} ${isOpen ? css.arrowOpen : ""}`}>❯</span>
        </button>

        <ul className={`${css.dropdownList} ${isOpen ? css.dropdownListActive : ""}`}>
          <li className={css.dropdownItemDisabled}>Unread</li>
          <li className={css.dropdownItemDisabled}>In progress</li>
          <li className={css.dropdownItemDisabled}>Done</li>
          <li className={css.dropdownItemActive}>All books</li>
        </ul>
      </div>
      <Toaster />
    </div>
  );
}
