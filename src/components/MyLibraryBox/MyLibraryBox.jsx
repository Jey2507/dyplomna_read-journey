import { useEffect, useRef, useState } from "react";
import css from "../MyLibraryBox/MyLibraryBox.module.css";
import books from "../../assets/images/books.png";
import bookNew from "../../assets/images/group.png";
import { deleteMybook, myBooks } from "../../redux/books/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectBooks } from "../../redux/books/selectors";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Toaster } from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";
import AddReadingModal from "../AddReadingModal/AddReadingModal";

export default function MyLibraryBox() {
  const dispatch = useDispatch();
  const library = useSelector(selectBooks);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState("all"); // Стан для фільтра
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

  const filteredLibrary = library.filter((book) => {
    console.log("Book status:", book.status); 
    const bookStatus = book.status ? book.status.toLowerCase() : "";
    const filterStatus = filter.toLowerCase();
    switch (filterStatus) {
      case "unread":
        return bookStatus === "unread";
      case "in-progress":
        return bookStatus === "in-progress";
      case "done":
        return bookStatus === "done";
      case "all":
      default:
        return true; 
    }
  });

  return (
    <div className={css.container}>
      <h2 className={css.title}>My library</h2>

      {filteredLibrary.length > 0 ? (
        <div className={css.swiperWrapper}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={2}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              768: { 
                slidesPerView: 4, 
                spaceBetween: 25, 
              },
              1440: {
                width: 800,
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            className={css.swiper}
          >
            {filteredLibrary.map((book) => (
              <SwiperSlide className={css.newList} key={book._id}>
                <div className={css.item} onClick={() => setSelectedBook(book)}>
                  {book.imageUrl ? (
                    <img className={css.imageMy} src={book.imageUrl} alt={book.title} />
                  ) : (
                    <div className={css.noImagePlaceholder}>
                      <img className={css.newBook} src={bookNew} alt="newBook" />
                    </div>
                  )}
                  <h2 className={css.myTitle}>{book.title}</h2>
                  <h3 className={css.myAuthor}>{book.author}</h3>
                  <button
                    className={css.buttonDelete}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBook(book._id);
                    }}
                  >
                    <LuTrash2 />
                  </button>
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
          {filter === "all" ? "All books" : filter.charAt(0).toUpperCase() + filter.slice(1).replace("-", " ")}
          <span className={`${css.arrow} ${isOpen ? css.arrowOpen : ""}`}>❯</span>
        </button>

        <ul className={`${css.dropdownList} ${isOpen ? css.dropdownListActive : ""}`}>
          <li
            className={`${css.dropdownItemDisabled} ${filter === "unread" ? css.dropdownItemActive : ""}`}
            onClick={() => {
              setFilter("unread");
              setIsOpen(false);
            }}
          >
            Unread
          </li>
          <li
            className={`${css.dropdownItemDisabled} ${filter === "in-progress" ? css.dropdownItemActive : ""}`} // Оновлено "inProgress" на "in-progress"
            onClick={() => {
              setFilter("in-progress");
              setIsOpen(false);
            }}
          >
            In progress
          </li>
          <li
            className={`${css.dropdownItemDisabled} ${filter === "done" ? css.dropdownItemActive : ""}`}
            onClick={() => {
              setFilter("done");
              setIsOpen(false);
            }}
          >
            Done
          </li>
          <li
            className={`${css.dropdownItemDisabled} ${filter === "all" ? css.dropdownItemActive : ""}`}
            onClick={() => {
              setFilter("all");
              setIsOpen(false);
            }}
          >
            All books
          </li>
        </ul>
      </div>

      {selectedBook && (
        <AddReadingModal
          id={selectedBook._id}
          title={selectedBook.title}
          author={selectedBook.author}
          pages={selectedBook.totalPages}
          image={selectedBook.imageUrl}
          onClose={() => setSelectedBook(null)}
        />
      )}

      <Toaster />
    </div>
  );
}